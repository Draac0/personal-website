"use client";

import { useEffect, useRef } from "react";

/** Wraps a horizontally-scrollable container and pins the initial
 *  scroll position to the right edge — useful for time-series content
 *  (like the contribution heatmap) where the most recent data is on the
 *  right and you want it visible by default on small screens. */
export function ScrollEnd({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Wait one frame so the children have laid out before we scroll.
    const id = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
