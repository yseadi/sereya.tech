import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * The week's pulse on Home: which tags are moving and where the signals come from.
 * Both are counted from published signals, this week (last 7 days) against the week before.
 */

const DAY = 24 * 3600 * 1000;

/** Region tags Concha writes (src/lib/concha/score.ts), plus the spellings Yasmim may type. */
const REGION_LABELS: Record<string, string> = {
  africa: "Africa",
  latinamerica: "Latin America",
  brasil: "Brasil",
  brazil: "Brasil",
  southasia: "South Asia",
  southeastasia: "Southeast Asia",
  middleeast: "Middle East",
  china: "China",
  eastasia: "East Asia",
};

const key = (tag: string) => tag.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

export function regionOf(tag: string): string | null {
  return REGION_LABELS[key(tag)] ?? null;
}

export type TagMove = { tag: string; count: number; before: number };
export type RegionCount = { region: string; count: number };
export type Pulse = {
  total: number;
  placed: number;
  tags: TagMove[];
  regions: RegionCount[];
};

type Row = { tags: string[] | null; published_at: string | null };

export function computePulse(rows: Row[], now = Date.now(), maxTags = 9): Pulse {
  const thisWeek = new Map<string, { tag: string; count: number }>();
  const lastWeek = new Map<string, number>();
  const regions = new Map<string, number>();
  let total = 0;
  let placed = 0;

  for (const r of rows) {
    if (!r.published_at) continue;
    const age = now - new Date(r.published_at).getTime();
    if (age < 0 || age >= 14 * DAY) continue;
    const recent = age < 7 * DAY;
    const seen = new Set<string>();
    const seenRegions = new Set<string>();
    for (const t of r.tags ?? []) {
      const k = key(t);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      const region = regionOf(t);
      if (region) {
        if (recent) seenRegions.add(region);
        continue;
      }
      if (recent) {
        const cur = thisWeek.get(k);
        if (cur) cur.count++;
        else thisWeek.set(k, { tag: t, count: 1 });
      } else {
        lastWeek.set(k, (lastWeek.get(k) ?? 0) + 1);
      }
    }
    if (recent) {
      total++;
      if (seenRegions.size) placed++;
      for (const reg of seenRegions) regions.set(reg, (regions.get(reg) ?? 0) + 1);
    }
  }

  const tags = [...thisWeek.entries()]
    .map(([k, v]) => ({ tag: v.tag, count: v.count, before: lastWeek.get(k) ?? 0 }))
    .sort((a, b) => b.count - a.count || b.count - b.before - (a.count - a.before) || a.tag.localeCompare(b.tag))
    .slice(0, maxTags);

  return {
    total,
    placed,
    tags,
    regions: [...regions.entries()]
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count || a.region.localeCompare(b.region)),
  };
}

export async function getPulse(supabase: SupabaseClient): Promise<Pulse> {
  const since = new Date(Date.now() - 14 * DAY).toISOString();
  const { data, error } = await supabase
    .from("posts")
    .select("tags, published_at")
    .eq("status", "published")
    .gte("published_at", since)
    .limit(3000);
  if (error) console.error("getPulse", error.message);
  return computePulse((data ?? []) as Row[]);
}
