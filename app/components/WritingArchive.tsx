"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import type { Post, PostCategory } from "../data/posts";

type Filter = "all" | PostCategory;

const CATEGORY_EXT: Record<PostCategory, string> = {
  engineering: "ts",
  build: "ts",
  career: "md",
  hackathon: "md",
  books: "md",
  personal: "md",
};

export function WritingArchive({
  posts,
  categories,
  labels,
  counts,
}: {
  posts: Post[];
  categories: PostCategory[];
  labels: Record<PostCategory, string>;
  counts: Record<PostCategory, number>;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [filter, posts]);

  return (
    <section className="px-4 sm:px-8 lg:px-12 py-10 sm:py-14 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2.5 mb-2 font-mono text-xs text-text-muted"
      >
        <Link href="/" className="hover:text-accent transition-colors">
          abhinav/me
        </Link>
        <span className="text-text-faint">/</span>
        <span className="text-text">posts</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-8 sm:mb-10"
      >
        <h1 className="text-4xl sm:text-5xl tracking-tight gradient-text mb-3 leading-[1]">
          posts/
        </h1>
        <p className="text-text-muted text-base max-w-2xl leading-relaxed">
          Engineering stories, hackathon journals, book notes, and consumer
          rants — {posts.length} entries collected from LinkedIn. Open one to
          read in full, or jump to the original post on LinkedIn.
        </p>
      </motion.div>

      <div className="glass overflow-hidden">
        <div className="px-5 sm:px-6 py-3 border-b border-white/5 bg-bg-elevated/40 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded transition-colors ${
              filter === "all"
                ? "bg-accent text-bg"
                : "text-text-muted hover:text-accent border border-line"
            }`}
          >
            * · {posts.length}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded transition-colors ${
                filter === c
                  ? "bg-accent text-bg"
                  : "text-text-muted hover:text-accent border border-line"
              }`}
            >
              {labels[c]} · {counts[c]}
            </button>
          ))}
          <span className="flex-1" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
            showing {filtered.length}
          </span>
        </div>

        <ol>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const ext = CATEGORY_EXT[p.category];
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.015, 0.3) }}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <Link
                    href={`/writing/${p.slug}`}
                    className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3 hover:bg-white/2.5 transition-colors"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-sm font-mono text-[9px] shrink-0 ${
                        ext === "ts"
                          ? "bg-accent-cool/15 text-accent-cool border border-accent-cool/30"
                          : "bg-accent/15 text-accent border border-accent/30"
                      }`}
                    >
                      {ext}
                    </span>
                    <span className="font-mono text-sm text-text-muted shrink-0 hidden sm:inline w-16">
                      {p.year}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint shrink-0 hidden md:inline w-24">
                      {labels[p.category]}
                    </span>
                    <span className="text-sm sm:text-base text-text group-hover:text-accent transition-colors flex-1 truncate">
                      {p.title}
                    </span>
                    <span className="font-mono text-[11px] text-text-faint shrink-0">
                      {p.likes}❤
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>

        {filtered.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-text-muted">
            no posts match this filter.
          </div>
        )}
      </div>
    </section>
  );
}
