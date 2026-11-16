import { fmtWhen, loadLista } from "../data";

export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  const s = String(v ?? "");
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** One row per guest. Semicolons + BOM so Excel and Numbers in Brasil open it straight away. */
export async function GET() {
  const { rsvps } = await loadLista();
  const rows: unknown[][] = [
    ["nome completo", "vai", "criança", "idade", "vinho", "refri", "sem glúten", "restrição", "quem respondeu", "whatsapp", "recado", "respondido em"],
  ];
  for (const r of rsvps) {
    if (!r.going) {
      rows.push([r.contact_name, "não", "", "", "", "", "", "", r.contact_name, r.phone, r.message, fmtWhen(r.created_at)]);
      continue;
    }
    for (const p of r.festa_people) {
      rows.push([
        p.full_name,
        "sim",
        p.is_child ? "sim" : "",
        p.child_age ?? "",
        p.wine ? "sim" : "",
        p.soda ? "sim" : "",
        p.gluten_free ? "sim" : "",
        p.diet_note,
        r.contact_name,
        r.phone,
        r.message,
        fmtWhen(r.created_at),
      ]);
    }
  }
  const csv = "﻿" + rows.map((row) => row.map(cell).join(";")).join("\r\n");
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="festa-yas-confirmados.csv"',
      "cache-control": "no-store",
    },
  });
}
