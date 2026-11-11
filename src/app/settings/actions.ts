"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isCategory, REGIONS } from "@/lib/categories";

export async function saveSettings(input: { name: string; bio: string; categories: string[]; regions: string[] }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in again." };
  const name = input.name.trim();
  if (!name || name.length > 80) return { error: "Your name needs 1 to 80 characters." };
  if (input.bio.length > 400) return { error: "Keep your bio under 400 characters." };
  const categories = input.categories.filter(isCategory);
  if (!categories.length) return { error: "Follow at least one category." };
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: name, bio: input.bio.trim(), categories, regions: input.regions.filter((r) => REGIONS.includes(r)) })
    .eq("id", user.id);
  if (error) return { error: "Couldn’t save. Try again." };
  revalidatePath("/", "layout");
  return {};
}

/** Saves (or clears) the member's profile photo. The photo must be one they uploaded into their own folder. */
export async function setAvatar(url: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in again." };
  const prefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}/`;
  if (url && !url.startsWith(prefix)) return { error: "That photo can’t be used." };
  const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
  if (error) return { error: "Couldn’t save the photo." };
  revalidatePath("/", "layout");
  return {};
}
