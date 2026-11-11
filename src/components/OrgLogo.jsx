"use client";

import { motion, useReducedMotion } from "motion/react";
import { GraduationCap } from "lucide-react";

/**
 * A logo tile that pops in when it scrolls into view and answers hover with a
 * spring, the same way the skill logos do. `src` omitted draws a cap icon.
 */
export default function OrgLogo({ src, name, size = 64 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="grid shrink-0 place-items-center overflow-hidden rounded-[14px]"
      style={{ width: size, height: size, background: "#ffffff", boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.08)" }}
      initial={reduce ? false : { scale: 0.5, rotate: -10, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      whileHover={reduce ? undefined : { scale: 1.12, rotate: -5 }}
      transition={{ type: "spring", stiffness: 380, damping: 17 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${name} logo`} width={size} height={size} loading="lazy" className="h-full w-full object-contain" style={{ padding: size * 0.14 }} />
      ) : (
        <GraduationCap aria-label={`${name}`} size={size * 0.5} color="#0b0d17" />
      )}
    </motion.span>
  );
}
