"use client";

import { useState, useTransition } from "react";
import { CATEGORIES, CATEGORY_KEYS, REGIONS } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";
import { saveSettings } from "./actions";

type Props = { email: string; name: string; bio: string; categories: CategoryKey[]; regions: string[]; role: string };

export function SettingsForm(props: Props) {
  const [name, setName] = useState(props.name);
  const [bio, setBio] = useState(props.bio);
  const [cats, setCats] = useState<CategoryKey[]>(props.categories);
  const [regions, setRegions] = useState<string[]>(props.regions);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <form
      className="card"
      style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}
      onSubmit={(e) => {
        e.preventDefault();
        setMsg(null);
        start(async () => {
          const res = await saveSettings({ name, bio, categories: cats, regions });
          setMsg(res.error ? { ok: false, text: res.error } : { ok: true, text: "Saved." });
        });
      }}
    >
      <div className="field">
        <span className="label">Email</span>
        <span>{props.email}{props.role === "owner" ? " · owner" : ""}</span>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="bio">About you</label>
        <textarea id="bio" className="textarea" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={400} placeholder="What you research, where you are." />
      </div>
      <p className="eyebrow">Categories you follow</p>
      <div className="chips">
        {CATEGORY_KEYS.map((k) => (
          <button key={k} type="button" className="chip" aria-pressed={cats.includes(k)} onClick={() => setCats(toggle(cats, k))}>
            <span className="dot" style={{ background: CATEGORIES[k].dot }} />
            {CATEGORIES[k].label}
          </button>
        ))}
      </div>
      <p className="eyebrow">Regions</p>
      <div className="chips">
        {REGIONS.map((r) => (
          <button key={r} type="button" className="chip" aria-pressed={regions.includes(r)} onClick={() => setRegions(toggle(regions, r))}>
            {r}
          </button>
        ))}
      </div>
      {msg && <p className={msg.ok ? "notice" : "error"} role="status">{msg.text}</p>}
      <div>
        <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      </div>
    </form>
  );
}
