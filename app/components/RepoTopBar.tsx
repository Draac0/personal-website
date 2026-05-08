"use client";

import Link from "next/link";
import { repo } from "../data/site-tree";

export function RepoTopBar({
  onOpenPalette,
  onToggleSidebar,
}: {
  onOpenPalette: () => void;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="glass-flat sticky top-0 z-40">
      <div className="flex items-center h-12 px-3 sm:px-5 gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden font-mono text-xs text-text-muted hover:text-accent px-2"
          aria-label="Toggle sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 4h12v1H2zM2 8h12v1H2zM2 12h12v1H2z" />
          </svg>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm group"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 border border-accent/30 text-accent text-[10px] font-semibold">
            AS
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="text-text-muted">{repo.owner}</span>
            <span className="text-text-faint">/</span>
            <span className="text-text font-medium group-hover:text-accent transition-colors">
              {repo.name}
            </span>
          </span>
        </Link>

        <span className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full border border-line bg-bg-elevated/50 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 5a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zM5 5a2 2 0 11-4 0 2 2 0 014 0z" />
            <path d="M3 5v6h1V5H3zm6 0v3.5a2.5 2.5 0 01-2.5 2.5H6v1h.5A3.5 3.5 0 0010 8.5V5H9z" />
          </svg>
          <span className="text-accent">{repo.branch}</span>
        </span>

        <div className="flex-1" />

        <button
          onClick={onOpenPalette}
          className="group flex items-center gap-2 px-3 py-1.5 border border-line rounded-md bg-bg-elevated/40 hover:border-accent/40 hover:bg-bg-elevated/70 transition-colors"
          aria-label="Open command palette"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted group-hover:text-accent transition-colors"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M14 14l-3-3" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline font-mono text-xs text-text-muted group-hover:text-text transition-colors">
            search files
          </span>
          <span className="hidden sm:flex items-center gap-1 ml-2">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-3 ml-2">
          <a
            href="https://github.com/asriram-bbp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>{repo.stars}</span>
          </a>
          <Link
            href="/writing"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            posts/
          </Link>
        </div>
      </div>
    </header>
  );
}
