import { certifications, education, experience } from "@/content/profile";

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-h">
      <div className="wrap">
        <h2 id="experience-h" className="t-h2">
          Experience and education
        </h2>
        <div className="mt-14 grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <ol aria-label="Experience">
            {experience.map((e) => (
              <li key={e.org} className="row-rule py-8 first:pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="t-h3">
                    {e.role}, {e.org}
                  </h3>
                  <p className="t-mono t-muted">{e.when}</p>
                </div>
                <p className="t-muted mt-1">{e.place}</p>
                <ul className="mt-4 max-w-[60ch] space-y-2">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div>
            <ol aria-label="Education">
              {education.map((e) => (
                <li key={e.name} className="row-rule py-6 first:pt-6">
                  <p className="t-mono t-muted">{e.when}</p>
                  <h3 className="t-h3 mt-1">{e.name}</h3>
                  <p className="t-muted mt-1">{e.detail}</p>
                </li>
              ))}
            </ol>
            <h3 className="t-h3 mt-12">Certifications</h3>
            <ul className="mt-4">
              {certifications.map(([name, by, when]) => (
                <li key={name} className="row-rule flex flex-wrap justify-between gap-x-6 py-3">
                  <span>
                    {name} <span className="t-muted">({by})</span>
                  </span>
                  <span className="t-mono t-muted">{when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
