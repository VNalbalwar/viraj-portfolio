"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { questions } from "@/content/profile";

export default function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <section id="questions" className="sec alt" aria-labelledby="questions-h">
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <h2 id="questions-h" className="t-h2">
          Questions
        </h2>
        <ul>
          {questions.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="row-rule">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`qa-${i}`}
                    className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-[1.2rem] font-medium leading-snug tracking-tight"
                  >
                    {item.q}
                    <Plus
                      size={20}
                      aria-hidden
                      className="shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    />
                  </button>
                </h3>
                <div
                  id={`qa-${i}`}
                  hidden={!isOpen}
                  className="t-muted max-w-[62ch] pb-6"
                >
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
