import { Socials } from "./Icons";
import { site, socials } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="zone" data-prev="2">
      <div className="wrap pb-12 pt-[clamp(6rem,14vw,11rem)]">
        <p className="display text-[clamp(2.2rem,8vw,6rem)]">Back to baseline.</p>
        <p className="mt-5 max-w-[48ch]" style={{ color: "var(--on-2)" }}>
          That's the whole heat map. Thanks for raising the temperature in here.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t pt-8" style={{ borderColor: "var(--line)" }}>
          <Socials items={socials} />
          <p className="readout" style={{ color: "var(--on-2)" }}>
            © {new Date().getFullYear()} {site.name} · projects and posts sync hourly from GitHub and Hashnode
          </p>
        </div>
      </div>
    </footer>
  );
}
