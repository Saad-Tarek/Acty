import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section kicker — a small labelled lead-in with a brand-accent dot.
 * A deliberate, consistent system (not a per-section eyebrow reflex).
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export function Kicker({ children, className }) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2.5 text-small font-semibold tracking-wide md:mb-5",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-torea-bay" />
      {children}
    </p>
  );
}
