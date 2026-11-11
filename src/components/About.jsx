import Image from "next/image";
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
    <section id="about" className="zone" data-t="1" data-prev="0" aria-labelledby="about-h">
      <div className="wrap zone-pad">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <h2 id="about-h" className="h-section">
              I like finding out why the system got hot.
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem]">
              {about.map((p, i) => (
                <p key={i} style={i ? { color: "var(--on-2)" } : undefined} className={i ? "" : "text-[1.2rem] font-medium leading-snug"}>
                  {p}
                </p>
              ))}
            </div>
            <a href={site.resume} download className="btn btn-hot mt-9">
              Download CV <Download size={18} aria-hidden />
            </a>
          </div>

          <figure className="max-w-[20rem] self-start">
            <button
              type="button"
              className="thermal-frame group relative block w-full overflow-hidden rounded-[1.75rem]"
              aria-label="Portrait of Viraj shown as a thermal image. Tap, hover or focus to see the real photo."
              style={{ boxShadow: "0 30px 60px -30px rgb(0 0 0 / 0.5)" }}
            >
              <Image
                src="/viraj-nalbalwar.jpg"
                alt="Viraj Nalbalwar"
                width={640}
                height={640}
                sizes="(min-width: 1024px) 20rem, 80vw"
                className="thermal-img aspect-square w-full object-cover"
                priority={false}
              />
              <span
                aria-hidden
                className="readout absolute bottom-3 left-3 rounded-full px-2.5 py-1 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
                style={{ background: "rgb(0 0 0 / 0.55)", color: "#fff" }}
              >
                IR · tap or hover for visible light
              </span>
            </button>
            <figcaption className="readout mt-3" style={{ color: "var(--on-2)" }}>
              Fig. 0. The author, running slightly warm.
            </figcaption>
          </figure>
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

      {/* Infrared colour map for the portrait */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="ironbow" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.03 0.14 0.60 1.00 1.00" />
            <feFuncG type="table" tableValues="0.04 0.07 0.09 0.54 0.91" />
            <feFuncB type="table" tableValues="0.11 0.42 0.35 0.12 0.29" />
          </feComponentTransfer>
        </filter>
      </svg>
    </section>
  );
}
