"use client";
import { questionArrow } from "@/assets";
import { useState } from "react";
import { motion } from "framer-motion";

const Question = ({ data, index }) => {
  const [show, setShow] = useState(false);

  const variants = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.07 },
    }),
    hidden: { opacity: 0, x: -20 },
  };

  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "50px", once: true }}
      variants={variants}
      className="rounded-xl overflow-hidden border transition-colors duration-200"
      style={{
        borderColor: show ? "var(--brand-local)" : "var(--border)",
        background: "var(--surface)",
      }}
    >
      <button
        onClick={() => setShow(!show)}
        className="w-full flex items-center gap-x-3 px-5 py-4 text-left"
        aria-expanded={show}
      >
        <motion.span
          animate={{ rotate: show ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-xl shrink-0"
          style={{ color: show ? "var(--brand-local)" : "var(--ink-3)" }}
        >
          {questionArrow}
        </motion.span>
        <span
          className="text-base font-medium tracking-wide"
          style={{ color: "var(--ink-1)" }}
        >
          {data.question}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: show ? "auto" : 0,
          opacity: show ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p
          className="px-5 pb-4 pl-14 text-sm leading-relaxed"
          style={{ color: "var(--ink-2)" }}
        >
          {data.answer}
        </p>
      </motion.div>
    </motion.li>
  );
};
export default Question;

