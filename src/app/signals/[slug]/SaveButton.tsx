"use client";

import { useOptimistic, useTransition } from "react";
import { IconSave } from "@/components/Icons";
import { toggleSave } from "../actions";

/** Keeps a signal in the member's Saved list. */
export function SaveButton({ postId, slug, saved }: { postId: string; slug: string; saved: boolean }) {
  const [on, setOn] = useOptimistic(saved);
  const [, start] = useTransition();
  return (
    <button
      type="button"
      className="like save"
      aria-pressed={on}
      onClick={() =>
        start(async () => {
          setOn(!on);
          await toggleSave(postId, slug, !on);
        })
      }
    >
      <IconSave filled={on} />
      <span>{on ? "Saved" : "Save"}</span>
    </button>
  );
}
