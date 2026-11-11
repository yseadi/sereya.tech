"use client";

import { useState, useTransition } from "react";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { timeAgo } from "@/lib/format";
import type { CategoryKey } from "@/lib/types";
import { addSource, addTerm, deleteSource, deleteTerm, setAutopublish, updateSource } from "../concha-actions";

type Source = {
  id: string;
  name: string;
  feed_url: string;
  active: boolean;
  full_text: boolean;
  last_items: number | null;
  last_error: string | null;
  last_read_at: string | null;
};

export function AutopublishToggle({ on }: { on: boolean }) {
  const [value, setValue] = useState(on);
  const [pending, start] = useTransition();
  return (
    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 10, cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.checked;
          setValue(next);
          start(async () => {
            const r = await setAutopublish(next);
            if (r.error) setValue(!next);
          });
        }}
        style={{ marginTop: 4 }}
      />
      <span>
        <strong>Let Concha publish by itself when the Fit is 85 or more</strong>
        <span className="muted" style={{ display: "block", fontSize: 14 }}>
          Off: everything waits in Today’s catch for you. On: the very best go straight to Signals, without your take
          (you can add it later).
        </span>
      </span>
    </label>
  );
}

export function SourceRow({ source }: { source: Source }) {
  const [s, setS] = useState(source);
  const [gone, setGone] = useState(false);
  const [pending, start] = useTransition();
  if (gone) return null;
  const patch = (p: { active?: boolean; full_text?: boolean }) => {
    const prev = s;
    setS({ ...s, ...p });
    start(async () => {
      const r = await updateSource(s.id, p);
      if (r.error) setS(prev);
    });
  };
  return (
    <tr>
      <td style={{ minWidth: 220 }}>
        <strong>{s.name}</strong>
        <div className="muted" style={{ fontSize: 12, wordBreak: "break-all" }}>{s.feed_url}</div>
      </td>
      <td><input type="checkbox" aria-label={`Listen to ${s.name}`} checked={s.active} disabled={pending} onChange={(e) => patch({ active: e.target.checked })} /></td>
      <td><input type="checkbox" aria-label={`Full text from ${s.name}`} checked={s.full_text} disabled={pending} onChange={(e) => patch({ full_text: e.target.checked })} /></td>
      <td className="muted" style={{ fontSize: 13, whiteSpace: "nowrap" }}>
        {s.last_error ? <span className="error" style={{ fontSize: 13 }}>Didn’t answer</span> : s.last_read_at ? `${timeAgo(s.last_read_at)} · ${s.last_items ?? 0} items` : "Not yet"}
      </td>
      <td>
        <button
          type="button"
          className="btn quiet small"
          disabled={pending}
          onClick={() => {
            if (!window.confirm(`Stop listening to ${s.name} for good?`)) return;
            start(async () => {
              const r = await deleteSource(s.id);
              if (!r.error) setGone(true);
            });
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export function AddSourceForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [full, setFull] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="card"
      style={{ padding: "16px 20px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        start(async () => {
          const r = await addSource(name, url, full);
          if (r.error) return setError(r.error);
          setName("");
          setUrl("");
          setFull(false);
        });
      }}
    >
      <div style={{ flex: "1 1 160px" }}>
        <label className="label" htmlFor="src-name">Name</label>
        <input id="src-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nexo" />
      </div>
      <div style={{ flex: "3 1 280px" }}>
        <label className="label" htmlFor="src-url">RSS feed address</label>
        <input id="src-url" className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…/feed" />
      </div>
      <label style={{ display: "flex", gap: 6, alignItems: "center", paddingBottom: 12 }}>
        <input type="checkbox" checked={full} onChange={(e) => setFull(e.target.checked)} /> Full text allowed
      </label>
      <button className="btn" disabled={pending}>Add source</button>
      {error && <p className="error" style={{ flexBasis: "100%" }}>{error}</p>}
    </form>
  );
}

