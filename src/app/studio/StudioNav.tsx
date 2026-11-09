import Link from "next/link";

export function StudioNav({ current, catchCount }: { current: "desk" | "catch" | "universe" | "glossary"; catchCount?: number }) {
  return (
    <nav className="chips" aria-label="Studio" style={{ marginBottom: 24 }}>
      <Link href="/studio" className="chip" aria-current={current === "desk" ? "true" : undefined}>Your desk</Link>
      <Link href="/studio/catch" className="chip" aria-current={current === "catch" ? "true" : undefined}>
        Today’s catch{catchCount ? <span className="pill" style={{ background: "#1f2a2c", color: "#fff" }}>{catchCount}</span> : null}
      </Link>
      <Link href="/studio/glossary" className="chip" aria-current={current === "glossary" ? "true" : undefined}>Glossary</Link>
      <Link href="/studio/universe" className="chip" aria-current={current === "universe" ? "true" : undefined}>Concha’s universe</Link>
    </nav>
  );
}
