import { ArrowUpRight } from "lucide-react";
import { FadeUp, MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { linkedinActivityUrl, linkedinHighlights, site } from "@/content/profile";

const day = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : "";

export default function Writing({ posts }) {
  const blog = `https://${site.hashnodeHost}/`;
  return (
    <section id="writing" className="sec" aria-labelledby="writing-h">
      <div className="wrap">
        <MaskHeading id="writing-h" text="Writing" className="t-h2" />
        <div className="mt-16 grid gap-x-6 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <h3 className="t-h3 text-[1.4rem]">Linux notes on Hashnode</h3>
              <p className="t-muted mt-2">A beginner-to-shell-scripting series I wrote in 2023.</p>
            </FadeUp>
            {posts.length > 0 ? (
              <Stagger as="ol" className="mt-6" gap={0.045}>
                {posts.map((p) => (
                  <StaggerItem as="li" key={p.url} className="row-rule">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-baseline gap-5 py-4">
                      <span className="t-muted t-num hidden w-24 shrink-0 text-[0.9rem] sm:block">{day(p.date)}</span>
                      <span className="flex-1 transition-transform duration-300 group-hover:translate-x-1.5">{p.title}</span>
                      <ArrowUpRight size={17} aria-hidden className="shrink-0 translate-y-0.5 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <p className="mt-6">
                The feed isn't loading right now.{" "}
                <a className="link" href={blog} target="_blank" rel="noopener noreferrer">
                  Read the blog on Hashnode
                </a>
                .
              </p>
            )}
            <a href={blog} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-8">
              Open the blog
            </a>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <FadeUp delay={0.1}>
              <h3 className="t-h3 text-[1.4rem]">Recent on LinkedIn</h3>
            </FadeUp>
            <Stagger as="ul" className="mt-6" gap={0.1}>
              {linkedinHighlights.map((h) => (
                <StaggerItem as="li" key={h.title} className="row-rule py-6">
                  <p className="t-muted t-num text-[0.9rem]">{h.when}</p>
                  <p className="mt-1 font-medium">{h.title}</p>
                  <p className="t-muted mt-1">{h.blurb}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <a href={linkedinActivityUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-8">
              Read the posts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
