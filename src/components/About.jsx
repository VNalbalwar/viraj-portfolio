"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Heading from "./sub/Heading";
import Achievements from "./sub/Achievements";
import { aboutData, aboutText, downloadIcon } from "@/assets";

const About = () => {
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setLiveStats)
      .catch(() => {}); // silent — static fallback values stay
  }, []);

  // Merge live values where available; keep static fallback for the rest
  const resolvedData = aboutData.map((item) => {
    const liveValue =
      item.liveKey && liveStats?.[item.liveKey] != null
        ? liveStats[item.liveKey]
        : null;
    return {
      ...item,
      amount: liveValue ?? item.amount,
      isLive: liveValue != null, // only true if live data actually came back
    };
  });

  return (
    <div id="about" className="min-h-screen flex flex-col items-center justify-center py-20">
      <Heading text={"About Me"} />

      <div className="w-full flex items-center justify-between gap-x-12 md:flex-col md:gap-y-10">
        {/* Image */}
        <Image
          src={"/about-me.png"}
          alt="About Me illustration"
          width={400}
          height={400}
          className="w-[260px] lg:w-[200px] md:hidden shrink-0"
        />

        {/* Text card */}
        <div
          className="relative max-w-[720px] rounded-2xl border p-7 sm:p-5"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-base leading-relaxed font-light"
            style={{ color: "var(--ink-2)", maxWidth: "65ch" }}
          >
            {aboutText}
          </p>
          <a
            href="/resumes/Viraj-Nalbalwar-Resume.pdf"
            download=""
            className="mt-6 w-max flex items-center gap-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{
              background: "var(--brand-local)",
              borderColor: "var(--brand-local)",
              color: "oklch(0.10 0.012 255)",
            }}
          >
            <span>Download CV</span>
            <span className="text-base">{downloadIcon}</span>
          </a>
        </div>
      </div>

      {/* Achievement cards */}
      <div className="mt-16 w-full grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-4">
        {resolvedData.map((item, i) => (
          <Achievements key={i} title={item.title} amount={item.amount} isLive={item.isLive}>
            {item.icon}
          </Achievements>
        ))}
      </div>
    </div>
  );
};
export default About;

