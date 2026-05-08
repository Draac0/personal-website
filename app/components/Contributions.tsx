import {
  fetchContributions,
  currentStreak,
  maxStreak,
  PRIMARY_USERNAME,
} from "../lib/github";
import { FileHeader } from "./FileHeader";
import { ContributionGraph } from "./ContributionGraph";
import { ScrollEnd } from "./ScrollEnd";

export async function Contributions() {
  const data = await fetchContributions(PRIMARY_USERNAME);
  const streak = currentStreak(data.days);
  const longest = maxStreak(data.days);

  if (!data.weeks.length) return null;

  const fetchedDate = new Date(data.fetchedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader
        filename="contributions.live"
        meta={`${data.total} commits · 12 mo · synced ${fetchedDate}`}
        id="contributions"
      />

      <div className="glass overflow-hidden">
        <div className="px-6 py-3 border-b border-white/5 bg-bg-elevated/40 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint">
          <span className="flex items-center gap-2 text-accent">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            live · github.com/{data.username}
          </span>
          <span className="text-text-faint">·</span>
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            view on github →
          </a>
          <span className="flex-1" />
          <span className="hidden sm:flex items-center gap-1.5">
            less
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{
                background: "rgba(198,255,0,0.22)",
                border: "1px solid rgba(198,255,0,0.3)",
              }}
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: "rgba(198,255,0,0.45)" }}
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: "rgba(198,255,0,0.75)" }}
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{
                background: "#c6ff00",
                boxShadow: "0 0 6px rgba(198,255,0,0.5)",
              }}
            />
            more
          </span>
        </div>

        <div className="p-7 sm:p-10">
          <div className="grid grid-cols-3 gap-3 mb-7 max-w-md">
            <Stat label="total / 12 mo" value={data.total.toLocaleString()} />
            <Stat
              label="current streak"
              value={`${streak}d`}
              accent={streak > 0}
            />
            <Stat label="longest" value={`${longest}d`} />
          </div>

          <ScrollEnd className="overflow-x-auto -mx-2 px-2 pb-2">
            <ContributionGraph weeks={data.weeks} cellSize={16} gap={5} />
          </ScrollEnd>

          <p className="mt-6 font-mono text-[11px] text-text-muted leading-relaxed max-w-2xl">
            Hover any cell to see the day &amp; level. Sourced from my work
            GitHub profile and refreshed daily. Most activity lives in private
            repos — surfaced here via the &quot;include private contributions&quot;
            setting.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-line bg-bg-elevated/40 backdrop-blur-sm rounded-md px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
        {label}
      </div>
      <div className={`text-xl mt-1 ${accent ? "text-accent" : "text-text"}`}>
        {value}
      </div>
    </div>
  );
}
