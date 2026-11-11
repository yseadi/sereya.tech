"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isCategory } from "@/lib/categories";
import { slugify } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export type TermState = { error?: string; saved?: boolean; id?: string; slug?: string };

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Create or update a glossary card from the Studio form. */
export async function saveTerm(_prev: TermState, fd: FormData): Promise<TermState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in again." };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "owner") return { error: "Only Yasmim can do this." };

  const id = str(fd, "id");
  const term = str(fd, "term");
  if (!term) return { error: "The card needs a word." };
  const slug = slugify(str(fd, "slug") || term);
  if (!slug) return { error: "The word needs some letters or numbers for the link." };
  const cat = str(fd, "category");
  const intent = str(fd, "intent");
  const row = {
    kind: "glossary",
    term: term.slice(0, 120),
    slug,
    aliases: str(fd, "aliases")
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean)
      .slice(0, 12),
    definition: str(fd, "definition").replace(/\r\n/g, "\n").slice(0, 40000),
    category: isCategory(cat) ? cat : null,
    published: intent === "publish" ? true : intent === "draft" ? false : fd.get("published") === "on",
  };

  const { data, error } = id
    ? await supabase.from("concha_terms").update(row).eq("id", id).select("id").single()
    : await supabase.from("concha_terms").insert(row).select("id").single();
  if (error) {
    if (error.code === "23505") return { error: "Another card already uses this word or link." };
    return { error: "Couldn’t save. " + error.message };
  }
  revalidatePath("/glossary", "layout");
  revalidatePath("/studio", "layout");
  if (!id && fd.get("inline") !== "1") redirect(`/studio/glossary/${data.id}?saved=1`);
  return { saved: true, id: data.id, slug };
}

async function asOwner() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { supabase, ok: me?.role === "owner" };
}

/** Show or hide a glossary card for readers, straight from the Glossary page. */
export async function setTermPublished(id: string, published: boolean): Promise<{ error?: string }> {
  const { supabase, ok } = await asOwner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("concha_terms").update({ published }).eq("id", id).eq("kind", "glossary");
  if (error) return { error: "Couldn’t change it." };
  revalidatePath("/glossary", "layout");
  revalidatePath("/studio", "layout");
  return {};
}
