"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Wraps the timeline and draws a rail that fills as you scroll through it. */
export default function TimelineRail({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <div ref={ref} className="relative mt-14 pl-8 sm:pl-12">
      <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-[2px] rounded-full sm:left-[11px]" style={{ background: "var(--line)" }} />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[7px] top-2 w-[2px] origin-top rounded-full sm:left-[11px]"
        style={{ background: "var(--accent)", scaleY }}
      />
      {children}
    </div>
  );
}

/** One timeline entry: its dot fills and the card settles in when it arrives. */
export function TimelineItem({ children }) {
  return (
    <motion.li
      className="relative"
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: "0px 0px -30% 0px" }}
    >
      <motion.span
        aria-hidden
        className="absolute -left-8 top-[0.55rem] h-4 w-4 rounded-full border-2 sm:-left-12 sm:ml-1"
        style={{ borderColor: "var(--accent)" }}
        variants={{ off: { backgroundColor: "var(--bg)", scale: 0.7 }, on: { backgroundColor: "var(--accent)", scale: 1 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        variants={{ off: { x: 18, opacity: 0.35 }, on: { x: 0, opacity: 1 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.li>
  );
}
