import Link from "next/link";
import { LEGAL_UPDATED } from "@/lib/legal";
import { RichText } from "@/lib/richtext";

type Lang = "en" | "pt";

/** A legal page with an English / Português switch. */
export function LegalPage({ path, title, text, lang }: { path: string; title: { en: string; pt: string }; text: { en: string; pt: string }; lang: Lang }) {
  return (
    <div className="wrap narrow legal">
      <p className="eyebrow">Sereya Tech</p>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 500, margin: "6px 0 10px" }}>{title[lang]}</h1>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
        <span className="muted">{lang === "en" ? "Last updated" : "Atualizada em"} {LEGAL_UPDATED[lang]}</span>
        <nav className="chips" aria-label="Language" style={{ marginLeft: "auto" }}>
          <Link href={path} className="chip" aria-current={lang === "en" ? "true" : undefined} lang="en">English</Link>
          <Link href={`${path}?lang=pt`} className="chip" aria-current={lang === "pt" ? "true" : undefined} lang="pt-BR">Português</Link>
        </nav>
      </div>
      <article className="card post-body legal-body" lang={lang === "pt" ? "pt-BR" : "en"}>
        <RichText text={text[lang]} />
      </article>
    </div>
  );
}
