"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import GithubLineIcon from "remixicon-react/GithubLineIcon";
import ExternalLinkLineIcon from "remixicon-react/ExternalLinkLineIcon";

const Project = ({ data, index, thumb }) => {
  const [show, setShow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: index % 2 === 0 ? 60 : -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      onClick={() => setShow((s) => !s)}
      className="relative w-[350px] sm:w-full h-max rounded-xl cursor-pointer overflow-hidden border transition-colors duration-200"
      style={{
        background: "var(--surface)",
        borderColor: show ? "var(--brand-local)" : "var(--border)",
      }}
    >
      {/* Thumbnail — SVG component or fallback image */}
      {thumb ? (
        <div className="w-full">{thumb}</div>
      ) : (
        <Image
          src={data.url}
          alt={data.name}
          width={400}
          height={220}
          className="rounded-xl opacity-90 w-full"
        />
      )}

      {/* Overlay on click */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 w-full h-full flex flex-col items-center justify-center gap-y-1.5 p-3 rounded-xl"
        style={{ background: "color-mix(in oklch, var(--surface) 97%, transparent)" }}
      >
        <h2
          className="heading-font text-sm font-bold tracking-wide text-center line-clamp-2"
          style={{ color: "var(--ink-1)" }}
        >
          {data.name}
        </h2>
        <p
          className="text-xs text-center leading-relaxed line-clamp-3"
          style={{ color: "var(--ink-2)", maxWidth: "30ch" }}
        >
          {data.desc}
        </p>

        {/* Tech tags */}
        {data.tech && (
          <div className="flex flex-wrap gap-1 justify-center">
            {data.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full border mono-font"
                style={{ color: "var(--brand-local)", borderColor: "var(--brand-local)" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        {(data.github || data.live) && (
          <div className="flex gap-2.5 mt-1">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-opacity duration-150 hover:opacity-80"
                style={{ color: "var(--brand-local)", borderColor: "var(--brand-local)" }}
              >
                <GithubLineIcon size={12} />
                Code
              </a>
            )}
            {data.live && (
              <a
                href={data.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-opacity duration-150 hover:opacity-80"
                style={{ color: "var(--warm-local)", borderColor: "var(--warm-local)" }}
              >
                <ExternalLinkLineIcon size={12} />
                Live
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
export default Project;

