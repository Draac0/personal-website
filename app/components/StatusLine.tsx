"use client";

import { useEffect, useState } from "react";

const SHA_CHARS = "abcdef0123456789";

function makeSha(seed: number) {
  let out = "";
  let s = seed;
  for (let i = 0; i < 7; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += SHA_CHARS[s % SHA_CHARS.length];
  }
  return out;
}

export function StatusLine() {
  const [sha] = useState(() => makeSha(0xa3f291));
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="sticky bottom-0 z-30 border-t border-line bg-bg/90 backdrop-blur-md">
      <div className="flex items-center h-7 px-3 sm:px-5 gap-0 font-mono text-[10px] uppercase tracking-[0.15em] text-text-faint overflow-hidden">
        <span className="bg-accent text-bg px-2 py-0.5 font-semibold">NORMAL</span>
        <span className="px-2 py-0.5 bg-bg-elevated/70 text-text-muted">
          ~/abhinav/me
        </span>
        <span className="px-2 py-0.5 hidden sm:inline">main</span>
        <span className="px-2 py-0.5 hidden md:inline text-accent-cool">
          @{sha}
        </span>

        <span className="flex-1" />

        <span className="px-2 py-0.5 hidden md:inline">utf-8</span>
        <span className="px-2 py-0.5 hidden sm:inline">tsx</span>
        <span className="px-2 py-0.5">{time}</span>
        <span className="px-2 py-0.5 bg-bg-elevated/70 hidden lg:inline">
          cmd+k to search
        </span>
      </div>
    </footer>
  );
}
