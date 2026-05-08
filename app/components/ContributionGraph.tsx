"use client";

import { useMemo, useState } from "react";
import type { ContribDay } from "../lib/github";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const LEVEL_FILL: Record<number, { fill: string; stroke: string }> = {
  0: { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.06)" },
  1: { fill: "rgba(198,255,0,0.22)", stroke: "rgba(198,255,0,0.30)" },
  2: { fill: "rgba(198,255,0,0.45)", stroke: "rgba(198,255,0,0.45)" },
  3: { fill: "rgba(198,255,0,0.75)", stroke: "rgba(198,255,0,0.6)" },
  4: { fill: "#c6ff00", stroke: "#c6ff00" },
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ContributionGraph({
  weeks,
  className = "",
  cellSize = 14,
  gap = 4,
  showLabels = true,
}: {
  weeks: ContribDay[][];
  className?: string;
  cellSize?: number;
  gap?: number;
  showLabels?: boolean;
}) {
  const [hover, setHover] = useState<{
    day: ContribDay;
    x: number;
    y: number;
  } | null>(null);

  const monthLabels = useMemo(() => {
    const labels: { col: number; month: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, col) => {
      const first = week.find((d) => d.date) ?? week[0];
      if (!first?.date) return;
      const m = new Date(first.date).getMonth();
      if (m !== lastMonth) {
        const prev = labels[labels.length - 1];
        if (!prev || col - prev.col >= 3) {
          labels.push({ col, month: MONTHS[m] });
        }
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const W = weeks.length;
  const H = 7;
  const labelGap = showLabels ? 18 : 0;
  const widthPx = W * (cellSize + gap) - gap;
  const heightPx = H * (cellSize + gap) - gap + labelGap;

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: widthPx, height: heightPx }}
    >
      {showLabels && (
        <div
          className="absolute top-0 left-0 right-0 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint pointer-events-none"
          style={{ height: labelGap }}
        >
          {monthLabels.map((l) => (
            <span
              key={`${l.col}-${l.month}`}
              className="absolute"
              style={{ left: l.col * (cellSize + gap) }}
            >
              {l.month}
            </span>
          ))}
        </div>
      )}

      <svg
        width={widthPx}
        height={H * (cellSize + gap) - gap}
        viewBox={`0 0 ${widthPx} ${H * (cellSize + gap) - gap}`}
        style={{ position: "absolute", top: labelGap, left: 0 }}
        className="overflow-visible"
      >
        {weeks.map((week, col) =>
          week.map((day, row) => {
            const c = LEVEL_FILL[day.level];
            return (
              <rect
                key={`${col}-${row}`}
                x={col * (cellSize + gap)}
                y={row * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={2}
                ry={2}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1}
                style={{
                  filter:
                    day.level === 4
                      ? "drop-shadow(0 0 4px rgba(198,255,0,0.55))"
                      : undefined,
                  transition: "fill 200ms ease, stroke 200ms ease",
                }}
                onMouseEnter={() => {
                  if (!day.date) return;
                  setHover({
                    day,
                    x: col * (cellSize + gap) + cellSize / 2,
                    y: row * (cellSize + gap),
                  });
                }}
                onMouseLeave={() => setHover(null)}
              />
            );
          })
        )}
      </svg>

      {hover && (
        <div
          className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{
            left: hover.x,
            top: labelGap + hover.y - 6,
          }}
        >
          <div className="glass px-2.5 py-1.5 font-mono text-[10px] whitespace-nowrap">
            <span className="text-accent">L{hover.day.level}</span>
            <span className="text-text-faint mx-1.5">·</span>
            <span className="text-text">{formatDate(hover.day.date)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
