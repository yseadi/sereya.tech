import Link from "next/link";
import { redirect } from "next/navigation";
import { firstName, getViewer } from "@/lib/auth";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Welcome" };

export default async function WelcomePage() {
  const { user, profile } = await getViewer();
  if (!user) redirect("/login");
  if (!profile?.onboarded) redirect("/join");
  const name = firstName(profile);
  const plan = profile.plan_interest ? PLANS[profile.plan_interest].name : null;
  return (
    <div className="wrap">
      <section className="band" style={{ gridTemplateColumns: "1fr" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <p className="eyebrow">Welcome to Sereya</p>
            <h1>{name ? `You are in, ${name}.` : "You are in."}</h1>
            <p>
              Here is what arrives, and when.
              {plan ? ` You picked ${plan}: thank you, that helps Yasmim shape the plans.` : ""}
            </p>
          </div>
          <div className="rhythm">
            <div className="card">
              <span className="eyebrow">Every day · 06:00</span>
              <strong>New signals</strong>
              <span className="muted">Concha brings back what moved overnight, with Yasmim’s take.</span>
            </div>
            <div className="card">
              <span className="eyebrow">Every week</span>
              <strong>Conversations</strong>
              <span className="muted">Like the signals that move you and talk about them in Community.</span>
            </div>
            <div className="card">
              <span className="eyebrow">Every month</span>
              <strong>The Carta da Sereya</strong>
              <span className="muted">Yasmim’s reading of the month.</span>
            </div>
          </div>
          <div>
            <Link href="/" className="btn">Go to my Sereya</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
