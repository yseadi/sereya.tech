"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Two small touches that run on every page:
 * - the pearly light that follows the mouse over cards (sets --mx / --my);
 * - a thin pearly bar at the top while the next page loads.
 */
export function Glow() {
  const path = usePathname();
  const [width, setWidth] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".card, .post-card") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      setWidth(12);
      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(() => setWidth((w) => (w < 85 ? w + (90 - w) * 0.08 : w)), 180);
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("click", click, true);
    };
  }, []);

  // New page arrived: fill the bar and fade it out.
  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setWidth((w) => (w > 0 ? 100 : 0));
    const t = setTimeout(() => setWidth(0), 450);
    return () => clearTimeout(t);
  }, [path]);

  return <div className="nav-bar" aria-hidden="true" style={{ width: `${width}%`, opacity: width > 0 && width < 100 ? 1 : width === 100 ? 1 : 0 }} />;
}
