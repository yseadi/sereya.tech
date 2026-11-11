import Link from "next/link";
import { CategoryPill } from "@/components/CategoryPill";
import { requireOwner } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import type { GlossaryTerm } from "@/lib/types";
import { StudioNav } from "../StudioNav";

export const metadata = { title: "Glossary · Studio" };
export const dynamic = "force-dynamic";

export default async function StudioGlossary({ searchParams }: { searchParams: Promise<{ show?: string; q?: string }> }) {
  const { show, q } = await searchParams;
  const { supabase } = await requireOwner();
  let query = supabase
    .from("concha_terms")
    .select("id, term, slug, aliases, definition, category, image_url, cover_position, published, updated_at")
    .eq("kind", "glossary")
    .order("term");
  if (show === "published") query = query.eq("published", true);
  if (show === "drafts") query = query.eq("published", false);
  if (q) query = query.ilike("term", `%${q.replace(/[%_]/g, "")}%`);
  const [{ data }, { count: caught }] = await Promise.all([
    query,
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "caught"),
  ]);
  const terms = (data ?? []) as GlossaryTerm[];
  const href = (s?: string) => (s ? `/studio/glossary?show=${s}` : "/studio/glossary");

  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="eyebrow">Studio</p>
          <h1 style={{ fontSize: 44, fontWeight: 500, marginTop: 6 }}>Glossary</h1>
          <p className="muted" style={{ marginTop: 6, maxWidth: 640 }}>
            Write a text for each word and publish it as a card on the public Glossary. Drafts stay private. Every word
            here, published or not, is also something Concha listens for.
          </p>
        </div>
        <Link href="/studio/glossary/new" className="btn">New card</Link>
      </div>
      <StudioNav current="glossary" catchCount={caught ?? 0} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}>
        <nav className="chips" aria-label="Show">
          <Link href={href()} className="chip" aria-current={!show ? "true" : undefined}>Everything</Link>
          <Link href={href("published")} className="chip" aria-current={show === "published" ? "true" : undefined}>Published</Link>
          <Link href={href("drafts")} className="chip" aria-current={show === "drafts" ? "true" : undefined}>Drafts</Link>
        </nav>
        <form style={{ marginLeft: "auto" }}>
          {show && <input type="hidden" name="show" value={show} />}
          <input className="input" type="search" name="q" defaultValue={q} placeholder="Find a word…" aria-label="Find a word" style={{ width: 260 }} />
        </form>
      </div>
      <div className="card table-box">
        <table className="studio-table">
          <thead>
            <tr>
              <th scope="col">Word</th>
              <th scope="col">Category</th>
              <th scope="col">Your text</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((t) => (
              <tr key={t.id}>
                <td style={{ minWidth: 240 }}>
                  <Link href={`/studio/glossary/${t.id}`} style={{ fontWeight: 600, textDecoration: "none" }}>{t.term}</Link>
                  {t.aliases.length > 0 && <div className="muted" style={{ fontSize: 13 }}>{t.aliases.slice(0, 3).join(", ")}</div>}
                </td>
                <td>{t.category ? <CategoryPill category={t.category} /> : <span className="muted">None</span>}</td>
                <td>{t.definition ? `${t.definition.split(/\s+/).length} words` : <span className="muted">Not yet</span>}</td>
                <td>{t.published ? <Link href={`/glossary/${t.slug}`}>Published</Link> : "Draft"}</td>
                <td className="muted" style={{ whiteSpace: "nowrap" }}>{timeAgo(t.updated_at)}</td>
              </tr>
            ))}
            {terms.length === 0 && (
              <tr><td colSpan={5} className="muted">Nothing here.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
