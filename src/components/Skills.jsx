"use client";

import { motion } from "motion/react";
import { MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { skills } from "@/content/profile";

export default function Skills() {
  return (
    <section id="skills" className="sec" aria-labelledby="skills-h">
      <div className="wrap">
        <MaskHeading id="skills-h" text="Skills and tools" className="t-h2 max-w-[12ch]" />
        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => {
            const logos = g.items.filter((i) => i.icon);
            const plain = g.items.filter((i) => !i.icon);
            return (
              <div key={g.name}>
                <h3 className="t-h3 border-b pb-4" style={{ borderColor: "var(--line)" }}>
                  {g.name}
                </h3>
                <Stagger as="ul" className="mt-2" gap={0.05}>
                  {logos.map((i) => (
                    <StaggerItem as="li" key={i.name} className="row-rule">
                      <motion.div className="flex items-center gap-3 py-3.5" whileHover="hover" initial="rest">
                        <motion.span
                          className="grid h-8 w-8 place-items-center"
                          variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.22, rotate: -6 } }}
                          transition={{ type: "spring", stiffness: 420, damping: 16 }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/icons/${i.icon}.svg`} alt="" width={28} height={28} loading="lazy" className={`ic h-7 w-7 ${["github", "flask"].includes(i.icon) ? "ic-ink" : ""}`} />
                        </motion.span>
                        <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.25 }}>
                          {i.name}
                        </motion.span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </Stagger>
                {plain.length > 0 && <p className="t-muted mt-4 text-[0.9rem] leading-relaxed">Also {plain.map((i) => i.name).join(", ")}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
