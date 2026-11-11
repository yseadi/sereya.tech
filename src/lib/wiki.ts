/**
 * Finds a cover photo for a glossary card on Wikipedia (images there are free to reuse with credit,
 * so the card shows "Photo: Wikimedia Commons"). Order of tries:
 *  1. the Wikipedia page the card already links to, if any;
 *  2. a search on Portuguese Wikipedia, then English, for the word and its other names.
 */

const UA = "SereyaTech/1.0 (https://sereya.tech)";
const SIZE = 1200;

type Fetcher = typeof fetch;

async function getJson(url: string, f: Fetcher): Promise<unknown> {
  const res = await f(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) return null;
  return res.json();
}

/** Logos, flags, icons and maps make poor covers. */
function goodImage(src: string | undefined) {
  if (!src || !/^https:\/\/upload\.wikimedia\.org\//.test(src)) return null;
  if (/(flag|bandeira|logo|icon|ícone|coat_of_arms|brasão|emblem|seal|signature|assinatura|locator|location_map|mapa_de_localiza|blank_map)/i.test(decodeURIComponent(src))) return null;
  return src;
}

/** Wikipedia page links already in the card's text, e.g. https://pt.wikipedia.org/wiki/Acordos_de_Oslo */
export function wikiLinks(text: string): { lang: string; title: string }[] {
  const out: { lang: string; title: string }[] = [];
  for (const m of text.matchAll(/https:\/\/(\w{2,3})(?:\.m)?\.wikipedia\.org\/wiki\/([^)\s#?"]+)/g)) {
    const title = decodeURIComponent(m[2]);
    if (!out.some((o) => o.lang === m[1] && o.title === title)) out.push({ lang: m[1], title });
  }
  return out;
}

async function fromPage(lang: string, title: string, f: Fetcher) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages` +
    `&piprop=thumbnail&pithumbsize=${SIZE}&titles=${encodeURIComponent(title)}`;
  const data = (await getJson(url, f)) as { query?: { pages?: Record<string, { thumbnail?: { source?: string } }> } } | null;
  const page = Object.values(data?.query?.pages ?? {})[0];
  return goodImage(page?.thumbnail?.source);
}

async function fromSearch(lang: string, q: string, f: Fetcher) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=3` +
    `&gsrsearch=${encodeURIComponent(q)}&prop=pageimages&piprop=thumbnail&pithumbsize=${SIZE}`;
  const data = (await getJson(url, f)) as {
    query?: { pages?: Record<string, { index?: number; thumbnail?: { source?: string } }> };
  } | null;
  const pages = Object.values(data?.query?.pages ?? {}).sort((a, b) => (a.index ?? 9) - (b.index ?? 9));
  for (const p of pages) {
    const src = goodImage(p.thumbnail?.source);
    if (src) return src;
  }
  return null;
}

export async function findWikiImage(
  term: { term: string; aliases?: string[]; definition?: string },
  f: Fetcher = fetch,
): Promise<string | null> {
  try {
    for (const l of wikiLinks(term.definition ?? "").slice(0, 3)) {
      const src = await fromPage(l.lang, l.title, f);
      if (src) return src;
    }
    // "Acordo de Paz de Oslo (Oslo Accords)": search the name, then what is in brackets, then the other names.
    const names = [term.term.replace(/\s*\(.*?\)\s*/g, " ").trim(), ...(term.term.match(/\(([^)]+)\)/)?.slice(1) ?? []), ...(term.aliases ?? [])]
      .map((n) => n.trim())
      .filter((n, i, a) => n.length >= 2 && a.indexOf(n) === i)
      .slice(0, 3);
    for (const lang of ["pt", "en"]) {
      for (const n of names) {
        const src = await fromSearch(lang, n, f);
        if (src) return src;
      }
    }
  } catch {
    // Wikipedia slow or unreachable: no photo this time.
  }
  return null;
}
