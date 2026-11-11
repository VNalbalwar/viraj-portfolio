import { ArrowUpRight } from "lucide-react";
import { RecoveryFigure, SchedulerFigure } from "./ResearchFigures";
import { research } from "@/content/profile";

const FIGS = { gpu: RecoveryFigure, thermal: SchedulerFigure };

export default function Research() {
  return (
    <section id="research" className="zone" aria-labelledby="research-h">
      <div className="wrap zone-pad">
        <h2 id="research-h" className="h-section max-w-[14ch]">
          Systems under pressure.
        </h2>
        <p className="mt-5 max-w-[56ch]" style={{ color: "var(--on-2)" }}>
          Two peer-reviewed papers in 2026, both about making shared machines behave better when someone else is hogging them.
        </p>

        <div className="mt-14 space-y-20">
          {research.map((r, idx) => {
            const Fig = FIGS[r.id];
            return (
              <article key={r.id} className="grid items-start gap-x-14 gap-y-8 lg:grid-cols-2">
                <div className={idx % 2 ? "lg:order-2" : ""}>
                  <p className="readout flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rounded-full px-2.5 py-1 font-bold" style={{ background: "var(--hot)", color: "var(--hot-on)" }}>
                      {r.status}
                    </span>
                    <span>{r.venue}</span>
                  </p>
                  <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold leading-tight [font-stretch:112%] [text-wrap:balance]">
                    {r.title}
                  </h3>
                  <p className="readout mt-2" style={{ color: "var(--on-2)" }}>{r.place}</p>
                  <p className="mt-5 max-w-[58ch] text-[1.1rem]">{r.question}</p>
                  <dl className="mt-7 grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
                    {r.findings.map((f) => (
                      <div key={f.label} className="flex flex-col-reverse">
                        <dt className="text-[0.9rem] leading-snug" style={{ color: "var(--on-2)" }}>{f.label}</dt>
                        <dd className="display mb-1.5 text-[clamp(1.6rem,3.4vw,2.4rem)]" style={{ color: "var(--hot)", textTransform: "none" }}>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {r.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                  <a href={r.repo} target="_blank" rel="noopener noreferrer" className="link-hot mt-6 inline-flex items-center gap-1">
                    Code on GitHub <ArrowUpRight size={16} aria-hidden />
                  </a>
                </div>
                <div className="rounded-[1.75rem] p-5 sm:p-7" style={{ background: "var(--surface)" }}>
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
