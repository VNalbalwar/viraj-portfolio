"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { BrandIcon } from "./Icons";
import { THUMBS } from "./ProjectThumb";
import PatternThumb from "./PatternThumb";

const INITIAL = 9;
const monthYear = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : null;

function Card({ p, lead }) {
  const Thumb = p.thumbKey ? THUMBS[p.thumbKey] : null;
  const updated = monthYear(p.pushedAt);
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(0_0_0/0.55)] ${
        lead ? "lg:flex-row" : ""
      }`}
      style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
    >
      <div className={lead ? "lg:w-[56%] lg:self-center" : ""}>
        {Thumb ? <Thumb /> : <PatternThumb id={p.id} label={p.language} />}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={`font-extrabold leading-tight [font-stretch:112%] ${lead ? "text-[1.6rem]" : "text-[1.25rem]"}`}>{p.title}</h3>
        {p.desc && (
          <p className={`mt-2.5 text-[0.98rem] ${lead ? "" : "line-clamp-4"}`} style={{ color: "var(--on-2)" }}>
            {p.desc}
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-hot inline-flex min-h-11 items-center gap-1.5">
            <BrandIcon id="github" size={16} /> Code
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-hot inline-flex min-h-11 items-center gap-1">
              Live <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          <span className="readout ml-auto flex items-center gap-3" style={{ color: "var(--on-2)" }}>
            {p.stars > 0 && (
              <span className="flex items-center gap-1">
                <Star size={12} aria-hidden /> {p.stars}
                <span className="sr-only"> stars</span>
              </span>
            )}
            {updated && <span>updated {updated}</span>}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects, live }) {
  const [tag, setTag] = useState("All");
  const [all, setAll] = useState(false);
  const reduce = useReducedMotion();

  const tags = useMemo(() => {
    const count = {};
    projects.forEach((p) => p.tech.forEach((t) => (count[t] = (count[t] || 0) + 1)));
    return ["All", ...Object.entries(count).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([t]) => t)];
  }, [projects]);

  const filtered = tag === "All" ? projects : projects.filter((p) => p.tech.includes(tag));
  const shown = all || tag !== "All" ? filtered : filtered.slice(0, INITIAL);

  return (
    <section id="projects" className="zone" aria-labelledby="projects-h">
      <div className="wrap zone-pad">
        <h2 id="projects-h" className="h-section max-w-[15ch]">
          Things I actually shipped.
        </h2>
        <p className="mt-5 max-w-[58ch]" style={{ color: "var(--on-2)" }}>
          {live
            ? `Synced from GitHub every hour. ${projects.length} public projects right now; push a new repo and it lands here on its own.`
            : "GitHub is not answering right now, so this is the curated list."}
        </p>

        <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className="min-h-11 rounded-full border px-4 text-[0.9rem] font-semibold transition-colors duration-200"
              style={
                tag === t
                  ? { background: "var(--on)", color: "var(--bg)", borderColor: "var(--on)" }
                  : { borderColor: "var(--line)" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => {
              const lead = i === 0 && tag === "All";
              return (
                <motion.li
                  key={p.id}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={lead ? "sm:col-span-2 lg:col-span-3" : ""}
                >
                  <Card p={p} lead={lead} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {tag === "All" && filtered.length > INITIAL && (
          <div className="mt-10">
            <button type="button" className="btn btn-ghost" onClick={() => setAll((v) => !v)} aria-expanded={all}>
              {all ? "Show fewer" : `Show all ${filtered.length} projects`}
            </button>
          </div>
        )}
        {shown.length === 0 && <p className="mt-8">Nothing with that tag yet.</p>}
      </div>
    </section>
  );
}
