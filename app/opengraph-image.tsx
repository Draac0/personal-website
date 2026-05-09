import { ImageResponse } from "next/og";

export const alt =
  "Abhinav Sriram — fullstack engineer. GenAI tooling, backend systems, side quests.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#07080a";
const ACCENT = "#c6ff00";
const TEXT = "#e8eef2";
const TEXT_MUTED = "#8a93a0";
const TEXT_FAINT = "#5a626d";
const LINE = "rgba(255,255,255,0.08)";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(198,255,0,0.25)",
  "rgba(198,255,0,0.45)",
  "rgba(198,255,0,0.7)",
  "#c6ff00",
];

// Deterministic pseudo-random level grid: 53 weeks × 7 days, biased toward
// higher levels on the right (more recent) so the strip feels alive.
function buildCells(): number[][] {
  const cols: number[][] = [];
  for (let col = 0; col < 53; col++) {
    const week: number[] = [];
    for (let row = 0; row < 7; row++) {
      const seed = (col * 37 + row * 71 + 13) % 100;
      const recencyBoost = col / 53;
      const r = (seed / 100 + recencyBoost * 0.4) % 1;
      let level = 0;
      if (r > 0.55) level = 1;
      if (r > 0.72) level = 2;
      if (r > 0.85) level = 3;
      if (r > 0.94) level = 4;
      week.push(level);
    }
    cols.push(week);
  }
  return cols;
}

export default function OG() {
  const cells = buildCells();
  const cellSize = 14;
  const gap = 4;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top metadata bar — github-repo style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "28px 56px",
            borderBottom: `1px solid ${LINE}`,
            color: TEXT_FAINT,
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: ACCENT, display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: ACCENT,
                boxShadow: `0 0 12px ${ACCENT}`,
              }}
            />
            asriram-bbp / abhinav.me
          </span>
          <span>·</span>
          <span>public</span>
          <span>·</span>
          <span>main</span>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              color: TEXT,
              letterSpacing: -4,
              lineHeight: 1,
              display: "flex",
            }}
          >
            <span>Abhinav Sriram</span>
            <span style={{ color: ACCENT }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: TEXT_MUTED,
              maxWidth: 920,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Fullstack engineer — GenAI tooling, backend systems, and the
            occasional side quest.
          </div>
        </div>

        {/* Bottom: contribution-cell strip + footer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "0 56px 36px",
          }}
        >
          <div style={{ display: "flex", gap }}>
            {cells.map((week, col) => (
              <div
                key={col}
                style={{ display: "flex", flexDirection: "column", gap }}
              >
                {week.map((level, row) => (
                  <div
                    key={row}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 3,
                      background: LEVEL_COLORS[level],
                      ...(level === 4
                        ? { boxShadow: `0 0 10px rgba(198,255,0,0.45)` }
                        : {}),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: TEXT_FAINT,
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <span>abhisriram.com</span>
            <span>fullstack · genai · backend</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
