"use client";
import { moonIcon, sunIcon } from "@/assets";
import { useRef, useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { motion } from "framer-motion";

const Toggle = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const mainRef = useRef(null);

  const addDarkTheme = () => {
    mainRef.current.classList.add("dark");
    setDarkTheme(true);
  };

  const removeDarkTheme = () => {
    mainRef.current.classList.remove("dark");
    setDarkTheme(false);
  };

  useEffect(() => {
    const darkTheme = reactLocalStorage.get("darkTheme");
    const darkThemeParsed = darkTheme !== undefined && JSON.parse(darkTheme);
    const systemTheme =
      typeof window !== undefined &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkTheme == undefined) {
      systemTheme ? addDarkTheme() : removeDarkTheme();
    } else {
      darkThemeParsed ? addDarkTheme() : removeDarkTheme();
    }
  }, []);

  return (
    <main ref={mainRef}>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: "var(--bg)", color: "var(--ink-1)" }}
      >
        <div className="max-w-[1200px] xl:w-full mx-auto flex justify-center xl:px-[90px] sm:pl-[80px] sm:pr-5 overflow-hidden">
          {/* Theme toggle */}
          <button
            onClick={() => {
              if (!darkTheme) {
                addDarkTheme();
                reactLocalStorage.set("darkTheme", true);
              } else {
                removeDarkTheme();
                reactLocalStorage.set("darkTheme", false);
              }
            }}
            aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
            className="fixed right-8 top-8 z-40 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--ink-2)",
            }}
          >
            <motion.span
              className="absolute text-lg block leading-none"
              animate={{ opacity: darkTheme ? 0 : 1, scale: darkTheme ? 0.5 : 1, rotate: darkTheme ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {moonIcon}
            </motion.span>
            <motion.span
              className="absolute text-lg block leading-none"
              animate={{ opacity: darkTheme ? 1 : 0, scale: darkTheme ? 1 : 0.5, rotate: darkTheme ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {sunIcon}
            </motion.span>
          </button>
          {children}
        </div>
      </div>
    </main>
  );
};
export default Toggle;

