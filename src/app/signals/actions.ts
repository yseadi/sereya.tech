"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type Result = { error?: string };

async function member() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

function refresh(slug: string) {
  revalidatePath(`/signals/${slug}`);
  revalidatePath("/community");
}

export async function togglePostLike(postId: string, slug: string, like: boolean): Promise<Result> {
  const { supabase, user } = await member();
  if (!user) return { error: "Log in to like." };
  const { error } = like
    ? await supabase.from("post_likes").upsert({ post_id: postId, user_id: user.id }, { ignoreDuplicates: true })
    : await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
  if (error) return { error: "Couldn’t save your like." };
  refresh(slug);
  return {};
}

export async function toggleCommentLike(commentId: string, slug: string, like: boolean): Promise<Result> {
  const { supabase, user } = await member();
  if (!user) return { error: "Log in to like." };
  const { error } = like
    ? await supabase.from("comment_likes").upsert({ comment_id: commentId, user_id: user.id }, { ignoreDuplicates: true })
    : await supabase.from("comment_likes").delete().eq("comment_id", commentId).eq("user_id", user.id);
  if (error) return { error: "Couldn’t save your like." };
  refresh(slug);
  return {};
}

export async function addComment(postId: string, slug: string, body: string, parentId: string | null): Promise<Result> {
  const { supabase, user } = await member();
  if (!user) return { error: "Log in to comment." };
  const text = body.trim();
  if (!text) return { error: "Write something first." };
  if (text.length > 4000) return { error: "That’s long! Keep it under 4000 characters." };
  const { error } = await supabase.from("comments").insert({ post_id: postId, user_id: user.id, parent_id: parentId, body: text });
  if (error) return { error: "Couldn’t post your comment. Try again." };
  refresh(slug);
  return {};
}

export async function editComment(commentId: string, slug: string, body: string): Promise<Result> {
  const { supabase, user } = await member();
  if (!user) return { error: "Log in again." };
  const text = body.trim();
  if (!text || text.length > 4000) return { error: "Comments need 1 to 4000 characters." };
  const { error } = await supabase
    .from("comments")
    .update({ body: text, edited_at: new Date().toISOString() })
    .eq("id", commentId)
    .eq("user_id", user.id);
  if (error) return { error: "Couldn’t save your edit." };
  refresh(slug);
  return {};
}

/** Authors delete their own comments. The owner can delete any (RLS decides). */
export async function deleteComment(commentId: string, slug: string): Promise<Result> {
  const { supabase, user } = await member();
  if (!user) return { error: "Log in again." };
  const { error, count } = await supabase.from("comments").delete({ count: "exact" }).eq("id", commentId);
  if (error || !count) return { error: "Couldn’t delete that comment." };
  refresh(slug);
  return {};
}
