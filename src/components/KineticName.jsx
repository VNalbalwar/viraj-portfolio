"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const RADIUS = 300;
const MAX_STROKE = 0.034; // em: how much heavier a letter gets at the cursor

/**
 * The name, set as a poster. Each letter rises out of a mask on load. After
 * that, letters near the cursor swell heavier (the serif has one weight, so
 * the swell is drawn with a growing outline) and ease back as you move away.
 */
export default function KineticName({ lines }) {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const chars = useRef([]);

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
      chars.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = Math.exp(-((d / RADIUS) ** 2));
        const prev = cur[i] ?? 0;
        const next = prev + (target - prev) * 0.14;
        if (Math.abs(next - prev) > 0.002) moving = true;
        cur[i] = next;
        el.style.webkitTextStroke = `${(next * MAX_STROKE).toFixed(4)}em currentColor`;
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
                  className="inline-block"
                  initial={reduce ? false : { y: "118%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.055 }}
                >
                  <span ref={(el) => (chars.current[i] = el)} className="inline-block">
                    {c}
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
