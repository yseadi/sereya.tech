"use client";

import { useState, useTransition } from "react";
import { ImagePicker } from "@/components/ImagePicker";
import { suggestCover } from "../glossary-actions";

const val = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

/** The card's cover photo: upload one, find one on Wikipedia, or paste a link. */
export function CoverField({ initial, position }: { initial: string; position?: string }) {
  const [url, setUrl] = useState(initial);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="field full">
      <label htmlFor="image_url">Cover photo</label>
      <input type="hidden" name="image_url" value={url} />
      {/* Notion's framing stays with its photo; a new photo starts centred. */}
      <input type="hidden" name="cover_position" value={url === initial ? position || "center 50%" : "center 50%"} />
      <div className="cover-field">
        <div className="cover-preview">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Cover preview" style={{ objectPosition: url === initial ? position : undefined }} />
          ) : (
            <span className="muted" style={{ fontSize: 13 }}>No photo yet</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 220 }}>
          <ImagePicker onUploaded={(u) => setUrl(u)} label="Upload a photo" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn small ghost"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  setMsg("Looking on Wikipedia…");
                  const r = await suggestCover(val("term"), val("aliases"), val("definition"));
                  if (r.url) {
                    setUrl(r.url);
                    setMsg("Found one. Save the card to keep it.");
                  } else setMsg(r.error ?? null);
                })
              }
            >
              Find on Wikipedia
            </button>
            {url && <button type="button" className="btn small quiet" onClick={() => setUrl("")}>Remove photo</button>}
          </div>
          <input
            id="image_url"
            className="input"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
            placeholder="or paste a photo link (https://…)"
            style={{ height: 38, fontSize: 14 }}
          />
          {msg && <span className="hint" role="status">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
