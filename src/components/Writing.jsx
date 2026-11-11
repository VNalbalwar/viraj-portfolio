import { ArrowUpRight } from "lucide-react";
import { BrandIcon } from "./Icons";
import { linkedinActivityUrl, linkedinHighlights, site } from "@/content/profile";

const day = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }) : "";

export default function Writing({ posts }) {
  const blog = `https://${site.hashnodeHost}/`;
  return (
    <section id="writing" className="zone" data-alt aria-labelledby="writing-h">
      <div className="wrap zone-pad">
        <h2 id="writing-h" className="h-section max-w-[15ch]">
          Notes from the terminal.
        </h2>
        <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <h3 className="flex items-center gap-2 text-[1.15rem] font-extrabold [font-stretch:112%]">
              <BrandIcon id="hashnode" size={18} /> The Linux series, on Hashnode
            </h3>
            <p className="mt-2" style={{ color: "var(--on-2)" }}>
              Pulled straight from the blog feed. New posts appear here automatically.
            </p>
            {posts.length > 0 ? (
              <ol className="mt-6 border-t" style={{ borderColor: "var(--line)" }}>
                {posts.map((p) => (
                  <li key={p.url} className="border-b" style={{ borderColor: "var(--line)" }}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-4 py-4">
                      <span className="readout hidden w-24 shrink-0 sm:block" style={{ color: "var(--on-2)" }}>{day(p.date)}</span>
                      <span className="flex-1 font-semibold leading-snug underline-offset-4 group-hover:underline">{p.title}</span>
                      <ArrowUpRight size={18} aria-hidden className="shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-6">
                The feed is not loading right now. <a className="link-hot" href={blog} target="_blank" rel="noopener noreferrer">Read the blog on Hashnode</a>.
              </p>
            )}
            <a href={blog} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
              Visit the blog <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[1.15rem] font-extrabold [font-stretch:112%]">
              <BrandIcon id="linkedin" size={18} /> Lately on LinkedIn
            </h3>
            <p className="mt-2" style={{ color: "var(--on-2)" }}>Research news, internships and the occasional story.</p>
            <ul className="mt-6 space-y-7">
              {linkedinHighlights.map((h) => (
                <li key={h.title}>
                  <p className="readout" style={{ color: "var(--on-2)" }}>{h.when}</p>
                  <p className="mt-1 text-[1.1rem] font-bold leading-snug">{h.title}</p>
                  <p className="mt-1" style={{ color: "var(--on-2)" }}>{h.blurb}</p>
                </li>
              ))}
            </ul>
            <a href={linkedinActivityUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
              Read the posts <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
