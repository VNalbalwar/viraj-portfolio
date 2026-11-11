import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import { site } from "@/content/profile";

const year = (iso) => (iso ? new Date(iso).getUTCFullYear() : "");

function Card({ p }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="zoom border-b" style={{ borderColor: "var(--line)" }}>
        <div>
          <ProjectVisual thumbKey={p.thumbKey} id={p.id} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="t-h3">{p.title}</h3>
        {p.desc && <p className="t-muted mt-2">{p.desc}</p>}
        <p className="tag mt-4">{p.tech.join(" · ")}</p>
        <div className="mt-auto flex flex-wrap gap-x-5 pt-4">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
            Code
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center gap-1">
              Live site <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects, repoCount, live }) {
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const rest = projects.filter((p) => !featured.includes(p)).slice(0, 12);
  return (
    <section id="projects" className="sec alt" aria-labelledby="projects-h">
      <div className="wrap">
        <h2 id="projects-h" className="t-h2">
          Projects
        </h2>
        <p className="t-muted mt-5 max-w-[60ch]">
          {live
            ? `${repoCount} public repositories on GitHub. These six are the ones to start with; the full list below updates on its own.`
            : "GitHub isn't responding, so this is the curated list."}
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.id}>
              <Card p={p} />
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <>
            <h3 className="t-h3 mt-20">More on GitHub</h3>
            <ul className="mt-4 grid gap-x-12 md:grid-cols-2">
              {rest.map((p) => (
                <li key={p.id} className="row-rule">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-baseline justify-between gap-4 py-3"
                  >
                    <span className="link-draw group-hover:[background-size:100%_1px]">{p.title}</span>
                    <span className="tag shrink-0">
                      {[p.language, year(p.pushedAt)].filter(Boolean).join(" · ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={`https://github.com/${site.githubUser}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-8">
              All repositories on GitHub
            </a>
          </>
        )}
      </div>
    </section>
  );
}
