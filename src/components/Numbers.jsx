import Odometer from "./Odometer";

export default function Numbers({ repoCount, postCount, followers, live }) {
  const figures = [
    { value: repoCount, label: "public repositories", note: live.github ? "from GitHub, hourly" : "GitHub" },
    { value: postCount, label: "posts on Linux and shell scripting", note: live.hashnode ? "from Hashnode, hourly" : "Hashnode" },
    { value: 2, label: "research papers accepted in 2026", note: "ISC High Performance, IEEE HiPC" },
    { value: followers, label: "followers on LinkedIn", note: "updated by hand" },
  ];
  return (
    <section id="numbers" className="sec band !min-h-0 lg:!py-[8rem]" aria-labelledby="numbers-h">
      <div className="wrap">
        <h2 id="numbers-h" className="t-h2 max-w-[18ch]">
          Public work so far
        </h2>
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col border-t pt-5" style={{ borderColor: "var(--line)" }}>
              <dt>
                <span className="block">{f.label}</span>
                <span className="t-mono t-muted">{f.note}</span>
              </dt>
              <dd className="order-first mb-3 text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em]" style={{ color: "var(--accent)" }}>
                <Odometer value={f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
