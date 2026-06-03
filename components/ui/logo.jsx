import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Acty wordmark. The bundled logo asset is a Relume placeholder ("Logo"),
 * so the brand mark is set typographically in the display family (Fraunces).
 * @param {{ className?: string }} props
 */
export function Logo({ className }) {
  return (
    <span
      className={cn(
        "font-display text-[1.625rem] leading-none font-bold tracking-tight",
        className,
      )}
    >
      Acty
    </span>
  );
}
