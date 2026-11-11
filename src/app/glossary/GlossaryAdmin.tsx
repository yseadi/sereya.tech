"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { deleteTerm } from "@/app/studio/concha-actions";
import { setTermPublished } from "@/app/studio/glossary-actions";
import { TermForm } from "@/app/studio/glossary/TermForm";
import type { GlossaryTerm } from "@/lib/types";

/** The card editor, opened over the Glossary page. */
export function TermEditorModal({ term, onClose, after }: { term?: GlossaryTerm; onClose: () => void; after?: (r: { slug?: string; deleted?: boolean }) => void }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="modal-back" role="dialog" aria-modal="true" aria-label={term ? `Edit ${term.term}` : "New glossary card"} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 14 }}>{term ? `Edit “${term.term}”` : "New card"}</h2>
        <TermForm
          term={term}
          onCancel={onClose}
          onDone={(r) => {
            onClose();
            if (after) after(r);
            else router.refresh();
          }}
        />
      </div>
    </div>
  );
}

/** Edit, hide or delete one card: the small bar Yasmim sees on each card. */
export function TermTools({ term, compact, afterDeleteHref }: { term: GlossaryTerm; compact?: boolean; afterDeleteHref?: string }) {
  const router = useRouter();
  const afterDelete = afterDeleteHref ? () => router.push(afterDeleteHref) : undefined;
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <>
      <div className={compact ? "term-tools" : "owner-bar"} role="group" aria-label={`Tools for ${term.term}`}>
        {!compact && <span style={{ marginRight: "auto" }}>{term.published ? "You are the owner" : "Hidden: only you see this card"}</span>}
        <button type="button" className={compact ? "tool" : "btn"} onClick={() => setOpen(true)}>Edit</button>
        <button
          type="button"
          className={compact ? "tool" : "btn"}
          disabled={pending}
          onClick={() =>
            start(async () => {
              const r = await setTermPublished(term.id, !term.published);
              if (r.error) setMsg(r.error);
              router.refresh();
            })
          }
        >
          {term.published ? "Hide" : "Show"}
        </button>
        <button
          type="button"
          className={compact ? "tool danger" : "btn"}
          disabled={pending}
          onClick={() => {
            if (!window.confirm(`Delete “${term.term}” from the glossary? Concha stops listening for it too.`)) return;
            start(async () => {
              const r = await deleteTerm(term.id);
              if (r.error) return setMsg(r.error);
              if (afterDelete) afterDelete();
              else router.refresh();
            });
          }}
        >
          Delete
        </button>
      </div>
      {msg && <p className="error" role="alert">{msg}</p>}
      {open && (
        <TermEditorModal
          term={term}
          onClose={() => setOpen(false)}
          after={(r) => {
            if (r.deleted) return afterDelete ? afterDelete() : router.refresh();
            if (!compact && r.slug && r.slug !== term.slug) router.replace(`/glossary/${r.slug}`);
            else router.refresh();
          }}
        />
      )}
    </>
  );
}

export function NewTermButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <button type="button" className="btn" onClick={() => setOpen(true)}>+ New card</button>
      {open && <TermEditorModal onClose={() => setOpen(false)} after={(r) => (r.slug ? router.push(`/glossary/${r.slug}`) : router.refresh())} />}
    </>
  );
}
