"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredPosts, posts, categoryLabels } from "../data/posts";
import { photoBySlug } from "../data/photos";
import { FileHeader } from "./FileHeader";

const TOP_EXPANDED = 3;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

export function WritingPreview() {
  const expanded = featuredPosts.slice(0, TOP_EXPANDED);
  const compact = featuredPosts.slice(TOP_EXPANDED);

  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader
        filename="posts/"
        meta={`${posts.length} items · ${featuredPosts.length} pinned · top 3 expanded`}
        id="writing"
      />

      <div className="space-y-5 mb-6">
        {expanded.map((p, i) => {
          const cover = photoBySlug.get(p.slug);
          const preview = truncate(p.body, 320);
          return (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px,1fr]">
                {cover && (
                  <Link
                    href={`/writing/${p.slug}`}
                    className="relative aspect-[4/3] md:aspect-auto md:h-full bg-bg-elevated/60 overflow-hidden border-b md:border-b-0 md:border-r border-white/5"
                  >
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 768px) 180px, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-bg/60 via-bg/0 to-bg/0" />
                  </Link>
                )}
                <div className={`p-6 sm:p-7 ${cover ? "" : "md:col-span-2"}`}>
                  <Link href={`/writing/${p.slug}`} className="group block">
                    <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                      <span className="px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
                        {categoryLabels[p.category]}
                      </span>
                      <span className="text-text-faint">{p.date}</span>
                      <span className="text-text-faint">·</span>
                      <span className="text-text-muted">{p.likes} ❤</span>
                      <span className="text-text-faint">·</span>
                      <span className="text-accent">★ pinned</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl text-text group-hover:text-accent transition-colors mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-3">
                      {preview}
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted group-hover:text-accent transition-colors">
                      read more →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="glass overflow-hidden">
        <div className="px-6 py-3 border-b border-white/5 bg-bg-elevated/30 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          <span className="text-accent">★</span>
          <span>more pinned</span>
          <span className="flex-1" />
          <Link
            href="/writing"
            className="text-text-muted hover:text-accent transition-colors"
          >
            view all → /writing
          </Link>
        </div>

        <ul className="divide-y divide-white/5">
          {compact.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link
                href={`/writing/${p.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-6 px-6 py-4 hover:bg-white/2.5 transition-colors"
              >
                <div className="flex items-center gap-2 sm:w-44 shrink-0 mb-1.5 sm:mb-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {categoryLabels[p.category]}
                  </span>
                  <span className="font-mono text-[10px] text-text-faint">
                    {p.year}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg text-text group-hover:text-accent transition-colors flex-1">
                  {p.title}
                </h3>
                <span className="font-mono text-[11px] text-text-faint shrink-0 mt-1 sm:mt-0">
                  {p.likes} ❤
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
