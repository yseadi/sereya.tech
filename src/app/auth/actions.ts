"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { isCategory, REGIONS } from "@/lib/categories";
import { safeNext } from "@/lib/safe-next";

export type FormState = { error?: string; ok?: boolean; message?: string; values?: Record<string, string> };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function logIn(_: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email");
  const password = String(fd.get("password") ?? "");
  const values = { email };
  if (!email || !password) return { error: "Type your email and password.", values };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "That email and password don’t match. Try again, or reset your password.", values };
  revalidatePath("/", "layout");
  redirect(safeNext(fd.get("next")));
}

/**
 * Step 1 of joining. Accounts are created on the server with the service key,
 * so the invite code is really enforced (public sign-ups stay off in Supabase)
 * and nobody waits for a confirmation email.
 */
/** A cluster link Yasmim shared works as an invitation. */
async function fromCluster(slug: string) {
  if (!/^[a-z0-9][a-z0-9-]{2,90}$/.test(slug)) return false;
  const supabase = await createClient();
  const { data } = await supabase.rpc("cluster_by_slug", { p_slug: slug });
  return !!data;
}

export async function createAccount(_: FormState, fd: FormData): Promise<FormState> {
  const name = text(fd, "name");
  const email = text(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const invite = text(fd, "invite");

  const values = { name, email, invite, terms: fd.get("terms") === "on" ? "on" : "" };
  if (!name) return { error: "Tell us your name.", values };
  if (name.length > 80) return { error: "That name is a bit long. Keep it under 80 characters.", values };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "That email doesn’t look right.", values };
  if (password.length < 8) return { error: "Use at least 8 characters for your password.", values };
  if (fd.get("terms") !== "on") return { error: "Please agree to the terms and the privacy policy.", values };
  const expected = (process.env.INVITE_CODE ?? "").trim();
  if (expected && invite.toLowerCase() !== expected.toLowerCase() && !(await fromCluster(text(fd, "cluster")))) {
    return { error: "That invite code doesn’t match. Ask Yasmim for yours.", values };
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: name },
  });
  if (error || !data.user) {
    const taken = error && /already|registered|exists/i.test(error.message);
    return {
      error: taken ? "There is already an account with this email. Log in instead." : "We couldn’t create your account. Try again in a moment.",
      values,
    };
  }

  const owner = (process.env.OWNER_EMAIL ?? "").trim().toLowerCase();
  if (owner && owner === email) {
    await admin.from("profiles").update({ role: "owner" }).eq("id", data.user.id);
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) return { error: "Your account is ready, but we couldn’t log you in. Try logging in." };
  return { ok: true };
}

/** Step 2 of joining: what to follow. */
export async function saveUniverse(input: {
  categories: string[];
  regions: string[];
}): Promise<FormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session ended. Log in again." };
  const categories = input.categories.filter(isCategory);
  const regions = input.regions.filter((r) => REGIONS.includes(r));
  if (categories.length === 0) return { error: "Pick at least one category." };
  const update: Record<string, unknown> = { categories, regions, onboarded: true };
  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);
  if (error) return { error: "We couldn’t save that. Try again." };
  return { ok: true };
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendReset(_: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email");
  if (!email) return { error: "Type your email." };
  const supabase = await createClient();
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${site}/auth/callback?next=/reset` });
  // Same answer whether or not the account exists.
  return { ok: true, message: "If there is an account with this email, a link to reset your password is on its way." };
}

export async function setNewPassword(_: FormState, fd: FormData): Promise<FormState> {
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "The reset link has expired. Ask for a new one." };
  redirect("/");
}
