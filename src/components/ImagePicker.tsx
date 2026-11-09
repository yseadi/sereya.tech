"use client";

import { useRef, useState, useTransition } from "react";
import { uploadImage } from "@/app/studio/upload-actions";

const MAX_SIDE = 2000;

/** Shrinks big photos in the browser so they upload fast and stay under the size limit. */
async function shrink(file: File): Promise<File> {
  if (file.type === "image/gif" || file.size < 1_200_000) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.86));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" }) : file;
  } catch {
    return file;
  }
}

/** "Upload a photo" button: sends the photo, then hands back its link. */
export function ImagePicker({ onUploaded, label = "Upload a photo" }: { onUploaded: (url: string) => void; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  function send(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setMsg("That isn’t a photo.");
    setMsg(null);
    start(async () => {
      const fd = new FormData();
      fd.set("file", await shrink(file));
      const r = await uploadImage(fd);
      if (r.error) return setMsg(r.error);
      if (r.url) {
        onUploaded(r.url);
        setMsg("Photo uploaded.");
      }
    });
  }

  return (
    <div
      className={`image-drop${over ? " over" : ""}`}
      onDragOver={(e) => (e.preventDefault(), setOver(true))}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        send(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => {
          send(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <button type="button" className="btn small" disabled={pending} onClick={() => input.current?.click()}>
        {pending ? "Uploading…" : label}
      </button>
      <span className="hint">or drop a photo here. JPG, PNG or WebP.</span>
      {msg && <span className={msg === "Photo uploaded." ? "notice" : "error"} role="status" style={{ width: "100%" }}>{msg}</span>}
    </div>
  );
}
