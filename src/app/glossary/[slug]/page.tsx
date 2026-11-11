import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/CategoryPill";
import { PostCard } from "@/components/PostCard";
import { Pearl } from "@/components/Pearl";
import { getViewer } from "@/lib/auth";
import { TermTools } from "../GlossaryAdmin";
import { postSelect } from "@/lib/posts";
import { plainText, RichText } from "@/lib/richtext";
import type { GlossaryTerm, PostWithCounts } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const { supabase, user, profile } = await getViewer();
  const { data } = await supabase
    .from("concha_terms")
    .select("id, term, slug, aliases, definition, category, image_url, cover_position, published, updated_at")
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
        <div style={{ marginBottom: 24 }}>
          <TermTools term={term} afterDeleteHref="/glossary" />
        </div>
      )}
      <article>
        <header className="post-head">
          <Link href="/glossary" className="eyebrow" style={{ textDecoration: "none" }}>← Glossary</Link>
          {term.category && (
            <div>
              <CategoryPill category={term.category} explain />
            </div>
          )}
          <h1>{term.term}</h1>
          {term.aliases.length > 0 && <p className="muted">Also: {term.aliases.join(", ")}</p>}
        </header>
        {term.image_url && (
          <>
            <figure className="term-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={term.image_url} alt="" style={{ objectPosition: term.cover_position || "center 50%" }} />
            </figure>
            {term.image_url.startsWith("https://upload.wikimedia.org/") && (
              <p className="term-cover-credit">Photo: Wikimedia Commons</p>
            )}
          </>
        )}
        <div className="take" style={{ marginTop: 28 }}>
          <div className="who">
            <Pearl size={44} />
            <div>
              <strong>By Yasmim</strong>
              <p className="muted" style={{ fontSize: 14 }}>Sereya’s glossary</p>
            </div>
          </div>
          <div className="post-body" style={{ margin: 0 }}>
            <RichText text={withoutCover(term.definition, term.image_url)} empty={<p className="muted">Yasmim is still writing this card.</p>} />
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

/** The cover already shows the card's first picture, so it isn't repeated in the text. */
function withoutCover(text: string, cover: string) {
  if (!cover) return text;
  return text.replace(/^!\[[^\]\n]*\]\(([^)\s]+)\)\s*$/m, (line, src) => (src === cover ? "" : line));
}
