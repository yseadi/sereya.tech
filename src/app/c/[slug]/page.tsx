import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { Pearl } from "@/components/Pearl";
import { getViewer } from "@/lib/auth";
import { postSelect } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";
import type { PostWithCounts } from "@/lib/types";
import { ClusterOwnerBar, RemoveFromCluster } from "./ClusterAdmin";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };
type Cluster = { id: string; slug: string; name: string; note: string; updated_at: string; post_ids: string[] };

async function load(slug: string): Promise<Cluster | null> {
  if (!/^[a-z0-9][a-z0-9-]{2,90}$/.test(slug)) return null;
  const supabase = await createClient();
  const { data } = await supabase.rpc("cluster_by_slug", { p_slug: slug });
  return (data as Cluster | null) ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = await load(slug);
  if (!c) return { title: "Cluster" };
  const n = c.post_ids.length;
  const description = `${n} signal${n === 1 ? "" : "s"} Yasmim picked for ${c.name}.`;
  return {
    title: `${c.name} · picked by Yasmim`,
    description,
    robots: { index: false, follow: false },
    openGraph: { title: `${c.name} · picked by Yasmim`, description, url: `/c/${c.slug}` },
  };
}

export default async function ClusterPage({ params }: Params) {
  const { slug } = await params;
  const c = await load(slug);
  if (!c) notFound();
  const { supabase, user, profile } = await getViewer();
  const isOwner = profile?.role === "owner";

  let posts: PostWithCounts[] = [];
  if (c.post_ids.length) {
    const { data } = await supabase.from("posts").select(postSelect(!!user)).in("id", c.post_ids);
    const byId = new Map(((data ?? []) as unknown as PostWithCounts[]).map((p) => [p.id, p]));
    posts = c.post_ids.map((id) => byId.get(id)).filter((p): p is PostWithCounts => !!p);
  }

  // Visitors see the cards; reading a signal asks them to join first, then brings them back.
  const hrefFor = (p: PostWithCounts) =>
    user ? `/signals/${p.slug}` : `/join?from=${c.slug}&next=${encodeURIComponent(`/signals/${p.slug}`)}`;

  return (
    <div className="wrap">
      {isOwner && <ClusterOwnerBar id={c.id} slug={c.slug} name={c.name} note={c.note} inside={c.post_ids} />}
      <section className="band cluster-band">
        <div>
          <p className="eyebrow">A cluster picked by Yasmim</p>
          <h1>{c.name}</h1>
          {c.note ? <p style={{ whiteSpace: "pre-line" }}>{c.note}</p> : null}
          <p className="muted" style={{ fontSize: 15 }}>
            {posts.length} signal{posts.length === 1 ? "" : "s"}
          </p>
        </div>
        <Pearl size={150} />
      </section>

      {!user && (
        <div className="cluster-join card">
          <div>
            <strong>Want to read them?</strong>
            <p className="muted">Create a free Sereya account and every signal here opens for you.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={`/join?from=${c.slug}&next=${encodeURIComponent(`/c/${c.slug}`)}`} className="btn">Create my account</Link>
            <Link href={`/login?next=${encodeURIComponent(`/c/${c.slug}`)}`} className="btn ghost">Log in</Link>
          </div>
        </div>
      )}

      {posts.length ? (
        <div className="grid" style={{ marginTop: 28 }}>
          {posts.map((p) =>
            isOwner ? (
              <div key={p.id} className="term-wrap">
                <PostCard post={p} showCounts={!!user} href={hrefFor(p)} />
                <RemoveFromCluster clusterId={c.id} postId={p.id} />
              </div>
            ) : (
              <PostCard key={p.id} post={p} showCounts={!!user} href={hrefFor(p)} />
            ),
          )}
        </div>
      ) : (
        <div className="card" style={{ padding: 28, marginTop: 28 }}>
          <p className="muted">
            {isOwner ? "Nothing here yet. Use “Add signals” above, or “Add to cluster” on any signal." : "Nothing here yet."}
          </p>
        </div>
      )}
    </div>
  );
}
