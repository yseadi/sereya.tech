import "server-only";
import { canSummarize, summarize } from "./summarize";
import { createAdminClient } from "../supabase/server";
import { slugify } from "../format";
import { readFeed, fetchText, type FeedItem } from "./feed";
import { compile, score, type Term } from "./score";
import { metaTag, readableText } from "./text";

const KEEP_AT = 40; // Today's catch
const PUBLISH_AT = 85; // auto-publish, when switched on
const WRITER_UNTIL_MS = 35_000; // stop asking for new summaries after this, Vercel stops the run at 60s
const MAX_AGE_DAYS = 4; // ignore older items in a feed
const MAX_NEW_PER_SOURCE = 40;
const SKIPPED_KEEP_DAYS = 14;

type Source = { id: string; name: string; feed_url: string; full_text: boolean; license_note: string };

export type RunSummary = {
  sources_read: number;
  items_read: number;
  kept: number;
  published: number;
  skipped: number;
  errors: { source: string; error: string }[];
};

async function pool<T, R>(items: T[], size: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) {
        const n = i++;
        out[n] = await fn(items[n]);
      }
    }),
  );
  return out;
}

function uniqueSlug(title: string, link: string, taken: Set<string>) {
  const base = slugify(title) || "signal";
  let slug = base;
  if (taken.has(slug)) {
    let h = 0;
    for (const ch of link) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    slug = `${base.slice(0, 60).replace(/-+$/, "")}-${h.toString(36).slice(0, 6)}`;
  }
  taken.add(slug);
  return slug;
}

/** Guess the format from the address and the feed's own labels. */
function guessFormat(item: FeedItem): "News" | "Essay" | "Report" {
  const hay = `${item.link} ${item.categories.join(" ")}`.toLowerCase();
  if (/(opinion|essay|ideas|column|perspective|comment)/.test(hay)) return "Essay";
  if (/(report|study|research|survey|index)/.test(`${hay} ${item.title.toLowerCase()}`)) return "Report";
  return "News";
}

/**
 * One full Concha run: read every active feed, score the new items, file them.
 * Uses the service key, so it must only be called from the cron route or an owner action.
 */
