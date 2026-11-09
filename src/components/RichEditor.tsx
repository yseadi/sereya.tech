"use client";

import { useRef, useState } from "react";
import { RichText } from "@/lib/richtext";

type Props = {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minHeight?: number;
  maxLength?: number;
};

/**
 * A text box with a formatting bar. The text stays plain (marks like **bold**),
 * so it is safe to store and easy to fix by hand; Preview shows how it reads.
 */
export function RichEditor({ id, name, defaultValue = "", placeholder, minHeight = 260, maxLength }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function wrap(before: string, after: string, fallback: string) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const picked = value.slice(s, e) || fallback;
    el.setRangeText(`${before}${picked}${after}`, s, e, "end");
    el.setSelectionRange(s + before.length, s + before.length + picked.length);
    el.focus();
  }

  function link() {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const words = value.slice(s, e) || "words";
    const text = `[${words}](https://)`;
    el.setRangeText(text, s, e, "end");
    // Leave the cursor where the link goes, ready to paste.
    const at = s + words.length + 3 + "https://".length;
    el.setSelectionRange(s + words.length + 3, at);
    el.focus();
  }

  function prefix(mark: string) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const start = value.lastIndexOf("\n", s - 1) + 1;
    const endNl = value.indexOf("\n", e);
    const end = endNl === -1 ? value.length : endNl;
    const lines = value.slice(start, end).split("\n");
    const strip = (l: string) => l.replace(/^(#{1,3}\s+|>\s?|[-*•]\s+|\d+[.)]\s+)/, "");
    const has = lines.every((l) => (mark === "1. " ? /^\d+[.)]\s/.test(l) : l.startsWith(mark)));
    const next = lines
      .map((l, i) => (has ? strip(l) : `${mark === "1. " ? `${i + 1}. ` : mark}${strip(l)}`))
      .join("\n");
    el.setRangeText(next, start, end, "select");
    el.focus();
  }

  const tools: { label: string; title: string; run: () => void; style?: React.CSSProperties }[] = [
    { label: "H1", title: "Title", run: () => prefix("# "), style: { fontWeight: 700 } },
    { label: "H2", title: "Subtitle", run: () => prefix("## "), style: { fontWeight: 700 } },
    { label: "H3", title: "Small title", run: () => prefix("### "), style: { fontWeight: 600 } },
    { label: "B", title: "Bold", run: () => wrap("**", "**", "bold"), style: { fontWeight: 800 } },
    { label: "I", title: "Italic", run: () => wrap("*", "*", "italic"), style: { fontStyle: "italic", fontFamily: "Georgia, serif" } },
    { label: "Link", title: "Link: select words, click, paste the address", run: link },
    { label: "“ Quote", title: "Quote", run: () => prefix("> ") },
    { label: "• List", title: "List", run: () => prefix("- ") },
    { label: "1. List", title: "Numbered list", run: () => prefix("1. ") },
    {
      label: "―",
      title: "Divider",
      run: () => {
        const el = ref.current;
        if (!el) return;
        el.setRangeText("\n\n---\n\n", el.selectionStart, el.selectionEnd, "end");
        el.focus();
      },
    },
  ];

  return (
    <div className="rich-editor">
      <div className="rich-bar" role="toolbar" aria-label="Text formatting">
        {tools.map((t) => (
          <button
            key={t.title}
            type="button"
            className="rich-btn"
            title={t.title}
            aria-label={t.title}
            style={t.style}
            disabled={preview !== null}
            onMouseDown={(e) => e.preventDefault()}
            onClick={t.run}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          className={`rich-btn rich-preview${preview !== null ? " on" : ""}`}
          onClick={() => setPreview((p) => (p === null ? ref.current?.value ?? "" : null))}
        >
          {preview !== null ? "Back to writing" : "Preview"}
        </button>
      </div>
      <textarea
        ref={ref}
        id={id}
        name={name}
        className="textarea"
        style={{ minHeight, display: preview !== null ? "none" : undefined, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (!(e.metaKey || e.ctrlKey)) return;
          const k = e.key.toLowerCase();
          if (k === "b") (e.preventDefault(), wrap("**", "**", "bold"));
          else if (k === "i") (e.preventDefault(), wrap("*", "*", "italic"));
          else if (k === "k") (e.preventDefault(), link());
        }}
      />
      {preview !== null && (
        <div className="rich-view post-body" style={{ minHeight }}>
          <RichText text={preview} empty={<p className="muted">Nothing written yet.</p>} />
        </div>
      )}
    </div>
  );
}
