"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * A heading whose words rise out of a mask. Splits plain text only.
 * `as` sets the tag; the words stay one inline flow so wrapping is normal.
 */
export function MaskHeading({ text, as: Tag = "h2", className = "", id, delay = 0 }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.3em] align-top" style={{ marginBottom: "-0.3em" }}>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "112%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade and rise, once. `delay` staggers siblings by hand. */
export function FadeUp({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Parent that staggers the <StaggerItem>s inside it as it enters view. */
export function Stagger({ children, className = "", as = "div", gap, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const v = gap ? { hidden: {}, show: { transition: { staggerChildren: gap } } } : container;
  return (
    <Comp
      className={className}
      variants={v}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
export function StaggerItem({ children, className = "", as = "div", ...rest }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={item} {...rest}>
      {children}
    </Comp>
  );
}

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-[0.16]" aria-hidden>{word}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {word}
      </motion.span>
    </span>
  );
}

/** A paragraph that fills in word by word as you scroll through it. */
export function ScrubText({ text, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = (i / words.length) * 0.85;
        const end = start + 0.15;
        return (
          <span key={i} aria-hidden>
            <Word word={w} progress={scrollYProgress} range={[start, end]} />
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
