"use client";

import Link from "next/link";
import { plainText } from "@/lib/richtext";
import { TermTools } from "./GlossaryAdmin";
import { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import type { CategoryKey, GlossaryTerm } from "@/lib/types";

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function GlossaryGrid({ terms, isOwner }: { terms: GlossaryTerm[]; isOwner?: boolean }) {
  const [q, setQ] = useState("");
  const [hiddenOnly, setHiddenOnly] = useState(false);
  const hiddenCount = terms.filter((t) => !t.published).length;
  const [cat, setCat] = useState<CategoryKey | null>(null);
  const shown = useMemo(() => {
    const f = fold(q.trim());
    return terms.filter(
      (t) =>
        (!cat || t.category === cat) &&
        (!hiddenOnly || !t.published) &&
        (!f || fold(t.term).includes(f) || t.aliases.some((a) => fold(a).includes(f)) || fold(t.definition).includes(f)),
    );
  }, [terms, q, cat, hiddenOnly]);
  const cats = CATEGORY_KEYS.filter((k) => terms.some((t) => t.category === k));

  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
        <input
          className="input"
          type="search"
          placeholder="Search a word…"
          aria-label="Search the glossary"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ maxWidth: 360 }}
        />
        {cats.length > 0 && (
          <div className="chips">
            <button type="button" className="chip" aria-pressed={!cat} onClick={() => setCat(null)}>All</button>
            {cats.map((k) => (
              <button key={k} type="button" className="chip" aria-pressed={cat === k} onClick={() => setCat(cat === k ? null : k)}>
                <span className="dot" style={{ background: CATEGORIES[k].dot }} />
                {CATEGORIES[k].label}
              </button>
            ))}
          </div>
        )}
        {isOwner && hiddenCount > 0 && (
          <button type="button" className="chip" aria-pressed={hiddenOnly} onClick={() => setHiddenOnly((v) => !v)}>
            Hidden ({hiddenCount})
          </button>
        )}
      </div>
      <div className="grid">
        {shown.map((t) => (
          <div key={t.id} className={`term-wrap${t.published ? "" : " hidden-card"}`}>
          <Link href={`/glossary/${t.slug}`} className="card post-card term-card">
            <div className="body">
              {t.category && (
                <span className="pill" style={{ background: CATEGORIES[t.category].bg, color: CATEGORIES[t.category].text, alignSelf: "flex-start" }}>
                  <span className="dot" style={{ background: CATEGORIES[t.category].dot }} />
                  {CATEGORIES[t.category].label}
                </span>
              )}
              <h3><span className="t">{t.term}</span></h3>
              {t.aliases.length > 0 && <p className="muted" style={{ fontSize: 13 }}>Also: {t.aliases.slice(0, 4).join(", ")}</p>}
              <p className="dek">{plainText(t.definition) || "No text yet."}</p>
              {!t.published && <span className="pill hidden-pill">Hidden</span>}
            </div>
          </Link>
          {isOwner && <TermTools term={t} compact />}
          </div>
        ))}
      </div>
      {shown.length === 0 && <p className="muted">No word matches that.</p>}
    </>
  );
}
