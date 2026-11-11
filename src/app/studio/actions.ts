"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FORMATS, isCategory } from "@/lib/categories";
import { slugify } from "@/lib/format";

export type StudioState = { error?: string; saved?: boolean };

async function ownerClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false as const };
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { supabase, ok: data?.role === "owner", userId: user.id };
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const isUrl = (v: string) => !v || /^https?:\/\/\S+$/i.test(v);

/** Create or update a post from the Studio form. */
export async function savePost(_: StudioState, fd: FormData): Promise<StudioState> {
  const { supabase, ok, userId } = await ownerClient();
  if (!ok) return { error: "Only Yasmim can do this." };

  const id = str(fd, "id");
  const title = str(fd, "title");
  const category = str(fd, "category");
  const format = str(fd, "format");
  const source_url = str(fd, "source_url");
  const image_url = str(fd, "image_url");
  const pdf_url = str(fd, "pdf_url");
  const pdf_size = Math.max(0, Math.min(2 ** 31 - 1, Number(str(fd, "pdf_size")) || 0));
  if (!title) return { error: "A post needs a title." };
  if (!isCategory(category)) return { error: "Pick a category." };
  if (!FORMATS.includes(format as (typeof FORMATS)[number])) return { error: "Pick a format." };
  if (!isUrl(source_url) || !isUrl(image_url) || !isUrl(pdf_url)) return { error: "Links must start with http:// or https://" };

  const slug = slugify(str(fd, "slug") || title);
  if (!slug) return { error: "The title needs some letters or numbers for the link." };
  const intent = str(fd, "intent");
  const status = intent === "publish" ? "published" : intent === "draft" ? "draft" : str(fd, "status") || "draft";

  const row = {
    title,
    slug,
    category,
    format,
    source_url,
    image_url,
    pdf_url,
    pdf_size: pdf_url ? pdf_size : 0,
    dek: str(fd, "dek"),
    take: str(fd, "take"),
    body: str(fd, "body").replace(/\r\n/g, "\n").slice(0, 100000),
    credit: str(fd, "credit").slice(0, 400),
    source_name: str(fd, "source_name"),
    byline: str(fd, "byline"),
    tags: str(fd, "tags")
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean)
      .slice(0, 12),
    is_pearl: fd.get("is_pearl") === "on",
    status,
  };

  const { data, error } = id
    ? await supabase.from("posts").update(row).eq("id", id).select("id, slug").single()
    : await supabase.from("posts").insert({ ...row, author_id: userId }).select("id, slug").single();
  if (error) {
    if (error.code === "23505") return { error: "Another post already uses this link. Change the link field." };
    return { error: "Couldn’t save. " + error.message };
  }
  revalidatePath("/", "layout");
  if (!id) redirect(`/studio/${data.id}?saved=1`);
  return { saved: true };
}

export async function deletePost(id: string) {
  const { supabase, ok } = await ownerClient();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: "Couldn’t delete it." };
  revalidatePath("/", "layout");
  redirect("/studio");
}

/** Quick edit of Yasmim's take, straight from the post page. */
export async function saveTake(id: string, slug: string, take: string) {
  const { supabase, ok } = await ownerClient();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("posts").update({ take: take.trim() }).eq("id", id);
  if (error) return { error: "Couldn’t save your take." };
  revalidatePath(`/signals/${slug}`);
  revalidatePath("/");
  return {};
}

export async function setStatus(id: string, slug: string, status: "draft" | "published") {
  const { supabase, ok } = await ownerClient();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("posts").update({ status }).eq("id", id);
  if (error) return { error: "Couldn’t change it." };
  revalidatePath("/", "layout");
  revalidatePath(`/signals/${slug}`);
  return {};
}
