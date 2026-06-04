import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Acty "A" mark: a rounded chevron with a centred dot. Drawn in `currentColor`
 * so it inherits the surrounding text colour and works on any scheme.
 * @param {{ className?: string }} props
 */
export function ActyMark({ className }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13 45 L28 11 L43 45"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="36.5" r="3.9" fill="currentColor" />
    </svg>
  );
}

/**
 * Acty brand lockup: the "A" mark paired with the wordmark in the display
 * family (Fraunces). Both inherit `currentColor`, so the lockup stays legible
 * on light surfaces and inverts cleanly on dark ones.
 * @param {{ className?: string, markClassName?: string }} props
 */
export function Logo({ className, markClassName }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 leading-none", className)}
    >
      <ActyMark className={cn("h-7 w-7", markClassName)} />
      <span className="font-display text-[1.5rem] leading-none font-bold tracking-tight">
        Acty
      </span>
    </span>
  );
}
