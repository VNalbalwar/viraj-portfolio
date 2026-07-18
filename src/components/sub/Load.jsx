"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Load = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: load ? 0 : 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      onAnimationComplete={() => {
        if (load) {
          const el = document.querySelector(".load-screen");
          if (el) el.style.display = "none";
        }
      }}
      className="load-screen w-full h-full fixed left-0 top-0 flex flex-col items-center justify-center z-50 pointer-events-none"
      style={{ background: "oklch(0.09 0.010 38)" }}
    >
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="heading-font text-5xl font-bold"
        style={{ color: "oklch(0.74 0.18 62)" }}
      >
        V.
      </motion.span>
      <motion.div
        className="mt-6 w-24 h-[2px] rounded-full overflow-hidden"
        style={{ background: "oklch(0.23 0.016 38)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "oklch(0.74 0.18 62)" }}
          initial={{ x: "-100%" }}
          animate={{ x: load ? "100%" : "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
export default Load;

