"use client";

import { useOptimistic, useTransition } from "react";
import { IconHeart } from "./Icons";

type Props = {
  liked: boolean;
  count: number;
  onToggle: (like: boolean) => Promise<{ error?: string }>;
  small?: boolean;
};

export function LikeButton({ liked, count, onToggle, small }: Props) {
  const [state, setOptimistic] = useOptimistic({ liked, count });
  const [, start] = useTransition();
  return (
    <button
      type="button"
      className={small ? "like sm" : "like"}
      aria-pressed={state.liked}
      aria-label={state.liked ? `Unlike (${state.count} likes)` : `Like (${state.count} likes)`}
      onClick={() =>
        start(async () => {
          const next = !state.liked;
          setOptimistic({ liked: next, count: state.count + (next ? 1 : -1) });
          await onToggle(next);
        })
      }
    >
      <IconHeart size={small ? 15 : 18} filled={state.liked} />
      <span aria-hidden="true">{state.count}</span>
    </button>
  );
}
