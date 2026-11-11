"use client";

import { createBrowserClient } from "@supabase/ssr";

/** Supabase in the browser, as the signed-in user. Used for uploads that are too big to pass through the server. */
export function createBrowserSupabase() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
