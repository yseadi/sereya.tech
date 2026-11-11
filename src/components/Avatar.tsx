/** A member's photo, or their first letter on a pearly circle when they have none. */
export function Avatar({ name, url, size }: { name: string; url?: string | null; size?: "sm" }) {
  const letter = (name || "?").trim().slice(0, 1).toUpperCase();
  return (
    <span className={`avatar${size ? ` ${size}` : ""}${url ? " has-photo" : ""}`} aria-hidden="true">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" loading="lazy" />
      ) : (
        letter
      )}
    </span>
  );
}
