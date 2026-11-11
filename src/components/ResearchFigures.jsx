"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// ── Fig. 1: latency during and after interference (illustrative) ───────────
function buildTrace() {
  // deterministic pseudo-noise so server and client agree
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5);
  const pts = [];
  for (let x = 0; x <= 600; x += 6) {
    let y = 168 + rnd() * 6;
    if (x >= 190 && x < 400) y = 168 - 1.7 * 58 + rnd() * 16;
    if (x >= 400 && x < 424) y = 168 - 1.7 * 58 * Math.exp(-(x - 400) / 5) + rnd() * 6;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}
const TRACE = buildTrace();

export function RecoveryFigure() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  return (
    <figure ref={ref}>
      <svg viewBox="0 0 600 220" className="w-full" role="img" aria-label="Chart: latency jumps to about 2.7 times baseline while an interfering workload runs, then drops back to baseline almost immediately when it stops.">
        <rect x="190" y="18" width="210" height="176" rx="6" fill="var(--hot)" opacity="0.14" />
        <text x="295" y="36" textAnchor="middle" className="readout" fill="currentColor">interferer on</text>
        <line x1="0" y1="168" x2="600" y2="168" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 5" />
        <text x="6" y="186" className="readout" fill="currentColor" opacity="0.8">1.0× baseline</text>
        <text x="6" y="64" className="readout" fill="currentColor" opacity="0.8">2.7×</text>
        <line x1="0" y1="69" x2="600" y2="69" stroke="currentColor" strokeOpacity="0.15" />
        <motion.path
          d={TRACE}
          fill="none"
          stroke="var(--hot)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView || reduce ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 2.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: inView || reduce ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 2.2, duration: 0.5 }}
        >
          <line x1="424" y1="150" x2="424" y2="118" stroke="currentColor" />
          <text x="432" y="116" className="readout" fill="currentColor">recovered: tens of µs</text>
        </motion.g>
        <text x="594" y="212" textAnchor="end" className="readout" fill="currentColor" opacity="0.8">time →</text>
      </svg>
      <figcaption className="readout mt-2 opacity-80">Fig. 1. Victim kernel latency. Illustrative trace, real data is in the paper.</figcaption>
    </figure>
  );
}

// ── Fig. 2: a scheduler placing pods on the coolest core (simulated) ───────
const START = [62, 48, 71, 39, 55, 66, 44, 58];
const coolest = (t) => t.indexOf(Math.min(...t));

export function SchedulerFigure() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [state, setState] = useState({ temps: START, target: coolest(START), pod: 1 });

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      setState((prev) => {
        // the core that just got a pod heats up; everything else cools a little
        const temps = prev.temps.map((t, i) =>
          i === prev.target ? Math.min(88, t + 17) : Math.max(34, t - 3 - ((i * 7 + prev.pod) % 3))
        );
        return { temps, target: coolest(temps), pod: prev.pod + 1 };
      });
    }, 1500);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const { temps, target, pod } = state;
  return (
    <figure ref={ref}>
      <div className="grid grid-cols-4 gap-2" role="img" aria-label="Animation: eight CPU cores coloured by temperature. Each new pod is placed on the coolest core.">
        {temps.map((t, i) => {
          const k = (t - 34) / 54;
          return (
            <div
              key={i}
              className="relative flex aspect-[4/3] flex-col justify-between rounded-xl p-2.5 transition-[background-color] duration-1000"
              style={{
                background:
                  k < 0.5
                    ? `color-mix(in oklab, var(--r2) ${k * 200}%, var(--r1))`
                    : `color-mix(in oklab, var(--r3) ${(k - 0.5) * 200}%, var(--r2))`,
                color: k > 0.45 ? "var(--accent-on)" : "var(--on)",
                outline: i === target ? "2px solid var(--on)" : "2px solid transparent",
                outlineOffset: 2,
              }}
            >
              <span className="readout">core {i}</span>
              <span className="text-lg font-bold leading-none">{t}°</span>
              {i === target && (
                <motion.span
                  layoutId="pod"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="readout absolute right-2 top-2 rounded-full px-1.5 py-0.5"
                  style={{ background: "var(--on)", color: "var(--bg)" }}
                >
                  pod-{pod}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <figcaption className="readout mt-3 opacity-80">Fig. 2. Next pod goes to the coolest core. Simulated here, measured in the paper.</figcaption>
    </figure>
  );
}
