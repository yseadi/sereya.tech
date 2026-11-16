"use client";

/** "Save as PDF" goes through the browser's print sheet (works on iPhone too: Share › Save to Files). */
export function PrintButtons() {
  const print = (mode: "portaria" | "tudo") => {
    document.body.dataset.print = mode;
    window.print();
    setTimeout(() => delete document.body.dataset.print, 500);
  };
  return (
    <>
      <button type="button" onClick={() => print("portaria")}>
        🪪 PDF da portaria
      </button>
      <button type="button" onClick={() => print("tudo")}>
        📄 PDF completo
      </button>
    </>
  );
}
