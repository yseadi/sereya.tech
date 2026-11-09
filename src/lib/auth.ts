import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import type { Profile } from "./types";

/** The signed-in user and their profile, or nulls for a visitor. */
export async function getViewer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null as Profile | null };
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  return { supabase, user, profile };
}

/** For pages that need an account: sends visitors to log in and half-joined members back to onboarding. */
export async function requireMember(next = "/") {
  const viewer = await getViewer();
  if (!viewer.user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (viewer.profile && !viewer.profile.onboarded) redirect("/join");
  return { ...viewer, user: viewer.user!, profile: viewer.profile! };
}

export async function requireOwner() {
  const viewer = await requireMember("/studio");
  if (viewer.profile.role !== "owner") redirect("/");
  return viewer;
}

export function firstName(profile: Profile | null) {
  return (profile?.display_name || "").trim().split(/\s+/)[0] || "";
}
