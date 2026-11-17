/** Everything about the party that Yasmim may want to change lives here. */
export const FESTA = {
  host: "Yas",
  title: "Aniversário da Yas",
  /** Saturday 28/11/2026 from 14h, Brasília time. */
  startsAt: "2026-11-28T14:00:00-03:00",
  dateLabel: "sábado, 28 de novembro",
  timeLabel: "a partir das 14h",
  /** Answers are welcome until the end of this day. */
  deadline: "2026-11-20T23:59:59-03:00",
  deadlineLabel: "sexta, 20/11",
  /** Leave empty to keep the address out of the invite (sent by WhatsApp instead). */
  place: "Condomínio Vilas do Mar",
  address: "Rod. Pref. João Luiz da Silva, 1181, Costa do Rio, Passo de Torres, SC, 88980-000, Brasil",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Condomínio Vilas do Mar, Rod. Pref. João Luiz da Silva, 1181, Passo de Torres, SC"),
  dj: "DJ Gustavo",
  gifts: [
    { emoji: "🇱🇧", front: "um pedacinho do Líbano", back: "qualquer coisa que conecte com minhas raízes: um curso, uma camiseta, um vinil da Fairuz, um chaveiro, um cartão postal, um moodboard, um livro, um artigo que você encontrou…" },
    { emoji: "✍️", front: "o que você aprendeu comigo", back: "uma cartinha escrita à mão contando a última coisa que você aprendeu comigo" },
    { emoji: "💌", front: "algo pra me ensinar", back: "uma cartinha escrita à mão com algo que você queira me ensinar pq você acha que eu vou gostar muito!" },
    { emoji: "🎶", front: "uma playlist", back: "com as músicas que fazem você lembrar de mim" },
    { emoji: "🗺️", front: "lugares com a minha cara", back: "uma curadoria de lugares que você ache a minha cara, pode ser em qualquer lugar do mundo" },
    { emoji: "📌", front: "um moodboard", back: "no Pinterest, com imagens que você acha que têm a minha vibe" },
  ],
  /** Photos live in public/festa/fotos/. Marseille closes the page as a postcard. */
  heroPhoto: { src: "/festa/fotos/marseille.jpg", caption: "marseille 🫧" },
  /** Shown on the screen after answering: yes, or no. */
  thanksPhoto: { going: "/festa/fotos/sim.jpg", notGoing: "/festa/fotos/nao.jpg" },
};

export type FestaPerson = {
  full_name: string;
  is_child: boolean;
  child_age: string;
  wine: boolean;
  soda: boolean;
  juice?: boolean;
  gluten_free: boolean;
  vegetarian?: boolean;
  diet_note: string;
  kid_food?: string;
};

export type FestaAnswer = {
  going: boolean;
  contact_name: string;
  phone: string;
  message: string;
  people: FestaPerson[];
  replaces?: string;
};
