import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080a",
          color: "#e8eef2",
          fontFamily: "monospace",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        a<span style={{ color: "#c6ff00" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
