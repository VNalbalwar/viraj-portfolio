import { Download } from "lucide-react";
import { MaskHeading, FadeUp, ScrubText } from "./Reveal";
import { about, aboutFacts, site } from "@/content/profile";

export default function About() {
  return (
    <section id="about" className="sec" aria-labelledby="about-h">
      <div className="wrap">
        <MaskHeading id="about-h" text="About" className="t-h2" />
        <ScrubText
          text={about[0]}
          className="mt-12 max-w-[30ch] text-[clamp(1.7rem,3.7vw,3.1rem)] font-medium leading-[1.16] tracking-[-0.03em] sm:max-w-[36ch]"
        />
        <div className="mt-16 grid gap-x-6 gap-y-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="t-muted max-w-[46ch]">{about[1]}</p>
            <a href={site.resume} download className="btn btn-solid mt-8">
              Download CV <Download size={17} aria-hidden />
            </a>
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <dl>
              {aboutFacts.map(([k, v, icon]) => (
                <div key={k} className="row-rule grid grid-cols-[7.5rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="t-muted">{k}</dt>
                  <dd className="flex items-center gap-2.5">
                    {icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/icons/${icon}.svg`} alt="" width={22} height={22} className="ic h-[22px] w-[22px]" />
                    )}
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
