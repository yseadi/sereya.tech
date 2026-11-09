import type { CategoryKey } from "../types";

/**
 * How Concha scores an item, 0 to 100 (the "Fit"):
 *  - each glossary term found: +35 (up to 70)
 *  - words of the best-matching category: +10 each (up to 50)
 *  - the Global South lens (a story from outside the US and Europe): +20
 *  - anything on the never list: 0, skipped
 * The category with the most words becomes the suggestion.
 */

export type Term = { term: string; aliases: string[] };

export const CATEGORY_WORDS: Record<CategoryKey, string[]> = {
  res: [
    "surveillance", "privacy", "spyware", "encryption", "facial recognition", "biometric", "censorship", "VPN",
    "data protection", "tracking", "activist", "activism", "protest", "dissident", "deepfake", "disinformation",
    "misinformation", "content moderation", "whistleblower", "internet shutdown", "digital rights", "anonymity",
    "camouflage", "resistance", "hacktivist", "Pegasus", "data broker", "police", "predictive policing",
  ],
  zei: [
    "workers", "labor", "labour", "gig", "union", "strike", "jobs", "language", "languages", "education", "school",
    "students", "social media", "creators", "influencer", "TikTok", "dating", "loneliness", "youth", "Gen Z",
    "chatbot", "companion", "culture", "religion", "mental health", "health", "migrants", "remittances", "fintech",
    "mobile money", "platform", "consumers", "kindergarten", "family", "work",
  ],
  bio: [
    "climate", "biodiversity", "ocean", "forest", "wildfire", "fire", "biomimicry", "materials", "food", "agriculture",
    "farming", "energy", "solar", "battery", "carbon", "emissions", "water", "species", "ecology", "biotech",
    "implant", "medicine", "drug", "gene", "genetic", "brain", "Arctic", "heat", "flood", "drought", "plants",
    "animals", "nature", "mining", "lithium",
  ],
  art: [
    "art", "artist", "artists", "design", "designer", "architecture", "architect", "music", "film", "cinema",
    "fashion", "craft", "museum", "exhibition", "interior", "furniture", "creative", "creativity", "author",
    "copyright", "writer", "novel", "photography", "ceramics", "textile", "wallpaper", "game", "games", "bar",
  ],
  geo: [
    "war", "conflict", "military", "sanctions", "sovereignty", "sovereign", "China", "Chinese", "Russia", "NATO",
    "election", "government", "regulation", "policy", "cyberattack", "cybersecurity", "ransomware", "hackers",
    "chips", "semiconductor", "subsea cable", "cables", "trade", "tariff", "tariffs", "geopolitics", "drone",
    "drones", "defense", "border", "export controls", "intelligence", "espionage", "nuclear", "diplomacy",
    "Red Sea", "Houthi", "Taiwan", "Ukraine", "Gaza", "Israel", "Iran",
  ],
};

export const GLOBAL_SOUTH = [
  "Global South", "Africa", "African", "Nigeria", "Kenya", "Ghana", "Ethiopia", "Egypt", "South Africa", "Senegal",
  "Rwanda", "Uganda", "Tanzania", "India", "Indian", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Indonesia",
  "Philippines", "Vietnam", "Thailand", "Malaysia", "Cambodia", "Myanmar", "Brasil", "Brazil", "Brazilian",
  "Latin America", "Mexico", "Mexican", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Bolivia",
  "Ecuador", "Caribbean", "Middle East", "Gulf", "UAE", "Emirates", "Saudi", "Qatar", "Turkey", "Iran", "Iraq",
  "Lebanon", "Palestine", "Palestinian", "Yemen", "Morocco", "Tunisia", "Algeria", "Central Asia", "Kazakhstan",
  "Pacific Islands", "Indigenous",
];

const REGION_TAGS: [string, RegExp][] = [
  ["Africa", /\b(Africa|African|Nigeria|Kenya|Ghana|Ethiopia|Egypt|Senegal|Rwanda|Uganda|Tanzania|Morocco|Tunisia|Algeria)\b/i],
  ["LatinAmerica", /\b(Latin America|Mexico|Mexican|Argentina|Chile|Colombia|Peru|Venezuela|Bolivia|Ecuador|Caribbean)\b/i],
  ["Brasil", /\b(Brasil|Brazil|Brazilian)\b/i],
  ["SouthAsia", /\b(India|Indian|Pakistan|Bangladesh|Sri Lanka|Nepal)\b/i],
  ["SoutheastAsia", /\b(Indonesia|Philippines|Vietnam|Thailand|Malaysia|Cambodia|Myanmar)\b/i],
  ["MiddleEast", /\b(Middle East|Gulf|UAE|Emirates|Saudi|Qatar|Iran|Iraq|Lebanon|Palestin\w*|Yemen|Israel|Gaza)\b/i],
  ["China", /\b(China|Chinese|Beijing|Shenzhen)\b/i],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Short all-caps words (AGI, ISIS) must match exactly; everything else ignores case. */
function wordRe(word: string) {
  const exact = word.length <= 6 && word === word.toUpperCase() && /[A-Z]/.test(word);
  const body = escapeRe(word).replace(/\\?[-\s]+/g, "[-\\s]+");
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])`, exact ? "u" : "iu");
}

export type Compiled = {
  glossary: { term: string; res: RegExp[] }[];
  never: { term: string; res: RegExp[] }[];
  categories: [CategoryKey, RegExp[]][];
  south: RegExp[];
};

export function compile(glossary: Term[], never: Term[]): Compiled {
  const toRes = (t: Term) => (t.aliases.length ? t.aliases : [t.term]).filter((a) => a.trim().length >= 2).map(wordRe);
  return {
    glossary: glossary.map((t) => ({ term: t.term, res: toRes(t) })),
    never: never.map((t) => ({ term: t.term, res: toRes(t) })),
    categories: (Object.keys(CATEGORY_WORDS) as CategoryKey[]).map((k) => [k, CATEGORY_WORDS[k].map(wordRe)]),
    south: GLOBAL_SOUTH.map(wordRe),
  };
}

export type Score = {
  fit: number;
  category: CategoryKey;
  matched: string[];
  tags: string[];
  never: string | null;
};

export function score(c: Compiled, text: string): Score {
  const never = c.never.find((n) => n.res.some((r) => r.test(text)));
  const terms = c.glossary.filter((g) => g.res.some((r) => r.test(text))).map((g) => g.term);
  let best: CategoryKey = "zei";
  let bestHits = 0;
  for (const [k, res] of c.categories) {
    const hits = res.filter((r) => r.test(text)).length;
    if (hits > bestHits) {
      best = k;
      bestHits = hits;
    }
  }
  const south = c.south.some((r) => r.test(text));
  const regions = REGION_TAGS.filter(([, r]) => r.test(text)).map(([t]) => t);
  const fit = never ? 0 : Math.min(100, Math.min(terms.length, 2) * 35 + Math.min(bestHits, 5) * 10 + (south ? 20 : 0));
  const matched = [...terms.slice(0, 4).map((t) => t.split(" (")[0].trim()), ...(south ? ["Global South lens"] : [])];
  const tags = [...regions, ...terms.map((t) => t.split(" (")[0])]
    .map((t) => t.replace(/[^\p{L}\p{N}]+/gu, ""))
    .filter((t) => t.length >= 2 && t.length <= 30)
    .slice(0, 5);
  return { fit, category: best, matched, tags, never: never?.term ?? null };
}
