"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { skills } from "@/content/profile";

/** An endless strip of the tools I use, real logos. Hover or the button pauses it. */
export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = skills.flatMap((g) => g.items).filter((i) => i.icon);
  const row = (key) =>
    items.map((i) => (
      <li key={key + i.name} className="mx-7 flex items-center gap-3 sm:mx-9">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/icons/${i.icon}.svg`} alt="" width={30} height={30} loading="lazy" className={`ic h-[30px] w-[30px] ${["github", "flask"].includes(i.icon) ? "ic-ink" : ""}`} />
        <span className="whitespace-nowrap text-[1.05rem] font-medium" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          {i.name}
        </span>
      </li>
    ));
  return (
    <section aria-label="Tools I use" className="relative border-y py-9" style={{ borderColor: "var(--line)" }}>
      <div className={`marquee ${paused ? "paused" : ""}`}>
        <ul className="marquee-track">
          {row("a")}
          <span aria-hidden className="contents">{row("b")}</span>
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play tool strip" : "Pause tool strip"}
        className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full"
        style={{ background: "var(--bg)", border: "1px solid var(--line)" }}
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>
    </section>
  );
}
