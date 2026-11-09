import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth";
import { safeNext } from "@/lib/safe-next";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const { user } = await getViewer();
  if (user) redirect(safeNext(sp.next));
  return (
    <div className="wrap">
      <div className="auth-grid">
        <section className="intro band" style={{ display: "flex", flexDirection: "column" }}>
          <p className="eyebrow">Welcome back</p>
          <h1>Signals, trends and readings from outside the usual centres.</h1>
          <p>
            Every morning Concha brings back what moved in the world. Every week Yasmim reads it into trends. Every
            month, the Carta da Sereya.
          </p>
        </section>
        <LoginForm next={safeNext(sp.next)} linkError={sp.error === "link"} />
      </div>
    </div>
  );
}
