"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export type ClusterResult = { error?: string; id?: string; slug?: string };

async function owner() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { supabase, ok: me?.role === "owner" };
}

/** A short random tail so the link can't be guessed from the name alone. */
function linkFor(name: string) {
  const tail = randomBytes(4).toString("hex").slice(0, 6);
  return `${(slugify(name) || "cluster").slice(0, 60)}-${tail}`;
}

function refresh(slug?: string) {
  revalidatePath("/studio/clusters");
  if (slug) revalidatePath(`/c/${slug}`);
}

export async function createCluster(name: string, note = "", postId?: string): Promise<ClusterResult> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const clean = name.trim().slice(0, 80);
  if (!clean) return { error: "Give the cluster a name." };
  const { data, error } = await supabase
    .from("clusters")
    .insert({ name: clean, note: note.trim().slice(0, 2000), slug: linkFor(clean) })
    .select("id, slug")
    .single();
  if (error || !data) return { error: "Couldn’t create the cluster." };
  if (postId) await supabase.from("cluster_posts").insert({ cluster_id: data.id, post_id: postId });
  refresh(data.slug);
  return { id: data.id, slug: data.slug };
}

export async function updateCluster(id: string, slug: string, name: string, note: string): Promise<ClusterResult> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const clean = name.trim().slice(0, 80);
  if (!clean) return { error: "Give the cluster a name." };
  const { error } = await supabase
    .from("clusters")
    .update({ name: clean, note: note.trim().slice(0, 2000), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: "Couldn’t save." };
  refresh(slug);
  return {};
}

export async function deleteCluster(id: string, slug: string): Promise<ClusterResult> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("clusters").delete().eq("id", id);
  if (error) return { error: "Couldn’t delete." };
  refresh(slug);
  return {};
}

/** Put a signal in a cluster or take it out. */
export async function setInCluster(clusterId: string, postId: string, inside: boolean): Promise<ClusterResult> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = inside
    ? await supabase.from("cluster_posts").upsert({ cluster_id: clusterId, post_id: postId }, { ignoreDuplicates: true })
    : await supabase.from("cluster_posts").delete().eq("cluster_id", clusterId).eq("post_id", postId);
  if (error) return { error: "Couldn’t change the cluster." };
  const { data } = await supabase.from("clusters").select("slug").eq("id", clusterId).single();
  await supabase.from("clusters").update({ updated_at: new Date().toISOString() }).eq("id", clusterId);
  refresh(data?.slug);
  return {};
}

/** Published signals whose title matches, for adding from the cluster page. */
export async function findSignals(q: string) {
  const { supabase, ok } = await owner();
  if (!ok) return [];
  const term = q.trim().replace(/[%_,()]/g, " ").slice(0, 80);
  let query = supabase
    .from("posts")
    .select("id, slug, title, format, category, image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(12);
  if (term) query = query.ilike("title", `%${term}%`);
  const { data } = await query;
  return data ?? [];
}
