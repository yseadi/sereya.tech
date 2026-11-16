import type { Metadata } from "next";
import { deleteRsvp } from "../actions";
import { FESTA } from "../config";
import "../festa.css";
import { fmtWhen, loadLista } from "./data";
import { PrintButtons } from "./PrintButtons";

export const metadata: Metadata = { title: { absolute: "Lista da festa" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const drinks = (p: { wine: boolean; soda: boolean }) => [p.wine && "🍷 vinho", p.soda && "🥤 refri"].filter(Boolean).join(" · ") || "—";

export default async function ListaPage() {
  const { going, notGoing, people, totals } = await loadLista();
  const restrictions = people.filter((p) => p.gluten_free || p.diet_note);

  return (
    <div className="lista">
      <h1>lista da festa 🎂</h1>
      <p className="lista-sub">
        {FESTA.dateLabel}, {FESTA.timeLabel} · respostas até {FESTA.deadlineLabel}
      </p>

      <div className="lista-tiles">
        <div className="lista-tile"><strong>{totals.people}</strong><span>pessoas confirmadas</span></div>
        <div className="lista-tile"><strong>{totals.adults}</strong><span>adultos</span></div>
        <div className="lista-tile"><strong>{totals.kids}</strong><span>crianças</span></div>
        <div className="lista-tile"><strong>{totals.wine}</strong><span>🍷 vinho</span></div>
        <div className="lista-tile"><strong>{totals.soda}</strong><span>🥤 refri</span></div>
        <div className="lista-tile"><strong>{totals.glutenFree}</strong><span>🌾 sem glúten</span></div>
        <div className="lista-tile"><strong>{notGoing.length}</strong><span>não vão</span></div>
      </div>

      <div className="lista-actions">
        <PrintButtons />
        <a className="is-soft" href="/festa/lista/csv">📊 planilha (CSV)</a>
        <a className="is-soft" href="/festa" target="_blank">ver convite</a>
      </div>

      <section className="lista-section lista-portaria">
        <div className="lista-print-head">
          <h1>{FESTA.title}</h1>
          <p>{FESTA.dateLabel}, {FESTA.timeLabel} · {totals.people} convidados</p>
        </div>
        <h2>🪪 lista da portaria ({totals.people})</h2>
        <table className="lista-table">
          <thead>
            <tr><th>#</th><th>nome completo</th><th></th></tr>
          </thead>
          <tbody>
            {people.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.full_name}</td>
                <td>{p.is_child ? `criança${p.child_age !== null ? `, ${p.child_age} anos` : ""}` : ""}</td>
              </tr>
            ))}
            {!people.length && (
              <tr><td colSpan={3}>ninguém confirmou ainda</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {people.some((p) => p.is_child) && (
        <section className="lista-section">
          <h2>🧒 o que as crianças comem ({people.filter((p) => p.is_child).length})</h2>
          <table className="lista-table">
            <thead><tr><th>criança</th><th>idade</th><th>come</th></tr></thead>
            <tbody>
              {people.filter((p) => p.is_child).map((p) => (
                <tr key={p.id}><td>{p.full_name}</td><td>{p.child_age ?? ""}</td><td>{p.kid_food || "—"}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {restrictions.length > 0 && (
        <section className="lista-section">
          <h2>🌾 restrições ({restrictions.length})</h2>
          <table className="lista-table">
            <thead><tr><th>nome</th><th>sem glúten</th><th>observação</th></tr></thead>
            <tbody>
              {restrictions.map((p) => (
                <tr key={p.id}><td>{p.full_name}</td><td>{p.gluten_free ? "sim" : ""}</td><td>{p.diet_note}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="lista-section">
        <h2>💌 respostas ({going.length})</h2>
        <div className="lista-groups">
          {going.map((r) => (
            <article key={r.id} className="lista-group">
              <header>
                <strong>{r.contact_name}</strong>
                <small>
                  {fmtWhen(r.created_at)}
                  {r.phone && <> · {r.phone}</>}
                </small>
              </header>
              <ul>
                {r.festa_people.map((p) => (
                  <li key={p.id}>
                    {p.full_name}
                    {p.is_child && <span className="lista-tag">criança{p.child_age !== null ? `, ${p.child_age}` : ""}</span>}
                    {p.gluten_free && <span className="lista-tag lista-tag--gf">sem glúten</span>}
                    <small> · {drinks(p)}{p.diet_note ? ` · ${p.diet_note}` : ""}{p.kid_food ? ` · come: ${p.kid_food}` : ""}</small>
                  </li>
                ))}
              </ul>
              {r.message && <blockquote>{r.message}</blockquote>}
              <form action={deleteRsvp}>
                <input type="hidden" name="id" value={r.id} />
                <button className="lista-del" type="submit">apagar esta resposta</button>
              </form>
            </article>
          ))}
        </div>
      </section>

      {notGoing.length > 0 && (
        <section className="lista-section">
          <h2>🥺 não vão ({notGoing.length})</h2>
          <div className="lista-groups">
            {notGoing.map((r) => (
              <article key={r.id} className="lista-group">
                <header>
                  <strong>{r.contact_name}</strong>
                  <small>{fmtWhen(r.created_at)}</small>
                </header>
                {r.message && <blockquote>{r.message}</blockquote>}
                <form action={deleteRsvp}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="lista-del" type="submit">apagar</button>
                </form>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
