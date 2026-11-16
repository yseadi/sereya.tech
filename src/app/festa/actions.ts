"use server";

import { createClient as createPlainClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { requireFestaOwner } from "./owner";
import type { FestaAnswer } from "./config";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

/** Saves a guest's answer. Guests have no account, so this goes through the festa_rsvp() function. */
export async function sendRsvp(answer: FestaAnswer): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const going = answer?.going !== false;
  const people = (Array.isArray(answer?.people) ? answer.people : []).slice(0, 20).map((p) => ({
    full_name: clean(p?.full_name, 140),
    is_child: !!p?.is_child,
    child_age: /^\d{1,2}$/.test(String(p?.child_age ?? "")) ? Number(p.child_age) : null,
    wine: !!p?.wine && !p?.is_child,
    soda: !!p?.soda,
    juice: !!p?.juice && !!p?.is_child,
    gluten_free: !!p?.gluten_free,
    vegetarian: !!p?.vegetarian,
    diet_note: clean(p?.diet_note, 300),
    kid_food: p?.is_child ? clean(p?.kid_food, 300) : "",
  }));
  const contact = going ? people[0]?.full_name || "" : clean(answer?.contact_name, 140);
  if (contact.split(" ").length < 2) return { ok: false, error: "Coloca seu nome completo, por favor (é pra portaria)." };
  if (going) {
    if (!people.length) return { ok: false, error: "Falta pelo menos uma pessoa." };
    const missing = people.findIndex((p) => p.full_name.split(" ").length < 2);
    if (missing >= 0) return { ok: false, error: `Falta o nome completo da pessoa ${missing + 1} (a portaria pede).` };
  }

  const supabase = createPlainClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.rpc("festa_rsvp", {
    p: {
      going,
      contact_name: contact,
      phone: clean(answer?.phone, 40),
      message: typeof answer?.message === "string" ? answer.message.trim().slice(0, 1000) : "",
      people: going ? people : [],
      replaces: typeof answer?.replaces === "string" ? answer.replaces : "",
    },
  });
  if (error || !data) {
    console.error("festa_rsvp failed", error);
    return { ok: false, error: "Ops, não consegui salvar agora. Tenta de novo em um minutinho?" };
  }
  revalidatePath("/festa/lista");
  return { ok: true, id: data as string };
}

/** Owner only: removes one answer (a duplicate, a test). */
export async function deleteRsvp(formData: FormData) {
  const { supabase } = await requireFestaOwner();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("festa_rsvps").delete().eq("id", id);
  revalidatePath("/festa/lista");
}
