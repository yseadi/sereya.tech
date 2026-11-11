import Link from "next/link";
import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import type { GlossaryTerm } from "@/lib/types";
import { TermForm } from "../TermForm";

export const metadata = { title: "Glossary card · Studio" };
export const dynamic = "force-dynamic";

export default async function EditTerm({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const { supabase } = await requireOwner();
  let term: GlossaryTerm | undefined;
  if (id !== "new") {
    if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
    const { data } = await supabase
      .from("concha_terms")
      .select("id, term, slug, aliases, definition, category, image_url, cover_position, published, updated_at")
      .eq("id", id)
      .eq("kind", "glossary")
      .maybeSingle();
    if (!data) notFound();
    term = data as GlossaryTerm;
  }
  return (
    <div className="wrap narrow">
      <Link href="/studio/glossary" className="eyebrow" style={{ textDecoration: "none" }}>← Glossary</Link>
      <h1 style={{ fontSize: 40, fontWeight: 500, margin: "8px 0 20px" }}>{term ? term.term : "New card"}</h1>
      <TermForm key={term?.id ?? "new"} term={term} justSaved={saved === "1"} />
    </div>
  );
}
