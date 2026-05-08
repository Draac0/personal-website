"use client";

import { motion } from "framer-motion";
import { experience, education, honors } from "../data/experience";
import { FileHeader } from "./FileHeader";

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

const COMMIT_TYPES = [
  "feat",
  "ship",
  "feat",
  "fix",
  "feat",
  "init",
] as const;

export function Experience() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader
        filename="experience/"
        meta={`git log · ${experience.length} commits`}
        id="work"
      />

      <div className="glass overflow-hidden">
        <div className="px-6 py-3 border-b border-white/5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint bg-bg-elevated/30">
          <span className="text-accent">$</span>
          <span>git log --oneline --decorate</span>
          <span className="flex-1" />
          <span>{experience.length} commits</span>
        </div>

        <ol>
          {experience.map((role, i) => {
            const sha = makeSha(role.start.charCodeAt(0) * 13 + i * 31);
            const type = COMMIT_TYPES[i] ?? "feat";
            const isHead = i === 0;
            return (
              <motion.li
                key={`${role.company}-${role.title}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group border-b border-white/5 last:border-b-0"
              >
                <div className="px-6 py-5 hover:bg-white/[0.025] transition-colors">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span className="sha">{sha}</span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded ${
                        type === "ship"
                          ? "bg-accent/15 text-accent border border-accent/30"
                          : type === "fix"
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-accent-cool/10 text-accent-cool border border-accent-cool/25"
                      }`}
                    >
                      {type}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {role.company.toLowerCase()}
                    </span>
                    {isHead && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded bg-accent text-bg">
                        HEAD → main
                      </span>
                    )}
                    <span className="flex-1" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-faint">
                      {role.start} → {role.end} · {role.duration}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl text-text group-hover:text-accent transition-colors mb-1">
                    {type}({role.company.toLowerCase().split(".")[0].replace(/\s/g, "-")}): {role.title.toLowerCase()}
                  </h3>

                  {role.location && (
                    <div className="font-mono text-[11px] text-text-faint mb-2">
                      {role.location}
                    </div>
                  )}

                  <p className="text-text-muted leading-relaxed text-sm sm:text-base max-w-3xl mb-3">
                    {role.blurb}
                  </p>

                  {role.stack && (
                    <div className="flex flex-wrap gap-1">
                      {role.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] text-text-muted border border-line px-1.5 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="glass p-6">
          <FileHeader filename="education.md" />
          <div className="space-y-3">
            {education.map((e, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 border-b border-white/5 last:border-0 pb-3 last:pb-0"
              >
                <div className="font-mono text-[11px] text-text-faint sm:w-24 shrink-0">
                  {e.years}
                </div>
                <div className="flex-1">
                  <div className="text-text text-sm">{e.degree}</div>
                  <div className="font-mono text-xs text-text-muted mt-0.5">
                    {e.school} · {e.grade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <FileHeader filename="honors.md" />
          <div className="space-y-3">
            {honors.map((h, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 border-b border-white/5 last:border-0 pb-3 last:pb-0"
              >
                <div className="font-mono text-[11px] text-text-faint sm:w-24 shrink-0">
                  {h.date}
                </div>
                <div className="flex-1">
                  <div className="text-text text-sm">{h.title}</div>
                  <div className="font-mono text-xs text-text-muted mt-0.5">
                    {h.issuer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
