"use client";

import Image from "next/image";
import Heading from "./sub/Heading";
import { experienceData, myDates } from "@/assets";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end end"],
  });

  const scrollY = useSpring(scrollYProgress, { stiffness: 200, damping: 20 });

  return (
    <div id="experience" className="relative py-20">
      <Heading text={"Experience & Education"} />

      <Image
        src={"/education.png"}
        alt="Experience illustration"
        width={400}
        height={400}
        className="absolute -top-4 right-0 opacity-40 lg:hidden"
      />

      <div
        ref={containerRef}
        className="relative w-full flex flex-col items-center gap-y-10 lg:gap-y-16 py-10"
      >
        {experienceData.map((data, i) => (
          <div
            key={`id-${i}`}
            className={`w-[560px] xl:w-[460px] sm:w-full px-[4.5rem] sm:px-0 relative ${
              i % 2 === 0
                ? "-left-[280px] xl:-left-[230px] lg:left-0"
                : "left-[280px] xl:left-[230px] lg:left-0"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
              className="relative flex flex-col gap-y-3 rounded-xl border p-5 z-20"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="heading-font text-lg font-semibold"
                style={{ color: "var(--ink-1)" }}
              >
                {data.title}
              </h3>

              {data.education && (
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest mono-font" style={{ color: "var(--ink-3)" }}>
                    Education
                  </span>
                  <p className="mt-0.5 text-sm font-light" style={{ color: "var(--ink-2)" }}>
                    {data.education}
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs font-medium uppercase tracking-widest mono-font" style={{ color: "var(--ink-3)" }}>
                  Experience
                </span>
                <ul className="mt-1 space-y-1">
                  {data.experience.map((exp, j) => (
                    <li key={j} className="text-sm font-light flex gap-x-2" style={{ color: "var(--ink-2)" }}>
                      <span style={{ color: "var(--brand-local)" }}>›</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Date chip */}
            <div
              className={`h-7 px-3 absolute top-16 rounded-full flex items-center justify-center z-10 text-xs mono-font font-medium border ${
                i % 2 === 0
                  ? "left-full -translate-x-1/2 lg:left-1/2"
                  : "right-full translate-x-1/2 lg:right-1/2"
              }`}
              style={{
                background: "var(--bg)",
                borderColor: "var(--brand-local)",
                color: "var(--brand-local)",
                minWidth: "8rem",
              }}
            >
              {myDates[i].date}
            </div>
          </div>
        ))}

        {/* Animated timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          style={{ scaleY: scrollY, background: "var(--brand-local)", opacity: 0.4 }}
          className="absolute w-0.5 h-full rounded-full origin-top"
        />
      </div>
    </div>
  );
};
export default Experience;

