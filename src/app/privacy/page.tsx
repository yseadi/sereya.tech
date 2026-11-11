import { LegalPage } from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata = { title: "Privacy Policy", description: "How Sereya Tech handles your personal data, under Brasil's LGPD." };

export default async function PrivacyPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <LegalPage path="/privacy" title={{ en: "Privacy Policy", pt: "Política de Privacidade" }} text={PRIVACY} lang={lang === "pt" ? "pt" : "en"} />;
}
