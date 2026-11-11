"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import { MaskHeading, Stagger, StaggerItem, FadeUp } from "./Reveal";
import { site } from "@/content/profile";

const year = (iso) => (iso ? new Date(iso).getUTCFullYear() : "");
// sizes cycle so the grid has a rhythm instead of identical tiles
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];

function Card({ p, className }) {
  const reduce = useReducedMotion();
  return (
    <StaggerItem as="li" className={className}>
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)]"
        style={{ background: "var(--surface)" }}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-700 ease-[var(--ease-enter)] group-hover:scale-[1.035]">
            <ProjectVisual thumbKey={p.thumbKey} id={p.id} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="t-h3 text-[1.3rem]">{p.title}</h3>
          {p.desc && <p className="t-muted mt-3 max-w-[56ch]">{p.desc}</p>}
          <p className="t-muted mt-4 text-[0.875rem]">{p.tech.join(", ")}</p>
          <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center font-medium">
              Code
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center gap-1 font-medium">
                Live site <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function Projects({ projects, repoCount, live }) {
  const featured = projects.filter((p) => p.featured).slice(0, 8);
  const rest = projects.filter((p) => !featured.includes(p)).slice(0, 12);
  return (
    <section id="projects" className="sec alt" aria-labelledby="projects-h">
      <div className="wrap">
        <MaskHeading id="projects-h" text="Projects" className="t-h2" />
        <FadeUp delay={0.1}>
          <p className="t-muted mt-6 max-w-[58ch]">
            {live
              ? `${repoCount} public repositories on GitHub. These are the ones to start with; the list below them updates on its own.`
              : "GitHub isn't responding, so this is the curated list."}
          </p>
        </FadeUp>

        <Stagger as="ul" className="mt-14 grid gap-6 lg:grid-cols-12" gap={0.09}>
          {featured.map((p, i) => (
            <Card key={p.id} p={p} className={SPANS[i % SPANS.length]} />
          ))}
        </Stagger>

        {rest.length > 0 && (
          <>
            <FadeUp>
              <h3 className="t-h3 mt-24 text-[1.5rem]">More on GitHub</h3>
            </FadeUp>
            <Stagger as="ul" className="mt-6 grid gap-x-12 md:grid-cols-2" gap={0.04}>
              {rest.map((p) => (
                <StaggerItem as="li" key={p.id} className="row-rule">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-baseline justify-between gap-4 py-3.5">
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">{p.title}</span>
                    <span className="t-muted t-num shrink-0 text-[0.875rem]">{[p.language, year(p.pushedAt)].filter(Boolean).join(", ")}</span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <a href={`https://github.com/${site.githubUser}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-10">
              All repositories on GitHub
            </a>
          </>
        )}
      </div>
    </section>
  );
}
