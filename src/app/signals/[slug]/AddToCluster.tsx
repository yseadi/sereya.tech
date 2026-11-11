"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { createCluster, setInCluster } from "@/app/clusters/actions";

type C = { id: string; slug: string; name: string };

/** Owner only: tick the clusters this signal belongs to, or start a new one with it. */
export function AddToCluster({ postId, clusters, inside }: { postId: string; clusters: C[]; inside: string[] }) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(clusters);
  const [on, setOn] = useState(inside);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="cluster-pick" ref={box}>
      <button type="button" className="btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        Add to cluster{on.length ? ` · ${on.length}` : ""}
      </button>
      {open && (
        <div className="cluster-menu" role="dialog" aria-label="Clusters">
          {list.length ? (
            <ul>
              {list.map((c) => {
                const checked = on.includes(c.id);
                return (
                  <li key={c.id}>
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={pending}
                        onChange={() =>
                          start(async () => {
                            const r = await setInCluster(c.id, postId, !checked);
                            if (r.error) return setError(r.error);
                            setOn((o) => (checked ? o.filter((x) => x !== c.id) : [...o, c.id]));
                          })
                        }
                      />
                      <span>{c.name}</span>
                    </label>
                    <Link href={`/c/${c.slug}`} className="muted" style={{ fontSize: 13 }}>open</Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="muted" style={{ fontSize: 14 }}>No clusters yet.</p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              start(async () => {
                const r = await createCluster(name, "", postId);
                if (r.error || !r.id || !r.slug) return setError(r.error ?? "Couldn’t create.");
                setList((l) => [{ id: r.id!, slug: r.slug!, name: name.trim() }, ...l]);
                setOn((o) => [...o, r.id!]);
                setName("");
                setError(null);
              });
            }}
          >
            <input className="input" placeholder="New cluster, e.g. Isabela" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            <button className="btn small" disabled={pending || !name.trim()}>Create</button>
          </form>
          {error && <p className="error" role="alert">{error}</p>}
        </div>
      )}
    </div>
  );
}
