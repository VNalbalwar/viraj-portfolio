import { ArrowUpRight } from "lucide-react";
import { FadeUp, MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { linkedinActivityUrl, linkedinHighlights, site } from "@/content/profile";

const day = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : "";

// One row style for every post list. `compact` is the smaller secondary size.
function PostRows({ posts, compact = false }) {
  return (
    <Stagger as="ol" className="mt-6" gap={0.045}>
      {posts.map((p) => (
        <StaggerItem as="li" key={p.url} className="row-rule">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-baseline gap-5 ${compact ? "min-h-12 py-3 text-[0.9375rem]" : "min-h-14 py-4"}`}
          >
            <span className={`t-muted t-num hidden w-24 shrink-0 text-[0.9rem] sm:block`}>{day(p.date)}</span>
            <span className="flex-1 transition-transform duration-300 group-hover:translate-x-1.5">{p.title}</span>
            <ArrowUpRight size={compact ? 15 : 17} aria-hidden className="shrink-0 translate-y-0.5 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function Writing({ offcutsPosts, hashnodePosts }) {
  const hashnode = `https://${site.hashnodeHost}/`;
  return (
    <section id="writing" className="sec" aria-labelledby="writing-h">
      <div className="wrap">
        <MaskHeading id="writing-h" text="Writing" className="t-h2" />
        <div className="mt-16 grid gap-x-6 gap-y-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Lead: the Offcuts blog */}
            <FadeUp>
              <h3 className="t-h3 text-[1.4rem]">Latest on Offcuts</h3>
              <p className="t-muted mt-2">Notes on Linux and cloud, mostly about the things that broke first.</p>
            </FadeUp>
            {offcutsPosts.length > 0 ? (
              <PostRows posts={offcutsPosts.slice(0, 5)} />
            ) : (
              <p className="mt-6">
                Nothing to show here right now.{" "}
                <a className="link" href={site.offcutsUrl} target="_blank" rel="noopener noreferrer">
                  Read it on Offcuts
                </a>
                .
              </p>
            )}
            <a href={site.offcutsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-8">
              Open the blog
            </a>

            {/* Secondary: the older Hashnode series */}
            <div className="mt-20">
              <FadeUp>
                <h3 className="t-h3">Linux notes on Hashnode</h3>
                <p className="t-muted mt-1 text-[0.9375rem]">A beginner-to-shell-scripting series I wrote in 2023.</p>
              </FadeUp>
              {hashnodePosts.length > 0 && <PostRows posts={hashnodePosts.slice(0, 4)} compact />}
              <p className="mt-6 text-[0.9375rem]">
                {hashnodePosts.length === 0 && <>The feed isn't loading right now. </>}
                <a className="link" href={hashnode} target="_blank" rel="noopener noreferrer">
                  Read the series on Hashnode
                </a>
              </p>
            </div>
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
