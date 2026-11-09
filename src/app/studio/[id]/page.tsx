import Link from "next/link";
import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import type { Post } from "@/lib/types";
import { PostForm } from "../PostForm";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const { supabase } = await requireOwner();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle<Post>();
  if (!post) notFound();
  return (
    <div className="wrap narrow">
      <Link href="/studio" className="muted" style={{ fontSize: 15 }}>← Studio</Link>
      <h1 style={{ fontSize: 40, fontWeight: 500, margin: "12px 0 24px" }}>Edit signal</h1>
      <PostForm post={post} justSaved={saved === "1"} />
    </div>
  );
}
