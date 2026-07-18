"use client";
import Image from "next/image";
import { heroIcons, heroLinks } from "@/assets";
import {
  useMotionValue,
  useTransform,
  motion,
  useSpring,
} from "framer-motion";
import { useState } from "react";

const roles = [
  { label: "Cloud + DevOps", emoji: "☁️" },
  { label: "Full-Stack Builder", emoji: "⚡" },
  { label: "System Design Learner", emoji: "🧩" },
];

const Hero = () => {
  const [windowOffset, setWindowOffset] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [mouseMove, setMouseMove] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setWindowOffset({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
    setMouseMove(true);
  };

  const { innerWidth, innerHeight } = windowOffset;

  const xSpring = useSpring(x, { stiffness: 100, damping: 10 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 10 });

  const rotateY = useTransform(xSpring, [0, innerWidth], [-30, 30]);
  const rotateX = useTransform(ySpring, [0, innerHeight], [10, -50]);

  return (
    <div
      id="home"
      className="h-screen grid place-items-center relative bg-dots"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex flex-col items-center gap-y-6 z-10">
        {/* Profile image with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center"
          style={{
            rotateX: mouseMove ? rotateX : 0,
            rotateY: mouseMove ? rotateY : 0,
            transition: "0.1s",
          }}
        >
          <div
            className="relative rounded-full p-[3px]"
            style={{
              background: `conic-gradient(from 0deg, var(--brand-local), var(--warm-local), var(--brand-local))`,
            }}
          >
            <Image
              src={"/viraj-nalbalwar.jpg"}
              alt="Viraj Nalbalwar"
              width={280}
              height={280}
              priority
              className="w-[280px] h-[280px] sm:w-[220px] sm:h-[220px] rounded-full object-cover"
              style={{ background: "var(--bg)" }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1
            className="heading-font text-5xl sm:text-3xl font-bold tracking-tight leading-none"
            style={{ color: "var(--ink-1)" }}
          >
            Viraj Nalbalwar
          </h1>
        </motion.div>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {roles.map((role, i) => (
            <span
              key={i}
              className="flex items-center gap-x-1.5 text-sm px-3 py-1.5 rounded-full border mono-font"
              style={{
                color: "var(--ink-2)",
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <span>{role.emoji}</span>
              <span>{role.label}</span>
            </span>
          ))}
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-x-2"
        >
          {heroIcons.map((icon, i) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={heroLinks[i]}
              key={i}
              className="flex items-center justify-center w-10 h-10 rounded-full border text-xl transition-all duration-200"
              style={{
                color: "var(--ink-3)",
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--brand-local)";
                e.currentTarget.style.borderColor = "var(--brand-local)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-3)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {icon}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          href="#contact"
          className="mt-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200"
          style={{
            background: "var(--brand-local)",
            color: "oklch(0.10 0.012 255)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Get in touch →
        </motion.a>
      </div>
    </div>
  );
};
export default Hero;

