"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
      className="grid h-11 w-11 place-items-center rounded-md transition-colors duration-150 hover:bg-[color-mix(in_oklab,var(--ink)_10%,transparent)]"
    >
      {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

export default function Header() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:px-4 focus:py-2"
        style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
      >
        Skip to content
      </a>
      <header
        className="nav fixed inset-x-0 top-0 z-50 border-b"
        style={{ background: "var(--bg)", borderColor: "var(--line)", height: "var(--nav)" }}
      >
        <div className="wrap flex h-full items-center justify-between gap-6">
          <a href="#home" className="whitespace-nowrap text-[1.0625rem] font-medium tracking-tight" aria-label="Viraj Nalbalwar, home">
            Viraj Nalbalwar
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className="link-draw px-3 py-2 text-[0.9375rem]"
                style={{
                  color: active === l.id ? "var(--ink)" : "var(--muted)",
                  backgroundSize: active === l.id ? "calc(100% - 1.5rem) 1px" : undefined,
                  backgroundPosition: "center 100%",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#contact" className="btn btn-solid hidden sm:inline-flex">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-md lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav
          id="site-menu"
          aria-label="Sections"
          className="fixed inset-0 z-40 overflow-y-auto px-6 pb-10 pt-[calc(var(--nav)+1.5rem)] lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <ul>
            {[...LINKS, { id: "contact", label: "Contact" }].map((l) => (
              <li key={l.id} className="border-b" style={{ borderColor: "var(--line)" }}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center text-[1.5rem] font-medium tracking-tight"
                  style={{ color: active === l.id ? "var(--ink)" : "var(--muted)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
