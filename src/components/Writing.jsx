import { ArrowUpRight } from "lucide-react";
import { linkedinActivityUrl, linkedinHighlights, site } from "@/content/profile";

const day = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : "";

export default function Writing({ posts }) {
  const blog = `https://${site.hashnodeHost}/`;
  return (
    <section id="writing" className="sec" aria-labelledby="writing-h">
      <div className="wrap">
        <h2 id="writing-h" className="t-h2">
          Writing
        </h2>
        <div className="mt-14 grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <h3 className="t-h3">Linux notes on Hashnode</h3>
            <p className="t-muted mt-1">A beginner-to-shell-scripting series I wrote in 2023.</p>
            {posts.length > 0 ? (
              <ol className="mt-5">
                {posts.map((p) => (
                  <li key={p.url} className="row-rule">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-baseline gap-5 py-3">
                      <span className="t-mono t-muted hidden w-20 shrink-0 sm:block">{day(p.date)}</span>
                      <span className="flex-1">
                        <span className="link-draw group-hover:[background-size:100%_1px]">{p.title}</span>
                      </span>
                      <ArrowUpRight size={16} aria-hidden className="shrink-0 translate-y-0.5 opacity-60" />
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-5">
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

          <div>
            <h3 className="t-h3">Recent on LinkedIn</h3>
            <ul className="mt-5">
              {linkedinHighlights.map((h) => (
                <li key={h.title} className="row-rule py-5">
                  <p className="t-mono t-muted">{h.when}</p>
                  <p className="mt-1 font-medium">{h.title}</p>
                  <p className="t-muted mt-1">{h.blurb}</p>
                </li>
              ))}
            </ul>
            <a href={linkedinActivityUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-8">
              Read the posts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
