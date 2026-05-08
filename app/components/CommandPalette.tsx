"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { posts, categoryLabels } from "../data/posts";
import { experience } from "../data/experience";

type Item = {
  id: string;
  label: string;
  hint: string;
  kind: "file" | "post" | "role" | "action";
  href?: string;
  external?: string;
  keywords?: string[];
};

const FILE_ITEMS: Item[] = [
  { id: "f-readme", label: "README.md", hint: "overview", kind: "file", href: "/#readme" },
  { id: "f-about", label: "about.md", hint: "bio", kind: "file", href: "/#about" },
  { id: "f-work", label: "experience/", hint: "git log of roles", kind: "file", href: "/#work" },
  { id: "f-photos", label: "photos/", hint: "field notes", kind: "file", href: "/#photos" },
  { id: "f-posts", label: "posts/", hint: "29 items", kind: "file", href: "/writing" },
  { id: "f-contact", label: "CONTACT.md", hint: "say hi", kind: "file", href: "/#contact" },
];

const ACTION_ITEMS: Item[] = [
  {
    id: "a-linkedin",
    label: "Open LinkedIn",
    hint: "abhinav-sriram",
    kind: "action",
    external: "https://www.linkedin.com/in/abhinav-sriram/",
    keywords: ["dm", "message"],
  },
  {
    id: "a-github",
    label: "Open GitHub",
    hint: "asriram-bbp",
    kind: "action",
    external: "https://github.com/asriram-bbp",
    keywords: ["repos", "code", "contributions"],
  },
  {
    id: "a-resume",
    label: "Print resume",
    hint: "ctrl+p",
    kind: "action",
    keywords: ["cv", "pdf"],
  },
];

function score(query: string, hay: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const h = hay.toLowerCase();
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  if (h.includes(q)) return 60;
  // fuzzy: every char of q in order in h
  let i = 0;
  for (const c of h) {
    if (c === q[i]) i++;
    if (i === q.length) return 40;
  }
  return 0;
}

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo<Item[]>(() => {
    const postItems: Item[] = posts.map((p) => ({
      id: `p-${p.slug}`,
      label: p.title,
      hint: `${categoryLabels[p.category]} · ${p.year}`,
      kind: "post",
      href: `/writing/${p.slug}`,
      keywords: [p.summary, ...p.hashtags],
    }));
    const roleItems: Item[] = experience.map((r, i) => ({
      id: `r-${i}`,
      label: `${r.title} @ ${r.company}`,
      hint: `${r.start} → ${r.end}`,
      kind: "role",
      href: "/#work",
      keywords: r.stack ?? [],
    }));
    return [...FILE_ITEMS, ...ACTION_ITEMS, ...roleItems, ...postItems];
  }, []);

  const filtered = useMemo(() => {
    if (!query) return allItems;
    return allItems
      .map((it) => {
        const haystack = [it.label, it.hint, ...(it.keywords ?? [])].join(" ");
        return { item: it, score: score(query, haystack) };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }, [query, allItems]);

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[active];
        if (!it) return;
        if (it.id === "a-resume") {
          window.print();
          onClose();
          return;
        }
        if (it.external) {
          window.open(it.external, "_blank");
        } else if (it.href) {
          router.push(it.href);
        }
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, active, onClose, router]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-start justify-center pt-[12vh] px-4"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="glass relative w-full max-w-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M14 14l-3-3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="search files, posts, roles…"
            className="flex-1 bg-transparent outline-none font-mono text-sm text-text placeholder:text-text-faint"
          />
          <span className="kbd">esc</span>
        </div>

        <ul className="max-h-[55vh] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-xs text-text-muted">
              no matches.
            </li>
          )}
          {filtered.slice(0, 40).map((it, i) => {
            const isActive = i === active;
            const className = `flex items-center gap-3 px-4 py-2 cursor-pointer ${
              isActive ? "bg-accent/15 text-text" : "hover:bg-white/5"
            }`;
            const inner = (
              <>
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-sm font-mono text-[9px] ${
                    isActive
                      ? "bg-accent text-bg"
                      : "bg-bg-elevated/60 text-text-muted border border-line"
                  }`}
                >
                  {it.kind === "file"
                    ? "M"
                    : it.kind === "post"
                      ? "P"
                      : it.kind === "role"
                        ? "R"
                        : "→"}
                </span>
                <span className="flex-1 font-mono text-sm truncate">
                  {it.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-faint shrink-0">
                  {it.hint}
                </span>
              </>
            );
            const onMouseEnter = () => setActive(i);
            if (it.id === "a-resume") {
              return (
                <li
                  key={it.id}
                  onMouseEnter={onMouseEnter}
                  onClick={() => {
                    window.print();
                    onClose();
                  }}
                  className={className}
                >
                  {inner}
                </li>
              );
            }
            if (it.external) {
              return (
                <li key={it.id} onMouseEnter={onMouseEnter}>
                  <a
                    href={it.external}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                    className={className}
                  >
                    {inner}
                  </a>
                </li>
              );
            }
            return (
              <li key={it.id} onMouseEnter={onMouseEnter}>
                <Link href={it.href ?? "/"} onClick={onClose} className={className}>
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-white/5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-faint">
          <div className="flex items-center gap-3">
            <span>
              <span className="kbd">↑</span> <span className="kbd">↓</span> nav
            </span>
            <span>
              <span className="kbd">↵</span> open
            </span>
          </div>
          <span>{filtered.length} matches</span>
        </div>
      </div>
    </div>
  );
}
