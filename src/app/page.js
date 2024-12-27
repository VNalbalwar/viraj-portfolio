"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Questions from "@/components/Questions";
import Reviews from "@/components/Reviews";
import Skills from "@/components/Skills";
import Toggle from "@/components/sub/Toggle";
import Load from "@/components/sub/Load";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [id, setId] = useState(0);
  const compsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } //triggers when 30% of the element is visible
    );

    const compsArr = Array.from(compsRef.current.children);
    compsArr.forEach((comp) => {
      observer.observe(comp);
    });
  }, []);

  return (
    <>
      <Load />
      <Toggle>
        <Navbar id={id} />
        {/* <div className="px-2" ref={compsRef}> */}
        <div className="" ref={compsRef}>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Reviews />
          <Projects />
          <Contact />
          <Questions />
        </div>
      </Toggle>
    </>
  );
}
