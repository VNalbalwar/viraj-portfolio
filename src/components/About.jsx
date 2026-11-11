import { Download } from "lucide-react";
import { about, aboutFacts, site } from "@/content/profile";

export default function About() {
  return (
    <section id="about" className="sec alt" aria-labelledby="about-h">
      <div className="wrap split narrow-left">
        <h2 id="about-h" className="t-h2 s-left">
          About
        </h2>
        <div className="s-right">
          <div className="max-w-[62ch] space-y-5">
            {about.map((p, i) => (
              <p key={i} className={i === 0 ? "t-lead" : "t-muted"} style={i === 0 ? { color: "var(--ink)" } : undefined}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-10 max-w-[62ch]">
            {aboutFacts.map(([k, v]) => (
              <div key={k} className="row-rule grid grid-cols-[7rem_1fr] gap-4 py-3 sm:grid-cols-[9rem_1fr]">
                <dt className="t-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <a href={site.resume} download className="btn btn-solid mt-9">
            Download CV <Download size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
