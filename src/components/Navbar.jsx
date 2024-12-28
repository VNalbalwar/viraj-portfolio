"use client";
import { navbarData, copyRightIcon } from "@/assets";
import Link from "next/link";

const Navbar = ({ id }) => {
  return (
    <div className="w-[70px] h-full fixed left-0 top-0 flex flex-col justify-between border-r border-gray-200 px-4 py-10 xl:py-6 z-10">
      <Link href="/#home">
        <span className="text-3xl font-semibold text-red-400">V.</span>
        <span className="block w-min rotate-90 origin-bottom text-[12px] font-semibold dark:text-white">
          Nalbalwar
        </span>
      </Link>
      <div className="flex flex-col gap-y-3 xl:gap-y-1 sm:gap-y-2 xs:gap-y-0">
        {navbarData.map((item, i) => (
          <Link
            key={i}
            href={`/#${item.id}`}
            className="group flex flex-col items-center gap-y-2"
          >
            <span
              className={`text-2xl group-hover:scale-125 xl:group-hover:scale-115 xs:group-hover:scale-100 transition-all ${
                item.id === id
                  ? "text-red-400 scale-110 xl:scale-100 xs:scale-80"
                  : "text-yellow-600 scale-100 xl:scale-90 xs:scale-70"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-[10px] tracking-wide opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-center dark:text-white ${
                i % 2 === 0 ? "translate-x-2" : "-translate-x-2"
              } ${item.id === id && "-translate-x-0 opacity-100"}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <p className="flex items-center justify-center text-[13px] xs:text-[11px] text-gray-500 mt-6">
        <span className="absolute left-1/2 w-max flex items-center -rotate-90 origin-bottom-left tracking-wider dark:text-gray-200 transition-colors">
          {copyRightIcon} 2021 - {new Date().getFullYear()}
        </span>
      </p>
    </div>
  );
};
export default Navbar;
