"use client";
import { navbarData, copyRightIcon } from "@/assets";
import Link from "next/link";

const Navbar = ({ id }) => {
  return (
    <nav
      className="w-[70px] h-full fixed left-0 top-0 flex flex-col justify-between px-4 py-10 xl:py-6 z-10 border-r"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo */}
      <Link href="/#home" className="flex flex-col items-start gap-y-1">
        <span
          className="heading-font text-2xl font-bold leading-none"
          style={{ color: "var(--brand-local)" }}
        >
          V.
        </span>
        <span
          className="block w-min rotate-90 origin-bottom-left text-[11px] font-medium tracking-widest uppercase mt-2 mono-font"
          style={{ color: "var(--ink-3)" }}
        >
          Nalbalwar
        </span>
      </Link>

      {/* Nav items */}
      <div className="flex flex-col gap-y-3 xl:gap-y-1 sm:gap-y-2 xs:gap-y-0">
        {navbarData.map((item, i) => {
          const isActive = item.id === id;
          return (
            <Link
              key={i}
              href={`/#${item.id}`}
              className="group flex flex-col items-center gap-y-1.5"
            >
              <span
                className={`text-2xl transition-all duration-200 ${
                  isActive
                    ? "scale-110 xl:scale-100"
                    : "scale-100 xl:scale-90 xs:scale-75 group-hover:scale-125 xl:group-hover:scale-115 xs:group-hover:scale-100"
                }`}
                style={{ color: isActive ? "var(--brand-local)" : "var(--ink-3)" }}
              >
                {item.icon}
              </span>
              <span
                className={`text-[9px] tracking-widest uppercase font-medium transition-all duration-200 text-center mono-font ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } ${i % 2 === 0 ? "translate-x-1 group-hover:translate-x-0" : "-translate-x-1 group-hover:translate-x-0"} ${isActive ? "translate-x-0" : ""}`}
                style={{ color: "var(--ink-2)" }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Copyright */}
      <p className="flex items-center justify-center text-[11px] xs:text-[10px] mt-6">
        <span
          className="absolute left-1/2 w-max flex items-center gap-x-1 -rotate-90 origin-bottom-left tracking-wider mono-font"
          style={{ color: "var(--ink-3)" }}
        >
          {copyRightIcon} {new Date().getFullYear()}
        </span>
      </p>
    </nav>
  );
};
export default Navbar;

