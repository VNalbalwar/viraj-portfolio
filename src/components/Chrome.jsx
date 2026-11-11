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

/** Floating nav: a pill of section links on desktop, a menu on small screens. */
export default function Chrome() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    let tops = [];
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY + window.innerHeight * 0.4;
      let i = 0;
      while (i < SECTIONS.length - 1 && y >= tops[i + 1]) i++;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      setActive(i);
    };
    const measure = () => {
      tops = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      update();
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
    background: "color-mix(in oklab, var(--bg) 78%, transparent)",
    backdropFilter: "blur(14px) saturate(1.4)",
    WebkitBackdropFilter: "blur(14px) saturate(1.4)",
    color: "var(--ink)",
    border: "1px solid color-mix(in oklab, var(--ink) 12%, transparent)",
    boxShadow: "0 10px 30px -18px rgb(0 0 0 / 0.45)",
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

      <div className="fixed inset-x-0 top-0 z-50 h-[2px]" aria-hidden>
        <div ref={progressRef} className="h-full origin-left" style={{ background: "var(--accent)", transform: "scaleX(0)" }} />
      </div>

      <header className="fixed inset-x-0 top-3 z-40 flex justify-end px-3 sm:top-4 lg:justify-center">
        <div className="flex items-center gap-1 rounded-full p-1" style={glass}>
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === i ? "true" : undefined}
                    className="relative block rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors duration-200"
                    style={{ color: active === i ? "var(--accent-on)" : undefined }}
                  >
                    {active === i && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Sections"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-3 top-[4.5rem] z-40 w-56 origin-top-right rounded-3xl p-2 lg:hidden"
            style={glass}
          >
            <ul>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === i ? "true" : undefined}
                    className="flex min-h-11 items-center rounded-2xl px-4 py-2 text-[0.98rem] font-semibold"
                    style={active === i ? { background: "var(--accent)", color: "var(--accent-on)" } : undefined}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
