import { requireOwner } from "@/lib/auth";
import { longDate, timeAgo } from "@/lib/format";
import type { Post } from "@/lib/types";
import { StudioNav } from "../StudioNav";
import { CatchCard, RunNowButton, SkippedRow } from "./CatchClient";

export const metadata = { title: "Today’s catch" };
export const dynamic = "force-dynamic";

export default async function CatchPage() {
  const { supabase } = await requireOwner();
  const [{ data: caught }, { data: skipped }, { data: lastRun }] = await Promise.all([
    supabase.from("posts").select("*").eq("status", "caught").order("fit", { ascending: false }).order("caught_at", { ascending: false }).limit(80),
    supabase.from("posts").select("id, title, source_name, fit, matched, source_url").eq("status", "skipped").order("caught_at", { ascending: false }).limit(40),
    supabase.from("concha_runs").select("*").order("started_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  const items = (caught ?? []) as Post[];

  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="eyebrow">Private · only you see this</p>
          <h1 style={{ fontSize: 44, fontWeight: 500, marginTop: 6 }}>Today’s catch</h1>
          <p className="muted" style={{ marginTop: 6, maxWidth: 640 }}>
            Concha reads your sources every morning at 06am and keeps only what fits your universe. Publish, add your
            take or discard.
          </p>
        </div>
        <RunNowButton />
      </div>
      <StudioNav current="catch" catchCount={items.length} />

      {lastRun ? (
        <div className="card" style={{ padding: "18px 22px", display: "flex", gap: 28, flexWrap: "wrap", marginBottom: 24 }}>
          <span className="muted" style={{ flexBasis: "100%", fontSize: 14 }}>
            Last run {longDate(lastRun.started_at)}, {timeAgo(lastRun.started_at)}
            {lastRun.trigger === "manual" ? " (you asked)" : ""}
          </span>
          {[
            [lastRun.sources_read, "RSS feeds read"],
            [lastRun.items_read, "items read"],
            [lastRun.kept, "kept for you"],
            [lastRun.published, "published by itself"],
            [lastRun.skipped, "skipped"],
          ].map(([n, label]) => (
            <span key={String(label)} style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 28, fontWeight: 500 }}>{n}</strong>
              <span className="muted" style={{ fontSize: 14 }}>{label}</span>
            </span>
          ))}
          {Array.isArray(lastRun.errors) && lastRun.errors.length > 0 && (
            <p className="error" style={{ flexBasis: "100%" }}>
              Didn’t answer: {(lastRun.errors as { source: string; error: string }[]).map((e) => `${e.source} (${e.error})`).join(", ")}
            </p>
          )}
        </div>
      ) : (
        <p className="notice" style={{ marginBottom: 24 }}>Concha hasn’t run yet. Click “Run Concha now” to bring the first catch.</p>
      )}

      <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 14 }}>Kept for you <span className="muted" style={{ fontSize: 16 }}>· highest Fit first</span></h2>
      <div className="thread">
        {items.length === 0 && <p className="muted">Nothing waiting. Everything Concha kept is already published or discarded.</p>}
        {items.map((p) => (
          <CatchCard key={p.id} post={p} />
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 500, margin: "48px 0 6px" }}>Skipped</h2>
      <p className="muted" style={{ marginBottom: 14 }}>
        Read and left out. Bring back anything Concha got wrong. Skipped items disappear after 14 days.
      </p>
      <div className="card" style={{ padding: 8 }}>
        {(skipped ?? []).length === 0 && <p className="muted" style={{ padding: 14 }}>Nothing skipped yet.</p>}
        {(skipped ?? []).map((s, i) => (
          <SkippedRow key={s.id} item={s} first={i === 0} />
        ))}
      </div>
    </div>
  );
}
