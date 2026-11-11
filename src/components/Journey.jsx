import TimelineRail, { TimelineItem } from "./TimelineRail";
import { journey } from "@/content/profile";

export default function Journey() {
  return (
    <section id="journey" className="zone" data-alt aria-labelledby="journey-h">
      <div className="wrap zone-pad">
        <h2 id="journey-h" className="h-section max-w-[16ch]">
          The road so far.
        </h2>
        <p className="mt-5 max-w-[56ch]" style={{ color: "var(--on-2)" }}>
          Education and experience, oldest first, so you can watch it escalate.
        </p>

        <TimelineRail>
          <ol className="space-y-16">
            {journey.map((phase) => (
              <li key={phase.stage}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-[clamp(1.7rem,3.6vw,2.5rem)]">{phase.stage}</h3>
                  <p className="readout text-[0.8rem]" style={{ color: "var(--on-2)" }}>{phase.years}</p>
                </div>
                <p className="mt-2" style={{ color: "var(--on-2)" }}>{phase.line}</p>
                <ul className="mt-8 grid gap-x-10 gap-y-10 lg:grid-cols-2">
                  {phase.entries.map((e) => (
                    <TimelineItem key={e.title}>
                      <p className="readout" style={{ color: "var(--hot)" }}>{e.when}</p>
                      <h4 className="mt-1.5 text-[1.3rem] font-bold leading-snug [font-stretch:110%]">{e.title}</h4>
                      <p className="mt-1 font-medium">{e.org}</p>
                      {e.points.length > 0 && (
                        <ul className="mt-3 max-w-[60ch] space-y-1.5" style={{ color: "var(--on-2)" }}>
                          {e.points.map((p) => (
                            <li key={p} className="relative pl-5">
                              <span aria-hidden className="absolute left-0 top-[0.7em] h-[2px] w-2.5" style={{ background: "var(--hot)" }} />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </TimelineItem>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </TimelineRail>
      </div>
    </section>
  );
}
