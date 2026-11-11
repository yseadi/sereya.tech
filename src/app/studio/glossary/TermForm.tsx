"use client";

import Link from "next/link";
import { useActionState, useRef, useTransition } from "react";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import type { GlossaryTerm } from "@/lib/types";
import { deleteTerm } from "../concha-actions";
import { saveTerm, type TermState } from "../glossary-actions";
import { RichEditor } from "@/components/RichEditor";
import { CoverField } from "./CoverField";

type Props = { term?: GlossaryTerm; justSaved?: boolean; onDone?: (r: { slug?: string; deleted?: boolean }) => void; onCancel?: () => void };

export function TermForm({ term, justSaved, onDone, onCancel }: Props) {
  const [state, action, saving] = useActionState<TermState, FormData>(async (prev, fd) => {
    const r = await saveTerm(prev, fd);
    if (r.saved && onDone) onDone({ slug: r.slug });
    return r;
  }, justSaved ? { saved: true } : {});
  const intentRef = useRef<HTMLInputElement>(null);
  const [deleting, startDelete] = useTransition();
  const live = term?.published;

  return (
    <form action={action} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
      {term && <input type="hidden" name="id" value={term.id} />}
      {term && <input type="hidden" name="slug" value={term.slug} />}
      <input type="hidden" name="intent" ref={intentRef} defaultValue="" />
      {onDone && <input type="hidden" name="inline" value="1" />}
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
        <CoverField initial={term?.image_url ?? ""} />
        <div className="field full">
          <label htmlFor="definition">Your text</label>
          <RichEditor
            id="definition"
            name="definition"
            minHeight={320}
            maxLength={40000}
            defaultValue={term?.definition}
            placeholder="What it means, where it comes from, why it matters for Sereya. Leave a blank line between paragraphs. Select words and use the bar for titles, bold, italic, links and quotes."
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
        {term && live && !onDone && <Link href={`/glossary/${term.slug}`} className="btn quiet">Open card</Link>}
        {onCancel && <button type="button" className="btn quiet" onClick={onCancel}>Cancel</button>}
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
                if (r.error) return;
                if (onDone) onDone({ deleted: true });
                else window.location.href = "/studio/glossary";
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
