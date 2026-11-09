/** Small HTML helpers for feeds and article pages. No HTML ever reaches the page: only plain text. */

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
};

export function decodeEntities(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

export function stripTags(html: string) {
  return decodeEntities(
    html
      .replace(/<(script|style|figure|figcaption|aside|noscript)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t ]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

export function oneLine(s: string, max = 600) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t;
}

/** Content of a <meta property|name=key content=...> tag. */
export function metaTag(html: string, key: string) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["'][^>]*>`,
    "i",
  );
  const m = html.match(re);
  return decodeEntities((m?.[1] ?? m?.[2] ?? "").trim());
}

const CONTAINERS = [
  /class="[^"]*\bpost-content\b[^"]*"/i,
  /class="[^"]*\bentry-content\b[^"]*"/i,
  /class="[^"]*\barticle-body\b[^"]*"/i,
  /class="[^"]*\barticle__body\b[^"]*"/i,
  /itemprop="articleBody"/i,
  /<article\b/i,
];
const ENDS = [/<\/article>/i, /class="[^"]*\b(related|more-stories|newsletter|post-footer)\b/i, /<footer\b/i];

/**
 * The article's paragraphs as plain text, one per entry. Used only for sources
 * whose license allows republishing. Returns [] when it can't find a body.
 */
export function articleParagraphs(html: string): string[] {
  let start = -1;
  for (const re of CONTAINERS) {
    const m = re.exec(html);
    if (m) {
      start = m.index;
      break;
    }
  }
  if (start < 0) return [];
  let chunk = html.slice(start);
  let end = chunk.length;
  for (const re of ENDS) {
    const m = re.exec(chunk.slice(200));
    if (m && m.index + 200 < end) end = m.index + 200;
  }
  chunk = chunk.slice(0, end);
  const raw = [...chunk.matchAll(/<(p|h2|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    tag: m[1].toLowerCase(),
    text: stripTags(m[2]).replace(/\n+/g, " ").trim(),
  }));
  const out: string[] = [];
  for (const { tag, text } of raw) {
    if (!text) continue;
    if (tag === "p" && text.length < 40) continue;
    const key = text.replace(/[“”"']/g, "").slice(0, 60);
    // Pull quotes repeat a sentence from the text: keep the first time only.
    if (out.some((o) => o.replace(/[“”"']/g, "").includes(key))) continue;
    out.push(tag === "p" ? text : `## ${text}`);
  }
  return out.length >= 3 ? out : [];
}

/**
 * The article's text: the article
 * container when we know it, else the JSON-LD articleBody, else every long
 * paragraph of the page outside menus and footers.
 */
export function readableText(html: string): string {
  const known = articleParagraphs(html);
  if (known.filter((p) => !p.startsWith("## ")).join("\n\n").length >= 600) return known.join("\n\n");
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    const body = /"articleBody"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(m[1]);
    if (body) {
      try {
        const text = JSON.parse(`"${body[1]}"`) as string;
        if (text.length > 400) return stripTags(decodeEntities(text));
      } catch {
        // fall through
      }
    }
  }
  // One tag at a time, scripts first: a "<style" inside a script must not eat the article.
  let page = html;
  for (const tag of ["script", "style", "noscript", "nav", "footer", "header", "aside", "form"]) {
    page = page.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, "gi"), " ");
  }
  return [...page.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]).replace(/\s+/g, " ").trim())
    .filter((t) => t.length >= 80)
    .join("\n\n");
}
