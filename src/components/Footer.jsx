import { site, socials } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: "var(--line)" }}>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
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
    </footer>
  );
}
