import { XMLParser } from "fast-xml-parser";
import { oneLine, stripTags } from "./text";

export type FeedItem = {
  title: string;
  link: string;
  summary: string;
  author: string;
  image: string;
  published: Date | null;
  categories: string[];
};

const UA = "Mozilla/5.0 (compatible; SereyaConcha/1.0; +https://sereya.tech)";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  textNodeName: "#text",
  cdataPropName: false,
  processEntities: false,
  htmlEntities: false,
});

const arr = <T,>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const txt = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object" && "#text" in (v as Record<string, unknown>)) return String((v as Record<string, unknown>)["#text"]);
  return "";
};

/** Drop tracking parameters so the same article always has the same address. */
export function cleanLink(link: string) {
  try {
    const u = new URL(link.trim());
    [...u.searchParams.keys()].forEach((k) => {
      if (/^(utm_|fbclid|gclid|mc_|ref$|source$)/i.test(k)) u.searchParams.delete(k);
    });
    u.hash = "";
    return u.toString();
  } catch {
    return link.trim();
  }
}

function firstImage(item: Record<string, unknown>): string {
  const media = [...arr(item["media:content"] as unknown), ...arr(item["media:thumbnail"] as unknown)] as Record<string, string>[];
  const m = media.find((x) => x?.["@url"] && (!x["@medium"] || x["@medium"] === "image"));
  if (m) return m["@url"];
  const enc = arr(item.enclosure as unknown) as Record<string, string>[];
  const e = enc.find((x) => x?.["@url"] && /^image\//.test(x["@type"] ?? "image/"));
  if (e) return e["@url"];
  const html = txt(item["content:encoded"]) || txt(item.description) || txt(item.content);
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? "";
}

export function parseFeed(xml: string): FeedItem[] {
  const doc = parser.parse(xml);
  const rssItems = arr(doc?.rss?.channel?.item ?? doc?.["rdf:RDF"]?.item) as Record<string, unknown>[];
  if (rssItems.length) {
    return rssItems.map((it) => ({
      title: oneLine(stripTags(txt(it.title)), 240),
      link: cleanLink(txt(it.link) || txt(it.guid)),
      summary: oneLine(stripTags(txt(it.description) || txt(it["content:encoded"])), 700),
      author: oneLine(stripTags(txt(it["dc:creator"]) || txt(it.author)), 120),
      image: firstImage(it),
      published: txt(it.pubDate) || txt(it["dc:date"]) ? new Date(txt(it.pubDate) || txt(it["dc:date"])) : null,
      categories: arr(it.category as unknown).map((c) => stripTags(txt(c))).filter(Boolean),
    }));
  }
  const entries = arr(doc?.feed?.entry) as Record<string, unknown>[];
  return entries.map((it) => {
    const links = arr(it.link as unknown) as Record<string, string>[];
    const link = links.find((l) => !l["@rel"] || l["@rel"] === "alternate")?.["@href"] ?? "";
    const author = arr(it.author as unknown)
      .map((a) => txt((a as Record<string, unknown>).name))
      .join(", ");
    return {
      title: oneLine(stripTags(txt(it.title)), 240),
      link: cleanLink(link),
      summary: oneLine(stripTags(txt(it.summary) || txt(it.content)), 700),
      author,
      image: firstImage(it),
      published: txt(it.published) || txt(it.updated) ? new Date(txt(it.published) || txt(it.updated)) : null,
      categories: arr(it.category as unknown).map((c) => (c as Record<string, string>)["@term"] ?? "").filter(Boolean),
    };
  });
}

export async function fetchText(url: string, timeoutMs = 12000) {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "application/rss+xml, application/atom+xml, text/xml, text/html;q=0.9, */*;q=0.8" },
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "follow",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.text()).slice(0, 5_000_000);
}

export async function readFeed(url: string) {
  return parseFeed(await fetchText(url)).filter((i) => i.title && /^https?:\/\//.test(i.link));
}
