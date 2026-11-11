import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getViewer } from "@/lib/auth";
import { CATEGORIES, CATEGORY_KEYS, FORMATS, isCategory } from "@/lib/categories";
import { listPosts } from "@/lib/posts";

export const metadata = { title: "Signals" };
export const dynamic = "force-dynamic";

const PAGE = 24;

const SHOW_FORMATS = false;

export default async function SignalsPage({ searchParams }: { searchParams: Promise<{ cat?: string; fmt?: string; tag?: string; page?: string }> }) {
  const sp = await searchParams;
  const { supabase, user } = await getViewer();
  const cat = isCategory(sp.cat) ? sp.cat : undefined;
  const fmt = FORMATS.includes(sp.fmt as (typeof FORMATS)[number]) ? sp.fmt : undefined;
  const tag = sp.tag?.trim().slice(0, 60) || undefined;
  const page = Math.max(1, Number(sp.page) || 1);
  const posts = await listPosts(supabase, {
    signedIn: !!user,
    categories: cat ? [cat] : undefined,
    format: fmt,
    tag,
    limit: PAGE + 1,
    offset: (page - 1) * PAGE,
  });
  const hasMore = posts.length > PAGE;

  const href = (next: { cat?: string; fmt?: string; tag?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (next.cat) q.set("cat", next.cat);
    if (next.fmt) q.set("fmt", next.fmt);
    if (next.tag) q.set("tag", next.tag);
    if (next.page && next.page > 1) q.set("page", String(next.page));
    const s = q.toString();
    return s ? `/signals?${s}` : "/signals";
  };

  return (
    <div className="wrap">
      <div className="post-head" style={{ marginBottom: 24 }}>
        <p className="eyebrow">Signals</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500 }}>What Concha brought back</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          News, essays and reports from the sources Yasmim follows, each with a summary and, when she has written it,
          her take. <Link href="/categories" className="inline-link">What each category means →</Link>
        </p>
      </div>
      <nav aria-label="Filter by category" className="chips" style={{ marginBottom: SHOW_FORMATS ? 10 : 28 }}>
        <Link href={href({ fmt, tag })} className="chip" aria-current={!cat ? "true" : undefined}>All</Link>
        {CATEGORY_KEYS.map((k) => (
          <Link key={k} href={href({ cat: k, fmt, tag })} className="chip" aria-current={cat === k ? "true" : undefined}>
            <span className="dot" style={{ background: CATEGORIES[k].dot }} />
            {CATEGORIES[k].label}
          </Link>
        ))}
      </nav>
      {/* Format filters (News, Essay, Report) are hidden for now, as Yasmim asked. */}
      {SHOW_FORMATS && <nav aria-label="Filter by format" className="chips" style={{ marginBottom: 28 }}>
        <Link href={href({ cat, tag })} className="chip" aria-current={!fmt ? "true" : undefined}>Every format</Link>
        {FORMATS.map((f) => (
          <Link key={f} href={href({ cat, fmt: f, tag })} className="chip" aria-current={fmt === f ? "true" : undefined}>{f}</Link>
        ))}
      </nav>}
      {tag && (
        <div className="tag-filter" role="status">
          <span>Showing signals tagged</span>
          <span className="pill tag-pill">#{tag}</span>
          <Link href={href({ cat, fmt })} className="btn quiet small">Clear ✕</Link>
        </div>
      )}
      {posts.length ? (
        <div className="grid">
          {posts.slice(0, PAGE).map((p) => (
            <PostCard key={p.id} post={p} showCounts={!!user} />
          ))}
        </div>
      ) : (
        <p className="muted">Nothing here yet.</p>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
        {page > 1 && <Link href={href({ cat, fmt, tag, page: page - 1 })} className="btn ghost small">Newer</Link>}
        {hasMore && <Link href={href({ cat, fmt, tag, page: page + 1 })} className="btn ghost small">Older</Link>}
      </div>
    </div>
  );
}
