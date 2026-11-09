import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/CategoryPill";
import { PostCard } from "@/components/PostCard";
import { Pearl } from "@/components/Pearl";
import { getViewer } from "@/lib/auth";
import { postSelect } from "@/lib/posts";
import { plainText, RichText } from "@/lib/richtext";
import type { GlossaryTerm, PostWithCounts } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const { supabase, user, profile } = await getViewer();
  const { data } = await supabase
    .from("concha_terms")
    .select("id, term, slug, aliases, definition, category, published, updated_at")
    .eq("kind", "glossary")
    .eq("slug", slug)
    .maybeSingle();
  return { supabase, user, profile, term: data as GlossaryTerm | null };
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const { term } = await load(slug);
  if (!term) return { title: "Glossary" };
  const description = plainText(term.definition).replace(/\s+/g, " ").slice(0, 190);
  return { title: `${term.term} · Glossary`, description, openGraph: { title: term.term, description } };
}

export default async function TermPage({ params }: Params) {
  const { slug } = await params;
  const { supabase, user, profile, term } = await load(slug);
  if (!term) notFound();
  const isOwner = profile?.role === "owner";

  // Signals where Concha heard this word.
  const label = term.term.split(" (")[0].trim();
  const { data: related } = await supabase
    .from("posts")
    .select(postSelect(!!user))
    .eq("status", "published")
    .contains("matched", [label])
    .order("published_at", { ascending: false })
    .limit(6);
  const posts = (related ?? []) as unknown as PostWithCounts[];

  return (
    <div className="wrap narrow">
      {isOwner && (
        <div className="owner-bar" role="region" aria-label="Owner tools" style={{ marginBottom: 24 }}>
          <span style={{ marginRight: "auto" }}>You are the owner{term.published ? "" : " · draft, only you see it"}</span>
          <Link href={`/studio/glossary/${term.id}`} className="btn">Edit card</Link>
        </div>
      )}
      <article>
        <header className="post-head">
          <Link href="/glossary" className="eyebrow" style={{ textDecoration: "none" }}>← Glossary</Link>
          {term.category && <CategoryPill category={term.category} explain />}
          <h1>{term.term}</h1>
          {term.aliases.length > 0 && <p className="muted">Also: {term.aliases.join(", ")}</p>}
        </header>
        <div className="take" style={{ marginTop: 28 }}>
          <div className="who">
            <Pearl size={44} />
            <div>
              <strong>By Yasmim</strong>
              <p className="muted" style={{ fontSize: 14 }}>Sereya’s glossary</p>
            </div>
          </div>
          <div className="post-body" style={{ margin: 0 }}>
            <RichText text={term.definition} empty={<p className="muted">Yasmim is still writing this card.</p>} />
          </div>
        </div>
      </article>
      {posts.length > 0 && (
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16 }}>Signals where this word shows up</h2>
          <div className="grid">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} showCounts={!!user} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
