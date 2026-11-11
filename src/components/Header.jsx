"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
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
      className="grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--ink)_10%,transparent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme || "x"}
          initial={{ rotate: -80, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 80, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Header() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  // hide on the way down, return on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240 && !open);
  });

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:px-4 focus:py-2"
        style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
      >
        Skip to content
      </a>

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={{ height: "var(--nav)" }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 transition-[background-color,backdrop-filter,border-color] duration-300"
          style={{
            background: scrolled ? "color-mix(in oklab, var(--bg) 78%, transparent)" : "transparent",
            backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
            borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{ background: "var(--accent)", scaleX: bar }}
        />
        <div className="wrap relative flex h-full items-center justify-between gap-6">
          <a href="#home" className="t-serif whitespace-nowrap text-[1.7rem]" aria-label="Viraj Nalbalwar, home">
            Viraj N.
          </a>
          <nav aria-label="Sections" className="hidden items-center lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className="relative px-3.5 py-2 text-[0.95rem] transition-colors duration-200"
                style={{ color: active === l.id ? "var(--ink)" : "var(--muted)" }}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a href="#contact" className="btn btn-solid hidden !h-11 sm:inline-flex">
              Say hello
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Sections"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto px-6 pb-10 pt-[calc(var(--nav)+1rem)] lg:hidden"
            style={{ background: "var(--bg)" }}
            data-lenis-prevent
          >
            <ul>
              {[...LINKS, { id: "contact", label: "Say hello" }].map((l, i) => (
                <motion.li
                  key={l.id}
                  className="border-b"
                  style={{ borderColor: "var(--line)" }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="t-display flex min-h-16 items-center text-[2.6rem]"
                    style={{ color: active === l.id ? "var(--accent)" : "var(--ink)" }}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
