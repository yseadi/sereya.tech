"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createCluster } from "@/app/clusters/actions";

export function NewCluster() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="card cluster-new"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        start(async () => {
          const r = await createCluster(String(fd.get("name")), String(fd.get("note") ?? ""));
          if (r.error) return setError(r.error);
          router.push(`/c/${r.slug}`);
        });
      }}
    >
      <div className="field" style={{ flex: "1 1 220px" }}>
        <label htmlFor="new-cl">New cluster</label>
        <input id="new-cl" name="name" className="input" placeholder="Isabela" maxLength={80} required />
      </div>
      <div className="field" style={{ flex: "2 1 320px" }}>
        <label htmlFor="new-cl-note">A note for them (optional)</label>
        <input id="new-cl-note" name="note" className="input" placeholder="What I’ve been reading lately" maxLength={2000} />
      </div>
      <button className="btn" disabled={pending} style={{ alignSelf: "flex-end" }}>Create</button>
      {error && <p className="error" role="alert" style={{ flexBasis: "100%" }}>{error}</p>}
    </form>
  );
}
