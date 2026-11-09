import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap narrow" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p className="eyebrow">Not found</p>
      <h1 style={{ fontSize: 40, fontWeight: 500 }}>Concha listened, but nothing came back from here.</h1>
      <div>
        <Link href="/" className="btn">Back home</Link>
      </div>
    </div>
  );
}
