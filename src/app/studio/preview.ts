"use server";

import { readableText } from "@/lib/concha/text";
import { createClient } from "@/lib/supabase/server";

export type LinkPreview = { title?: string; dek?: string; image_url?: string; source_name?: string; byline?: string; body?: string; credit?: string; error?: string };

function meta(html: string, key: string) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["'][^>]*>`,
    "i",
  );
  const m = html.match(re);
  return decode((m?.[1] ?? m?.[2] ?? "").trim());
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&nbsp;/g, " ");
}

/** Reads a source page's title, summary, photo and full text so Yasmim doesn't retype them. Owner only. */
export async function fetchLinkPreview(rawUrl: string): Promise<LinkPreview> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in again." };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "owner") return { error: "Only Yasmim can do this." };

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { error: "That link doesn’t look right." };
  }
  if (!/^https?:$/.test(url.protocol) || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|\[)/.test(url.hostname)) {
    return { error: "That link doesn’t look right." };
  }

  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; SereyaConcha/0.1)", accept: "text/html" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!res.ok) return { error: `The site answered ${res.status}. Fill the fields by hand.` };
    const html = (await res.text()).slice(0, 2_000_000);
    const title = meta(html, "og:title") || decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "");
    let image = meta(html, "og:image") || meta(html, "twitter:image");
    if (image) image = new URL(image, url).toString();
    const site = meta(html, "og:site_name") || url.hostname.replace(/^www\./, "");
    const body = readableText(html).slice(0, 100_000);
    return {
      title,
      body,
      credit: body ? `Originally published by ${site}.` : "",
      dek: meta(html, "og:description") || meta(html, "description"),
      image_url: image,
      source_name: meta(html, "og:site_name"),
      byline: meta(html, "author"),
    };
  } catch {
    return { error: "Couldn’t reach that page. Fill the fields by hand." };
  }
}
