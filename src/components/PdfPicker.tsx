"use client";

import { useRef, useState, useTransition } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { formatSize } from "@/lib/size";

export type PdfInfo = { url: string; size: number; cover?: string };

const MAX = 50 * 1024 * 1024;

/** Draws the PDF's first page as a picture, to use as the report's cover. */
async function firstPage(file: File): Promise<Blob | null> {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const page = await doc.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: Math.min(3, 1400 / base.width) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return await new Promise((r) => canvas.toBlob(r, "image/webp", 0.86));
  } catch {
    return null;
  }
}


/** Uploads a report PDF straight to storage (big files don't fit through the server) and makes its cover. */
export function PdfPicker({ value, onChange }: { value: PdfInfo | null; onChange: (v: PdfInfo | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [step, setStep] = useState("");

  function send(file?: File | null) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return setMsg("That isn’t a PDF.");
    if (file.size > MAX) return setMsg("That PDF is bigger than 50 MB.");
    setMsg(null);
    start(async () => {
      const supabase = createBrowserSupabase();
      const stamp = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}`;
      setStep("Uploading the PDF…");
      const safe = file.name.replace(/\.pdf$/i, "").normalize("NFD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "report";
      const path = `${stamp}/${safe}.pdf`;
      const up = await supabase.storage.from("reports").upload(path, file, { contentType: "application/pdf", cacheControl: "31536000" });
      if (up.error) {
        setStep("");
        return setMsg(/bucket/i.test(up.error.message) ? "The reports shelf isn’t set up yet: run the new SQL in Supabase." : `Couldn’t upload: ${up.error.message}`);
      }
      const url = supabase.storage.from("reports").getPublicUrl(path).data.publicUrl;
      setStep("Making the cover from page 1…");
      let cover: string | undefined;
      const img = await firstPage(file);
      if (img) {
        const cpath = `covers/${stamp.replace("/", "-")}.webp`;
        const c = await supabase.storage.from("images").upload(cpath, img, { contentType: "image/webp", cacheControl: "31536000" });
        if (!c.error) cover = supabase.storage.from("images").getPublicUrl(cpath).data.publicUrl;
      }
      setStep("");
      onChange({ url, size: file.size, cover });
      setMsg(cover ? "PDF uploaded. Page 1 is now the cover." : "PDF uploaded. The cover couldn’t be made: add a photo below.");
    });
  }

  return (
    <div
      className="image-drop"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        send(e.dataTransfer.files?.[0]);
      }}
    >
      <input ref={input} type="file" accept="application/pdf" hidden onChange={(e) => (send(e.target.files?.[0]), (e.target.value = ""))} />
      {value?.url ? (
        <>
          <a href={value.url} target="_blank" rel="noopener noreferrer" className="pdf-chip">PDF · {formatSize(value.size)}</a>
          <button type="button" className="btn small" disabled={pending} onClick={() => input.current?.click()}>Replace PDF</button>
          <button type="button" className="btn quiet small" disabled={pending} onClick={() => (onChange(null), setMsg(null))}>Remove</button>
        </>
      ) : (
        <>
          <button type="button" className="btn small" disabled={pending} onClick={() => input.current?.click()}>
            {pending ? step || "Working…" : "Upload the report PDF"}
          </button>
          <span className="hint">or drop it here. Up to 50 MB. People download it from the post.</span>
        </>
      )}
      {msg && <span className={/uploaded/.test(msg) ? "notice" : "error"} role="status" style={{ width: "100%" }}>{msg}</span>}
    </div>
  );
}
