"use client";

import Link from "next/link";
import { useActionState, useRef, useTransition } from "react";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import type { GlossaryTerm } from "@/lib/types";
import { deleteTerm } from "../concha-actions";
import { saveTerm, type TermState } from "../glossary-actions";

export function TermForm({ term, justSaved }: { term?: GlossaryTerm; justSaved?: boolean }) {
  const [state, action, saving] = useActionState<TermState, FormData>(saveTerm, justSaved ? { saved: true } : {});
  const intentRef = useRef<HTMLInputElement>(null);
  const [deleting, startDelete] = useTransition();
  const live = term?.published;

  return (
    <form action={action} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
      {term && <input type="hidden" name="id" value={term.id} />}
      {term && <input type="hidden" name="slug" value={term.slug} />}
      <input type="hidden" name="intent" ref={intentRef} defaultValue="" />
      {state.error && <p className="error" role="alert">{state.error}</p>}
      {state.saved && !saving && <p className="notice" role="status">Saved.</p>}

      <div className="form-grid">
        <div className="field full">
          <label htmlFor="term">Word or concept</label>
          <input id="term" name="term" className="input" defaultValue={term?.term} required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="select" defaultValue={term?.category ?? ""}>
            <option value="">None</option>
            {CATEGORY_KEYS.map((k) => (
              <option key={k} value={k}>{CATEGORIES[k].label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="aliases">Other ways to say it</label>
          <input id="aliases" name="aliases" className="input" defaultValue={term?.aliases.join(", ")} placeholder="English versions, synonyms, comma separated" />
          <span className="hint">Concha also listens for these in the news.</span>
        </div>
        <div className="field full">
          <label htmlFor="definition">Your text</label>
          <textarea
            id="definition"
            name="definition"
            className="textarea"
            style={{ minHeight: 320, background: "#f5f3fa" }}
            defaultValue={term?.definition}
            placeholder="What it means, where it comes from, why it matters for Sereya. Leave a blank line between paragraphs. Start a line with ## for a subtitle."
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {live ? (
          <>
            <button className="btn" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "publish")}>Save</button>
            <button className="btn ghost" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "draft")}>Unpublish</button>
          </>
        ) : (
          <>
            <button className="btn" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "publish")}>Publish card</button>
            <button className="btn ghost" disabled={saving} onClick={() => intentRef.current && (intentRef.current.value = "draft")}>Save draft</button>
          </>
        )}
        {term && live && <Link href={`/glossary/${term.slug}`} className="btn quiet">Open card</Link>}
        {term && (
          <button
            type="button"
            className="btn quiet"
            style={{ marginLeft: "auto" }}
            disabled={deleting}
            onClick={() => {
              if (!window.confirm(`Delete “${term.term}” from the glossary? Concha stops listening for it too.`)) return;
              startDelete(async () => {
                const r = await deleteTerm(term.id);
                if (!r.error) window.location.href = "/studio/glossary";
              });
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
