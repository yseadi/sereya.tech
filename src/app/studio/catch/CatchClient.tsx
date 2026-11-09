"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { CategoryPill } from "@/components/CategoryPill";
import type { Post } from "@/lib/types";
import { publishCaught, runNow, setCatchStatus, writeSummary } from "../concha-actions";

export function RunNowButton() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", maxWidth: 420 }}>
      <button
        type="button"
        className="btn"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setMsg(null);
            const r = await runNow();
            setMsg(r.error ? { ok: false, text: r.error } : { ok: true, text: r.message ?? "Done." });
          })
        }
      >
        {pending ? "Concha is listening…" : "Run Concha now"}
      </button>
      {msg && <p className={msg.ok ? "notice" : "error"} role="status">{msg.text}</p>}
    </div>
  );
}

function FitBadge({ fit }: { fit: number | null }) {
  const v = fit ?? 0;
  const style = v >= 85 ? { background: "#e2daf2", color: "#4a3a8c" } : v >= 40 ? { background: "#e8f5f1", color: "#2f7563" } : { background: "#f5f6f6", color: "#5a6567" };
  return <span className="pill" style={{ ...style, fontWeight: 600 }}>Fit {v}</span>;
}

export function CatchCard({ post }: { post: Post }) {
  const [taking, setTaking] = useState(false);
  const [take, setTake] = useState(post.take);
  const [done, setDone] = useState<null | "published" | "discarded">(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (done) {
    return (
      <div className="card" style={{ padding: "14px 20px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span>{done === "published" ? "Published:" : "Discarded:"} <strong>{post.title}</strong></span>
        {done === "published" ? (
          <Link href={`/signals/${post.slug}`} className="btn quiet small">Open</Link>
        ) : (
          <button type="button" className="btn quiet small" onClick={() => start(async () => { await setCatchStatus(post.id, "caught"); setDone(null); })}>Undo</button>
        )}
      </div>
    );
  }

  const act = (fn: () => Promise<{ error?: string }>, next: "published" | "discarded") =>
    start(async () => {
      setError(null);
      const r = await fn();
      if (r.error) return setError(r.error);
      setDone(next);
    });

  return (
    <article className="card" style={{ display: "grid", gridTemplateColumns: "minmax(0, 220px) 1fr", overflow: "hidden" }}>
      <div style={{ background: "linear-gradient(135deg, #fbedef, #f1ecfb 50%, #eaf2fc)", minHeight: 160 }}>
        {post.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        ) : null}
      </div>
      <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <FitBadge fit={post.fit} />
          <CategoryPill category={post.category} />
          <span className="muted" style={{ fontSize: 13 }}>{post.format} · {post.source_name}{post.body ? (post.credit.startsWith("Summary") ? " · summary written" : " · full text") : ""}</span>
        </div>
        <h3 style={{ fontSize: 20 }}>
          <a href={post.source_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{post.title} ↗</a>
        </h3>
        {post.dek && <p className="muted" style={{ fontSize: 15 }}>{post.dek}</p>}
        {post.matched.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span className="eyebrow" style={{ fontSize: 11 }}>Why Concha picked it</span>
            {post.matched.map((m) => (
              <span key={m} className="pill" style={{ background: "#f5f3fa", color: "#5b4a9e" }}>{m}</span>
            ))}
          </div>
        )}
        {taking && (
          <div>
            <label htmlFor={`take-${post.id}`} className="label">Your take</label>
            <textarea id={`take-${post.id}`} className="textarea" style={{ marginTop: 6, background: "#f5f3fa" }} value={take} onChange={(e) => setTake(e.target.value)} />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {taking ? (
            <button type="button" className="btn small" disabled={pending || !take.trim()} onClick={() => act(() => publishCaught(post.id, take), "published")}>Publish with my take</button>
          ) : (
            <>
              <button type="button" className="btn small" disabled={pending} onClick={() => act(() => publishCaught(post.id, ""), "published")}>Publish</button>
              <button type="button" className="btn ghost small" onClick={() => setTaking(true)}>Add my take</button>
            </>
          )}
          <Link href={`/studio/${post.id}`} className="btn quiet small">Edit</Link>
          {!post.body && (
            <button
              type="button"
              className="btn quiet small"
              disabled={pending}
              onClick={() => start(async () => { setError(null); const r = await writeSummary(post.id); if (r.error) setError(r.error); })}
            >
              {pending ? "Writing…" : "Write summary"}
            </button>
          )}
          <button type="button" className="btn quiet small" disabled={pending} onClick={() => act(() => setCatchStatus(post.id, "skipped"), "discarded")}>Discard</button>
        </div>
      </div>
    </article>
  );
}

export function SkippedRow({ item, first }: { item: { id: string; title: string; source_name: string; fit: number | null; matched: string[]; source_url: string }; first: boolean }) {
  const [back, setBack] = useState(false);
  const [pending, start] = useTransition();
  const why = item.matched.find((m) => m.startsWith("Never list")) ?? `Fit ${item.fit ?? 0}`;
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", borderTop: first ? "none" : "1px solid #eceeee", flexWrap: "wrap" }}>
      <span style={{ flex: 1, minWidth: 220 }}>
        <a href={item.source_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{item.title}</a>
        <span className="muted" style={{ fontSize: 13, display: "block" }}>{item.source_name} · {why}</span>
      </span>
      {back ? (
        <span className="muted" style={{ fontSize: 14 }}>Back in your catch</span>
      ) : (
        <button type="button" className="btn ghost small" disabled={pending} onClick={() => start(async () => { const r = await setCatchStatus(item.id, "caught"); if (!r.error) setBack(true); })}>Bring it back</button>
      )}
    </div>
  );
}
