"use client";

import { motion, useReducedMotion } from "motion/react";

/** A bar that warms up to `heat` (0 to 1) when it scrolls into view. */
export default function HeatBar({ heat }) {
  const reduce = useReducedMotion();
  const end = `inset(0 ${Math.round((1 - heat) * 100)}% 0 0 round 99px)`;
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, var(--r1), var(--r2) 45%, var(--r3) 80%, var(--r4))" }}
          initial={{ clipPath: "inset(0 100% 0 0 round 99px)" }}
          whileInView={{ clipPath: end }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="readout w-10 text-right" style={{ color: "var(--on-2)" }}>
        {Math.round(24 + heat * 72)}°
      </span>
    </div>
  );
}
