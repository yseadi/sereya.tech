"use client";

import { useActionState } from "react";
import { setNewPassword, type FormState } from "../auth/actions";
import { Submit } from "@/components/Submit";

export default function ResetPage() {
  const [state, action] = useActionState<FormState, FormData>(setNewPassword, {});
  return (
    <div className="wrap narrow">
      <form action={action} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: 30, fontWeight: 500 }}>Choose a new password</h1>
        {state.error && <p className="error" role="alert">{state.error}</p>}
        <div className="field">
          <label htmlFor="password">New password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} className="input" required />
          <span className="hint">At least 8 characters.</span>
        </div>
        <Submit pendingText="Saving…">Save password</Submit>
      </form>
    </div>
  );
}
