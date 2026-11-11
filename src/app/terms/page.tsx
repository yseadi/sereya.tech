import { LegalPage } from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata = { title: "Terms of Use", description: "The rules for using Sereya Tech." };

export default async function TermsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <LegalPage path="/terms" title={{ en: "Terms of Use", pt: "Termos de Uso" }} text={TERMS} lang={lang === "pt" ? "pt" : "en"} />;
}
