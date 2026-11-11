import type { SupabaseClient } from "@supabase/supabase-js";
import type { CategoryKey, CommentRow, PostWithCounts } from "./types";

/** Visitors cannot read likes or comments (RLS), so they only get the post columns. */
export function postSelect(signedIn: boolean) {
  return signedIn ? "*, post_likes(count), comments(count)" : "*";
}

export function likeCount(p: Partial<PostWithCounts>) {
  return p.post_likes?.[0]?.count ?? 0;
}
export function commentCount(p: Partial<PostWithCounts>) {
  return p.comments?.[0]?.count ?? 0;
}

export async function listPosts(
  supabase: SupabaseClient,
  opts: { signedIn: boolean; categories?: CategoryKey[]; format?: string; tag?: string; limit?: number; offset?: number },
) {
  let q = supabase
    .from("posts")
    .select(postSelect(opts.signedIn))
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (opts.categories?.length) q = q.in("category", opts.categories);
  if (opts.format) q = q.eq("format", opts.format);
  if (opts.tag) q = q.contains("tags", [opts.tag]);
  const limit = opts.limit ?? 30;
  const offset = opts.offset ?? 0;
  const { data, error } = await q.range(offset, offset + limit - 1);
  if (error) console.error("listPosts", error.message);
  return (data ?? []) as unknown as PostWithCounts[];
}

export async function getPearl(supabase: SupabaseClient, signedIn: boolean) {
  const { data } = await supabase
    .from("posts")
    .select(postSelect(signedIn))
    .eq("status", "published")
    .eq("is_pearl", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data ?? null) as unknown as PostWithCounts | null;
}

export async function getComments(supabase: SupabaseClient, postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles!comments_user_id_fkey(id, display_name, role, avatar_url), comment_likes(user_id)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) console.error("getComments", error.message);
  return (data ?? []) as unknown as CommentRow[];
}

export type RecentComment = CommentRow & { post: { slug: string; title: string; category: CategoryKey } | null };

export async function recentComments(supabase: SupabaseClient, limit = 20) {
  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles!comments_user_id_fkey(id, display_name, role, avatar_url), comment_likes(user_id), post:posts(slug, title, category)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) console.error("recentComments", error.message);
  return (data ?? []) as unknown as RecentComment[];
}
