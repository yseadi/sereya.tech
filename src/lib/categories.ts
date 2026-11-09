import type { CategoryKey } from "./types";

/** The five categories and their pearly tones, as approved in the prototype. */
export const CATEGORIES: Record<CategoryKey, { label: string; hint: string; dot: string; bg: string; text: string }> = {
  res: { label: "Digital Resistance", hint: "Surveillance, privacy, camouflage", dot: "#E39AAA", bg: "#FBEDEF", text: "#9C4A5C" },
  zei: { label: "Zeitgeist", hint: "How we live, work and talk now", dot: "#B9A5EE", bg: "#F1ECFB", text: "#5B4A9E" },
  bio: { label: "Bio & Nature", hint: "Biomimicry, climate, materials", dot: "#7FC9B5", bg: "#E8F5F1", text: "#2F7563" },
  art: { label: "Art & Creativity", hint: "Craft, authorship, culture", dot: "#EBC48E", bg: "#FBF3E6", text: "#8A6122" },
  geo: { label: "Geopolitics & Cybersecurity", hint: "Power, conflict, sovereignty", dot: "#9DC0EC", bg: "#EAF2FC", text: "#3A64A0" },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

export function isCategory(v: unknown): v is CategoryKey {
  return typeof v === "string" && v in CATEGORIES;
}

export const REGIONS = [
  "Latin America",
  "Brasil",
  "Africa",
  "Middle East",
  "South Asia",
  "East Asia",
  "Europe",
  "North America",
];

export const FORMATS = ["News", "Essay", "Report"] as const;

/** Logos we have for sources, in public/sources. */
const SOURCE_LOGOS: Record<string, string> = {
  "rest of world": "/sources/row.svg",
  "mit technology review": "/sources/mit.svg",
  techcrunch: "/sources/tc.svg",
  futurism: "/sources/futurism.svg",
  "ieee spectrum": "/sources/ieee.svg",
  ieee: "/sources/ieee.svg",
};

export function sourceLogo(name: string): string | null {
  return SOURCE_LOGOS[name.trim().toLowerCase()] ?? null;
}
