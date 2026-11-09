"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { saveTake, setStatus } from "@/app/studio/actions";

/** Yasmim's bar on every post: edit in the Studio, write her take in place, publish or unpublish. */
export function OwnerTools({ id, slug, take, status }: { id: string; slug: string; take: string; status: "draft" | "published" }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(take);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div style={{ marginBottom: 24 }}>
      <div className="owner-bar" role="region" aria-label="Owner tools">
        <span style={{ marginRight: "auto" }}>
          You are the owner{status === "draft" ? " · this post is a draft, only you see it" : ""}
        </span>
        <button type="button" className="btn" onClick={() => setOpen((v) => !v)}>
          {take ? "Edit my take" : "Write my take"}
        </button>
        <Link href={`/studio/${id}`} className="btn">Edit post</Link>
        <button
          type="button"
          className="btn"
          disabled={pending}
          onClick={() => start(async () => void (await setStatus(id, slug, status === "draft" ? "published" : "draft")))}
        >
          {status === "draft" ? "Publish" : "Unpublish"}
        </button>
      </div>
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
