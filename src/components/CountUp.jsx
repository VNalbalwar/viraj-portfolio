"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const fmt = (n) => Math.round(n).toLocaleString("en-US");

/**
 * Server renders the final number (good for SEO and no-JS). In the browser it
 * counts up once, in a fixed 0.8s no matter how big the number is, so nobody
 * waits on a counter. It always lands on the exact value.
 */
export default function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = fmt(v) + suffix),
      onComplete: () => (el.textContent = fmt(value) + suffix),
    });
    return () => {
      controls.stop();
      el.textContent = fmt(value) + suffix;
    };
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} aria-label={fmt(value) + suffix}>
      {fmt(value)}
      {suffix}
    </span>
  );
}
