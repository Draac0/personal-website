"use client";

import { useEffect, useState } from "react";
import { Aurora } from "./Aurora";
import { RepoTopBar } from "./RepoTopBar";
import { FileTree } from "./FileTree";
import { StatusLine } from "./StatusLine";
import { CommandPalette } from "./CommandPalette";

export function RepoShell({
  children,
  contribTotal,
}: {
  children: React.ReactNode;
  contribTotal: number;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "/" && !paletteOpen) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <>
      <Aurora />
      <div className="grain" aria-hidden />

      <RepoTopBar
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        contribTotal={contribTotal}
      />

      <div className="relative z-10 flex">
        <FileTree open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>

      <StatusLine />

      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} />
      )}
    </>
  );
}