export async function runConcha(trigger: "schedule" | "manual"): Promise<RunSummary> {
  const db = createAdminClient();
  const started = new Date();
  const { data: run } = await db.from("concha_runs").insert({ trigger, started_at: started.toISOString() }).select("id").single();

  const [{ data: sources }, { data: terms }, { data: auto }] = await Promise.all([
    db.from("sources").select("id, name, feed_url, full_text, license_note").eq("active", true),
    db.from("concha_terms").select("kind, term, aliases, category"),
    db.from("settings").select("value").eq("key", "concha_autopublish").maybeSingle(),
  ]);
  const autopublish = auto?.value === true;
  const compiled = compile(
    (terms ?? []).filter((t) => t.kind === "glossary") as Term[],
    (terms ?? []).filter((t) => t.kind === "never") as Term[],
    (terms ?? []).filter((t) => t.kind === "listen") as Term[],
    (terms ?? []).filter((t) => t.kind === "category") as Term[],
  );

  const summary: RunSummary = { sources_read: 0, items_read: 0, kept: 0, published: 0, skipped: 0, errors: [] };
  const cutoff = Date.now() - MAX_AGE_DAYS * 86400_000;

  // 1. Read the feeds.
  const perSource = await pool((sources ?? []) as Source[], 4, async (src) => {
    try {
      const items = (await readFeed(src.feed_url)).filter((i) => !i.published || isNaN(+i.published) || +i.published >= cutoff);
      summary.sources_read++;
      summary.items_read += items.length;
      await db.from("sources").update({ last_items: items.length, last_error: null, last_read_at: new Date().toISOString() }).eq("id", src.id);
      return { src, items: items.slice(0, MAX_NEW_PER_SOURCE) };
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      summary.errors.push({ source: src.name, error });
      await db.from("sources").update({ last_error: error, last_read_at: new Date().toISOString() }).eq("id", src.id);
      return { src, items: [] as FeedItem[] };
    }
  });

  // 2. Leave out what Concha already brought.
  const links = perSource.flatMap((p) => p.items.map((i) => i.link));
  const known = new Set<string>();
  for (let i = 0; i < links.length; i += 150) {
    const { data } = await db.from("posts").select("source_url").in("source_url", links.slice(i, i + 150));
    data?.forEach((d) => known.add(d.source_url));
  }
  const { data: slugRows } = await db.from("posts").select("slug").gte("created_at", new Date(Date.now() - 90 * 86400_000).toISOString());
  const taken = new Set((slugRows ?? []).map((r) => r.slug));

  // 3. Score and file.
  type Row = Record<string, unknown> & { status: string; image_url: string; source_url: string; fullText: boolean; license: string };
  const rows: Row[] = [];
  const seen = new Set<string>();
  for (const { src, items } of perSource) {
    for (const item of items) {
      if (known.has(item.link) || seen.has(item.link)) continue;
      seen.add(item.link);
      const s = score(compiled, `${item.title}\n${item.summary}\n${item.categories.join(" ")}`);
      const status = s.never ? "skipped" : s.fit >= PUBLISH_AT && autopublish ? "published" : s.fit >= KEEP_AT ? "caught" : "skipped";
      rows.push({
        slug: uniqueSlug(item.title, item.link, taken),
        title: item.title,
        dek: item.summary,
        source_name: src.name,
        source_url: item.link,
        byline: item.author,
        image_url: item.image,
        category: s.category,
        format: guessFormat(item),
        tags: s.tags,
        status,
        origin: "concha",
        fit: s.fit,
        matched: s.never ? [`Never list: ${s.never}`] : s.matched,
        caught_at: new Date().toISOString(),
        published_at: item.published && !isNaN(+item.published) && status === "published" ? item.published.toISOString() : null,
        fullText: src.full_text,
        license: src.license_note,
      });
    }
  }

  // 4. For what Yasmim will see: the share photo when the feed had none,
  //    the whole text when the source's license allows republishing, and
  //    otherwise a summary of up to three paragraphs written by Claude.
  const visible = rows.filter((r) => r.status !== "skipped").slice(0, 40);
  const writer = canSummarize();
  await pool(visible, 5, async (r) => {
    if (r.image_url && !r.fullText && !writer) return;
    try {
      const html = await fetchText(r.source_url, 8000);
      if (!r.image_url) {
        const img = metaTag(html, "og:image") || metaTag(html, "twitter:image");
        if (img) r.image_url = new URL(img, r.source_url).toString();
      }
      if (r.fullText) {
        const body = readableText(html);
        if (body.length >= 400) {
          r.body = body.slice(0, 100000);
          r.credit = (r.license || `Originally published by ${r.source_name}.`).slice(0, 400);
        }
      } else if (writer && Date.now() - started.getTime() < WRITER_UNTIL_MS) {
        const text = readableText(html);
        const summary = await summarize({ title: String(r.title), source: String(r.source_name), text });
        if (summary) {
          r.body = summary;
          r.credit = `Summary written by Sereya from the original article at ${r.source_name}.`;
        }
      }
    } catch {
      // The item still comes in, with the summary and a link.
    }
  });

  if (rows.length) {
    const clean = rows.map(({ fullText: _f, license: _l, ...r }) => r);
    for (let i = 0; i < clean.length; i += 100) {
      const batch = clean.slice(i, i + 100);
      const { error } = await db.from("posts").insert(batch);
      if (!error) continue;
      // A duplicate somewhere in the batch: insert one by one and drop the duplicates.
      for (const one of batch) {
        const { error: e } = await db.from("posts").insert(one);
        if (e && e.code !== "23505") summary.errors.push({ source: "database", error: e.message });
      }
    }
  }
  summary.kept = rows.filter((r) => r.status === "caught").length;
  summary.published = rows.filter((r) => r.status === "published").length;
  summary.skipped = rows.filter((r) => r.status === "skipped").length;

  // 5. Skipped items only stay two weeks, so the free database never fills up.
  await db
    .from("posts")
    .delete()
    .eq("status", "skipped")
    .lt("caught_at", new Date(Date.now() - SKIPPED_KEEP_DAYS * 86400_000).toISOString());

  if (run) {
    await db
      .from("concha_runs")
      .update({ ...summary, finished_at: new Date().toISOString() })
      .eq("id", run.id);
  }
  return summary;
}
