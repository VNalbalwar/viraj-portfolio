import { FadeUp } from "./Reveal";
import { site, socials } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="overflow-hidden pt-20" style={{ background: "var(--bg)" }}>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pb-10">
        <p className="t-muted text-[0.9375rem]">© {new Date().getFullYear()} {site.name}. Product names and logos are trademarks of their owners.</p>
        <ul className="flex flex-wrap gap-x-6">
          {socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer me" className="link inline-flex min-h-11 items-center text-[0.9375rem]">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <FadeUp y={60}>
        <p aria-hidden className="t-display select-none whitespace-nowrap text-center text-[clamp(2rem,9.6vw,10rem)] leading-none opacity-[0.07] pb-[0.2em]">
          Viraj Nalbalwar
        </p>
      </FadeUp>
    </footer>
  );
}
