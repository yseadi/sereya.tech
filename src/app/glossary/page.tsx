import { getViewer } from "@/lib/auth";
import type { GlossaryTerm } from "@/lib/types";
import { NewTermButton } from "./GlossaryAdmin";
import { GlossaryGrid } from "./GlossaryGrid";

export const metadata = {
  title: "Glossary",
  description: "Yasmim’s glossary: the words and ideas Sereya reads the world with.",
};
export const dynamic = "force-dynamic";

export default async function GlossaryPage() {
  const { supabase, profile } = await getViewer();
  const isOwner = profile?.role === "owner";
  // The owner also sees her hidden cards, to show them again or finish them.
  let query = supabase
    .from("concha_terms")
    .select("id, term, slug, aliases, definition, category, image_url, cover_position, published, updated_at")
    .eq("kind", "glossary")
    .order("term");
  if (!isOwner) query = query.eq("published", true);
  const { data } = await query;
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
        {isOwner && (
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <NewTermButton />
          </div>
        )}
      </div>
      {terms.length === 0 && !isOwner ? (
        <p className="card muted" style={{ padding: 28 }}>The first cards are being written. Come back soon.</p>
      ) : (
        <GlossaryGrid terms={terms} isOwner={isOwner} />
      )}
    </div>
  );
}
