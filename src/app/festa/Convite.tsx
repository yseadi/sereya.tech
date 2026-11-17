"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { sendRsvp } from "./actions";
import { FESTA, type FestaAnswer, type FestaPerson } from "./config";
import "./festa.css";

const STORE_KEY = "festa-yas-2026";

const blankPerson = (is_child = false): FestaPerson => ({
  full_name: "",
  is_child,
  child_age: "",
  wine: false,
  soda: false,
  juice: false,
  gluten_free: false,
  vegetarian: false,
  diet_note: "",
  kid_food: "",
});

const isTest = () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("teste");

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);

export function Convite() {
  const [saved, setSaved] = useState<{ id: string; answer: FestaAnswer } | null>(null);
  const [editing, setEditing] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const onSaved = (id: string, answer: FestaAnswer) => {
    const entry = { id, answer };
    setSaved(entry);
    setEditing(false);
    try {
      if (!isTest()) localStorage.setItem(STORE_KEY, JSON.stringify(entry));
    } catch {}
    if (answer.going) setConfetti((c) => c + 1);
    requestAnimationFrame(() => document.getElementById("resposta")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const partyDays = now === null ? null : daysUntil(FESTA.startsAt);

  return (
    <div className="festa">
      <Bubbles />
      {confetti > 0 && <Confetti key={confetti} />}

      <header className="festa-hero">
        <Stickers />
        <p className="festa-hi">oie!</p>
        <h1>
          você tá convidado pro meu <span className="festa-shine">aniversário</span>
        </h1>
        <p className="festa-sign">com amor, {FESTA.host} 💜</p>
        <div className="festa-when">
          <div>
            <span className="festa-when-emoji" aria-hidden>
              📅
            </span>
            <strong>{FESTA.dateLabel}</strong>
            <span>{FESTA.timeLabel}</span>
          </div>
          {partyDays !== null && partyDays > 0 && (
            <div className="festa-count">
              <strong>{partyDays}</strong>
              <span>{partyDays === 1 ? "dia" : "dias"}</span>
            </div>
          )}
        </div>
        {FESTA.address && (
          <a className="festa-address" href={FESTA.mapsUrl} target="_blank" rel="noreferrer">
            <span aria-hidden>📍</span>
            <span>
              <strong>{FESTA.place}</strong>
              {FESTA.address}
              <em>abrir no mapa →</em>
            </span>
          </a>
        )}
      </header>

      <section id="resposta" className="festa-card">
        {saved && !editing ? (
          <Thanks saved={saved} onEdit={() => setEditing(true)} />
        ) : (
          <RsvpForm initial={editing ? saved : null} onSaved={onSaved} onCancel={saved ? () => setEditing(false) : undefined} />
        )}
      </section>

      <Dj />

      <Gifts />

      <Postcard />

      <footer className="festa-foot">
        feito com 💜 pela {FESTA.host} · <a href="https://sereya.tech">sereya.tech</a>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The form                                                            */
/* ------------------------------------------------------------------ */

function RsvpForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial: { id: string; answer: FestaAnswer } | null;
  onSaved: (id: string, answer: FestaAnswer) => void;
  onCancel?: () => void;
}) {
  const [going, setGoing] = useState<boolean | null>(initial ? initial.answer.going : null);
  const [people, setPeople] = useState<FestaPerson[]>(
    initial?.answer.people.length ? initial.answer.people : [blankPerson()],
  );
  const [contact, setContact] = useState(initial?.answer.contact_name || "");
  const [message, setMessage] = useState(initial?.answer.message || "");
  const [error, setError] = useState("");
  const [acks, setAcks] = useState<[boolean, boolean]>(initial ? [true, true] : [false, false]);
  const [deadlineDays, setDeadlineDays] = useState<number | null>(null);
  useEffect(() => setDeadlineDays(daysUntil(FESTA.deadline)), []);
  const acked = going !== true || (acks[0] && acks[1]);
  const [pending, start] = useTransition();
  const lastAdded = useRef<number | null>(null);

  useEffect(() => {
    if (lastAdded.current === null) return;
    const el = document.getElementById(`pessoa-${lastAdded.current}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.querySelector("input")?.focus({ preventScroll: true });
    lastAdded.current = null;
  }, [people.length]);

  const update = (i: number, patch: Partial<FestaPerson>) =>
    setPeople((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const add = (child: boolean) => {
    lastAdded.current = people.length;
    setPeople((ps) => [...ps, blankPerson(child)]);
  };
  const remove = (i: number) => setPeople((ps) => ps.filter((_, j) => j !== i));

  const adults = people.filter((p) => !p.is_child).length;
  const kids = people.length - adults;

  const submit = () => {
    setError("");
    if (going === null) return setError("Me conta: você vai?");
    if (!acked) {
      document.querySelector(".festa-acks")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return setError("Toca nos dois combinadinhos aí em cima 💜");
    }
    const answer: FestaAnswer = {
      going,
      contact_name: going ? people[0]?.full_name.trim() || "" : contact.trim(),
      phone: "",
      message: message.trim(),
      people: going ? people : [],
      replaces: initial?.id,
    };
    const fullName = (s: string) => s.trim().split(/\s+/).length >= 2;
    if (going) {
      const i = people.findIndex((p) => !fullName(p.full_name));
      if (i >= 0) {
        document.getElementById(`pessoa-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        return setError(
          i === 0 ? "Coloca seu nome completo, por favor (é pra portaria)." : `Falta o nome completo da pessoa ${i + 1}.`,
        );
      }
    } else if (!fullName(contact)) {
      return setError("Coloca seu nome completo, por favor.");
    }
    start(async () => {
      // ?teste in the link shows the whole send flow without saving anything.
      if (isTest()) {
        await new Promise((r) => setTimeout(r, 900));
        onSaved("teste", answer);
        return;
      }
      const res = await sendRsvp(answer);
      if (res.ok) onSaved(res.id, answer);
      else setError(res.error);
    });
  };

  return (
    <form
      className="festa-form"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2>{initial ? "mudar minha resposta" : "e aí, vem?"}</h2>
      <p className="festa-deadline">
        responde até <strong>{FESTA.deadlineLabel}</strong>
        {deadlineDays !== null && deadlineDays >= 0 && (
          <> · {deadlineDays === 0 ? "é hoje!" : deadlineDays === 1 ? "falta 1 dia" : `faltam ${deadlineDays} dias`}</>
        )}
      </p>

      <div className="festa-choice" role="radiogroup" aria-label="Você vai?">
        <button
          type="button"
          role="radio"
          aria-checked={going === true}
          className={going === true ? "is-on is-yes" : ""}
          onClick={() => setGoing(true)}
        >
          <span aria-hidden>🥳</span> vou sim!
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={going === false}
          className={going === false ? "is-on is-no" : ""}
          onClick={() => setGoing(false)}
        >
          <span aria-hidden>🥺</span> não vou conseguir
        </button>
      </div>

      {going === true && (
        <>
          <p className="festa-help">Coloca todo mundo que vai com você, um por um. Criança conta também!</p>
          <ol className="festa-people">
            {people.map((p, i) => (
              <PersonCard
                key={i}
                index={i}
                person={p}
                onChange={(patch) => update(i, patch)}
                onRemove={i > 0 ? () => remove(i) : undefined}
              />
            ))}
          </ol>
          <div className="festa-add">
            <button type="button" onClick={() => add(false)}>
              <span aria-hidden>＋🧑</span> adicionar adulto
            </button>
            <button type="button" onClick={() => add(true)}>
              <span aria-hidden>＋🧒</span> adicionar criança
            </button>
          </div>
          <p className="festa-tally" aria-live="polite">
            {adults} {adults === 1 ? "adulto" : "adultos"}
            {kids > 0 && (
              <>
                {" "}
                e {kids} {kids === 1 ? "criança" : "crianças"}
              </>
            )}
          </p>
        </>
      )}

      {going === false && (
        <label className="festa-field">
          <span>seu nome completo</span>
          <input value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="name" placeholder="Nome e sobrenome" />
        </label>
      )}

      {going !== null && (
        <>
          <label className="festa-field">
            <span>
              {going ? (
                <>
                  recadinho pra {FESTA.host} <em>(opcional)</em>
                </>
              ) : (
                <>escreva uma justificativa plausível pra não vir me ver 😡</>
              )}
            </span>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={going ? "mal posso esperar!" : "e é bom que seja convincente…"}
            />
          </label>

          {going && (
            <div className="festa-acks" role="group" aria-label="Combinados">
              <p className="festa-mini">antes de confirmar, toca pra combinar:</p>
              {[
                { emoji: "🪪", text: <>Coloquei o <strong>nome completo</strong> de todo mundo, criança também. É pra portaria!</> },
                {
                  emoji: "🍽️",
                  text: <>Se alguém precisa de <strong>comida especial</strong> (sem glúten, vegetariano, alergia…), já marquei aqui em cima.</>,
                },
              ].map((a, i) => (
                <button
                  key={i}
                  type="button"
                  role="checkbox"
                  aria-checked={acks[i]}
                  className={`festa-ack${acks[i] ? " is-on" : ""}`}
                  onClick={() => {
                    setAcks((v) => (i === 0 ? [!v[0], v[1]] : [v[0], !v[1]]));
                    setError("");
                  }}
                >
                  <span className="festa-ack-emoji" aria-hidden>
                    {a.emoji}
                  </span>
                  <span className="festa-ack-text">{a.text}</span>
                  <span className="festa-ack-tick" aria-hidden>
                    {acks[i] ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="festa-error" role="alert">
              {error}
            </p>
          )}

          <SlideToSend
            label={!acked ? "toca nos combinados ☝️" : going ? "arrasta o bolo pra confirmar" : "arrasta pra enviar"}
            pending={pending}
            locked={!acked}
            onSend={submit}
          />
          {onCancel && (
            <button type="button" className="festa-link" onClick={onCancel}>
              deixa como estava
            </button>
          )}
        </>
      )}
    </form>
  );
}

function PersonCard({
  index,
  person,
  onChange,
  onRemove,
}: {
  index: number;
  person: FestaPerson;
  onChange: (patch: Partial<FestaPerson>) => void;
  onRemove?: () => void;
}) {
  const label = index === 0 ? "você" : person.is_child ? "criança" : "adulto";
  return (
    <li id={`pessoa-${index}`} className={`festa-person${person.is_child ? " is-child" : ""}`}>
      <div className="festa-person-top">
        <span className="festa-person-tag">
          <span aria-hidden>{index === 0 ? "💜" : person.is_child ? "🧒" : "🧑"}</span> {label}
        </span>
        {onRemove && (
          <button type="button" className="festa-x" onClick={onRemove} aria-label={`Tirar pessoa ${index + 1}`}>
            ×
          </button>
        )}
      </div>
      <label className="festa-field festa-field--name">
        <span>
          nome e sobrenome, vai pra portaria
        </span>
        <input
          value={person.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
          placeholder={index === 0 ? "Seu nome completo" : "Nome completo"}
          autoComplete={index === 0 ? "name" : "off"}
          autoCapitalize="words"
        />
      </label>
      {index > 0 && (
        <div className="festa-row">
          <button
            type="button"
            className={`festa-pill${person.is_child ? " is-on" : ""}`}
            aria-pressed={person.is_child}
            onClick={() =>
              onChange({ is_child: !person.is_child, wine: person.is_child ? person.wine : false, juice: person.is_child ? false : person.juice })
            }
          >
            é criança
          </button>
          {person.is_child && (
            <label className="festa-age">
              <input
                value={person.child_age}
                onChange={(e) => onChange({ child_age: e.target.value.replace(/\D/g, "").slice(0, 2) })}
                inputMode="numeric"
                placeholder="idade"
                aria-label="Idade da criança"
              />
              <span>anos</span>
            </label>
          )}
        </div>
      )}
      <p className="festa-mini">vai beber:</p>
      <div className="festa-row">
        {!person.is_child && (
          <button
            type="button"
            className={`festa-pill festa-pill--wine${person.wine ? " is-on" : ""}`}
            aria-pressed={person.wine}
            onClick={() => onChange({ wine: !person.wine })}
          >
            🍷 vinho
          </button>
        )}
        <button
          type="button"
          className={`festa-pill festa-pill--soda${person.soda ? " is-on" : ""}`}
          aria-pressed={person.soda}
          onClick={() => onChange({ soda: !person.soda })}
        >
          🥤 refri
        </button>
        {person.is_child && (
          <button
            type="button"
            className={`festa-pill festa-pill--juice${person.juice ? " is-on" : ""}`}
            aria-pressed={!!person.juice}
            onClick={() => onChange({ juice: !person.juice })}
          >
            🧃 suco
          </button>
        )}
      </div>
      <p className="festa-mini">comida especial:</p>
      <div className="festa-row">
        <button
          type="button"
          className={`festa-pill festa-pill--gluten${person.gluten_free ? " is-on" : ""}`}
          aria-pressed={person.gluten_free}
          onClick={() => onChange({ gluten_free: !person.gluten_free })}
        >
          🌾 celíaco / sem glúten
        </button>
        <button
          type="button"
          className={`festa-pill festa-pill--veg${person.vegetarian ? " is-on" : ""}`}
          aria-pressed={!!person.vegetarian}
          onClick={() => onChange({ vegetarian: !person.vegetarian })}
        >
          🥗 vegetariano
        </button>
      </div>
      <label className="festa-field festa-field--small">
        <span className="sr-only">Outra restrição</span>
        <input
          value={person.diet_note}
          onChange={(e) => onChange({ diet_note: e.target.value })}
          placeholder="alguma alergia ou restrição? (opcional)"
        />
      </label>
      {person.is_child && (
        <label className="festa-field festa-field--kid">
          <span>🍽️ o que a criança come?</span>
          <input
            value={person.kid_food || ""}
            onChange={(e) => onChange({ kid_food: e.target.value })}
            placeholder="ex: come de tudo, só papinha, não come carne…"
          />
        </label>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Slide to send: drag the cake to the end (or just tap it)            */
/* ------------------------------------------------------------------ */

function SlideToSend({ label, pending, locked, onSend }: { label: string; pending: boolean; locked?: boolean; onSend: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ px: number; moved: boolean } | null>(null);

  const pendingRef = useRef(pending);
  pendingRef.current = pending;
  useEffect(() => {
    if (!pending) setX(0);
  }, [pending]);

  const max = () => {
    const t = track.current;
    return t ? t.clientWidth - 64 : 200;
  };

  return (
    <div ref={track} className={`festa-slide${pending ? " is-pending" : ""}${locked ? " is-locked" : ""}`}>
      <span className="festa-slide-fill" style={{ width: x + 60 }} />
      <span className="festa-slide-label">{pending ? "enviando…" : label}</span>
      <button
        type="button"
        className="festa-slide-knob"
        style={{ transform: `translateX(${x}px)`, transition: dragging ? "none" : undefined }}
        aria-label={`${label} (ou toque aqui)`}
        disabled={pending}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { px: e.clientX - x, moved: false };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          const nx = Math.max(0, Math.min(max(), e.clientX - start.current.px));
          if (Math.abs(nx - x) > 3) start.current.moved = true;
          setX(nx);
        }}
        onPointerUp={() => {
          const s = start.current;
          start.current = null;
          setDragging(false);
          if (!s) return;
          if (!s.moved || x > max() * 0.8) {
            if (!locked) setX(max());
            onSend();
            // If the form had something missing, slide the cake back.
            setTimeout(() => {
              if (!pendingRef.current) setX(0);
            }, 350);
          } else setX(0);
        }}
        onPointerCancel={() => {
          start.current = null;
          setDragging(false);
          setX(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSend();
          }
        }}
      >
        <span aria-hidden>{pending ? "🫧" : "🎂"}</span>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* After answering                                                     */
/* ------------------------------------------------------------------ */

/** First name, lowercase, like the rest of the page ("yasmim"). */
function firstName(full: string) {
  return (full.trim().split(/\s+/)[0] || "").toLocaleLowerCase("pt-BR");
}

/** "a", "a & b", "a, b & c" */
function joinNames(names: string[]) {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** Title on the "going" screen: named, and children become "seu tesourinho" / "seus tesouros". */
function yayTitle(a: FestaAnswer) {
  const adults = a.people.filter((p) => !p.is_child).map((p) => firstName(p.full_name)).filter(Boolean);
  const kids = a.people.filter((p) => p.is_child).length;
  if (adults.length === 0) {
    const all = a.people.map((p) => firstName(p.full_name)).filter(Boolean);
    return all.length > 1 ? `eba, ${joinNames(all)}! ✨ vejo vcs dia 28! ♡` : `eba, ${all[0] ?? ""}! ✨ te vejo dia 28! ♡`;
  }
  const who = joinNames(adults);
  if (kids === 1) return `eba, ${who} e seu tesourinho ♡`;
  if (kids > 1) return `eba, ${who} e seus tesouros ♡`;
  return adults.length > 1 ? `eba, ${who}! ✨ vejo vcs dia 28! ♡` : `eba, ${who}! ✨ te vejo dia 28! ♡`;
}

function Thanks({ saved, onEdit }: { saved: { id: string; answer: FestaAnswer }; onEdit: () => void }) {
  const a = saved.answer;
  const ics = useMemo(() => {
    const start = new Date(FESTA.startsAt);
    const end = new Date(start.getTime() + 6 * 3600_000);
    const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const body = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//sereya.tech//festa//PT",
      "BEGIN:VEVENT",
      `UID:festa-yas-2026@sereya.tech`,
      `DTSTAMP:${f(new Date())}`,
      `DTSTART:${f(start)}`,
      `DTEND:${f(end)}`,
      `SUMMARY:${FESTA.title} 🎂`,
      FESTA.address ? `LOCATION:${`${FESTA.place}, ${FESTA.address}`.replace(/,/g, "\\,")}` : "",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
  }, []);

  if (!a.going) {
    return (
      <div className="festa-thanks">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="festa-thanks-photo festa-thanks-photo--no" src={FESTA.thanksPhoto.notGoing} alt="mini Yas chorando" />
        <h2>que pena, {firstName(a.contact_name)} 🥲 obrigada por avisar</h2>
        <p>Você vai fazer falta. Se mudar de ideia, pode mudar a resposta aqui!</p>
        <button type="button" className="festa-btn" onClick={onEdit}>
          mudei de ideia
        </button>
      </div>
    );
  }
  return (
    <div className="festa-thanks">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="festa-thanks-photo" src={FESTA.thanksPhoto.going} alt="mini Yas de óculos escuros" />
      <h2>{yayTitle(a)}</h2>
      <p>
        Te espero {FESTA.dateLabel}, {FESTA.timeLabel}.
      </p>
      {FESTA.address && (
        <a className="festa-address festa-address--thanks" href={FESTA.mapsUrl} target="_blank" rel="noreferrer">
          <span aria-hidden>📍</span>
          <span>
            <strong>{FESTA.place}</strong>
            {FESTA.address}
            <em>abrir no mapa →</em>
          </span>
        </a>
      )}
      <ul className="festa-thanks-list">
        {a.people.map((p, i) => (
          <li key={i}>
            <span aria-hidden>{p.is_child ? "🧒" : "🧑"}</span> {p.full_name}
            <small>
              {[p.wine && "🍷", p.soda && "🥤", p.juice && "🧃", p.gluten_free && "🌾 sem glúten", p.vegetarian && "🥗 vegetariano"].filter(Boolean).join(" ")}
            </small>
          </li>
        ))}
      </ul>
      <div className="festa-thanks-actions">
        <a className="festa-btn" href={ics} download="aniversario-da-yas.ics">
          📅 salvar na agenda
        </a>
        <button type="button" className="festa-btn festa-btn--ghost" onClick={onEdit}>
          mudar minha resposta
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Closing postcard: Marseille on the front, a note on the back        */
/* ------------------------------------------------------------------ */

function Postcard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <section className="festa-gallery" aria-label="Cartão postal">
      <h2>um postal pra você</h2>
      <p className="festa-gifts-sub">toca pra virar</p>
      <button
        type="button"
        className={`festa-postcard${flipped ? " is-flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Ver a foto" : "Ler o verso do postal"}
      >
        <span className="festa-postcard-inner">
          <span className="festa-postcard-face">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FESTA.heroPhoto.src} alt="Yas em Marseille" />
            <span className="festa-postcard-cap">Marseille, 2026</span>
          </span>
          <span className="festa-postcard-face festa-postcard-back">
            <span className="festa-postcard-top" aria-hidden>
              <span className="festa-postcard-mark">
                MARSEILLE
                <br />
                ✦ 2026 ✦
              </span>
              <span className="festa-postcard-stamp">
                <span>🎂</span>
                <small>28·11</small>
              </span>
            </span>
            <span className="festa-postcard-note">
              essa foi minha foto favorita de 2026, porque foi a primeira vez que visitei Marseille, a cidade que virou
              meu lugar preferido no mundo&nbsp;♡
              <br />
              a próxima vai ser a que vamos tirar dia&nbsp;28&nbsp;♡
              <br />
              <strong>até lá, Yas</strong>
            </span>
          </span>
        </span>
      </button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Little decorations                                                  */
/* ------------------------------------------------------------------ */

function Stickers() {
  const list = [
    { e: "🎈", x: 4, y: 4 },
    { e: "star", x: 84, y: 3 },
    { e: "🍰", x: 86, y: 34 },
    { e: "star2", x: 3, y: 24 },
    { e: "🫧", x: 88, y: 60 },
  ];
  const [pos, setPos] = useState(list.map((s) => ({ dx: 0, dy: 0 })));
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  return (
    <>
      {list.map((s, i) => (
        <span
          key={i}
          className="festa-sticker"
          aria-hidden
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `translate(${pos[i].dx}px, ${pos[i].dy}px)`,
            animationDelay: `${i * 0.7}s`,
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { i, sx: e.clientX, sy: e.clientY, ox: pos[i].dx, oy: pos[i].dy };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.i !== i) return;
            setPos((ps) => ps.map((p, j) => (j === i ? { dx: d.ox + e.clientX - d.sx, dy: d.oy + e.clientY - d.sy } : p)));
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          {s.e.startsWith("star") ? <Star8 color={s.e === "star" ? "#b9a5ee" : "#a9dcca"} /> : s.e}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* DJ: a vinyl you can scratch                                         */
/* ------------------------------------------------------------------ */

function Dj() {
  const disc = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState<number | null>(null);
  const grab = useRef<{ a0: number; start: number } | null>(null);
  const pointerAngle = (e: React.PointerEvent) => {
    const r = disc.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  return (
    <section className="festa-dj">
      <div
        ref={disc}
        className={`festa-vinyl${angle !== null ? " is-scratching" : ""}`}
        style={angle !== null ? { rotate: `${angle}deg` } : undefined}
        aria-hidden
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const start = parseFloat(getComputedStyle(e.currentTarget).rotate) || 0;
          grab.current = { a0: pointerAngle(e), start };
          setAngle(start);
        }}
        onPointerMove={(e) => {
          const g = grab.current;
          if (g) setAngle(g.start + pointerAngle(e) - g.a0);
        }}
        onPointerUp={() => {
          grab.current = null;
          setAngle(null);
        }}
        onPointerCancel={() => {
          grab.current = null;
          setAngle(null);
        }}
      >
        <span className="festa-vinyl-label">
          <Star8 color="#b9a5ee" />
        </span>
      </div>
      <div>
        <p className="festa-dj-kicker">🎧 vai ter som!</p>
        <h2>{FESTA.dj} tocando</h2>
        <p className="festa-dj-sub">a trilha da tarde fica por conta dele</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gift ideas: little cards that flip                                  */
/* ------------------------------------------------------------------ */

function Gifts() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <section className="festa-gifts">
      <h2>ideias de presente</h2>
      <p className="festa-gifts-sub">se quiser me presentear, essas são coisas que eu ia amar 🫶 toca nas cartinhas</p>
      <div className="festa-gift-row">
        {FESTA.gifts.map((g, i) => {
          const on = open.has(i);
          return (
            <button
              key={i}
              type="button"
              className={`festa-gift festa-gift--${i % 6}${on ? " is-open" : ""}`}
              aria-pressed={on}
              onClick={() =>
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
            >
              <span className="festa-gift-inner">
                <span className="festa-gift-face">
                  <span className="festa-gift-emoji" aria-hidden>
                    {g.emoji}
                  </span>
                  <strong>{g.front}</strong>
                  <small>toca pra abrir</small>
                </span>
                <span className="festa-gift-face festa-gift-back">{g.back}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** The eight-point star from Arab tilework, for Yas's roots. */
function Star8({ color }: { color: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" style={{ display: "block" }}>
      <g fill={color} stroke="#fff" strokeWidth="4" strokeLinejoin="round">
        <rect x="20" y="20" width="60" height="60" rx="4" />
        <rect x="20" y="20" width="60" height="60" rx="4" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="11" fill="#fff" />
    </svg>
  );
}

function Bubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 53) % 100,
        size: 10 + ((i * 37) % 34),
        delay: (i * 1.3) % 11,
        dur: 11 + ((i * 7) % 9),
      })),
    [],
  );
  return (
    <div className="festa-bubbles" aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2.2 + Math.random() * 1.8,
        rot: Math.random() * 720 - 360,
        drift: Math.random() * 120 - 60,
        color: ["#b9a5ee", "#f6c1cc", "#f3dcae", "#a9dcca", "#b7d3f4", "#5b4a9e"][i % 6],
        round: i % 3 === 0,
      })),
    [],
  );
  return (
    <div className="festa-confetti" aria-hidden>
      {bits.map((b, i) => (
        <span
          key={i}
          style={
            {
              left: `${b.left}%`,
              background: b.color,
              borderRadius: b.round ? "50%" : 2,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              "--rot": `${b.rot}deg`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
