"use client";

import Link from "next/link";
import { useActionState, useRef, useState, useTransition } from "react";
import { CATEGORIES, CATEGORY_KEYS, FORMATS } from "@/lib/categories";
import type { Post } from "@/lib/types";
import { deletePost, savePost, type StudioState } from "./actions";
import { fetchLinkPreview } from "./preview";

export function PostForm({ post, justSaved }: { post?: Post; justSaved?: boolean }) {
  const [state, action, saving] = useActionState<StudioState, FormData>(savePost, justSaved ? { saved: true } : {});
  const formRef = useRef<HTMLFormElement>(null);
  // React form actions leave the clicked button out of FormData, so the button writes its intent here.
  const intentRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(post?.image_url ?? "");
  const [fetching, startFetch] = useTransition();
  const [fetchMsg, setFetchMsg] = useState<string | null>(null);
  const [deleting, startDelete] = useTransition();

  function fill() {
    const f = formRef.current;
    if (!f) return;
    const url = (f.elements.namedItem("source_url") as HTMLInputElement).value.trim();
    if (!url) return setFetchMsg("Paste the source link first.");
    setFetchMsg(null);
    startFetch(async () => {
      const p = await fetchLinkPreview(url);
      if (p.error) return setFetchMsg(p.error);
      const set = (name: string, value?: string) => {
        const el = f.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
        if (el && value && !el.value.trim()) el.value = value;
      };
      set("title", p.title);
      set("dek", p.dek);
      set("source_name", p.source_name);
      set("byline", p.byline);
      if (p.image_url && !image) setImage(p.image_url);
      setFetchMsg("Filled the empty fields from the source. Check them before publishing.");
    });
  }

  const published = post?.status === "published";

  return (
    <form ref={formRef} action={action} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="status" value={post?.status ?? "draft"} />
      <input type="hidden" name="intent" ref={intentRef} defaultValue="" />
      {state.error && <p className="error" role="alert">{state.error}</p>}
      {state.saved && !saving && <p className="notice" role="status">Saved.</p>}

      <div className="form-grid">
        <div className="field full">
          <label htmlFor="source_url">Source link</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input id="source_url" name="source_url" type="url" className="input" style={{ flex: 1, minWidth: 220 }} defaultValue={post?.source_url} placeholder="https://restofworld.org/…" />
            <button type="button" className="btn ghost" onClick={fill} disabled={fetching}>
              {fetching ? "Reading…" : "Fill from link"}
            </button>
          </div>
          {fetchMsg && <span className="hint" role="status">{fetchMsg}</span>}
        </div>

        <div className="field full">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" className="input" defaultValue={post?.title} required />
        </div>

        <div className="field full">
          <label htmlFor="dek">Summary</label>
          <textarea id="dek" name="dek" className="textarea" defaultValue={post?.dek} placeholder="What the source says, in two or three lines." />
        </div>

        <div className="field full">
          <label htmlFor="take">Your take</label>
          <textarea id="take" name="take" className="textarea" style={{ minHeight: 180, background: "#f5f3fa" }} defaultValue={post?.take} placeholder="Why this matters, what it signals, where it could go." />
          <span className="hint">Shows in its own pearly card, signed by you.</span>
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="select" defaultValue={post?.category ?? ""} required>
            <option value="" disabled>Pick one</option>
            {CATEGORY_KEYS.map((k) => (
              <option key={k} value={k}>{CATEGORIES[k].label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="format">Format</label>
          <select id="format" name="format" className="select" defaultValue={post?.format ?? "News"}>
            {FORMATS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="source_name">Source name</label>
          <input id="source_name" name="source_name" className="input" defaultValue={post?.source_name} placeholder="Rest of World" />
        </div>
        <div className="field">
          <label htmlFor="byline">Author at the source</label>
          <input id="byline" name="byline" className="input" defaultValue={post?.byline} />
        </div>

        <div className="field full">
          <label htmlFor="image_url">Photo link</label>
          <input id="image_url" name="image_url" type="url" className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…jpg" />
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Photo preview" style={{ marginTop: 8, borderRadius: 16, maxHeight: 220, objectFit: "cover" }} />
          )}
        </div>

        <div className="field">
          <label htmlFor="tags">Tags</label>
          <input id="tags" name="tags" className="input" defaultValue={post?.tags.join(", ")} placeholder="AI, GlobalSouth, Language" />
          <span className="hint">Separate with commas.</span>
        </div>
        <div className="field">
          <label htmlFor="slug">Link</label>
          <input id="slug" name="slug" className="input" defaultValue={post?.slug} placeholder="made from the title" />
          <span className="hint">sereya.tech/signals/…</span>
        </div>

        <label className="check full">
          <input type="checkbox" name="is_pearl" defaultChecked={post?.is_pearl} />
          <span>Pearl of the day. The newest pearl opens Home for everyone.</span>
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button type="submit" value="publish" className="btn" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "publish")}>
          {published ? "Save" : "Publish"}
        </button>
        <button type="submit" value="draft" className="btn ghost" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "draft")}>
          {published ? "Move back to drafts" : "Save draft"}
        </button>
        {post && published && (
          <Link href={`/signals/${post.slug}`} className="btn quiet">See it live</Link>
        )}
        {post && (
          <button
            type="button"
            className="btn quiet"
            style={{ marginLeft: "auto" }}
            disabled={deleting}
            onClick={() => {
              if (!window.confirm("Delete this post with its likes and comments? This can’t be undone.")) return;
              startDelete(async () => {
                await deletePost(post.id);
              });
            }}
          >
            {deleting ? "Deleting…" : "Delete post"}
          </button>
        )}
      </div>
    </form>
  );
}
