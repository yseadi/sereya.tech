import type { Plan } from "./types";

/** Suggested prices from the prototype. Not validated yet, and nobody pays during the beta. */
export const PLANS: Record<Plan, { name: string; desc: string; price: (year: boolean) => string; per: (year: boolean) => string }> = {
  free: {
    name: "Free",
    desc: "The Carta, the Readings archive, the Pearl of the day and 3 signals a week.",
    price: () => "R$ 0",
    per: () => "forever",
  },
  member: {
    name: "Member",
    desc: "The whole platform: daily signals, every trend with evidence, the Sonar.",
    price: (y) => (y ? "R$ 240" : "R$ 24"),
    per: (y) => (y ? "/ year" : "/ month"),
  },
  founding: {
    name: "Founding member",
    desc: "Everything in Member, price locked forever. Only for the first 200.",
    price: () => "R$ 180",
    per: () => "/ year",
  },
};
