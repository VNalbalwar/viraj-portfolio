import { ArrowUpRight } from "lucide-react";
import { RecoveryFigure, SchedulerFigure } from "./ResearchFigures";
import { research } from "@/content/profile";

const FIGS = { gpu: RecoveryFigure, thermal: SchedulerFigure };

export default function Research() {
  return (
    <section id="research" className="sec alt" aria-labelledby="research-h">
      <div className="wrap">
        <h2 id="research-h" className="t-h2">
          Research
        </h2>
        <div className="mt-14">
          {research.map((r) => {
            const Fig = FIGS[r.id];
            return (
              <article key={r.id} className="row-rule split py-12">
                <div className="s-left">
                  <p className="t-mono t-muted">
                    {r.status}. {r.venue}
                  </p>
                  <h3 className="t-h3 mt-3 text-[1.5rem] leading-snug" style={{ letterSpacing: "-0.02em" }}>
                    {r.title}
                  </h3>
                  <p className="t-muted mt-1">{r.place}</p>
                  <p className="t-lead mt-6 max-w-[44ch]">{r.question}</p>
                  <p className="mt-4 max-w-[58ch]">{r.result}</p>
                  <p className="tag mt-5">{r.stack.join(" · ")}</p>
                  <a href={r.repo} target="_blank" rel="noopener noreferrer" className="link mt-5 inline-flex items-center gap-1">
                    Code on GitHub <ArrowUpRight size={16} aria-hidden />
                  </a>
                </div>
                <div className="card s-right p-5 sm:p-7">
                  <Fig />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
