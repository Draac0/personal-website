"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { FileHeader } from "./FileHeader";
import { Magnetic } from "./Magnetic";

export function Contact() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader filename="CONTACT.md" id="contact" />

      <div className="glass p-8 sm:p-12 md-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-3">
            # how to reach me
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight gradient-text leading-[1] mb-6 max-w-3xl">
            Got a problem worth solving?{" "}
            <span className="text-accent accent-glow">Open an issue.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mb-10 leading-relaxed">
            I&apos;m best reached over LinkedIn — drop a DM. For code, my GitHub is
            the source of truth. No email on this site by design.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Magnetic strength={0.2}>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 px-5 py-4 rounded-md border border-line bg-bg-elevated/40 hover:border-accent hover:bg-accent hover:text-bg transition-all sm:min-w-[280px]"
              >
                <div className="flex flex-col items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent group-hover:text-bg/70">
                    primary channel
                  </span>
                  <span className="font-mono text-sm">linkedin / DM</span>
                </div>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 px-5 py-4 rounded-md border border-line bg-bg-elevated/40 hover:border-accent hover:bg-accent hover:text-bg transition-all sm:min-w-[280px]"
              >
                <div className="flex flex-col items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint group-hover:text-bg/70">
                    code
                  </span>
                  <span className="font-mono text-sm">github / @asriram-bbp</span>
                </div>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
