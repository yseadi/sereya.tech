import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/lib/richtext";
import { CategoryPill } from "@/components/CategoryPill";
import { Pearl } from "@/components/Pearl";
import { SourceMark } from "@/components/SourceMark";
import { getViewer } from "@/lib/auth";
import { longDate } from "@/lib/format";
import { getComments, likeCount, postSelect } from "@/lib/posts";
import type { PostWithCounts } from "@/lib/types";
import { Comments } from "./Comments";
import { OwnerTools } from "./OwnerTools";
import { AddToCluster } from "./AddToCluster";
import { PostLike } from "./PostLike";
import { SaveButton } from "./SaveButton";
import { formatSize } from "@/lib/size";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const { supabase } = await getViewer();
  const { data } = await supabase.from("posts").select("title, dek, image_url").eq("slug", slug).maybeSingle();
  if (!data) return { title: "Signal" };
  const description = data.dek.length > 200 ? data.dek.slice(0, 197) + "…" : data.dek;
  const images = data.image_url ? [{ url: data.image_url }] : undefined;
  return {
    title: data.title,
    description,
    openGraph: { title: data.title, description, type: "article", url: `/signals/${slug}`, ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title: data.title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const { supabase, user, profile } = await getViewer();
  const { data } = await supabase.from("posts").select(postSelect(!!user)).eq("slug", slug).maybeSingle();
  const post = data as unknown as PostWithCounts | null;
  if (!post) notFound();

  const isOwner = profile?.role === "owner";
  let liked = false;
  let saved = false;
  let comments: Awaited<ReturnType<typeof getComments>> = [];
  if (user) {
    const [{ data: like }, rows, { data: save }] = await Promise.all([
      supabase.from("post_likes").select("post_id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle(),
      getComments(supabase, post.id),
      supabase.from("saved_posts").select("post_id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle(),
    ]);
    liked = !!like;
    saved = !!save;
    comments = rows;
  }
  let clusters: { id: string; slug: string; name: string }[] = [];
  let inClusters: string[] = [];
  if (isOwner) {
    const [{ data: cl }, { data: cp }] = await Promise.all([
      supabase.from("clusters").select("id, slug, name").order("updated_at", { ascending: false }),
      supabase.from("cluster_posts").select("cluster_id").eq("post_id", post.id),
    ]);
    clusters = cl ?? [];
    inClusters = (cp ?? []).map((r) => r.cluster_id);
  }

  return (
    <div className="wrap narrow">
      {isOwner && (
        <OwnerTools id={post.id} slug={post.slug} take={post.take} status={post.status} hasBody={!!post.body}>
          {post.status === "published" && <AddToCluster postId={post.id} clusters={clusters} inside={inClusters} />}
        </OwnerTools>
      )}
      <article>
        <header className="post-head">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <CategoryPill category={post.category} explain />
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
                <Link key={t} href={`/signals?tag=${encodeURIComponent(t)}`} className="pill tag-pill" title={`All signals tagged ${t}`}>#{t}</Link>
              ))}
            </div>
          )}
        </header>

        {post.pdf_url ? (
          <div className="card report-download">
            <a href={post.pdf_url} target="_blank" rel="noopener noreferrer" className="report-cover" aria-label="Open the PDF">
              {post.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image_url} alt={`Cover of ${post.title}`} />
              ) : (
                <span className="report-blank">PDF</span>
              )}
            </a>
            <div className="report-info">
              <span className="eyebrow">Report · PDF{post.pdf_size ? ` · ${formatSize(post.pdf_size)}` : ""}</span>
              <strong>{post.title}</strong>
              {post.source_name && <span className="muted">by {post.source_name}</span>}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                <a href={`${post.pdf_url}?download=`} className="btn" download>Download PDF</a>
                <a href={post.pdf_url} target="_blank" rel="noopener noreferrer" className="btn ghost">Read in the browser</a>
              </div>
            </div>
          </div>
        ) : post.image_url && (
          <div className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image_url} alt="" />
          </div>
        )}

        <div className="post-body">
          {post.body?.trim() ? (
            <RichText text={post.body} />
          ) : post.dek ? (
            <p className="muted" style={{ fontStyle: "italic" }}>
              This is a summary. The full piece lives at {post.source_name || "the source"}.
            </p>
          ) : null}
        </div>

        {(post.credit || post.source_url) && (
          <p className="post-credit">
            {post.credit ? `${post.credit} ` : ""}
            {post.source_url && (
              <>
                Original at{" "}
                <a href={post.source_url} target="_blank" rel="noopener noreferrer">{post.source_name || "the source"} ↗</a>
              </>
            )}
          </p>
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
            <>
              <PostLike postId={post.id} slug={post.slug} liked={liked} count={likeCount(post)} />
              {post.status === "published" && <SaveButton postId={post.id} slug={post.slug} saved={saved} />}
            </>
          ) : null}
          {post.source_url && (
            <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="btn ghost small" style={{ height: 44 }}>
              {post.body?.trim() ? "Original" : "Read it all"} on {post.source_name || "the source"} ↗
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
