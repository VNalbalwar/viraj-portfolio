import Odometer from "./Odometer";
import { MaskHeading, Stagger, StaggerItem } from "./Reveal";

export default function Numbers({ repoCount, postCount, followers, live }) {
  const figures = [
    { value: repoCount, label: "public repositories", note: live.github ? "live from GitHub" : "GitHub" },
    { value: postCount, label: "posts on Linux and shell scripting", note: live.hashnode ? "live from Hashnode" : "Hashnode" },
    { value: 2, label: "research papers accepted in 2026", note: "ISC High Performance, IEEE HiPC" },
    { value: followers, label: "followers on LinkedIn", note: "updated by hand" },
  ];
  return (
    <section id="numbers" className="sec alt" aria-labelledby="numbers-h">
      <div className="wrap">
        <MaskHeading id="numbers-h" text="Public work so far" className="t-h2 max-w-[14ch]" />
        <Stagger as="dl" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {figures.map((f) => (
            <StaggerItem key={f.label} className="flex flex-col border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <dd className="order-first mb-4 font-[family-name:var(--font-display)] text-[clamp(2.8rem,6.4vw,5.5rem)] font-semibold leading-none tracking-[-0.05em]" style={{ color: "var(--accent)" }}>
                <Odometer value={f.value} />
              </dd>
              <dt>
                <span className="block">{f.label}</span>
                <span className="t-muted text-[0.9rem]">{f.note}</span>
              </dt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
