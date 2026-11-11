import HeatBar from "./HeatBar";
import { journey } from "@/content/profile";

export default function Journey() {
  return (
    <section id="journey" className="zone" data-t="1" data-prev="1" aria-labelledby="journey-h">
      <div className="wrap zone-pad !pt-[clamp(2rem,5vw,4rem)]">
        <h2 id="journey-h" className="h-section max-w-[16ch]">
          How it warmed up.
        </h2>
        <p className="mt-5 max-w-[56ch]" style={{ color: "var(--on-2)" }}>
          Education and experience, oldest first. The bar next to each entry is how hard things were running at the time.
        </p>

        <ol className="mt-14">
          {journey.map((phase) => (
            <li
              key={phase.stage}
              className="grid gap-x-12 gap-y-6 border-t py-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:py-14"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="readout" style={{ color: "var(--on-2)" }}>{phase.years}</p>
                <h3 className="display mt-2 text-[clamp(1.9rem,4vw,2.75rem)]">{phase.stage}</h3>
                <p className="mt-3 max-w-[26ch]" style={{ color: "var(--on-2)" }}>{phase.line}</p>
              </div>
              <ul className="space-y-10">
                {phase.entries.map((e) => (
                  <li key={e.title}>
                    <HeatBar heat={e.heat} />
                    <h4 className="mt-4 text-[1.3rem] font-bold leading-snug [font-stretch:110%]">{e.title}</h4>
                    <p className="mt-1 font-medium">
                      {e.org} <span style={{ color: "var(--on-2)" }}>· {e.when}</span>
                    </p>
                    {e.points.length > 0 && (
                      <ul className="mt-3 max-w-[64ch] space-y-1.5" style={{ color: "var(--on-2)" }}>
                        {e.points.map((p) => (
                          <li key={p} className="relative pl-5">
                            <span aria-hidden className="absolute left-0 top-[0.7em] h-[2px] w-2.5" style={{ background: "var(--hot)" }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
