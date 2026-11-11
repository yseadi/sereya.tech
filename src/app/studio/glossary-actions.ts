"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isCategory } from "@/lib/categories";
import { slugify } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { findWikiImage } from "@/lib/wiki";

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
    cover_position: /^center \d{1,3}%$/.test(str(fd, "cover_position")) ? str(fd, "cover_position") : "center 50%",
    image_url: /^(https?:\/\/|\/)[^\s"'<>]{1,990}$/.test(str(fd, "image_url")) ? str(fd, "image_url") : "",
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

/** Look for a cover photo on Wikipedia for one card. Doesn't save: the form shows it first. */
export async function suggestCover(term: string, aliases: string, definition: string): Promise<{ url?: string; error?: string }> {
  const { ok } = await asOwner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const url = await findWikiImage({
    term,
    aliases: aliases.split(",").map((a) => a.trim()).filter(Boolean),
    definition,
  });
  return url ? { url } : { error: "No photo found on Wikipedia. Upload one instead." };
}

