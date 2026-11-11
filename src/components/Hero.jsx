import { ArrowDown, ArrowUpRight } from "lucide-react";
import ThermalField from "./ThermalField";
import { Socials } from "./Icons";
import { site, socials } from "@/content/profile";

export default function Hero() {
  return (
    <section id="home" className="zone relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <ThermalField />
      {/* scrim keeps the type readable over hot spots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "linear-gradient(to top, var(--t0) 4%, color-mix(in oklab, var(--t0) 62%, transparent) 42%, transparent)",
        }}
      />
      <div className="wrap relative z-10 pb-[clamp(2.5rem,7vh,5rem)] pt-28">
        <h1 className="display text-[clamp(2.25rem,9.8vw,6rem)]">
          Viraj
          <br />
          Nalbalwar
        </h1>
        <p className="mt-6 max-w-[34ch] text-[clamp(1.15rem,2.1vw,1.5rem)] font-medium leading-snug">
          {site.tagline}
        </p>
        <p className="mt-3 max-w-[52ch]" style={{ color: "var(--on-2)" }}>
          Cloud, Kubernetes, GPUs and Linux. Final-year engineer at COEP Tech, ex-Mastercard, ex-Jio, RHCSA.
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
    </section>
  );
}
