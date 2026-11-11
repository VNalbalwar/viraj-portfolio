import { ArrowUpRight } from "lucide-react";
import { RecoveryFigure, SchedulerFigure } from "./ResearchFigures";
import { FadeUp, MaskHeading } from "./Reveal";
import { research } from "@/content/profile";

const FIGS = { gpu: RecoveryFigure, thermal: SchedulerFigure };

export default function Research() {
  return (
    <section id="research" className="sec alt" aria-labelledby="research-h">
      <div className="wrap">
        <MaskHeading id="research-h" text="Research" className="t-h2" />
        <div className="mt-16">
          {research.map((r) => {
            const Fig = FIGS[r.id];
            return (
              <article key={r.id} className="row-rule grid items-start gap-x-6 gap-y-10 py-14 lg:grid-cols-12">
                <FadeUp className="lg:col-span-6">
                  <p className="t-muted">
                    {r.status}. {r.venue}
                  </p>
                  <h3 className="t-h3 mt-3 text-[clamp(1.4rem,2.6vw,2rem)] leading-tight">{r.title}</h3>
                  <p className="t-muted mt-2">{r.place}</p>
                  <p className="t-lead mt-7 max-w-[40ch]">{r.question}</p>
                  <p className="mt-5 max-w-[58ch]">{r.result}</p>
                  <p className="t-muted mt-5 text-[0.9rem]">{r.stack.join(", ")}</p>
                  <a href={r.repo} target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-1">
                    Code on GitHub <ArrowUpRight size={16} aria-hidden />
                  </a>
                </FadeUp>
                <FadeUp delay={0.12} className="lg:col-span-6">
                  <div className="rounded-[var(--radius)] p-5 sm:p-8" style={{ background: "var(--surface)" }}>
                    <Fig />
                  </div>
                </FadeUp>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
