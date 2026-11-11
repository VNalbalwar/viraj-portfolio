"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { questions } from "@/content/profile";

export default function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <section id="questions" className="sec alt" aria-labelledby="questions-h">
      <div className="wrap grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <MaskHeading id="questions-h" text="Questions" className="t-h2 lg:col-span-4" />
        <div className="lg:col-span-7 lg:col-start-6">
          <Stagger as="ul" gap={0.06}>
            {questions.map((item, i) => {
              const isOpen = open === i;
              return (
                <StaggerItem as="li" key={item.q} className="row-rule">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`qa-${i}`}
                      className="flex min-h-[4.25rem] w-full items-center justify-between gap-4 py-4 text-left text-[1.2rem] font-medium leading-snug tracking-tight"
                    >
                      {item.q}
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0, background: isOpen ? "var(--accent)" : "var(--line)", color: isOpen ? "var(--accent-ink)" : "var(--ink)" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[1.3rem] leading-none"
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`qa-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="t-muted max-w-[60ch] pb-7">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </Stagger>
          <a href="#contact" className="btn btn-solid mt-10">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
