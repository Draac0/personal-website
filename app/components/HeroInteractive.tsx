"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ContribDay } from "../lib/github";
import { HeroBgHeatmap } from "./HeroBgHeatmap";

export function HeroInteractive({
  profile,
  repo,
  contribTotal,
  contribStreak,
  contribLongest,
  weeks,
  readMoreHref,
}: {
  profile: { name: string; githubUrl: string };
  repo: {
    owner: string;
    name: string;
    branch: string;
    description: string;
    topics: readonly string[];
  };
  contribTotal: number;
  contribStreak: number;
  contribLongest: number;
  weeks: ContribDay[][];
  readMoreHref: string;
}) {
  const hasContribData = weeks.length > 0;

  return (
    <section
      id="readme"
      className="relative px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-14"
    >
      <div className="glass overflow-hidden relative lg:min-h-[560px]">
        {hasContribData && (
          <>
            <HeroBgHeatmap weeks={weeks} />
            {/* Desktop scrim: strong on the left where text lives, fades
                right so cells stay visible. Hidden on mobile/tablet where
                the heatmap sits at the bottom and doesn't compete with text. */}
            <div
              aria-hidden
              className="hidden lg:block absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(7,8,10,0.96) 0%, rgba(7,8,10,0.85) 28%, rgba(7,8,10,0.35) 55%, rgba(7,8,10,0) 100%)",
              }}
            />
            {/* Mobile/tablet scrim: dim the top half slightly so the text
                column reads cleanly above the bottom heatmap strip. */}
            <div
              aria-hidden
              className="lg:hidden absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,8,10,0.92) 0%, rgba(7,8,10,0.7) 50%, rgba(7,8,10,0) 100%)",
              }}
            />
          </>
        )}

        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-faint"
          >
            <span className="flex items-center gap-2 text-accent">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.66 1.745.75.75 0 01-.99 1.124A2.5 2.5 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
              </svg>
              <span>
                {repo.owner}/{repo.name}
              </span>
            </span>
            <span className="text-text-faint">·</span>
            <span>public</span>
            <span className="text-text-faint">·</span>
            <span>{repo.branch}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-medium leading-[0.95] mb-4"
          >
            <span className="gradient-text">{profile.name}</span>
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-6"
          >
            {repo.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-1.5 mb-8"
          >
            {repo.topics.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mb-8"
          >
            <Stat label="contribs / yr" value={contribTotal.toString()} />
            <Stat
              label="current"
              fullLabel="current streak"
              value={`${contribStreak}d`}
              accent={contribStreak > 0}
            />
            <Stat label="longest" fullLabel="longest streak" value={`${contribLongest}d`} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center gap-2"
          >
            <Link
              href={readMoreHref}
              className="inline-flex items-center gap-2 bg-accent text-bg px-4 py-2 rounded-md font-mono text-xs uppercase tracking-[0.15em] hover:bg-accent/90 transition-colors"
            >
              <span>read about.md</span>
              <span>→</span>
            </Link>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs uppercase tracking-[0.15em] border border-line bg-bg-elevated/50 backdrop-blur-sm hover:border-accent/50 text-text-muted hover:text-text transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>view on github</span>
            </a>
          </motion.div>
        </div>

        {hasContribData && (
          <div className="relative border-t border-white/5 px-7 sm:px-10 lg:px-12 py-3 bg-bg/55 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint">
            <span className="flex items-center gap-2 text-accent">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {contribTotal} contributions in the last 12 months
            </span>
            <span className="flex-1" />
            <a
              href="#contributions"
              className="hover:text-accent transition-colors"
            >
              jump to graph ↓
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
  fullLabel,
}: {
  label: string;
  value: string;
  accent?: boolean;
  fullLabel?: string;
}) {
  return (
    <div className="border border-line bg-bg-elevated/50 backdrop-blur-md rounded-md px-2.5 sm:px-3 py-2 sm:py-2.5">
      <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-text-faint truncate">
        <span className="sm:hidden">{label}</span>
        <span className="hidden sm:inline">{fullLabel ?? label}</span>
      </div>
      <div
        className={`text-lg sm:text-xl mt-0.5 sm:mt-1 ${accent ? "text-accent" : "text-text"}`}
      >
        {value}
      </div>
    </div>
  );
}
