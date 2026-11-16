import "server-only";
import { requireFestaOwner } from "../owner";

export type ListaPerson = {
  id: string;
  position: number;
  full_name: string;
  is_child: boolean;
  child_age: number | null;
  wine: boolean;
  soda: boolean;
  juice: boolean;
  gluten_free: boolean;
  vegetarian: boolean;
  diet_note: string;
  kid_food: string;
};
export type ListaRsvp = {
  id: string;
  created_at: string;
  going: boolean;
  contact_name: string;
  phone: string;
  message: string;
  festa_people: ListaPerson[];
};

export async function loadLista() {
  const { supabase } = await requireFestaOwner();
  const { data, error } = await supabase
    .from("festa_rsvps")
    .select("id, created_at, going, contact_name, phone, message, festa_people(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const rsvps = ((data || []) as ListaRsvp[]).map((r) => ({
    ...r,
    festa_people: [...(r.festa_people || [])].sort((a, b) => a.position - b.position),
  }));
  const going = rsvps.filter((r) => r.going);
  const people = going
    .flatMap((r) => r.festa_people.map((p) => ({ ...p, group: r.contact_name })))
    .sort((a, b) => a.full_name.localeCompare(b.full_name, "pt-BR"));
  const kids = people.filter((p) => p.is_child);
  
  return {
    rsvps,
    going,
    notGoing: rsvps.filter((r) => !r.going),
    people,
    totals: {
      people: people.length,
      adults: people.length - kids.length,
      kids: kids.length,
      wine: people.filter((p) => p.wine).length,
      soda: people.filter((p) => p.soda).length,
      juice: people.filter((p) => p.juice).length,
      glutenFree: people.filter((p) => p.gluten_free).length,
      vegetarian: people.filter((p) => p.vegetarian).length,
    },
  };
}

export const fmtWhen = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
