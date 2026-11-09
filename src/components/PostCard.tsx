import Link from "next/link";
import { commentCount, likeCount } from "@/lib/posts";
import { timeAgo } from "@/lib/format";
import type { PostWithCounts } from "@/lib/types";
import { CategoryPill } from "./CategoryPill";
import { IconComment, IconHeart } from "./Icons";
import { SourceMark } from "./SourceMark";

/** One card per format: News has a wide photo, Essay a taller magazine photo, Report a printed cover. */
export function PostCard({ post, showCounts }: { post: PostWithCounts; showCounts: boolean }) {
  const fmt = post.format.toLowerCase();
  return (
    <Link href={`/signals/${post.slug}`} className={`card post-card ${fmt}`}>
      <div className="ph">
        {fmt === "report" ? (
          <>
            <span className="cover">
              {post.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image_url} alt="" loading="lazy" />
              ) : null}
            </span>
            <span className="stamp">Report</span>
          </>
        ) : post.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image_url} alt="" loading="lazy" />
        ) : null}
        <SourceMark name={post.source_name} className="src-chip" />
      </div>
      <div className="body">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <CategoryPill category={post.category} />
          <span className="pill" style={{ background: "#f5f6f6", color: "#5a6567" }}>{post.format}</span>
        </div>
        <h3>{post.title}</h3>
        {post.dek && <p className="dek">{post.dek}</p>}
        {post.take && <p className="take-line">Yasmim: “{post.take}”</p>}
        <div className="meta">
          <span>{timeAgo(post.published_at)}</span>
          {showCounts && (
            <>
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                <IconHeart size={15} /> {likeCount(post)}
                <span className="sr-only">likes</span>
              </span>
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                <IconComment size={15} /> {commentCount(post)}
                <span className="sr-only">comments</span>
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
