"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const BASE = 440;
const MAX = 900;
const RADIUS = 300;

/**
 * The name, set in a variable-weight face. Each letter rises out of a mask on
 * load; afterwards the weight of every letter swells as the cursor passes it.
 */
export default function KineticName({ lines }) {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const chars = useRef([]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const host = root.current.closest("section") || root.current;
    const cur = new Map();
    let raf = 0;
    let px = -9999;
    let py = -9999;
    let running = false;

    const tick = () => {
      let moving = false;
      chars.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = BASE + (MAX - BASE) * Math.exp(-((d / RADIUS) ** 2));
        const prev = cur.get(el) ?? BASE;
        const next = prev + (target - prev) * 0.14;
        if (Math.abs(next - prev) > 0.3) moving = true;
        cur.set(el, next);
        el.style.fontVariationSettings = `"wght" ${next.toFixed(0)}`;
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
      running = moving;
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
    <h1 ref={root} className="t-display text-[clamp(2.6rem,12vw,10.5rem)] !leading-[1.1]" aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block whitespace-nowrap" aria-hidden>
          {[...line].map((c, ci) => {
            const i = n++;
            return (
              <span key={ci} className="inline-block overflow-hidden pb-[0.3em] align-top" style={{ marginBottom: "-0.3em" }}>
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "115%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.045 }}
                >
                  <span ref={(el) => (chars.current[i] = el)} className="inline-block" style={{ fontVariationSettings: `"wght" ${BASE}` }}>
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
