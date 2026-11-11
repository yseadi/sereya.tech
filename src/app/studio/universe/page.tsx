import { requireOwner } from "@/lib/auth";
import { StudioNav } from "../StudioNav";
import { CATEGORY_KEYS } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";
import { AddSourceForm, AutopublishToggle, CategoryWords, SourceRow, TermAdder, TermChip } from "./UniverseClient";

export const metadata = { title: "Concha’s universe" };
export const dynamic = "force-dynamic";

export default async function UniversePage() {
  const { supabase } = await requireOwner();
  const [{ data: sources }, { data: terms }, { data: setting }, { count: caught }] = await Promise.all([
    supabase.from("sources").select("*").order("name"),
    supabase.from("concha_terms").select("id, kind, term, aliases, category").order("term"),
    supabase.from("settings").select("value").eq("key", "concha_autopublish").maybeSingle(),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "caught"),
  ]);
  const glossary = (terms ?? []).filter((t) => t.kind === "glossary");
  const never = (terms ?? []).filter((t) => t.kind === "never");
  const listen = (terms ?? []).filter((t) => t.kind === "listen") as { id: string; term: string; aliases: string[]; category: CategoryKey }[];
  const catWords = (terms ?? []).filter((t) => t.kind === "category") as { id: string; term: string; aliases: string[]; category: CategoryKey }[];

  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="eyebrow">Private · only you see this</p>
          <h1 style={{ fontSize: 44, fontWeight: 500, marginTop: 6 }}>Concha’s universe</h1>
          <p className="muted" style={{ marginTop: 6, maxWidth: 680 }}>
            What Concha listens to and what it listens for. Each item gets a Fit from 0 to 100: your “Listen for”
            words and glossary words weigh most, then category words, then a bonus for Brasil, Latin America, Africa
            and Asia. Anything with a word from the never list is left out.
          </p>
        </div>
      </div>
      <StudioNav current="universe" catchCount={caught ?? 0} />

      <section className="card" style={{ padding: "20px 22px", marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 500 }}>Publishing</h2>
        <AutopublishToggle on={setting?.value === true} />
      </section>

      <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 6 }}>Sources</h2>
      <p className="muted" style={{ marginBottom: 14, maxWidth: 680 }}>
        “Full text” brings the whole article into Sereya. Turn it on only for sources whose license allows republishing
        (like Rest of World, Creative Commons). The others show the summary and a link to read the rest at the source.
      </p>
      <div className="card table-box" style={{ marginBottom: 14 }}>
        <table className="studio-table">
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">Listening</th>
              <th scope="col">Full text</th>
              <th scope="col">Last read</th>
              <th scope="col"><span className="sr-only">Remove</span></th>
            </tr>
          </thead>
          <tbody>
            {(sources ?? []).map((s) => (
              <SourceRow key={s.id} source={s} />
            ))}
          </tbody>
        </table>
      </div>
      <AddSourceForm />

      <h2 id="listen" style={{ fontSize: 24, fontWeight: 500, margin: "44px 0 6px" }}>Listen for <span className="muted" style={{ fontSize: 16 }}>· {listen.length} words</span></h2>
      <p className="muted" style={{ marginBottom: 14, maxWidth: 680 }}>
        Specific words or subjects you want Concha to bring from the sources, in any category. Each one found weighs as
        much as a glossary word, becomes a tag on the signal and pulls it into the category you pick. Sources are mostly
        in English, so add the English words too.
      </p>
      <TermAdder kind="listen" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
        {listen.map((t) => (
          <TermChip key={t.id} term={t} plain />
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 500, margin: "44px 0 6px" }}>Glossary <span className="muted" style={{ fontSize: 16 }}>· {glossary.length} terms</span></h2>
      <p className="muted" style={{ marginBottom: 14 }}>Words and ideas you want to hear about. Add English versions so Concha finds them in foreign sources.</p>
      <TermAdder kind="glossary" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
        {glossary.map((t) => (
          <TermChip key={t.id} term={t} />
        ))}
      </div>

      <h2 id="category-words" style={{ fontSize: 24, fontWeight: 500, margin: "44px 0 6px" }}>Category words</h2>
      <p className="muted" style={{ marginBottom: 14, maxWidth: 680 }}>
        The words that tell Concha which category an item belongs to. Each one found adds 10 to the Fit (up to 50).
        Add words for the categories you want more of, and remove the ones that bring noise.
      </p>
      <div className="cat-words-grid">
        {CATEGORY_KEYS.map((k) => (
          <CategoryWords key={k} category={k} words={catWords.filter((w) => w.category === k)} />
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 500, margin: "44px 0 6px" }}>Never list</h2>
      <p className="muted" style={{ marginBottom: 14 }}>Anything mentioning these is skipped, whatever its Fit.</p>
      <TermAdder kind="never" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
        {never.map((t) => (
          <TermChip key={t.id} term={t} never />
        ))}
      </div>
    </div>
  );
}
