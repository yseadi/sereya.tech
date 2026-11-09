"use server";

import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/** Saves a photo Yasmim picked from her computer and returns its public link. Owner only. */
export async function uploadImage(fd: FormData): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in again." };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "owner") return { error: "Only Yasmim can do this." };

  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Pick a photo first." };
  const ext = TYPES[file.type];
  if (!ext) return { error: "Use a JPG, PNG, WebP, GIF or AVIF photo." };
  if (file.size > 4_500_000) return { error: "That photo is too big (4 MB at most)." };

  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;
  // Her own session uploads it, so the storage rules check that she is the owner.
  const { error } = await supabase.storage.from("images").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) {
    return {
      error: /bucket/i.test(error.message)
        ? "The photo shelf isn’t set up yet: run sereya-imagens.sql in Supabase."
        : `Couldn’t save the photo: ${error.message}`,
    };
  }
  return { url: supabase.storage.from("images").getPublicUrl(path).data.publicUrl };
}
