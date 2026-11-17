import type { Metadata } from "next";
import { Convite } from "./Convite";
import { FESTA } from "./config";

const description = `Oieee! Esse é um convite pro meu aniversário ✨ ${FESTA.dateLabel[0].toUpperCase()}${FESTA.dateLabel.slice(1)}, ${FESTA.timeLabel}. Confirma até ${FESTA.deadlineLabel} 💜`;

export const metadata: Metadata = {
  title: { absolute: `${FESTA.title} 🎂` },
  description,
  openGraph: { title: `${FESTA.title} 🎂`, description, locale: "pt_BR", type: "website", siteName: FESTA.title },
  twitter: { card: "summary_large_image", title: `${FESTA.title} 🎂`, description },
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#f1ecfb" };

export default function FestaPage() {
  return <Convite />;
}
