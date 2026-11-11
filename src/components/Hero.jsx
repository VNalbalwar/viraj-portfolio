import Image from "next/image";
import { Socials } from "./Icons";
import { site, socials } from "@/content/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="sec flex flex-col justify-center !pb-16 lg:min-h-[100svh]"
      aria-label="Introduction"
    >
      <div className="wrap split">
        <div data-enter className="s-left">
          <p className="t-mono t-muted">RHCSA. Papers at ISC High Performance and IEEE HiPC, 2026.</p>
          <h1 className="t-hero mt-5">
            Viraj
            <br />
            Nalbalwar
          </h1>
          <p className="t-lead mt-7 max-w-[30ch]">{site.tagline}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-solid">
              View projects
            </a>
            <a href="#contact" className="btn btn-line">
              Get in touch
            </a>
          </div>
          <Socials items={socials} className="mt-8" />
        </div>
        <div data-enter-img className="s-right relative w-full max-w-[26rem] justify-self-center lg:max-w-[28rem] lg:justify-self-start">
          <Image
            src="/viraj-nalbalwar.jpg"
            alt="Portrait of Viraj Nalbalwar"
            width={760}
            height={760}
            priority
            sizes="(min-width: 1024px) 28rem, 80vw"
            className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
