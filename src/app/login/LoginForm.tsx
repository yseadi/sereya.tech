"use client";

import Link from "next/link";
import { useActionState } from "react";
import { logIn, type FormState } from "../auth/actions";
import { Submit } from "@/components/Submit";

export function LoginForm({ next, linkError }: { next: string; linkError: boolean }) {
  const [state, action] = useActionState<FormState, FormData>(logIn, {});
  return (
    <form action={action} className="card" noValidate>
      <h2 style={{ fontSize: 28, fontWeight: 500 }}>Log in</h2>
      {linkError && <p className="error">That link has expired. Ask for a new one.</p>}
      {state.error && <p className="error" role="alert">{state.error}</p>}
      <input type="hidden" name="next" value={next} />
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className="input" defaultValue={state.values?.email} required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" className="input" required />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href="/forgot" style={{ fontSize: 14 }}>Forgot password?</Link>
      </div>
      <Submit pendingText="Logging in…">Log in</Submit>
      <p className="muted" style={{ fontSize: 15 }}>
        New here? <Link href="/join">Join Sereya</Link>, it starts free.
      </p>
    </form>
  );
}
