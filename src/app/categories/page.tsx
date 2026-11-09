import Link from "next/link";
import { getViewer } from "@/lib/auth";
import { CATEGORIES, CATEGORY_ABOUT, CATEGORY_KEYS } from "@/lib/categories";
import { CATEGORY_WORDS } from "@/lib/concha/score";
import type { CategoryKey } from "@/lib/types";

export const metadata = {
  title: "Categories",
  description: "The five lenses Sereya reads the world with, and what each one is about.",
};
export const dynamic = "force-dynamic";

type Row = { slug: string; title: string; category: CategoryKey };

export default async function CategoriesPage() {
  const { supabase } = await getViewer();
  const [{ data: posts }, { data: terms }] = await Promise.all([
    supabase.from("posts").select("slug, title, category").eq("status", "published").order("published_at", { ascending: false }).limit(200),
    supabase.from("concha_terms").select("slug, term, category").eq("kind", "glossary").eq("published", true),
  ]);
  const latest = (k: CategoryKey) => ((posts ?? []) as Row[]).filter((p) => p.category === k).slice(0, 3);
  const words = (k: CategoryKey) => ((terms ?? []) as { slug: string; term: string; category: CategoryKey | null }[]).filter((t) => t.category === k);

  return (
    <div className="wrap">
      <div className="post-head" style={{ marginBottom: 28 }}>
        <p className="eyebrow">Categories</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500 }}>Five ways of reading the world</h1>
        <p className="muted" style={{ maxWidth: 660 }}>
          Every signal on Sereya lives in one of five categories. Each is a lens: a set of questions Yasmim asks of the
          news, and the words Concha listens for every morning.
        </p>
        <nav className="chips" aria-label="Jump to a category" style={{ marginTop: 18 }}>
          {CATEGORY_KEYS.map((k) => (
            <a key={k} href={`#${k}`} className="chip">
              <span className="dot" style={{ background: CATEGORIES[k].dot }} />
              {CATEGORIES[k].label}
            </a>
          ))}
        </nav>
      </div>

      <div className="cat-list">
        {CATEGORY_KEYS.map((k, i) => {
          const c = CATEGORIES[k];
          const a = CATEGORY_ABOUT[k];
          const recent = latest(k);
          const glossary = words(k);
          return (
            <section key={k} id={k} className="card cat-card" style={{ ["--tone" as string]: c.bg, ["--dot" as string]: c.dot, ["--ink-tone" as string]: c.text }}>
              <div className="cat-side">
                <span className="cat-num">0{i + 1}</span>
                <h2>{c.label}</h2>
                <p className="cat-hint">{c.hint}</p>
                <Link href={`/signals?cat=${k}`} className="btn small">See the signals</Link>
              </div>
              <div className="cat-main">
                <p className="cat-intro">{a.intro}</p>
                <h3>The questions it asks</h3>
                <ul className="cat-questions">
                  {a.questions.map((q) => <li key={q}>{q}</li>)}
                </ul>
                <h3>What Concha listens for</h3>
                <div className="cat-words">
                  {glossary.map((t) => (
                    <Link key={t.slug} href={`/glossary/${t.slug}`} className="pill cat-word glossary">{t.term}</Link>
                  ))}
                  {CATEGORY_WORDS[k].slice(0, 14).map((w) => <span key={w} className="pill cat-word">{w}</span>)}
                </div>
                {recent.length > 0 && (
                  <>
                    <h3>Latest signals</h3>
                    <ul className="cat-latest">
                      {recent.map((p) => (
                        <li key={p.slug}><Link href={`/signals/${p.slug}`}>{p.title}</Link></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
