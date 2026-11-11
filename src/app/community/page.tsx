import Link from "next/link";
import { CategoryPill } from "@/components/CategoryPill";
import { Avatar } from "@/components/Avatar";
import { IconComment, IconHeart } from "@/components/Icons";
import { requireMember } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { commentCount, likeCount, recentComments } from "@/lib/posts";
import type { PostWithCounts } from "@/lib/types";

export const metadata = { title: "Community" };
export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const { supabase } = await requireMember("/community");
  const [latest, { data: postsData }] = await Promise.all([
    recentComments(supabase, 30),
    supabase
      .from("posts")
      .select("id, slug, title, category, source_name, published_at, post_likes(count), comments(count)")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(100),
  ]);
  const posts = (postsData ?? []) as unknown as PostWithCounts[];
  const talked = posts
    .filter((p) => commentCount(p) + likeCount(p) > 0)
    .sort((a, b) => commentCount(b) * 2 + likeCount(b) - (commentCount(a) * 2 + likeCount(a)))
    .slice(0, 8);

  return (
    <div className="wrap">
      <div className="post-head" style={{ marginBottom: 28 }}>
        <p className="eyebrow">Community</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500 }}>What people are talking about</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Every signal has its own conversation. Like what moves you, reply to each other, and Yasmim joins in too.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, alignItems: "start" }}>
        <section aria-labelledby="latest">
          <h2 id="latest" style={{ fontSize: 24, fontWeight: 500, marginBottom: 14 }}>Latest comments</h2>
          <div className="thread">
            {latest.length === 0 && (
              <p className="muted">
                Nobody has said anything yet. Open a <Link href="/signals">signal</Link> and start the first conversation.
              </p>
            )}
            {latest.map((c) => (
              <Link
                key={c.id}
                href={`/signals/${c.post?.slug}#c-${c.id}`}
                className={`card comment${c.author?.role === "owner" ? " by-owner" : ""}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="head">
                  <Avatar name={c.author?.display_name || "?"} url={c.author?.avatar_url} size="sm" />
                  <span className="name">{c.author?.display_name}</span>
                  {c.author?.role === "owner" && <span className="pill owner-badge">Sereya</span>}
                  <span className="muted">{c.parent_id ? "replied" : "commented"} {timeAgo(c.created_at)}</span>
                </div>
                <p className="text">{c.body}</p>
                <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>on {c.post?.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="hot">
          <h2 id="hot" style={{ fontSize: 24, fontWeight: 500, marginBottom: 14 }}>Most talked about</h2>
          <div className="card" style={{ padding: 8 }}>
            {talked.length === 0 && <p className="muted" style={{ padding: 16 }}>No likes or comments yet.</p>}
            {talked.map((p, i) => (
              <Link
                key={p.id}
                href={`/signals/${p.slug}`}
                style={{ display: "flex", gap: 14, padding: 16, textDecoration: "none", color: "inherit", borderTop: i ? "1px solid #eceeee" : "none" }}
              >
                <span className="muted" style={{ fontSize: 20, width: 24 }}>{i + 1}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <strong style={{ fontWeight: 600 }}>{p.title}</strong>
                  <span style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 13 }} className="muted">
                    <CategoryPill category={p.category} />
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><IconHeart size={14} /> {likeCount(p)}</span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><IconComment size={14} /> {commentCount(p)}</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
