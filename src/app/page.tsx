import Link from "next/link";
import { redirect } from "next/navigation";
import { CategoryPill } from "@/components/CategoryPill";
import { Pearl } from "@/components/Pearl";
import { PostCard } from "@/components/PostCard";
import { SourceMark } from "@/components/SourceMark";
import { firstName, getViewer } from "@/lib/auth";
import { greeting, longDate, timeAgo } from "@/lib/format";
import { getPearl, listPosts, recentComments } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { supabase, user, profile } = await getViewer();
  if (user && profile && !profile.onboarded) redirect("/join");
  const signedIn = !!user;

  const [pearl, feed, talk] = await Promise.all([
    getPearl(supabase, signedIn),
    listPosts(supabase, { signedIn, categories: profile?.categories, limit: 9 }),
    signedIn ? recentComments(supabase, 4) : Promise.resolve([]),
  ]);
  const name = firstName(profile);

  return (
    <div className="wrap">
      <section className="band">
        <div>
          {signedIn ? (
            <>
              <p className="eyebrow">{longDate(new Date().toISOString())}</p>
              <h1 style={{ marginTop: 10 }}>{greeting()}{name ? `, ${name}.` : "."}</h1>
              <p>Here is what Concha brought back, read through the categories you follow.</p>
            </>
          ) : (
            <>
              <p className="eyebrow">Sereya Tech</p>
              <h1 style={{ marginTop: 10 }}>Signals, trends and readings from outside the usual centres.</h1>
              <p>
                Every morning Concha brings back what moved in the world, and Yasmim reads it. Join to like, comment
                and talk about it with the community.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
                <Link href="/join" className="btn">Join Sereya</Link>
                <Link href="/login" className="btn ghost">Log in</Link>
              </div>
            </>
          )}
        </div>
        <Pearl size={200} />
      </section>

      {pearl && (
        <>
          <div className="section-head">
            <h2>Pearl of the day</h2>
          </div>
          <Link href={`/signals/${pearl.slug}`} className="card pearl-day" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ph">
              {pearl.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pearl.image_url} alt="" />
              ) : null}
            </div>
            <div className="body">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <CategoryPill category={pearl.category} />
                <SourceMark name={pearl.source_name} />
              </div>
              <h2><span className="t">{pearl.title}</span></h2>
              {pearl.dek && <p className="muted">{pearl.dek}</p>}
              {pearl.take && (
                <div className="take" style={{ margin: 0, padding: "16px 18px" }}>
                  <p style={{ fontSize: 16 }}>“{pearl.take}”</p>
                  <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Yasmim’s take</p>
                </div>
              )}
            </div>
          </Link>
        </>
      )}

      <div className="section-head">
        <h2>{signedIn && profile?.categories?.length ? "For you" : "Latest signals"}</h2>
        <Link href="/signals" className="btn ghost small">All signals</Link>
      </div>
      {feed.length ? (
        <div className="grid">
          {feed.map((p) => (
            <PostCard key={p.id} post={p} showCounts={signedIn} />
          ))}
        </div>
      ) : (
        <p className="muted">No signals here yet. Concha is still listening.</p>
      )}

      {signedIn && talk.length > 0 && (
        <>
          <div className="section-head">
            <h2>Latest conversations</h2>
            <Link href="/community" className="btn ghost small">Community</Link>
          </div>
          <div className="grid">
            {talk.map((c) => (
              <Link key={c.id} href={`/signals/${c.post?.slug}#c-${c.id}`} className="card comment" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="head">
                  <span className="avatar sm">{(c.author?.display_name || "?").slice(0, 1).toUpperCase()}</span>
                  <span className="name">{c.author?.display_name}</span>
                  <span className="muted">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {c.body}
                </p>
                <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>on {c.post?.title}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
