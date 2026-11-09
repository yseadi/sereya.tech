"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendReset, type FormState } from "../auth/actions";
import { Submit } from "@/components/Submit";

export default function ForgotPage() {
  const [state, action] = useActionState<FormState, FormData>(sendReset, {});
  return (
    <div className="wrap narrow">
      <form action={action} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: 30, fontWeight: 500 }}>Reset your password</h1>
        <p className="muted">Type the email you joined with. We will send you a link to choose a new password.</p>
        {state.error && <p className="error" role="alert">{state.error}</p>}
        {state.message && <p className="notice" role="status">{state.message}</p>}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className="input" required />
        </div>
        <Submit pendingText="Sending…">Send me the link</Submit>
        <Link href="/login" style={{ fontSize: 15 }}>Back to log in</Link>
      </form>
    </div>
  );
}
