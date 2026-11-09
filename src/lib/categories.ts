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

/**
 * What each category means, shown on /categories. First drafts written for Yasmim
 * to rewrite in her own words.
 */
export const CATEGORY_ABOUT: Record<CategoryKey, { intro: string; questions: string[] }> = {
  res: {
    intro:
      "How people push back when technology is used to watch, sort and control them. Privacy tools, encryption, camouflage against facial recognition, data rights, internet shutdowns and the activists who work around them. These signals show where autonomy is being defended, and what it costs.",
    questions: [
      "Who is being watched, and who is doing the watching?",
      "What tools, tricks or alliances are people inventing to stay free?",
      "Which rights are being won, or lost, in the law and in practice?",
    ],
  },
  zei: {
    intro:
      "The spirit of the time: how we live, work, love, learn and talk to each other right now. New jobs and new kinds of exploitation, platforms and creators, language and loneliness, money that moves through phones. The everyday shifts that tell us what normal is becoming.",
    questions: [
      "What are people doing differently this year than last year?",
      "Which new habits, words or rituals are spreading, and from where?",
      "Who gains and who is left behind when a new normal arrives?",
    ],
  },
  bio: {
    intro:
      "Life, climate and matter. Biomimicry, new materials, food and farming, energy, oceans and forests, medicine and the body. Signals of how we adapt to a hotter planet, what we learn from other species, and what we extract from the earth to keep technology running.",
    questions: [
      "What is nature teaching us to build, grow or heal?",
      "How are people and places adapting to the climate that is already here?",
      "Where do the minerals, water and energy behind technology come from, and at whose expense?",
    ],
  },
  art: {
    intro:
      "Craft, authorship and culture. Art, design, architecture, music, fashion, games and the people who make them. Signals of how creativity changes when machines create too: who signs the work, who owns it, who gets paid, and which traditions find new life.",
    questions: [
      "How are artists and designers using, refusing or bending new technology?",
      "Who owns a work, a style or a voice, and who gets paid for it?",
      "Which crafts, aesthetics and cultures are rising, and from where?",
    ],
  },
  geo: {
    intro:
      "Power between countries, companies and people. Wars and drones, chips and subsea cables, sanctions, elections, regulation, espionage and cyberattacks. Signals of who controls the infrastructure of the digital world, and of how countries like Brasil claim their own sovereignty.",
    questions: [
      "Who controls the cables, chips, data and platforms, and who depends on them?",
      "How is technology changing war, borders and diplomacy?",
      "What are countries of the Global South doing to decide their own digital future?",
    ],
  },
};
