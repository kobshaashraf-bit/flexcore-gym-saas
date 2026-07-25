import type { ReactNode } from "react";

/**
 * Renders children so they're announced by screen readers but not shown
 * visually — used to satisfy Radix's requirement that Dialog/Sheet content
 * always has an accessible title, even when we don't want one on screen.
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <div className="sr-only">{children}</div>;
}
