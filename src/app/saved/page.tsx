import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { requireMember } from "@/lib/auth";
import { postSelect } from "@/lib/posts";
import type { PostWithCounts } from "@/lib/types";

export const metadata = { title: "Saved" };
export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const { supabase, user } = await requireMember("/saved");
  const { data } = await supabase
    .from("saved_posts")
    .select(`created_at, post:posts(${postSelect(true)})`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(200);
  const posts = ((data ?? []) as unknown as { post: PostWithCounts | null }[])
    .map((r) => r.post)
    .filter((p): p is PostWithCounts => !!p && p.status === "published");

  return (
    <div className="wrap">
      <div className="post-head" style={{ marginBottom: 24 }}>
        <p className="eyebrow">Saved</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500 }}>Your favourite signals</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          The signals you kept to read again. Tap “Save” on any signal to add it here. Only you see this list.
        </p>
      </div>
      {posts.length ? (
        <div className="grid">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} showCounts />
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 28 }}>
          <p className="muted">Nothing saved yet.</p>
          <Link href="/signals" className="btn small" style={{ marginTop: 14 }}>Browse the signals</Link>
        </div>
      )}
    </div>
  );
}