export function TermAdder({ kind }: { kind: "glossary" | "never" | "listen" }) {
  const [term, setTerm] = useState("");
  const [aliases, setAliases] = useState("");
  const [category, setCategory] = useState<CategoryKey | "">("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        start(async () => {
          const r = await addTerm(kind, term, aliases, category || undefined);
          if (r.error) return setError(r.error);
          setTerm("");
          setAliases("");
        });
      }}
    >
      <div style={{ flex: "1 1 200px" }}>
        <label className="label" htmlFor={`term-${kind}`}>{kind === "glossary" ? "Term" : kind === "listen" ? "Word or subject" : "Word to avoid"}</label>
        <input id={`term-${kind}`} className="input" value={term} onChange={(e) => setTerm(e.target.value)} />
      </div>
      <div style={{ flex: "2 1 260px" }}>
        <label className="label" htmlFor={`alias-${kind}`}>Other ways to say it <span className="muted">(comma separated, optional)</span></label>
        <input id={`alias-${kind}`} className="input" value={aliases} onChange={(e) => setAliases(e.target.value)} placeholder={kind === "never" ? "" : kind === "listen" ? "e.g. biomimetic, bio-inspired" : "e.g. solarpunk, solar punk"} />
      </div>
      {kind === "listen" && (
        <div style={{ flex: "1 1 200px" }}>
          <label className="label" htmlFor="listen-cat">Category</label>
          <select id="listen-cat" className="input" value={category} onChange={(e) => setCategory(e.target.value as CategoryKey)} required>
            <option value="">Choose…</option>
            {CATEGORY_KEYS.map((k) => (
              <option key={k} value={k}>{CATEGORIES[k].label}</option>
            ))}
          </select>
        </div>
      )}
      <button className="btn ghost" disabled={pending}>Add</button>
      {error && <p className="error" style={{ flexBasis: "100%" }}>{error}</p>}
    </form>
  );
}

export function TermChip({
  term,
  never,
  plain,
}: {
  term: { id: string; term: string; aliases: string[]; category?: CategoryKey | null };
  never?: boolean;
  plain?: boolean;
}) {
  const [gone, setGone] = useState(false);
  const [pending, start] = useTransition();
  if (gone) return null;
  return (
    <span
      className="pill"
      title={term.aliases.length ? `Also: ${term.aliases.join(", ")}` : undefined}
      style={{
        background: never ? "#f5f6f6" : plain && term.category ? CATEGORIES[term.category].bg : "#f5f3fa",
        color: never ? "#3c4648" : plain && term.category ? CATEGORIES[term.category].text : "#4a3a8c", display: "inline-flex", gap: 6, alignItems: "center", padding: "6px 6px 6px 12px",
      }}
    >
      {never || plain ? term.term : <a href={`/studio/glossary/${term.id}`} style={{ color: "inherit", textDecoration: "none" }}>{term.term}</a>}
      {term.aliases.length > 0 && <span style={{ opacity: 0.6, fontSize: 12 }}>+{term.aliases.length}</span>}
      <button
        type="button"
        aria-label={`Remove ${term.term}`}
        disabled={pending}
        onClick={() => start(async () => { const r = await deleteTerm(term.id); if (!r.error) setGone(true); })}
        style={{ border: 0, background: "rgba(0,0,0,.06)", borderRadius: 999, width: 22, height: 22, cursor: "pointer", color: "inherit" }}
      >
        ×
      </button>
    </span>
  );
}

/** One category's words: the ones that place an item in it. Type a word and press Enter to add it. */
export function CategoryWords({ category, words }: { category: CategoryKey; words: { id: string; term: string; aliases: string[]; category: CategoryKey | null }[] }) {
  const [word, setWord] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const c = CATEGORIES[category];
  return (
    <div className="card cat-words">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: 99, background: c.dot }} />
        <strong>{c.label}</strong>
        <span className="muted" style={{ fontSize: 14 }}>· {words.length} words</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {words.map((w) => (
          <TermChip key={w.id} term={w} plain />
        ))}
      </div>
      <form
        style={{ display: "flex", gap: 8 }}
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          start(async () => {
            const r = await addTerm("category", word, "", category);
            if (r.error) return setError(r.error);
            setWord("");
          });
        }}
      >
        <input className="input" value={word} onChange={(e) => setWord(e.target.value)} placeholder="Add a word…" aria-label={`Add a word to ${c.label}`} style={{ height: 38, fontSize: 14 }} />
        <button className="btn small ghost" disabled={pending || !word.trim()}>Add</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
