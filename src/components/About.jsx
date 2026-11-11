import { Download } from "lucide-react";
import CountUp from "./CountUp";
import { about, manualStats, site } from "@/content/profile";

export default function About({ repoCount, postCount, live }) {
  const stats = [
    { value: repoCount, label: "public repos", src: live.github ? "live from GitHub" : "GitHub" },
    { value: postCount, label: "blog posts", src: live.hashnode ? "live from Hashnode" : "Hashnode" },
    { value: manualStats.linkedinFollowers, label: "LinkedIn followers", src: "updated by hand" },
    { value: manualStats.papersAccepted, label: "papers accepted", src: "ISC and HiPC, 2026" },
  ];
  return (
    <section id="about" className="zone" aria-labelledby="about-h">
      <div className="wrap zone-pad">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <h2 id="about-h" className="h-section">
            Hey, I'm Viraj.
          </h2>
          <div>
            <div className="max-w-[62ch] space-y-5">
              {about.map((p, i) => (
                <p key={i} style={i ? { color: "var(--on-2)" } : undefined} className={i ? "" : "text-[1.25rem] font-medium leading-snug"}>
                  {p}
                </p>
              ))}
            </div>
            <a href={site.resume} download className="btn btn-hot mt-9">
              Download CV <Download size={18} aria-hidden />
            </a>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 lg:grid-cols-4" style={{ borderColor: "var(--line)" }}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt>
                <span className="block font-semibold">{s.label}</span>
                <span className="readout" style={{ color: "var(--on-2)" }}>{s.src}</span>
              </dt>
              <dd className="display mb-2 text-[clamp(2.4rem,6vw,4rem)]" style={{ color: "var(--hot)" }}>
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
