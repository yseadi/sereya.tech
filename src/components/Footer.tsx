import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * Concha footer, on every screen. Yasmim's text. The numbers come from
 * Concha's last run (sources read, signals kept or published).
 */
export async function Footer() {
  let sentence = "";
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("concha_runs")
      .select("sources_read, kept, published, finished_at")
      .not("finished_at", "is", null)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data && data.sources_read > 0) {
      const n = data.kept + data.published;
      const day = Date.now() - new Date(data.finished_at).getTime() < 26 * 3600 * 1000 ? "Today" : "Last time";
      sentence = ` ${day}, it listened to ${data.sources_read} source${data.sources_read === 1 ? "" : "s"} and brought back ${n} new signal${n === 1 ? "" : "s"}.`;
    }
  } catch {
    // Footer never breaks a page.
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <p className="eyebrow" style={{ marginBottom: 8 }}>Concha · the crawler</p>
        <p className="concha">
          Every day at 06am, Concha, Sereya’s listening shell, tunes in to the sources and brings back what is new.
          {sentence}
        </p>
        <nav className="links" aria-label="Footer">
          <Link href="/signals">Signals</Link>
          <Link href="/community">Community</Link>
          <Link href="/settings">Settings</Link>
        </nav>
        <div className="fine">
          <span>© 2026 Sereya Tech • by Yasmim Seadi</span>
          <span>Made in Brasil, reading the world.</span>
        </div>
      </div>
    </footer>
  );
}
