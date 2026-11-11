import type { ReactNode } from "react";

/**
 * Yasmim's text formatting, kept as plain text in the database:
 * # Title, ## Subtitle, ### Small title, **bold**, *italic*, [words](https://link),
 * > quote, - list, 1. numbered list, --- divider. A blank line starts a new paragraph.
 * Everything is rendered as React elements, never as raw HTML.
 */

type Block =
  | { kind: "h1" | "h2" | "h3" | "p" | "quote"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "img"; alt: string; src: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "hr" };

const SAFE_SRC = /^(https:\/\/|\/)[^\s"'<>]+$/;
const cells = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

export function parseBlocks(src: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let quote: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;
  let table: string[] = [];

  const flush = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join("\n") });
    if (quote.length) blocks.push({ kind: "quote", text: quote.join("\n") });
    if (list) blocks.push(list);
    if (table.length) {
      const rows = table.map(cells).filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)));
      if (rows.length) blocks.push({ kind: "table", head: rows[0], rows: rows.slice(1) });
    }
    table = [];
    para = [];
    quote = [];
    list = null;
  };

  for (const raw of src.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (!t) {
      flush();
      continue;
    }
    if (t.startsWith("|") && t.endsWith("|") && t.length > 2) {
      if (!table.length) flush();
      table.push(t);
      continue;
    }
    if (table.length) flush();
    const img = t.match(/^!\[([^\]\n]*)\]\(([^)\s]+)\)$/);
    if (img && SAFE_SRC.test(img[2])) {
      flush();
      blocks.push({ kind: "img", alt: img[1], src: img[2] });
      continue;
    }
    const h = t.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      flush();
      blocks.push({ kind: (["h1", "h2", "h3"] as const)[h[1].length - 1], text: h[2] });
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(t)) {
      flush();
      blocks.push({ kind: "hr" });
      continue;
    }
    const q = t.match(/^>\s?(.*)$/);
    if (q) {
      if (para.length || list) {
        const keep = quote;
        flush();
        quote = keep;
      }
      quote.push(q[1]);
      continue;
    }
    const ul = t.match(/^[-*•]\s+(.+)$/);
    const ol = t.match(/^\d+[.)]\s+(.+)$/);
    if (ul || ol) {
      const kind = ul ? "ul" : "ol";
      if (para.length || quote.length || (list && list.kind !== kind)) flush();
      if (!list) list = { kind, items: [] };
      list.items.push((ul ?? ol)![1]);
      continue;
    }
    if (quote.length || list) flush();
    para.push(t);
  }
  flush();
  return blocks;
}

const INLINE = [
  { kind: "link", re: /\[([^\]\n]+)\]\(((?:https?:\/\/|\/|mailto:)[^\s)]+)\)/ },
  { kind: "bold", re: /\*\*([^*\n](?:[^\n]*?[^*\n])?)\*\*/ },
  { kind: "italic", re: /\*([^*\s](?:[^*\n]*?[^*\s])?)\*/ },
  { kind: "italic", re: /(?<![\w])_([^_\s](?:[^_\n]*?[^_\s])?)_(?![\w])/ },
] as const;

export function inline(text: string, key = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let n = 0;
  while (rest) {
    let best: { kind: string; m: RegExpMatchArray } | null = null;
    for (const p of INLINE) {
      const m = rest.match(p.re);
      if (m && m.index !== undefined && (!best || m.index < best.m.index!)) best = { kind: p.kind, m };
    }
    if (!best) {
      out.push(...lines(rest, `${key}-${n}`));
      break;
    }
    const { m, kind } = best;
    if (m.index! > 0) out.push(...lines(rest.slice(0, m.index), `${key}-${n}t`));
    const k = `${key}-${n}`;
    if (kind === "link") {
      const external = /^https?:/.test(m[2]);
      out.push(
        <a key={k} href={m[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inline(m[1], k)}
        </a>,
      );
    } else if (kind === "bold") {
      out.push(<strong key={k}>{inline(m[1], k)}</strong>);
    } else {
      out.push(<em key={k}>{inline(m[1], k)}</em>);
    }
    rest = rest.slice(m.index! + m[0].length);
    n++;
  }
  return out;
}

/** Single line breaks inside a paragraph stay as line breaks. */
function lines(text: string, key: string): ReactNode[] {
  return text.split("\n").flatMap((part, i) => (i === 0 ? [part] : [<br key={`${key}-br${i}`} />, part]));
}

export function RichText({ text, empty }: { text: string; empty?: ReactNode }) {
  const blocks = parseBlocks(text ?? "");
  if (!blocks.length) return <>{empty ?? null}</>;
  return (
    <>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        switch (b.kind) {
          case "h1":
            return <h2 key={k} className="rt-h1">{inline(b.text, k)}</h2>;
          case "h2":
            return <h2 key={k}>{inline(b.text, k)}</h2>;
          case "h3":
            return <h3 key={k}>{inline(b.text, k)}</h3>;
          case "quote":
            return <blockquote key={k}>{inline(b.text, k)}</blockquote>;
          case "ul":
            return <ul key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}</ul>;
          case "ol":
            return <ol key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}</ol>;
          case "hr":
            return <hr key={k} />;
          case "img":
            return (
              <figure key={k} className="rt-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} loading="lazy" />
              </figure>
            );
          case "table":
            return (
              <div key={k} className="rt-table">
                <table>
                  <thead><tr>{b.head.map((c, j) => <th key={j}>{inline(c, `${k}-h${j}`)}</th>)}</tr></thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri}>{r.map((c, j) => <td key={j}>{inline(c, `${k}-${ri}-${j}`)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return <p key={k}>{inline(b.text, k)}</p>;
        }
      })}
    </>
  );
}

/** Plain words for excerpts and cards: the formatting marks taken out. */
export function plainText(text: string): string {
  return (text ?? "")
    .replace(/!\[[^\]\n]*\]\([^)\s]+\)/g, "")
    .replace(/^\s*\|.*\|\s*$/gm, "")
    .replace(/\[([^\]\n]+)\]\([^)\s]+\)/g, "$1")
    .replace(/^\s{0,3}(#{1,3}|>|[-*•]|\d+[.)])\s+/gm, "")
    .replace(/^\s*(-{3,}|\*{3,})\s*$/gm, "")
    .replace(/\*\*|__/g, "")
    .replace(/(?<![\w*])\*(?!\s)|(?<!\s)\*(?![\w*])/g, "")
    .replace(/(?<![\w])_(?!\s)|(?<!\s)_(?![\w])/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}
