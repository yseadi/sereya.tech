import { CATEGORIES } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";

export function CategoryPill({ category }: { category: CategoryKey }) {
  const c = CATEGORIES[category];
  if (!c) return null;
  return (
    <span className="pill" style={{ background: c.bg, color: c.text }}>
      <span className="dot" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
}
