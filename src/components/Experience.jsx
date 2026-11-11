import { ArrowUpRight, Download } from "lucide-react";
import OrgLogo from "./OrgLogo";
import { FadeUp, MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { certifications, education, experience, rhcsa } from "@/content/profile";

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-h">
      <div className="wrap">
        <MaskHeading id="experience-h" text="Experience and education" className="t-h2 max-w-[12ch]" />

        <Stagger as="ol" aria-label="Experience" className="mt-16" gap={0.12}>
          {experience.map((e) => (
            <StaggerItem as="li" key={e.org} className="row-rule group grid gap-x-6 gap-y-5 py-10 lg:grid-cols-12">
              <div className="flex gap-5 lg:col-span-5">
                <OrgLogo src={e.logo} name={e.org} size={68} />
                <div>
                  <p className="t-muted t-num">{e.when}</p>
                  <h3 className="t-serif mt-1 text-[clamp(2rem,3.4vw,2.8rem)] transition-transform duration-500 ease-[var(--ease-enter)] group-hover:translate-x-2">
                    {e.org}
                  </h3>
                  <p className="mt-1">{e.role}</p>
                  <p className="t-muted">{e.place}</p>
                </div>
              </div>
              <ul className="space-y-2.5 lg:col-span-6 lg:col-start-7">
                {e.points.map((p) => (
                  <li key={p} className="t-muted transition-colors duration-300 group-hover:[color:var(--ink)]">{p}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-28 grid gap-x-6 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <FadeUp>
              <h3 className="t-serif text-[2.4rem]">Education</h3>
            </FadeUp>
            <Stagger as="ol" className="mt-6" aria-label="Education" gap={0.1}>
              {education.map((e) => (
                <StaggerItem as="li" key={e.name} className="row-rule group flex gap-5 py-7">
                  <OrgLogo src={e.logo} name={e.name} size={60} />
                  <div>
                    <p className="t-muted t-num">{e.when}</p>
                    <h4 className="t-h3 mt-1 text-[1.25rem] transition-transform duration-500 ease-[var(--ease-enter)] group-hover:translate-x-1.5">{e.name}</h4>
                    <p className="t-muted mt-1">{e.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeUp>
              <h3 className="t-serif text-[2.4rem]">Certifications</h3>
            </FadeUp>

            <FadeUp delay={0.08} className="mt-6">
              <article className="overflow-hidden rounded-[var(--radius)]" style={{ background: "var(--surface)" }}>
                <a href={rhcsa.pdf} target="_blank" rel="noopener noreferrer" aria-label="Open the RHCSA certificate (PDF)" className="group/cert block overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rhcsa.image}
                    alt="Red Hat Certified System Administrator certificate issued to Viraj Nalbalwar on August 24, 2026"
                    width={1100}
                    height={850}
                    loading="lazy"
                    className="w-full transition-transform duration-700 ease-[var(--ease-enter)] group-hover/cert:scale-[1.03]"
                  />
                </a>
                <div className="flex gap-4 p-6">
                  <OrgLogo src="/icons/redhat.svg" name="Red Hat" size={56} />
                  <div className="min-w-0">
                    <h4 className="t-h3">{rhcsa.name}</h4>
                    <p className="t-muted mt-1">
                      {rhcsa.short}. Issued {rhcsa.issued}. ID <span className="t-num">{rhcsa.id}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5">
                      <a href={rhcsa.verify} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center gap-1 font-medium">
                        Verify on Credly <ArrowUpRight size={15} aria-hidden />
                      </a>
                      <a href={rhcsa.pdf} download className="link inline-flex min-h-11 items-center gap-1 font-medium">
                        Certificate PDF <Download size={15} aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>

            <Stagger as="ul" className="mt-8" gap={0.06}>
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
