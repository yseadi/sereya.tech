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
  gluten_free: false,
  diet_note: "",
});

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
      localStorage.setItem(STORE_KEY, JSON.stringify(entry));
    } catch {}
    if (answer.going) setConfetti((c) => c + 1);
    requestAnimationFrame(() => document.getElementById("resposta")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const partyDays = now === null ? null : daysUntil(FESTA.startsAt);
  const deadlineDays = now === null ? null : daysUntil(FESTA.deadline);

  return (
    <div className="festa">
      <Bubbles />
      {confetti > 0 && <Confetti key={confetti} />}

      <header className="festa-hero">
        <Stickers />
        <p className="festa-hi">
          oie! <span lang="ar">أهلاً</span>
        </p>
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
        {FESTA.heroPhoto && (
          <figure className="festa-hero-photo">
            <div className="festa-arch">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FESTA.heroPhoto.src} alt={`${FESTA.host} em ${FESTA.heroPhoto.caption}`} style={{ objectPosition: FESTA.heroPhoto.position }} />
            </div>
            <figcaption>{FESTA.heroPhoto.caption}</figcaption>
          </figure>
        )}
      </header>

      <Polaroids />

      <section className="festa-notes">
        <div className="festa-note festa-note--lilac">
          <span aria-hidden>💌</span>
          <p>
            preciso que você confirme até <strong>{FESTA.deadlineLabel}</strong> pra eu organizar os comes e bebes
            {deadlineDays !== null && deadlineDays >= 0 && (
              <em> ({deadlineDays === 0 ? "é hoje!" : deadlineDays === 1 ? "falta 1 dia" : `faltam ${deadlineDays} dias`})</em>
            )}
          </p>
        </div>
        <div className="festa-note festa-note--champagne">
          <span aria-hidden>🌾</span>
          <p>
            se você for <strong>celíaco</strong> ou não puder comer <strong>glúten</strong> (ou tiver outra restrição), me
            avisa aqui embaixo
          </p>
        </div>
        <div className="festa-note festa-note--mint">
          <span aria-hidden>🪪</span>
          <p>
            preciso do <strong>nome completo</strong> de cada pessoa pra passar pra portaria, criança também
          </p>
        </div>
      </section>

      <section id="resposta" className="festa-card">
        {saved && !editing ? (
          <Thanks saved={saved} onEdit={() => setEditing(true)} />
        ) : (
          <RsvpForm initial={editing ? saved : null} onSaved={onSaved} onCancel={saved ? () => setEditing(false) : undefined} />
        )}
      </section>

      <footer className="festa-foot">
        feito com 💜 pela {FESTA.host} <span lang="ar">ياسمين</span> · <a href="https://sereya.tech">sereya.tech</a>
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
  const [phone, setPhone] = useState(initial?.answer.phone || "");
  const [message, setMessage] = useState(initial?.answer.message || "");
  const [error, setError] = useState("");
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
    const answer: FestaAnswer = {
      going,
      contact_name: going ? people[0]?.full_name.trim() || "" : contact.trim(),
      phone: phone.trim(),
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
              seu WhatsApp <em>(opcional, caso eu precise falar com você)</em>
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="(11) 9 0000-0000"
            />
          </label>
          <label className="festa-field">
            <span>
              recadinho pra {FESTA.host} <em>(opcional)</em>
            </span>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={going ? "mal posso esperar!" : "vou sentir falta…"}
            />
          </label>

          {error && (
            <p className="festa-error" role="alert">
              {error}
            </p>
          )}

          <SlideToSend label={going ? "arrasta o bolo pra confirmar" : "arrasta pra enviar"} pending={pending} onSend={submit} />
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
      <label className="festa-field">
        <span className="sr-only">Nome completo</span>
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
            onClick={() => onChange({ is_child: !person.is_child, wine: person.is_child ? person.wine : false })}
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
      </div>
      <p className="festa-mini">comida:</p>
      <div className="festa-row">
        <button
          type="button"
          className={`festa-pill festa-pill--gluten${person.gluten_free ? " is-on" : ""}`}
          aria-pressed={person.gluten_free}
          onClick={() => onChange({ gluten_free: !person.gluten_free })}
        >
          🌾 celíaco / sem glúten
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
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Slide to send: drag the cake to the end (or just tap it)            */
/* ------------------------------------------------------------------ */

function SlideToSend({ label, pending, onSend }: { label: string; pending: boolean; onSend: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ px: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (!pending) setX(0);
  }, [pending]);

  const max = () => {
    const t = track.current;
    return t ? t.clientWidth - 64 : 200;
  };

  return (
    <div ref={track} className={`festa-slide${pending ? " is-pending" : ""}`}>
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
            setX(max());
            onSend();
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
        <p className="festa-thanks-emoji" aria-hidden>
          🫶
        </p>
        <h2>que pena! obrigada por avisar</h2>
        <p>Vou sentir sua falta. Se mudar de ideia, é só mudar a resposta aqui.</p>
        <button type="button" className="festa-btn" onClick={onEdit}>
          mudei de ideia
        </button>
      </div>
    );
  }
  return (
    <div className="festa-thanks">
      <p className="festa-thanks-emoji" aria-hidden>
        🥳
      </p>
      <h2>eba! tá confirmado</h2>
      <p>
        Te espero {FESTA.dateLabel}, {FESTA.timeLabel}.
      </p>
      <ul className="festa-thanks-list">
        {a.people.map((p, i) => (
          <li key={i}>
            <span aria-hidden>{p.is_child ? "🧒" : "🧑"}</span> {p.full_name}
            <small>
              {[p.wine && "🍷", p.soda && "🥤", p.gluten_free && "🌾 sem glúten"].filter(Boolean).join(" ")}
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
/* Draggable polaroids                                                 */
/* ------------------------------------------------------------------ */

const DOODLES = [
  { emoji: "🎂", caption: "tem bolo!", bg: "linear-gradient(140deg,#fbedef,#e2daf2)" },
  { emoji: "🥂", caption: "e brinde", bg: "linear-gradient(140deg,#fbf3e6,#fbedef)" },
  { emoji: "🫧", caption: "28/11", bg: "linear-gradient(140deg,#eaf2fc,#e8f5f1)" },
  { emoji: "💜", caption: "vem!", bg: "linear-gradient(140deg,#e2daf2,#eaf2fc)" },
  { emoji: "🎈", caption: "sábado, 14h", bg: "linear-gradient(140deg,#e8f5f1,#fbf3e6)" },
];

type Card = { x: number; y: number; r: number; z: number };

function Polaroids() {
  const box = useRef<HTMLDivElement>(null);
  const items = FESTA.photos.length ? FESTA.photos.map((p) => ({ ...p, emoji: "", bg: "" })) : DOODLES.map((d) => ({ ...d, src: "", position: undefined as string | undefined }));
  const [cards, setCards] = useState<Card[]>(() =>
    items.map((_, i) => ({ x: 0, y: 0, r: [-8, 6, -3, 9, -6, 4, -10, 7][i % 8], z: i + 1 })),
  );
  const [ready, setReady] = useState(false);
  const [held, setHeld] = useState<number | null>(null);
  const [nudged, setNudged] = useState(false);
  const drag = useRef<{ i: number; dx: number; dy: number; vx: number; vy: number; t: number; lx: number; ly: number } | null>(null);
  const zTop = useRef(items.length + 1);

  // Fan the cards out once we know the box size.
  useEffect(() => {
    const b = box.current;
    if (!b) return;
    const w = b.clientWidth;
    const h = b.clientHeight;
    const cw = 150;
    const ch = 180;
    setCards((cs) =>
      cs.map((c, i) => {
        const n = cs.length;
        const t = n === 1 ? 0.5 : i / (n - 1);
        return { ...c, x: 8 + t * (w - cw - 16), y: (h - ch) / 2 + Math.sin(t * Math.PI * 3) * 70 };
      }),
    );
    setReady(true);
  }, []);

  const bounds = () => {
    const b = box.current;
    return { w: (b?.clientWidth || 320) - 150, h: (b?.clientHeight || 320) - 180 };
  };

  const fling = (i: number, vx: number, vy: number) => {
    let last = performance.now();
    const step = (t: number) => {
      const dt = Math.min(32, t - last) / 16;
      last = t;
      vx *= Math.pow(0.9, dt);
      vy *= Math.pow(0.9, dt);
      const { w, h } = bounds();
      let stop = Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3;
      setCards((cs) =>
        cs.map((c, j) => {
          if (j !== i) return c;
          let x = c.x + vx * dt;
          let y = c.y + vy * dt;
          if (x < -30 || x > w + 30) {
            vx = -vx * 0.6;
            x = Math.max(-30, Math.min(w + 30, x));
          }
          if (y < -30 || y > h + 30) {
            vy = -vy * 0.6;
            y = Math.max(-30, Math.min(h + 30, y));
          }
          return { ...c, x, y, r: c.r + vx * 0.15 * dt };
        }),
      );
      if (drag.current?.i === i) stop = true;
      if (!stop) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section className="festa-play" aria-label="Fotos">
      <div ref={box} className={`festa-polaroids${ready ? " is-ready" : ""}`}>
        {items.map((it, i) => {
          const c = cards[i];
          return (
            <div
              key={i}
              className={`festa-polaroid${held === i ? " is-held" : ""}`}
              style={{
                transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg) scale(${held === i ? 1.08 : 1})`,
                zIndex: c.z,
                animationDelay: `${i * 0.12}s`,
              }}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                const z = ++zTop.current;
                setCards((cs) => cs.map((cc, j) => (j === i ? { ...cc, z } : cc)));
                drag.current = { i, dx: e.clientX - c.x, dy: e.clientY - c.y, vx: 0, vy: 0, t: performance.now(), lx: e.clientX, ly: e.clientY };
                setHeld(i);
                setNudged(true);
              }}
              onPointerMove={(e) => {
                const d = drag.current;
                if (!d || d.i !== i) return;
                const now = performance.now();
                const dt = Math.max(1, now - d.t) / 16;
                d.vx = (e.clientX - d.lx) / dt;
                d.vy = (e.clientY - d.ly) / dt;
                d.lx = e.clientX;
                d.ly = e.clientY;
                d.t = now;
                setCards((cs) =>
                  cs.map((cc, j) => (j === i ? { ...cc, x: e.clientX - d.dx, y: e.clientY - d.dy, r: cc.r * 0.9 + d.vx * 0.4 } : cc)),
                );
              }}
              onPointerUp={() => {
                const d = drag.current;
                drag.current = null;
                setHeld(null);
                if (d && d.i === i) fling(i, d.vx, d.vy);
              }}
              onPointerCancel={() => {
                drag.current = null;
                setHeld(null);
              }}
            >
              <div className="festa-polaroid-img" style={it.bg ? { background: it.bg } : undefined}>
                {it.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.src} alt="" draggable={false} loading="lazy" style={{ objectPosition: it.position }} />
                ) : (
                  <span aria-hidden>{it.emoji}</span>
                )}
              </div>
              <p>{it.caption}</p>
            </div>
          );
        })}
      </div>
      <p className={`festa-hint${nudged ? " is-gone" : ""}`}>
        <span aria-hidden>👆</span> arrasta e joga as fotos
      </p>
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
