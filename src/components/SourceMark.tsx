import { sourceLogo } from "@/lib/categories";

/** Source name, with its logo when we have one in public/sources. */
export function SourceMark({ name, className = "" }: { name: string; className?: string }) {
  if (!name) return null;
  const logo = sourceLogo(name);
  return (
    <span className={`pill ${className}`} style={{ background: "#ffffff", color: "#3e4a4c", border: "1px solid #eceeee" }}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} width={56} height={13} style={{ height: 13, width: "auto" }} />
      ) : (
        name
      )}
    </span>
  );
}
