import { MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { certifications, education, experience } from "@/content/profile";

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-h">
      <div className="wrap">
        <MaskHeading id="experience-h" text="Experience and education" className="t-h2 max-w-[16ch]" />

        <Stagger as="ol" aria-label="Experience" className="mt-16" gap={0.12}>
          {experience.map((e) => (
            <StaggerItem
              as="li"
              key={e.org}
              className="row-rule group grid gap-x-6 gap-y-5 py-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <p className="t-muted t-num">{e.when}</p>
                <h3 className="t-h3 mt-2 text-[clamp(1.35rem,2.4vw,1.9rem)] transition-transform duration-500 ease-[var(--ease-enter)] group-hover:translate-x-2">
                  {e.org}
                </h3>
                <p className="mt-1">{e.role}</p>
                <p className="t-muted">{e.place}</p>
              </div>
              <ul className="space-y-2.5 lg:col-span-6 lg:col-start-7">
                {e.points.map((p) => (
                  <li key={p} className="t-muted transition-colors duration-300 group-hover:[color:var(--ink)]">{p}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-24 grid gap-x-6 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="t-h3 text-[1.5rem]">Education</h3>
            <Stagger as="ol" className="mt-6" aria-label="Education">
              {education.map((e) => (
                <StaggerItem as="li" key={e.name} className="row-rule py-6">
                  <p className="t-muted t-num">{e.when}</p>
                  <h4 className="t-h3 mt-1">{e.name}</h4>
                  <p className="t-muted mt-1">{e.detail}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="t-h3 text-[1.5rem]">Certifications</h3>
            <Stagger as="ul" className="mt-6" gap={0.06}>
              {certifications.map(([name, by, when]) => (
                <StaggerItem as="li" key={name} className="row-rule flex flex-wrap justify-between gap-x-6 gap-y-1 py-4">
                  <span>
                    {name} <span className="t-muted">({by})</span>
                  </span>
                  <span className="t-muted t-num">{when}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
