// Generated thumbnail for any repo without a hand-made one: a small heat map
// seeded by the repo name, so every project gets a unique, stable signature.
const COLS = 16;
const ROWS = 8;

function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export default function HeatThumb({ id, label }) {
  const rnd = seeded(id);
  const blobs = Array.from({ length: 3 }, () => ({ x: rnd() * COLS, y: rnd() * ROWS, r: 2.2 + rnd() * 3.2, a: 0.55 + rnd() * 0.45 }));
  const cells = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let v = 0;
      for (const b of blobs) v += b.a * Math.exp(-((x - b.x) ** 2 + (y - b.y) ** 2) / (b.r * b.r));
      cells.push(Math.min(4, Math.floor(Math.min(1, v) * 5)));
    }
  }
  return (
    <div className="relative aspect-[400/220] w-full overflow-hidden" style={{ background: "var(--r0)" }} aria-hidden>
      <div className="grid h-full w-full gap-px p-px" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells.map((c, i) => (
          <span
            key={i}
            className={c >= 3 ? "heat-cell-hot" : undefined}
            style={{ background: `var(--r${c})`, animationDelay: `${(i % 7) * 0.35}s`, borderRadius: 2 }}
          />
        ))}
      </div>
      {label && (
        <span className="readout absolute bottom-2.5 left-2.5 rounded-full px-2 py-0.5" style={{ background: "rgb(0 0 0 / 0.6)", color: "#fff" }}>
          {label}
        </span>
      )}
    </div>
  );
}
