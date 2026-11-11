import { skills } from "@/content/profile";

export default function Skills() {
  return (
    <section id="skills" className="sec" aria-labelledby="skills-h">
      <div className="wrap">
        <h2 id="skills-h" className="t-h2">
          Skills and tools
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => {
            const logos = g.items.filter((i) => i.icon);
            const plain = g.items.filter((i) => !i.icon);
            return (
              <div key={g.name}>
                <h3 className="t-h3 border-b pb-4" style={{ borderColor: "var(--line)" }}>
                  {g.name}
                </h3>
                <ul className="mt-2">
                  {logos.map((i) => (
                    <li key={i.name} className="row-rule flex items-center gap-3 py-3 first:border-t-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/icons/${i.icon}.svg`}
                        alt=""
                        width={26}
                        height={26}
                        loading="lazy"
                        className={`ic h-[26px] w-[26px] ${["github", "flask"].includes(i.icon) ? "ic-ink" : ""}`}
                      />
                      <span>{i.name}</span>
                    </li>
                  ))}
                </ul>
                {plain.length > 0 && (
                  <p className="tag mt-4 leading-relaxed">Also: {plain.map((i) => i.name).join(", ")}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
