import Link from "next/link";
import { CategoryPill } from "@/components/CategoryPill";
import { requireOwner } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { commentCount, likeCount } from "@/lib/posts";
import type { PostWithCounts } from "@/lib/types";

export const metadata = { title: "Studio" };
export const dynamic = "force-dynamic";

export default async function StudioPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show } = await searchParams;
  const { supabase } = await requireOwner();
  let q = supabase
    .from("posts")
    .select("*, post_likes(count), comments(count)")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (show === "drafts") q = q.eq("status", "draft");
  if (show === "notake") q = q.eq("take", "");
  const { data } = await q;
  const posts = (data ?? []) as unknown as PostWithCounts[];
  const [{ count: members }, { count: talk }] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("comments").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="eyebrow">Studio</p>
          <h1 style={{ fontSize: 44, fontWeight: 500, marginTop: 6 }}>Your desk</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            {members ?? 0} members · {talk ?? 0} comments. Only you see this page.
          </p>
        </div>
        <Link href="/studio/new" className="btn">New signal</Link>
      </div>
      <nav className="chips" aria-label="Show" style={{ marginBottom: 18 }}>
        <Link href="/studio" className="chip" aria-current={!show ? "true" : undefined}>Everything</Link>
        <Link href="/studio?show=drafts" className="chip" aria-current={show === "drafts" ? "true" : undefined}>Drafts</Link>
        <Link href="/studio?show=notake" className="chip" aria-current={show === "notake" ? "true" : undefined}>Waiting for your take</Link>
      </nav>
      <div className="card table-box">
        <table className="studio-table">
          <thead>
            <tr>
              <th scope="col">Signal</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Your take</th>
              <th scope="col">Likes</th>
              <th scope="col">Comments</th>
              <th scope="col">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td style={{ minWidth: 260 }}>
                  <Link href={`/studio/${p.id}`} style={{ fontWeight: 600, textDecoration: "none" }}>{p.title}</Link>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {p.source_name}
                    {p.is_pearl ? " · Pearl" : ""}
                    {p.status === "published" ? (
                      <>
                        {" · "}
                        <Link href={`/signals/${p.slug}`}>open</Link>
                      </>
                    ) : null}
                  </div>
                </td>
                <td><CategoryPill category={p.category} /></td>
                <td>{p.status === "published" ? "Published" : "Draft"}</td>
                <td>{p.take ? "Written" : <span className="muted">Not yet</span>}</td>
                <td>{likeCount(p)}</td>
                <td>{commentCount(p)}</td>
                <td className="muted" style={{ whiteSpace: "nowrap" }}>{timeAgo(p.updated_at)}</td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">Nothing here.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
