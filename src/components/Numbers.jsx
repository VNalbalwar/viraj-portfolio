import Odometer from "./Odometer";
import { MaskHeading, Stagger, StaggerItem } from "./Reveal";
import { manualStats } from "@/content/profile";

export default function Numbers({ repoCount, postCount }) {
  const figures = [
    { value: repoCount, label: "public repositories", note: "From GitHub" },
    { value: postCount, label: "posts on Linux and shell scripting", note: "From Hashnode" },
    { value: 2, label: "research papers accepted in 2026", note: "ISC High Performance, Hamburg, Germany. IEEE HiPC, Bengaluru, India." },
    { value: manualStats.linkedinFollowers, text: manualStats.linkedinFollowersLabel, label: "followers on LinkedIn", note: "From LinkedIn" },
  ];
  return (
    <section id="numbers" className="sec alt" aria-labelledby="numbers-h">
      <div className="wrap">
        <MaskHeading id="numbers-h" text="Public work so far" className="t-h2 max-w-[14ch]" />
        <Stagger as="dl" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {figures.map((f) => (
            <StaggerItem key={f.label} className="flex flex-col border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <dd className="order-first mb-4 t-serif text-[clamp(3.4rem,7.6vw,6.8rem)] leading-none" style={{ color: "var(--accent)" }}>
                <Odometer value={f.value} text={f.text} />
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
