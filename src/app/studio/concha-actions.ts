"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { fetchText } from "@/lib/concha/feed";
import { runConcha } from "@/lib/concha/run";
import { canSummarize, summarize } from "@/lib/concha/summarize";
import { readableText } from "@/lib/concha/text";

type Result = { error?: string; message?: string };

async function owner() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false };
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { supabase, ok: data?.role === "owner" };
}

const refresh = () => {
  revalidatePath("/studio", "layout");
  revalidatePath("/", "layout");
};

export async function runNow(): Promise<Result> {
  const { ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  try {
    const s = await runConcha("manual");
    refresh();
    const errs = s.errors.length ? ` ${s.errors.length} source${s.errors.length > 1 ? "s" : ""} didn’t answer.` : "";
    return { message: `Concha read ${s.items_read} items from ${s.sources_read} sources: ${s.kept} for you, ${s.published} published, ${s.skipped} skipped.${errs}` };
  } catch (e) {
    return { error: "Concha couldn’t finish: " + (e instanceof Error ? e.message : String(e)) };
  }
}

export async function publishCaught(id: string, take: string): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const update: Record<string, unknown> = { status: "published" };
  if (take.trim()) update.take = take.trim();
  const { error } = await supabase.from("posts").update(update).eq("id", id);
  if (error) return { error: "Couldn’t publish." };
  refresh();
  return {};
}

export async function setCatchStatus(id: string, status: "caught" | "skipped"): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("posts").update({ status }).eq("id", id);
  if (error) return { error: "Couldn’t change it." };
  refresh();
  return {};
}

export async function setAutopublish(on: boolean): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("settings").upsert({ key: "concha_autopublish", value: on });
  if (error) return { error: "Couldn’t save." };
  refresh();
  return {};
}

export async function addSource(name: string, feedUrl: string, fullText: boolean): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  if (!name.trim()) return { error: "Give the source a name." };
  if (!/^https?:\/\/\S+$/i.test(feedUrl.trim())) return { error: "The feed address must start with https://" };
  const { error } = await supabase
    .from("sources")
    .insert({ name: name.trim(), feed_url: feedUrl.trim(), full_text: fullText, license_note: fullText ? "Republished under the source’s open license, with credit and a link to the original." : "" });
  if (error) return { error: error.code === "23505" ? "This feed is already on the list." : "Couldn’t add it." };
  refresh();
  return {};
}

export async function updateSource(id: string, patch: { active?: boolean; full_text?: boolean }): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("sources").update(patch).eq("id", id);
  if (error) return { error: "Couldn’t save." };
  refresh();
  return {};
}

export async function deleteSource(id: string): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("sources").delete().eq("id", id);
  if (error) return { error: "Couldn’t remove it." };
  refresh();
  return {};
}

export async function addTerm(kind: "glossary" | "never", term: string, aliases: string): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const t = term.trim();
  if (!t) return { error: "Type a term." };
  const list = aliases
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean)
    .slice(0, 12);
  const { error } = await supabase.from("concha_terms").insert({ kind, term: t, aliases: list });
  if (error) return { error: error.code === "23505" ? "It’s already there." : "Couldn’t add it." };
  refresh();
  return {};
}

export async function deleteTerm(id: string): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  const { error } = await supabase.from("concha_terms").delete().eq("id", id);
  if (error) return { error: "Couldn’t remove it." };
  refresh();
  return {};
}

/** Ask Claude for a three-paragraph summary of a post's source, now. */
export async function writeSummary(id: string): Promise<Result> {
  const { supabase, ok } = await owner();
  if (!ok) return { error: "Only Yasmim can do this." };
  if (!canSummarize()) return { error: "The AI key isn’t set in Vercel yet (ANTHROPIC_API_KEY)." };
  const { data: post } = await supabase.from("posts").select("title, source_name, source_url").eq("id", id).single();
  if (!post?.source_url) return { error: "This post has no source link to read." };
  try {
    const html = await fetchText(post.source_url, 10000);
    const body = await summarize({ title: post.title, source: post.source_name, text: readableText(html) });
    if (!body) return { error: "Couldn’t read the article at the source (paywall or blocked)." };
    const { error } = await supabase
      .from("posts")
      .update({ body, credit: `Summary written by Sereya from the original article at ${post.source_name}.` })
      .eq("id", id);
    if (error) return { error: "Couldn’t save the summary." };
  } catch {
    return { error: "Couldn’t reach the source or the AI. Try again in a minute." };
  }
  refresh();
  return { message: "Summary written." };
}
