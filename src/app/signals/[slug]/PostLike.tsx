"use client";

import { LikeButton } from "@/components/LikeButton";
import { togglePostLike } from "../actions";

export function PostLike({ postId, slug, liked, count }: { postId: string; slug: string; liked: boolean; count: number }) {
  return <LikeButton liked={liked} count={count} onToggle={(like) => togglePostLike(postId, slug, like)} />;
}
