"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { deleteCluster, findSignals, setInCluster, updateCluster } from "@/app/clusters/actions";

type Found = Awaited<ReturnType<typeof findSignals>>[number];

export function CopyLink({ slug, className = "btn" }: { slug: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        const url = `${window.location.origin}/c/${slug}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          window.prompt("Copy this link", url);
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? "Link copied ✓" : "Copy link"}
    </button>
  );
}

/** Yasmim's bar on a cluster: copy the link, rename, add signals, delete. */
export function ClusterOwnerBar({ id, slug, name, note, inside }: { id: string; slug: string; name: string; note: string; inside: string[] }) {
  const router = useRouter();
  const [panel, setPanel] = useState<"edit" | "add" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div style={{ marginBottom: 24 }}>
      <div className="owner-bar" role="region" aria-label="Owner tools">
        <span style={{ marginRight: "auto" }}>
          Your cluster · only people with the link see it · <Link href="/studio/clusters" style={{ color: "inherit" }}>all clusters</Link>
        </span>
        <CopyLink slug={slug} />
        <button type="button" className="btn" onClick={() => setPanel((p) => (p === "add" ? null : "add"))}>Add signals</button>
        <button type="button" className="btn" onClick={() => setPanel((p) => (p === "edit" ? null : "edit"))}>Edit</button>
        <button
          type="button"
          className="btn"
          disabled={pending}
          onClick={() => {
            if (!window.confirm(`Delete the cluster “${name}”? The link stops working. The signals stay on Sereya.`)) return;
            start(async () => {
              const r = await deleteCluster(id, slug);
              if (r.error) return setMsg(r.error);
              router.push("/studio/clusters");
            });
          }}
        >
          Delete
        </button>
      </div>
      {msg && <p className="error" role="alert" style={{ marginTop: 10 }}>{msg}</p>}
      {panel === "edit" && (
        <form
          className="card cluster-panel"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            start(async () => {
              const r = await updateCluster(id, slug, String(fd.get("name")), String(fd.get("note")));
              if (r.error) return setMsg(r.error);
              setMsg(null);
              setPanel(null);
              router.refresh();
            });
          }}
        >
          <div className="field">
            <label htmlFor="cl-name">Name</label>
            <input id="cl-name" name="name" className="input" defaultValue={name} maxLength={80} required />
          </div>
          <div className="field">
            <label htmlFor="cl-note">A note for them (optional)</label>
            <textarea id="cl-note" name="note" className="textarea" defaultValue={note} maxLength={2000} rows={3} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" disabled={pending}>Save</button>
            <button type="button" className="btn ghost" onClick={() => setPanel(null)}>Cancel</button>
          </div>
        </form>
      )}
      {panel === "add" && <AddSignals clusterId={id} inside={inside} />}
    </div>
  );
}

function AddSignals({ clusterId, inside }: { clusterId: string; inside: string[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Found[]>([]);
  const [added, setAdded] = useState<string[]>(inside);
  const [, start] = useTransition();

  useEffect(() => {
    const t = setTimeout(() => start(async () => setRows(await findSignals(q))), 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="card cluster-panel">
      <input
        className="input"
        placeholder="Search the signals by title…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
        aria-label="Search signals"
      />
      <ul className="cluster-found">
        {rows.map((r) => {
          const on = added.includes(r.id);
          return (
            <li key={r.id}>
              <span className="t">{r.title}</span>
              <span className="muted" style={{ fontSize: 13 }}>{r.format}</span>
              <button
                type="button"
                className={`btn small${on ? " ghost" : ""}`}
                onClick={() =>
                  start(async () => {
                    const r2 = await setInCluster(clusterId, r.id, !on);
                    if (r2.error) return;
                    setAdded((a) => (on ? a.filter((x) => x !== r.id) : [...a, r.id]));
                    router.refresh();
                  })
                }
              >
                {on ? "Added ✓" : "Add"}
              </button>
            </li>
          );
        })}
        {!rows.length && <li className="muted">No signals match.</li>}
      </ul>
    </div>
  );
}

export function RemoveFromCluster({ clusterId, postId }: { clusterId: string; postId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="term-tools">
      <button
        type="button"
        className="tool danger"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await setInCluster(clusterId, postId, false);
            router.refresh();
          })
        }
      >
        Remove
      </button>
    </div>
  );
}
