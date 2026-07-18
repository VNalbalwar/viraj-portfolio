"use client";

import { useEffect, useRef, useState } from "react";
import Heading from "./sub/Heading";
import Project from "./sub/Project";
import { THUMBS } from "./sub/ProjectThumb";
import { projectsData, projectsButton } from "@/assets";
import { animate, motion } from "framer-motion";

const Projects = () => {
  const [tech, setTech] = useState("All");
  const [index, setIndex] = useState(0);
  const prevIndex = useRef(0);
  const buttonRef = useRef([]);

  const handleClick = () => {
    animate(buttonRef.current[prevIndex.current], { opacity: 0.4, scale: 1 });
    animate(buttonRef.current[index], { opacity: 1, scale: 1.05 });
  };

  useEffect(() => {
    handleClick();
    prevIndex.current = index;
  }, [index]);

  const filtered = projectsData.filter((project) =>
    tech === "All" ? true : project.tech.some((item) => item === tech)
  );

  return (
    <div id="projects" className="min-h-screen py-20">
      <Heading text={"Projects"} />

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {projectsButton.map((text, i) => (
          <motion.button
            ref={(el) => buttonRef.current.push(el)}
            onClick={() => {
              setTech(text);
              setIndex(i);
            }}
            key={i}
            initial={{ opacity: i === 0 ? 1 : 0.4, scale: i === 0 ? 1.05 : 1 }}
            className="border rounded-full px-4 py-1.5 text-xs font-medium tracking-wide mono-font transition-colors duration-200"
            style={{
              borderColor: "var(--border)",
              color: "var(--ink-2)",
              background: "var(--surface)",
            }}
          >
            {text}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <div className="flex flex-wrap items-start justify-center gap-5">
        {filtered.map((data, i) => {
          const ThumbComp = data.thumbKey ? THUMBS[data.thumbKey] : null;
          const thumb = ThumbComp ? <ThumbComp /> : null;
          return (
            <motion.div key={`${data.thumbKey ?? i}`} layout>
              <Project data={data} index={i} thumb={thumb} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default Projects;

