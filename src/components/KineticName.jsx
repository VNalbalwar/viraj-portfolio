"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const RADIUS = 260;

/**
 * The name, set as a poster. Each letter rises out of a mask on load. After
 * that, letters under and near the cursor lean into italic and take the accent
 * colour, so the typeface itself responds to you.
 */
export default function KineticName({ lines }) {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const romans = useRef([]);
  const italics = useRef([]);
  const boxes = useRef([]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const host = root.current.closest("section") || root.current;
    const cur = [];
    let raf = 0;
    let px = -9999;
    let py = -9999;
    let running = false;

    const tick = () => {
      let moving = false;
      boxes.current.forEach((box, i) => {
        if (!box) return;
        const r = box.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = Math.exp(-((d / RADIUS) ** 2));
        const prev = cur[i] ?? 0;
        const next = prev + (target - prev) * 0.13;
        if (Math.abs(next - prev) > 0.002) moving = true;
        cur[i] = next;
        const color = `color-mix(in oklab, var(--accent) ${(next * 100).toFixed(0)}%, var(--ink))`;
        const on = next > 0.32; // a crisp swap, never two copies half visible
        if (romans.current[i]) romans.current[i].style.opacity = on ? "0" : "1";
        if (italics.current[i]) {
          italics.current[i].style.opacity = on ? "1" : "0";
          italics.current[i].style.color = color;
        }
      });
      running = moving;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = py = -9999;
      kick();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  let n = 0;
  return (
    <h1 ref={root} className="t-display text-[clamp(4.5rem,21vw,19rem)]" aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block whitespace-nowrap" aria-hidden>
          {[...line].map((c, ci) => {
            const i = n++;
            return (
              <span key={ci} className="inline-block overflow-hidden pb-[0.3em] pt-[0.1em] align-top" style={{ marginBottom: "-0.3em", marginTop: "-0.1em" }}>
                <motion.span
                  className="relative inline-block"
                  initial={reduce ? false : { y: "118%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.055 }}
                >
                  <span ref={(el) => (boxes.current[i] = el)} className="relative inline-block">
                    <span ref={(el) => (romans.current[i] = el)} className="inline-block transition-opacity duration-150">
                      {c}
                    </span>
                    <span
                      ref={(el) => (italics.current[i] = el)}
                      className="absolute left-1/2 top-0 inline-block italic opacity-0 transition-opacity duration-150"
                      style={{ transform: "translateX(-50%)" }}
                    >
                      {c}
                    </span>
                  </span>
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
