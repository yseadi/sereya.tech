import { getViewer } from "@/lib/auth";
import type { GlossaryTerm } from "@/lib/types";
import { GlossaryGrid } from "./GlossaryGrid";

export const metadata = {
  title: "Glossary",
  description: "Yasmim’s glossary: the words and ideas Sereya reads the world with.",
};
export const dynamic = "force-dynamic";

export default async function GlossaryPage() {
  const { supabase } = await getViewer();
  const { data } = await supabase
    .from("concha_terms")
    .select("id, term, slug, aliases, definition, category, published, updated_at")
    .eq("kind", "glossary")
    .eq("published", true)
    .order("term");
  const terms = (data ?? []) as GlossaryTerm[];

  return (
    <div className="wrap">
      <div className="post-head" style={{ marginBottom: 24 }}>
        <p className="eyebrow">Glossary</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500 }}>The words Sereya reads with</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Concepts, treaties, movements and ideas that keep showing up in the signals, explained by Yasmim. Each one is
          also a word Concha listens for every morning.
        </p>
      </div>
      {terms.length === 0 ? (
        <p className="card muted" style={{ padding: 28 }}>The first cards are being written. Come back soon.</p>
      ) : (
        <GlossaryGrid terms={terms} />
      )}
    </div>
  );
}
