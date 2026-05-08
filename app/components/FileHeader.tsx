"use client";

import { motion } from "framer-motion";

export function FileHeader({
  filename,
  meta,
  id,
}: {
  filename: string;
  meta?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-2.5 mb-6 sm:mb-8"
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-accent/15 border border-accent/30 text-accent font-mono text-[9px]">
        M
      </span>
      <span className="font-mono text-sm text-text">{filename}</span>
      {meta && (
        <>
          <span className="font-mono text-text-faint">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-faint">
            {meta}
          </span>
        </>
      )}
      <span className="flex-1 h-px bg-line" />
    </motion.div>
  );
}
