"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Avatar } from "@/components/Avatar";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { setAvatar } from "./actions";

/** Crops the photo to a centred square and makes it small, in the browser, before it goes anywhere. */
async function square(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const side = Math.min(bmp.width, bmp.height);
  const out = Math.min(480, side);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = out;
  canvas.getContext("2d")!.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, out, out);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.88));
  if (!blob) throw new Error("Couldn’t read that photo.");
  return blob;
}

export function AvatarPicker({ userId, name, url }: { userId: string; name: string; url: string }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(url);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function pick(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setMsg("That isn’t a photo.");
    setMsg(null);
    start(async () => {
      try {
        const blob = await square(file);
        const supabase = createBrowserSupabase();
        const path = `${userId}/${Date.now()}.webp`;
        const { error } = await supabase.storage.from("avatars").upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
        if (error) throw new Error(/bucket/i.test(error.message) ? "Photos aren’t set up yet. Try again later." : error.message);
        const publicUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
        const r = await setAvatar(publicUrl);
        if (r.error) throw new Error(r.error);
        setCurrent(publicUrl);
        setMsg("Photo saved.");
        router.refresh();
      } catch (e) {
        setMsg(e instanceof Error ? e.message : "Couldn’t save the photo.");
      }
    });
  }

  return (
    <div className="card avatar-picker">
      <span className="avatar-big">
        <Avatar name={name} url={current} />
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <strong>Profile photo</strong>
        <span className="hint">It shows next to your name in the menu and on your comments.</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="btn small" disabled={pending} onClick={() => input.current?.click()}>
            {pending ? "Saving…" : current ? "Change photo" : "Add a photo"}
          </button>
          {current && (
            <button
              type="button"
              className="btn quiet small"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const r = await setAvatar("");
                  if (r.error) return setMsg(r.error);
                  setCurrent("");
                  setMsg("Photo removed.");
                  router.refresh();
                })
              }
            >
              Remove
            </button>
          )}
        </div>
        {msg && <span className={/saved|removed/.test(msg) ? "notice" : "error"} role="status">{msg}</span>}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        hidden
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
