"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { questions } from "@/content/profile";

export default function Questions() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="questions" className="zone" data-t="2" data-prev="5" aria-labelledby="questions-h">
      <div className="wrap zone-pad">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div>
            <h2 id="questions-h" className="h-section">
              Spill the tea. I've got answers.
            </h2>
            <p className="mt-5" style={{ color: "var(--on-2)" }}>Cooling down. The stuff people actually ask me.</p>
          </div>
          <ul className="border-t" style={{ borderColor: "var(--line)" }}>
            {questions.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b" style={{ borderColor: "var(--line)" }}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`qa-${i}`}
                      className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[1.15rem] font-bold leading-snug"
                    >
                      {item.q}
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                        style={isOpen ? { background: "var(--hot)", color: "var(--hot-on)" } : { background: "var(--surface-2)" }}
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`qa-${i}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[64ch] pb-6" style={{ color: "var(--on-2)" }}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
