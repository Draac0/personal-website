import { ImageResponse } from "next/og";
import { fetchContributions, PRIMARY_USERNAME } from "./lib/github";

export const alt =
  "Abhinav Sriram — fullstack engineer @ Boston Bioprocess (US).";
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

export default async function OG() {
  const contribs = await fetchContributions(PRIMARY_USERNAME);
  const weeks = contribs.weeks; // weeks[col][row]; row 0 = Sun
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
              fontSize: 32,
              color: TEXT_MUTED,
              maxWidth: 1000,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Fullstack engineer @ Boston Bioprocess (US).
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "0 56px 36px",
          }}
        >
          <div style={{ display: "flex", gap }}>
            {weeks.map((week, col) => (
              <div
                key={col}
                style={{ display: "flex", flexDirection: "column", gap }}
              >
                {week.map((day, row) => (
                  <div
                    key={row}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 3,
                      background: LEVEL_COLORS[day.level],
                      ...(day.level === 4
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
            <span>{contribs.total} contributions · 12 mo</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
