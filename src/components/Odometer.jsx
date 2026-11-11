"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";

/**
 * Rolls once, like an odometer, when it scrolls into view. The server and the
 * no-JS state both show the real figure; the strips only move after the first
 * view. Transform only. Under reduced motion it never moves.
 */
export default function Odometer({ value }) {
  const text = Number(value).toLocaleString("en-US");
  const ref = useRef(null);
  const [rolled, setRolled] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setArmed(true);
        // two frames so the start position paints before it moves
        requestAnimationFrame(() => requestAnimationFrame(() => setRolled(true)));
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chars = [...text];
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let di = 0;

  return (
    <span ref={ref} className="odo" aria-label={text} role="text">
      {chars.map((c, i) => {
        if (!/\d/.test(c)) {
          return (
            <span key={i} className="odo-ch" aria-hidden>
              {c}
            </span>
          );
        }
        const d = Number(c);
        const fromRight = digitCount - 1 - di++;
        // the right-most digit turns the most
        const turns = 1 + Math.min(fromRight === 0 ? 2 : fromRight === 1 ? 1 : 0, 2);
        const strip = DIGITS.repeat(turns + 1);
        const rest = d + 10 * turns; // same digit, `turns` cycles down the strip
        const start = d; // same digit, top of the strip
        const y = armed ? (rolled ? rest : start) : rest;
        return (
          <span key={i} className="odo-col" aria-hidden>
            <span
              className="odo-strip"
              style={{ transform: `translateY(${-y}em)`, transition: armed && !rolled ? "none" : undefined }}
            >
              {[...strip].map((ch, k) => (
                <span key={k}>{ch}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
