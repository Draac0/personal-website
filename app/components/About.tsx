"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { FileHeader } from "./FileHeader";

export function About() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader
        filename="about.md"
        meta="3.2 kb · last edit 2026-05"
        id="about"
      />

      <div className="glass p-6 sm:p-10 md-content">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-2">
            # whoami
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-6 gradient-text">
            {profile.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-mono text-xs">
            <KV k="role" v={profile.current} />
            <KV k="location" v={profile.location} />
            <KV k="contact" v="linkedin · github" />
          </div>

          <div className="space-y-5 text-text text-lg leading-relaxed max-w-2xl">
            {profile.bio.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-line bg-bg-elevated/30 rounded-md px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-text-faint">
        {k}
      </div>
      <div className="text-text mt-1">{v}</div>
    </div>
  );
}
