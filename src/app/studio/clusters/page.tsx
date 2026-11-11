import Link from "next/link";
import { requireOwner } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { CopyLink } from "@/app/c/[slug]/ClusterAdmin";
import { StudioNav } from "../StudioNav";
import { NewCluster } from "./NewCluster";

export const metadata = { title: "Clusters · Studio" };
export const dynamic = "force-dynamic";

type Row = { id: string; slug: string; name: string; note: string; updated_at: string; cluster_posts: { count: number }[] };

export default async function StudioClusters() {
  const { supabase } = await requireOwner();
  const [{ data }, { count: caught }] = await Promise.all([
    supabase.from("clusters").select("id, slug, name, note, updated_at, cluster_posts(count)").order("updated_at", { ascending: false }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "caught"),
  ]);
  const rows = (data ?? []) as Row[];

  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="eyebrow">Studio</p>
          <h1 style={{ fontSize: 44, fontWeight: 500, marginTop: 6 }}>Clusters</h1>
          <p className="muted" style={{ marginTop: 6, maxWidth: 640 }}>
            Your own collections of signals, for one person or one subject. Each has a private link: whoever has it sees
            the cards, and creates a free account to read them. Add signals here or with “Add to cluster” on any signal.
          </p>
        </div>
      </div>
      <StudioNav current="clusters" catchCount={caught ?? 0} />
      <NewCluster />
      {rows.length ? (
        <ul className="cluster-list">
          {rows.map((c) => (
            <li key={c.id} className="card">
              <Link href={`/c/${c.slug}`} className="name">{c.name}</Link>
              <span className="muted">
                {c.cluster_posts?.[0]?.count ?? 0} signals · changed {timeAgo(c.updated_at)}
              </span>
              <span className="actions">
                <CopyLink slug={c.slug} className="btn small ghost" />
                <Link href={`/c/${c.slug}`} className="btn small">Open</Link>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card" style={{ padding: 28 }}>
          <p className="muted">No clusters yet. Name your first one above, for example “Isabela”.</p>
        </div>
      )}
    </div>
  );
}
