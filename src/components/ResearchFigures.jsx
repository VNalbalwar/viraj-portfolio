"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

// ── Fig. 1: latency during and after interference (illustrative trace) ─────
function buildTrace() {
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
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const go = inView || reduce;
  const dur = reduce ? 0 : 3.2;
  return (
    <figure ref={ref}>
      <svg
        viewBox="0 0 600 220"
        className="w-full"
        role="img"
        aria-label="Chart: kernel latency rises to about 2.7 times baseline while an interfering workload runs, then returns to baseline almost immediately after it stops."
      >
        <motion.rect
          x="190" y="18" width="210" height="176" fill="var(--accent)"
          initial={{ opacity: 0 }}
          animate={{ opacity: go ? 0.14 : 0 }}
          transition={{ delay: reduce ? 0 : dur * 0.3, duration: 0.6 }}
        />
        <text x="295" y="36" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-geist-mono)">
          interferer on
        </text>
        <line x1="0" y1="168" x2="600" y2="168" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 5" />
        <text x="6" y="186" fill="currentColor" fontSize="12" fontFamily="var(--font-geist-mono)">1.0x baseline</text>
        <text x="6" y="64" fill="currentColor" fontSize="12" fontFamily="var(--font-geist-mono)">2.7x</text>
        <line x1="0" y1="69" x2="600" y2="69" stroke="currentColor" strokeOpacity="0.15" />
        <motion.path
          d={TRACE} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: go ? 1 : 0 }}
          transition={{ duration: dur, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: go ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : dur * 0.85, duration: 0.5 }}
        >
          <line x1="424" y1="150" x2="424" y2="118" stroke="currentColor" />
          <text x="432" y="116" fill="currentColor" fontSize="12" fontFamily="var(--font-geist-mono)">back to baseline in tens of µs</text>
        </motion.g>
        <text x="594" y="212" textAnchor="end" fill="currentColor" fontSize="12" fontFamily="var(--font-geist-mono)">time</text>
      </svg>
    </figure>
  );
}

// ── Fig. 2: a scheduler placing each pod on the coolest core (simulated) ───
const START = [62, 48, 71, 39, 55, 66, 44, 58];
const coolest = (t) => t.indexOf(Math.min(...t));

export function SchedulerFigure() {
  const [state, setState] = useState({ temps: START, target: coolest(START), pod: 1 });
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setState((prev) => {
        const temps = prev.temps.map((t, i) =>
          i === prev.target ? Math.min(88, t + 17) : Math.max(34, t - 3 - ((i * 7 + prev.pod) % 3))
        );
        return { temps, target: coolest(temps), pod: prev.pod + 1 };
      });
    }, 2600);
    return () => clearInterval(id);
  }, [playing]);

  const { temps, target, pod } = state;
  return (
    <figure>
      <div className="grid grid-cols-4 gap-2" role="img" aria-label="Eight CPU cores shaded by temperature. Each new pod is placed on the coolest core.">
        {temps.map((t, i) => {
          const k = (t - 34) / 54;
          return (
            <div
              key={i}
              className="relative flex aspect-[4/3] flex-col justify-between rounded-[10px] p-2.5 transition-[background-color] duration-1000"
              style={{
                background: `color-mix(in oklab, var(--accent) ${Math.round(k * 100)}%, var(--bg))`,
                color: k > 0.5 ? "var(--accent-ink)" : "var(--ink)",
              }}
            >
              <span className="text-[0.75rem] opacity-80">core {i}</span>
              <span className="t-num text-lg font-medium leading-none">{t}°C</span>
              {i === target && (
                <motion.span
                  layoutId="pod"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[0.7rem] font-medium"
                  style={{ background: "var(--ink)", color: "var(--bg)" }}
                >
                  pod-{pod}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause animation" : "Play animation"}
        className="mt-3 inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.85rem] hover:bg-[color-mix(in_oklab,var(--ink)_8%,transparent)]"
      >
        {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
      </button>
    </figure>
  );
}
