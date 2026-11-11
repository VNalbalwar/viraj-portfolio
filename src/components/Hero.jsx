import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroBackdrop from "./HeroBackdrop";
import { Socials } from "./Icons";
import { site, socials } from "@/content/profile";

export default function Hero() {
  return (
    <section id="home" className="zone relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <HeroBackdrop />
      <div className="wrap relative grid items-center gap-x-14 gap-y-12 pb-16 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <p className="readout mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite" }} />
            Final-year Computer Engineering · COEP Tech, Pune
          </p>
          <h1 className="display text-[clamp(2.25rem,9.8vw,6rem)] lg:text-[clamp(3.25rem,5.6vw,5.25rem)]">
            Viraj
            <br />
            Nalbalwar
          </h1>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.15rem,2.1vw,1.5rem)] font-medium leading-snug">{site.tagline}</p>
          <p className="mt-3 max-w-[52ch]" style={{ color: "var(--on-2)" }}>
            Cloud, Kubernetes, GPUs and Linux. Ex-Mastercard, ex-Jio, RHCSA, and two research papers in 2026.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-hot">
              See the work <ArrowDown size={18} aria-hidden />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Say hi <ArrowUpRight size={18} aria-hidden />
            </a>
            <Socials items={socials} className="sm:ml-3" />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rotate-3 rounded-[2.25rem]"
            style={{ background: "var(--accent)", opacity: 0.9 }}
          />
          <Image
            src="/viraj-nalbalwar.jpg"
            alt="Portrait of Viraj Nalbalwar"
            width={704}
            height={704}
            priority
            sizes="(min-width: 1024px) 22rem, 80vw"
            className="aspect-square w-full rounded-[2rem] object-cover"
            style={{ boxShadow: "0 30px 60px -30px rgb(0 0 0 / 0.55)" }}
          />
        </div>
      </div>
    </section>
  );
}
