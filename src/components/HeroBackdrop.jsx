"use client";

import { useEffect, useRef } from "react";

/** A soft light that eases toward the pointer, over a slow drifting glow. */
export default function HeroBackdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const host = el.parentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const cur = { x: 70, y: 30 };
    const to = { x: 70, y: 30 };
    const tick = () => {
      cur.x += (to.x - cur.x) * 0.08;
      cur.y += (to.y - cur.y) * 0.08;
      el.style.setProperty("--mx", `${cur.x}%`);
      el.style.setProperty("--my", `${cur.y}%`);
      raf = Math.abs(to.x - cur.x) + Math.abs(to.y - cur.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      to.x = ((e.clientX - r.left) / r.width) * 100;
      to.y = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="hero-orb absolute -right-[10%] -top-[20%] h-[46rem] w-[46rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 22%, transparent), transparent)" }}
      />
      <div className="hero-glow absolute inset-0" />
    </div>
  );
}
