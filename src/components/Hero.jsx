import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import KineticName from "./KineticName";
import { FadeUp } from "./Reveal";
import { Socials } from "./Icons";
import { site, socials } from "@/content/profile";

export default function Hero() {
  return (
    <section id="home" className="sec !pb-16 !pt-[calc(var(--nav)+2.5rem)] lg:min-h-[100svh]" aria-label="Introduction">
      <div className="wrap flex min-h-[calc(100svh-var(--nav)-6rem)] flex-col justify-between gap-14">
        <FadeUp delay={0.05} y={14}>
          <p className="t-lead max-w-[34ch]">
            Cloud and systems engineer in Pune. I study how shared machines behave under load.
          </p>
        </FadeUp>

        <div>
          <KineticName lines={["Viraj", "Nalbalwar"]} />
          <div className="mt-12 grid items-end gap-x-6 gap-y-10 lg:grid-cols-12">
            <FadeUp delay={0.9} className="lg:col-span-6">
              <p className="t-muted max-w-[46ch]">
                Final-year at COEP. Ex-Mastercard and Jio, RHCSA, and two papers accepted in 2026 at ISC High Performance and IEEE HiPC.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn btn-solid">
                  View projects <ArrowDownRight size={18} aria-hidden />
                </a>
                <a href="#contact" className="btn btn-line">
                  Get in touch
                </a>
              </div>
              <Socials items={socials} className="mt-7" />
            </FadeUp>
            <FadeUp delay={1.05} className="lg:col-span-4 lg:col-start-9">
              <div className="relative overflow-hidden rounded-[var(--radius)]" style={{ background: "var(--accent)" }}>
                <Image
                  src="/viraj-nalbalwar.jpg"
                  alt="Portrait of Viraj Nalbalwar"
                  width={640}
                  height={640}
                  priority
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
