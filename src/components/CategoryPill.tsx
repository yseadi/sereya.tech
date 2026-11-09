import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";

/** The category's pearly pill. With `explain`, it links to what the category means. */
export function CategoryPill({ category, explain }: { category: CategoryKey; explain?: boolean }) {
  const c = CATEGORIES[category];
  if (!c) return null;
  const inner = (
    <>
      <span className="dot" style={{ background: c.dot }} />
      {c.label}
    </>
  );
  return explain ? (
    <Link href={`/categories#${category}`} className="pill cat-link" style={{ background: c.bg, color: c.text }} title="What this category means">
      {inner}
    </Link>
  ) : (
    <span className="pill" style={{ background: c.bg, color: c.text }}>{inner}</span>
  );
}
