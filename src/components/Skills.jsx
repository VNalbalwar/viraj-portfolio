"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { skills } from "@/content/profile";

function Row({ group }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  return (
    <div ref={ref} className="grid gap-x-10 gap-y-3 border-t py-6 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]" style={{ borderColor: "var(--line)" }}>
      <h3 className="text-[1.15rem] font-extrabold [font-stretch:112%] lg:pt-3">{group.name}</h3>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {group.items.map(([name, heat, note], i) => (
          <li
            key={name}
            tabIndex={0}
            data-on={on}
            className={`skill heat-${heat} group relative h-[4.25rem] overflow-hidden rounded-2xl px-3.5 outline-offset-2`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <span className="absolute inset-x-3.5 top-1/2 -translate-y-1/2 font-bold leading-tight transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-[170%] group-hover:opacity-0 group-focus:-translate-y-[170%] group-focus:opacity-0">
              {name}
            </span>
            <span className="absolute inset-x-3.5 top-1/2 translate-y-[70%] text-[0.82rem] font-medium leading-tight opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus:-translate-y-1/2 group-focus:opacity-100">
              {note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="zone" data-t="3" data-prev="2" aria-labelledby="skills-h">
      <div className="wrap zone-pad">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 id="skills-h" className="h-section max-w-[14ch]">
              What's running hot.
            </h2>
            <p className="mt-5 max-w-[52ch]" style={{ color: "var(--on-2)" }}>
              A heat map of my stack. Hotter means it's been running more lately. Hover or tap a tile to see where I used it.
            </p>
          </div>
          <div className="readout flex items-center gap-2" aria-hidden>
            <span>idle</span>
            <span className="flex gap-1">
              {[1, 2, 3, 4, 5].map((h) => (
                <span key={h} data-on="true" className={`skill heat-${h} block h-4 w-7 rounded`} />
              ))}
            </span>
            <span>daily</span>
          </div>
        </div>
        <div className="mt-10 border-b" style={{ borderColor: "var(--line)" }}>
          {skills.map((g) => (
            <Row key={g.name} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
