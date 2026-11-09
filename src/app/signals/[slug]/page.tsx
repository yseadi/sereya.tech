import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/CategoryPill";
import { Pearl } from "@/components/Pearl";
import { SourceMark } from "@/components/SourceMark";
import { getViewer } from "@/lib/auth";
import { longDate } from "@/lib/format";
import { getComments, likeCount, postSelect } from "@/lib/posts";
import type { PostWithCounts } from "@/lib/types";
import { Comments } from "./Comments";
import { OwnerTools } from "./OwnerTools";
import { PostLike } from "./PostLike";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const { supabase } = await getViewer();
  const { data } = await supabase.from("posts").select("title, dek").eq("slug", slug).maybeSingle();
  return data ? { title: data.title, description: data.dek } : { title: "Signal" };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const { supabase, user, profile } = await getViewer();
  const { data } = await supabase.from("posts").select(postSelect(!!user)).eq("slug", slug).maybeSingle();
  const post = data as unknown as PostWithCounts | null;
  if (!post) notFound();

  const isOwner = profile?.role === "owner";
  let liked = false;
  let comments: Awaited<ReturnType<typeof getComments>> = [];
  if (user) {
    const [{ data: like }, rows] = await Promise.all([
      supabase.from("post_likes").select("post_id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle(),
      getComments(supabase, post.id),
    ]);
    liked = !!like;
    comments = rows;
  }

  return (
    <div className="wrap narrow">
      {isOwner && <OwnerTools id={post.id} slug={post.slug} take={post.take} status={post.status} />}
      <article>
        <header className="post-head">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <CategoryPill category={post.category} />
            <span className="pill" style={{ background: "#ffffff", color: "#5a6567", border: "1px solid #eceeee" }}>{post.format}</span>
            {post.is_pearl && <span className="pill" style={{ background: "#f1ecfb", color: "#5b4a9e" }}>Pearl of the day</span>}
          </div>
          <h1>{post.title}</h1>
          {post.dek && <p style={{ fontSize: 19, color: "#3e4a4c" }}>{post.dek}</p>}
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }} className="muted">
            <SourceMark name={post.source_name} />
            {post.byline && <span>by {post.byline}</span>}
            <span>{longDate(post.published_at)}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="chips">
              {post.tags.map((t) => (
                <span key={t} className="pill" style={{ background: "#f5f6f6", color: "#5a6567" }}>#{t}</span>
              ))}
            </div>
          )}
        </header>

        {post.image_url && (
          <div className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image_url} alt="" />
          </div>
        )}

        {post.take && (
          <section className="take" aria-label="Yasmim’s take">
            <div className="who">
              <Pearl size={44} />
              <div>
                <strong>Yasmim’s take</strong>
                <p className="muted" style={{ fontSize: 14 }}>Founder of Sereya</p>
              </div>
            </div>
            <p>{post.take}</p>
          </section>
        )}

        <div className="actions-row" style={{ marginTop: post.take ? 0 : 28 }}>
          {user ? (
            <PostLike postId={post.id} slug={post.slug} liked={liked} count={likeCount(post)} />
          ) : null}
          {post.source_url && (
            <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="btn ghost small" style={{ height: 44 }}>
              Read on {post.source_name || "the source"} ↗
            </a>
          )}
        </div>
      </article>

      {user ? (
        <Comments rows={comments} postId={post.id} slug={post.slug} viewerId={user.id} isOwner={isOwner} />
      ) : (
        <section className="card" style={{ padding: 28, marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={{ fontSize: 24, fontWeight: 500 }}>Join the conversation</h2>
          <p className="muted">Members like signals and talk about them, forum style. It’s free.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/join" className="btn">Join Sereya</Link>
            <Link href={`/login?next=/signals/${post.slug}`} className="btn ghost">Log in</Link>
          </div>
        </section>
      )}
    </div>
  );
}
