"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { photos } from "../data/photos";
import { FileHeader } from "./FileHeader";
import { TiltCard } from "./TiltCard";

export function Photos() {
  if (photos.length === 0) return null;

  return (
    <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
      <FileHeader
        filename="photos/"
        meta={`${photos.length} items`}
        id="photos"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {photos.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
          >
            <TiltCard intensity={5} className="h-full">
              <figure className="group glass relative aspect-square overflow-hidden p-0">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {p.year}
                  </div>
                  <div className="text-sm text-text mt-1 leading-snug">
                    {p.caption}
                  </div>
                </figcaption>
              </figure>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
