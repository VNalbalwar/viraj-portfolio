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
        {group.items.map(([name, note], i) => (
          <li
            key={name}
            tabIndex={0}
            data-on={on}
            className="skill group relative h-[4.25rem] overflow-hidden rounded-2xl px-3.5 outline-offset-2"
            style={{ transitionDelay: `${i * 55}ms` }}
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
    <section id="skills" className="zone" data-alt aria-labelledby="skills-h">
      <div className="wrap zone-pad">
        <h2 id="skills-h" className="h-section max-w-[14ch]">
          The stack.
        </h2>
        <p className="mt-5 max-w-[52ch]" style={{ color: "var(--on-2)" }}>
          Hover or tap any of them to see where I actually used it.
        </p>
        <div className="mt-10 border-b" style={{ borderColor: "var(--line)" }}>
          {skills.map((g) => (
            <Row key={g.name} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
