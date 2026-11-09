"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { createAccount, saveUniverse, type FormState } from "../auth/actions";
import { CATEGORIES, CATEGORY_KEYS, REGIONS } from "@/lib/categories";
import { PLANS } from "@/lib/plans";
import type { CategoryKey, Plan } from "@/lib/types";
import { Submit } from "@/components/Submit";

const LABELS = ["Account", "Your universe", "Plan", "Welcome"];

type Props = {
  signedIn: boolean;
  name: string;
  inviteRequired: boolean;
  initialCategories: CategoryKey[];
  initialRegions: string[];
};

export function JoinFlow({ signedIn, name, inviteRequired, initialCategories, initialRegions }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(signedIn ? 2 : 1);
  const [cats, setCats] = useState<CategoryKey[]>(initialCategories);
  const [regions, setRegions] = useState<string[]>(initialRegions);
  const [plan, setPlan] = useState<Plan>("member");
  const [billing, setBilling] = useState<"month" | "year">("year");
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const [accountState, accountAction] = useActionState<FormState, FormData>(createAccount, {});

  useEffect(() => {
    if (accountState.ok) {
      setStep(2);
      router.refresh();
    }
  }, [accountState.ok, router]);

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const year = billing === "year";

  function next() {
    setError(null);
    if (step === 2) {
      if (cats.length === 0) return setError("Pick at least one category to start your feed.");
      return setStep(3);
    }
    if (step === 3) {
      startSaving(async () => {
        const res = await saveUniverse({ categories: cats, regions, plan, billing });
        if (res.error) return setError(res.error);
        router.push("/welcome");
      });
    }
  }

  return (
    <div>
      <ol className="steps" aria-label="Joining steps" style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
        {LABELS.map((label, i) => {
          const n = i + 1;
          const cls = n < step ? "step done" : n === step ? "step cur" : "step";
          return (
            <li key={label} className={cls} aria-current={n === step ? "step" : undefined}>
              <span className="n">{n < step ? "✓" : n}</span>
              {label}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div className="auth-grid">
          <section className="intro band" style={{ display: "flex", flexDirection: "column" }}>
            <p className="eyebrow">Join Sereya</p>
            <h1>Create your account</h1>
            <p>It starts free. You choose a plan in step 3, and during the beta nobody pays.</p>
          </section>
          <form action={accountAction} className="card" noValidate>
            {accountState.error && <p className="error" role="alert">{accountState.error}</p>}
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" autoComplete="name" className="input" defaultValue={accountState.values?.name} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className="input" defaultValue={accountState.values?.email} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} className="input" required />
              <span className="hint">At least 8 characters.</span>
            </div>
            {inviteRequired && (
              <div className="field">
                <label htmlFor="invite">Invite code</label>
                <input id="invite" name="invite" className="input" autoComplete="off" defaultValue={accountState.values?.invite} required />
                <span className="hint">Sereya is open to invited friends while we test it.</span>
              </div>
            )}
            <label className="check">
              <input type="checkbox" name="terms" defaultChecked={accountState.values?.terms === "on"} required />
              <span>I agree to the terms and the privacy policy.</span>
            </label>
            <Submit pendingText="Creating your account…">Continue</Submit>
            <p className="muted" style={{ fontSize: 15 }}>
              Already a member? <Link href="/login">Log in</Link>
            </p>
          </form>
        </div>
      )}

      {step === 2 && (
        <section className="card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 500 }}>{name ? `${name}, your universe` : "Your universe"}</h1>
            <p className="muted" style={{ marginTop: 8 }}>
              Pick what you want to follow. Your feed opens with these first, and you can change them later in Settings.
            </p>
          </div>
          <p className="eyebrow">Categories</p>
          <div className="pick-grid">
            {CATEGORY_KEYS.map((k) => {
              const c = CATEGORIES[k];
              const on = cats.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  className="pick"
                  aria-pressed={on}
                  onClick={() => setCats(toggle(cats, k))}
                  style={on ? { background: c.bg, border: `1.5px solid ${c.dot}` } : undefined}
                >
                  <span className="dot" style={{ width: 14, height: 14, background: c.dot }} />
                  <span>
                    <strong style={{ fontWeight: 600, display: "block" }}>{c.label}</strong>
                    <span className="muted" style={{ fontSize: 14 }}>{c.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="eyebrow">Regions you care about</p>
          <div className="chips">
            {REGIONS.map((r) => (
              <button key={r} type="button" className="chip" aria-pressed={regions.includes(r)} onClick={() => setRegions(toggle(regions, r))}>
                {r}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "end" }}>
            <div>
              <h1 style={{ fontSize: 34, fontWeight: 500 }}>Choose your plan</h1>
              <p className="muted" style={{ marginTop: 8 }}>
                Yasmim’s writing is always free. Members see the whole platform.
              </p>
            </div>
            <div className="toggle" role="group" aria-label="Billing">
              <button type="button" aria-pressed={!year} onClick={() => setBilling("month")}>Monthly</button>
              <button type="button" aria-pressed={year} onClick={() => setBilling("year")}>Yearly · 2 months free</button>
            </div>
          </div>
          <p className="notice">
            Beta: everything is open and nobody pays while we test. Pick the plan you would choose, it helps Yasmim set
            the prices.
          </p>
          <div className="pick-grid">
            {(Object.keys(PLANS) as Plan[]).map((k) => {
              const p = PLANS[k];
              return (
                <button key={k} type="button" className="plan" aria-pressed={plan === k} onClick={() => setPlan(k)}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="radio" />
                    <strong style={{ fontWeight: 600 }}>{p.name}</strong>
                  </span>
                  <span>
                    <span className="price">{p.price(year)}</span> <span className="muted">{p.per(year)}</span>
                  </span>
                  <span className="muted" style={{ fontSize: 15 }}>{p.desc}</span>
                </button>
              );
            })}
          </div>
          <p className="hint">Suggested prices, still to be validated by Yasmim.</p>
        </section>
      )}

      {(step === 2 || step === 3) && (
        <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", flexWrap: "wrap" }}>
          {step === 3 && (
            <button type="button" className="btn ghost" onClick={() => setStep(2)}>
              Back
            </button>
          )}
          <button type="button" className="btn" onClick={next} disabled={saving}>
            {saving ? "Saving…" : step === 3 ? (plan === "free" ? "Join for free" : "Join") : "Continue"}
          </button>
          {error && <p className="error" role="alert">{error}</p>}
        </div>
      )}
    </div>
  );
}
