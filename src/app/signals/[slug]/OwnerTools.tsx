"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { saveTake, setStatus } from "@/app/studio/actions";
import { writeSummary } from "@/app/studio/concha-actions";

/** Yasmim's bar on every post: edit in the Studio, write her take in place, publish or unpublish. */
export function OwnerTools({ id, slug, take, status, hasBody }: { id: string; slug: string; take: string; status: "draft" | "published" | "caught" | "skipped"; hasBody?: boolean }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(take);
  const [msg, setMsg] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div style={{ marginBottom: 24 }}>
      <div className="owner-bar" role="region" aria-label="Owner tools">
        <span style={{ marginRight: "auto" }}>
          You are the owner{status !== "published" ? " · not published yet, only you see it" : ""}
        </span>
        <button type="button" className="btn" onClick={() => setOpen((v) => !v)}>
          {take ? "Edit my take" : "Write my take"}
        </button>
        <Link href={`/studio/${id}`} className="btn">Edit post</Link>
        {!hasBody && (
          <button
            type="button"
            className="btn"
            disabled={pending}
            onClick={() => start(async () => { setNote("Reading the source…"); const r = await writeSummary(id); setNote(r.error ?? r.message ?? null); })}
          >
            Write summary
          </button>
        )}
        <button
          type="button"
          className="btn"
          disabled={pending}
          onClick={() => start(async () => void (await setStatus(id, slug, status === "published" ? "draft" : "published")))}
        >
          {status === "published" ? "Unpublish" : "Publish"}
        </button>
      </div>
      {note && <p className="notice" role="status" style={{ marginTop: 10 }}>{note}</p>}
      {open && (
        <form
          className="take"
          style={{ marginTop: 12 }}
          onSubmit={(e) => {
            e.preventDefault();
            setMsg(null);
            start(async () => {
              const res = await saveTake(id, slug, text);
              if (res.error) return setMsg(res.error);
              setOpen(false);
            });
          }}
        >
          <label htmlFor="take-edit" className="label">Your take</label>
          <textarea id="take-edit" className="textarea" style={{ marginTop: 8, minHeight: 160 }} value={text} onChange={(e) => setText(e.target.value)} />
          {msg && <p className="error" style={{ marginTop: 10 }}>{msg}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button type="submit" className="btn small" disabled={pending}>{pending ? "Saving…" : "Save my take"}</button>
            <button type="button" className="btn quiet small" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
