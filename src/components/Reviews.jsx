"use client";

import Image from "next/image";
import Heading from "./sub/Heading";
import { reviewsData, starIcons, arrowIcons } from "@/assets";
import { useState, useRef, useEffect } from "react";
import { animate, motion } from "framer-motion";

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const prevIndex = useRef(0);
  const slides = useRef([]);

  const rightClickHandler = () => {
    animate(slides.current[index], { x: 0 }, { delay: 0.3 });
    animate(slides.current[prevIndex.current], {
      scale: index === 0 ? 1 : 0.4,
      rotate: index === 0 ? 0 : index % 2 === 0 ? 10 : -10,
    });
  };

  const leftClickHandler = () => {
    animate(
      slides.current[index],
      { scale: 1, rotate: 0 },
      { delay: 0.2 }
    );
    animate(slides.current[prevIndex.current], { x: "100%" });
  };

  useEffect(() => {
    direction ? leftClickHandler() : rightClickHandler();
    prevIndex.current = index;
  }, [index]);

  return (
    <div id="reviews" className="py-20">
      <Heading text={"Your Thoughts, My Vibes 🎤"} />
      <div className="flex flex-col items-center justify-center gap-y-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-[800px] lg:w-[600px] md:w-[95%] sm:w-full h-[420px] lg:h-[380px] md:h-[360px] sm:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--border)" }}
        >
          {reviewsData.map((review, i) => (
            <motion.div
              initial={{ x: "100%" }}
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 lg:gap-y-3 p-10 lg:p-6 rounded-2xl"
              style={{ background: "var(--surface)" }}
              ref={(el) => slides.current.push(el)}
            >
              <Image
                src={review.image}
                alt={review.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-2 p-2 object-contain"
                style={{ borderColor: "var(--border)" }}
              />
              <div className="text-center">
                <h3
                  className="heading-font text-lg font-semibold tracking-wide"
                  style={{ color: "var(--brand-local)" }}
                >
                  {review.name}
                </h3>
              </div>
              <p
                className="text-sm text-center leading-relaxed max-w-[55ch] font-light"
                style={{ color: "var(--ink-2)" }}
              >
                "{review.comment}"
              </p>
              <div className="flex flex-col items-center gap-y-1">
                <div className="flex items-center gap-x-1 text-xl" style={{ color: "var(--warm-local)" }}>
                  {review.stars.map((star, i) => (
                    <span key={i}>
                      {star === 0 ? starIcons[2] : star === 1 ? starIcons[0] : starIcons[1]}
                    </span>
                  ))}
                </div>
                <span className="mono-font text-sm font-medium" style={{ color: "var(--warm-local)" }}>
                  {review.stars.reduce((sum, item) => sum + item, 0).toFixed(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-x-3">
          <button
            disabled={index === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border text-xl transition-all duration-200 disabled:opacity-25"
            style={{ borderColor: "var(--border)", color: "var(--ink-2)", background: "var(--surface)" }}
            onClick={() => {
              setDirection(true);
              setIndex(index - 1);
            }}
          >
            {arrowIcons[0]}
          </button>
          <span className="mono-font text-xs tabular-nums" style={{ color: "var(--ink-3)" }}>
            {index + 1} / {reviewsData.length}
          </span>
          <button
            disabled={index === reviewsData.length - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border text-xl transition-all duration-200 disabled:opacity-25"
            style={{ borderColor: "var(--border)", color: "var(--ink-2)", background: "var(--surface)" }}
            onClick={() => {
              setDirection(false);
              setIndex(index + 1);
            }}
          >
            {arrowIcons[1]}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Reviews;

