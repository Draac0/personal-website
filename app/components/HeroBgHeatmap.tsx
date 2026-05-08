import type { ContribDay } from "../lib/github";

// Per-level CSS for the bulged-glass tile look.
// Each cell is a small div with: a 135deg gradient (light at top-left, deeper
// at bottom-right) + an inset white highlight at the very top (the "lip" of
// the bulge) + a faint drop shadow underneath. Higher levels add an outer
// glow so the brightest cells feel like illuminated glass.
const LEVEL_STYLE: Record<number, React.CSSProperties> = {
  0: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0.04) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 1px rgba(0,0,0,0.25)",
  },
  1: {
    background:
      "linear-gradient(135deg, rgba(198,255,0,0.32) 0%, rgba(198,255,0,0.14) 70%, rgba(198,255,0,0.22) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(0,0,0,0.3)",
  },
  2: {
    background:
      "linear-gradient(135deg, rgba(198,255,0,0.55) 0%, rgba(198,255,0,0.28) 70%, rgba(198,255,0,0.42) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.22), 0 2px 4px rgba(0,0,0,0.35)",
  },
  3: {
    background:
      "linear-gradient(135deg, rgba(198,255,0,0.78) 0%, rgba(198,255,0,0.5) 70%, rgba(198,255,0,0.7) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 5px rgba(198,255,0,0.18), 0 0 10px rgba(198,255,0,0.15)",
  },
  4: {
    background:
      "linear-gradient(135deg, #c6ff00 0%, #a4d40a 60%, #c6ff00 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.45), 0 2px 6px rgba(198,255,0,0.45), 0 0 18px rgba(198,255,0,0.3)",
  },
};

export function HeroBgHeatmap({ weeks }: { weeks: ContribDay[][] }) {
  if (!weeks.length) return null;
  const cols = weeks.length;

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none flex items-end lg:items-center justify-end p-4 sm:p-6 lg:p-10"
    >
      <div
        className="w-full relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: "repeat(7, 1fr)",
          // Iteration is column-major (week 0 Sun→Sat, week 1 Sun→Sat …),
          // so flow down columns first.
          gridAutoFlow: "column",
          gap: "5px",
          aspectRatio: `${cols} / 7`,
          maxHeight: "100%",
        }}
      >
        {weeks.map((week, col) =>
          week.map((day, row) => {
            // Deterministic per-cell pseudo-random so twinkles look scattered
            // but stay stable across renders (no hydration flicker).
            const seed = (col * 13 + row * 47 + day.level * 7) % 100;
            // Only twinkle a fraction of the brighter cells. Higher levels
            // get more chance.
            const shouldTwinkle =
              day.level >= 2 && (seed % (day.level === 4 ? 2 : 4)) === 0;
            const delay = (seed / 100) * 5; // 0–5s offset
            const duration = 2.4 + ((seed % 18) / 10); // 2.4–4.2s
            return (
              <div
                key={`${col}-${row}`}
                style={{
                  ...LEVEL_STYLE[day.level],
                  borderRadius: 3,
                  animation: shouldTwinkle
                    ? `cell-twinkle ${duration}s ${delay}s ease-in-out infinite`
                    : undefined,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
