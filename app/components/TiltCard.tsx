"use client";

import { useEffect, useRef } from "react";

export function TiltCard({
  children,
  className = "",
  intensity = 8,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 0,
      ty = 0,
      gx = 50,
      gy = 50;
    let dx = 0,
      dy = 0,
      dgx = 50,
      dgy = 50;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tx = (py - 0.5) * -intensity;
      ty = (px - 0.5) * intensity;
      gx = px * 100;
      gy = py * 100;
      active = true;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      gx = 50;
      gy = 50;
      active = false;
    };

    const tick = () => {
      const rate = active ? 0.18 : 0.08;
      dx += (tx - dx) * rate;
      dy += (ty - dy) * rate;
      dgx += (gx - dgx) * rate;
      dgy += (gy - dgy) * rate;
      el.style.transform = `perspective(900px) rotateX(${dx}deg) rotateY(${dy}deg)`;
      if (glare) {
        el.style.setProperty("--glare-x", `${dgx}%`);
        el.style.setProperty("--glare-y", `${dgy}%`);
      }
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity, glare]);

  return (
    <div
      ref={ref}
      className={`tilt-card ${glare ? "tilt-glare" : ""} ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
