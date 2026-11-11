import Link from "next/link";
import type { Pulse } from "@/lib/pulse";

function change(count: number, before: number) {
  if (before === 0) return { text: "new", title: "Not seen the week before" };
  const d = count - before;
  if (d === 0) return { text: "same", title: `Also ${before} the week before` };
  return { text: d > 0 ? `+${d}` : `−${-d}`, title: `${before} the week before` };
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Two Home panels: tags moving this week, and where this week's signals come from. */
export function HomePulse({ pulse }: { pulse: Pulse }) {
  const { tags, regions, total, placed } = pulse;
  if (total < 3 || (!tags.length && !regions.length)) return null;
  const tagMax = Math.max(...tags.map((t) => t.count), 1);
  const regionMax = Math.max(...regions.map((r) => r.count), 1);

  return (
    <div className="pulse">
      {tags.length > 0 && (
        <section className="card pulse-card" aria-labelledby="pulse-tags">
          <h2 id="pulse-tags">Tags moving this week</h2>
          <p className="muted">How many signals carry each tag in the last 7 days, and the change from the week before.</p>
          <ul className="bars">
            {tags.map((t) => {
              const c = change(t.count, t.before);
              return (
                <li key={t.tag}>
                  <Link
                    href={`/signals?tag=${encodeURIComponent(t.tag)}`}
                    className="bar-row"
                    title={`#${t.tag}: ${plural(t.count, "signal")} this week, ${c.title.toLowerCase()}`}
                  >
                    <span className="bar-label">#{t.tag}</span>
                    <span className="bar-track" aria-hidden="true">
                      <span className="bar-fill" style={{ width: `${(t.count / tagMax) * 100}%` }} />
                    </span>
                    <span className="bar-value">{t.count}</span>
                    <span className={`bar-delta${c.text.startsWith("+") || c.text === "new" ? " up" : ""}`}>{c.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="card pulse-card" aria-labelledby="pulse-regions">
        <h2 id="pulse-regions">Where this week’s signals come from</h2>
        <p className="muted">
          {placed > 0
            ? `${placed} of the ${total} signals this week name a place outside the US and Europe.`
            : `None of the ${total} signals this week names a place outside the US and Europe yet.`}
        </p>
        {regions.length > 0 && (
          <ul className="bars">
            {regions.map((r) => (
              <li key={r.region} className="bar-row" title={`${r.region}: ${plural(r.count, "signal")} this week`}>
                <span className="bar-label">{r.region}</span>
                <span className="bar-track" aria-hidden="true">
                  <span className="bar-fill region" style={{ width: `${(r.count / regionMax) * 100}%` }} />
                </span>
                <span className="bar-value">{r.count}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="muted pulse-note">
          Places come from the names Concha finds in each story. A signal can name more than one.
        </p>
      </section>
    </div>
  );
}
