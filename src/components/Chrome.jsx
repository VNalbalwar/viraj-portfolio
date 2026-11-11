"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
  { id: "questions", label: "Q&A" },
];

// Temperature at each section: climbs to the contact form, then recovers.
const TEMPS = [24, 33, 42, 54, 66, 77, 88, 96, 58, 24];
const BAR =
  "linear-gradient(to bottom, var(--r1), var(--r2) 34%, var(--r3) 66%, var(--r4) 86%, var(--r2) 100%)";

const subscribeTheme = (cb) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme || "light",
    () => null
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{ color: "var(--ink)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme || "x"}
          initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/**
 * The navigation is the colour-bar legend of the heat map: section ticks on a
 * thermal ramp, with a marker and a temperature that follow the scroll.
 */
export default function Chrome() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const markerRef = useRef(null);
  const tempRefs = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    let tops = [];
    let raf = 0;
    const measure = () => {
      tops = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      tops.push(document.documentElement.scrollHeight - window.innerHeight * 0.4);
      update();
    };
    const update = () => {
      raf = 0;
      const y = window.scrollY + window.innerHeight * 0.4;
      let i = 0;
      while (i < SECTIONS.length - 1 && y >= tops[i + 1]) i++;
      const span = Math.max(1, tops[i + 1] - tops[i]);
      const f = Math.min(1, Math.max(0, (y - tops[i]) / span));
      const pos = (i + f) / SECTIONS.length;
      const temp = Math.round(TEMPS[i] + (TEMPS[i + 1] - TEMPS[i]) * f);
      if (markerRef.current) markerRef.current.style.top = `${Math.min(100, pos * 100)}%`;
      tempRefs.current.forEach((el) => el && (el.textContent = `${temp}°C`));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, pos)})`;
      setActive(i);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const glass = {
    background: "color-mix(in oklab, var(--t0) 82%, transparent)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "var(--ink)",
    boxShadow: "0 6px 24px -12px rgb(0 0 0 / 0.35)",
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2"
        style={glass}
      >
        Skip to content
      </a>

      {/* thin progress ramp, small screens */}
      <div className="fixed inset-x-0 top-0 z-40 h-[3px] lg:hidden" aria-hidden>
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ background: "linear-gradient(to right, var(--r1), var(--r2), var(--r3), var(--r4))", transform: "scaleX(0)" }}
        />
      </div>

      {/* top-right cluster */}
      <div className="fixed right-3 top-3 z-50 flex items-center gap-1 rounded-full p-0.5 sm:right-5 sm:top-4" style={glass}>
        <span ref={(el) => (tempRefs.current[0] = el)} className="readout pl-3 lg:hidden" aria-hidden>
          24°C
        </span>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Sections"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-3 top-[4.25rem] z-50 w-56 origin-top-right overflow-hidden rounded-3xl p-2 lg:hidden"
            style={glass}
          >
            <ul className="relative">
              <span aria-hidden className="absolute bottom-3 left-3 top-3 w-1.5 rounded-full" style={{ background: BAR }} />
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === i ? "true" : undefined}
                    className="flex min-h-11 items-center justify-between rounded-2xl py-2 pl-8 pr-3 text-[0.95rem] font-semibold"
                    style={active === i ? { background: "color-mix(in oklab, var(--ink) 10%, transparent)" } : undefined}
                  >
                    {s.label}
                    <span className="readout opacity-70">{TEMPS[i]}°</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* colour-bar nav, large screens */}
      <nav
        aria-label="Sections"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 rounded-full py-5 pl-3 pr-3 lg:block"
        style={glass}
      >
        <div className="relative h-[min(58vh,30rem)] w-2.5">
          <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: BAR }} />
          <ul className="absolute inset-0">
            {SECTIONS.map((s, i) => (
              <li
                key={s.id}
                className="group absolute right-0"
                style={{ top: `${((i + 0.5) / SECTIONS.length) * 100}%` }}
              >
                <a
                  href={`#${s.id}`}
                  aria-current={active === i ? "true" : undefined}
                  className="absolute right-[-0.55rem] top-1/2 flex h-8 -translate-y-1/2 items-center gap-2 whitespace-nowrap pl-3 pr-[0.55rem]"
                >
                  <span
                    className={`readout rounded-full px-2 py-0.5 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 ${
                      active === i ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                    }`}
                    style={{ background: "var(--t0)", color: "var(--ink)", fontWeight: active === i ? 700 : 500 }}
                  >
                    {s.label}
                  </span>
                  <span
                    aria-hidden
                    className="block h-[3px] rounded-full transition-all duration-300"
                    style={{ width: active === i ? "1.35rem" : "0.6rem", background: "var(--ink)", opacity: active === i ? 1 : 0.55 }}
                  />
                </a>
              </li>
            ))}
          </ul>
          {/* live marker */}
          <div
            ref={markerRef}
            aria-hidden
            className="absolute left-full ml-1 flex -translate-y-1/2 items-center"
            style={{ top: "0%", transition: "top 0.25s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <span
              className="block h-0 w-0 border-y-[5px] border-r-[7px] border-y-transparent"
              style={{ borderRightColor: "var(--ink)" }}
            />
          </div>
        </div>
        <p
          ref={(el) => (tempRefs.current[1] = el)}
          aria-hidden
          className="readout mt-4 w-full text-center font-bold"
          style={{ marginInline: "-0.6rem", width: "calc(100% + 1.2rem)" }}
        >
          24°C
        </p>
      </nav>
    </>
  );
}
