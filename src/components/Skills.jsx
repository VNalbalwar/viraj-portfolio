"use client";

import Image from "next/image";
import Heading from "./sub/Heading";
import { skillsData } from "@/assets";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <div id="skills" className="min-h-screen flex flex-col items-center justify-center py-20 gap-y-16">
      <Heading text={"Skills"} />
      <div className="w-full flex justify-start flex-wrap gap-3">
        {skillsData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "50px", once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-x-2.5 rounded-xl border px-4 py-2.5 cursor-default transition-colors duration-200 group"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--brand-local)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={100}
              height={100}
              className="h-auto w-8"
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--ink-2)" }}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Skills;

