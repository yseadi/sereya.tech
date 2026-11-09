import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * Concha footer, on every screen. Yasmim's text. The numbers come from the
 * posts published in the last 24 hours until Concha (the crawler) is wired in.
 */
export async function Footer() {
  let sentence = "";
  try {
    const supabase = await createClient();
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { data } = await supabase.from("posts").select("source_name").gte("published_at", since);
    if (data && data.length > 0) {
      const sources = new Set(data.map((d) => d.source_name).filter(Boolean)).size;
      sentence = ` Today, it listened to ${sources} source${sources === 1 ? "" : "s"} and brought back ${data.length} new signal${data.length === 1 ? "" : "s"}.`;
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
