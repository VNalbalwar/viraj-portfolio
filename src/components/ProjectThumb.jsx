"use client";
import { motion } from "motion/react";

// ── Palette (reads the site tokens in globals.css, so it follows the theme) ────────────
const bg = "var(--th-bg)";
const surf = "var(--th-surf)";
const amber = "var(--th-accent)";
const ambrBr = "var(--th-accent-2)";
const warm = "var(--th-warm)";
const green = "#57c98a";
const red = "#ff6b6b";
const ink = "var(--th-ink)";
const dim = "var(--th-dim)";
const border = "var(--th-border)";
const blue = "#5aa2ff";
const purple = "#a487ff";
const teal = "#3fc7bd";

// ── Animation helpers ─────────────────────────────────────────────────
const loop = (dur, delay = 0, repeatDelay = 0) => ({
  duration: dur, delay, repeat: Infinity, repeatType: "loop",
  ease: "easeInOut", repeatDelay,
});
const bounce = (dur, delay = 0) => ({
  duration: dur, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut",
});

// ── Base SVG wrapper ──────────────────────────────────────────────────
const Base = ({ children }) => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", width: "100%", height: "auto" }}>
    <rect width="400" height="220" fill={bg} />
    {children}
  </svg>
);

// ══════════════════════════════════════════════════════════════════════
// 1. THERMAL-AWARE KUBERNETES SCHEDULER
// ══════════════════════════════════════════════════════════════════════
export function ThermalK8sThumb() {
  const nodes = [
    { x: 70,  y: 85,  h: 0.93, lbl: "48°C", c: red    },
    { x: 200, y: 85,  h: 0.55, lbl: "29°C", c: warm   },
    { x: 330, y: 85,  h: 0.22, lbl: "14°C", c: amber  },
    { x: 70,  y: 158, h: 0.80, lbl: "41°C", c: red    },
    { x: 200, y: 158, h: 0.42, lbl: "22°C", c: amber  },
    { x: 330, y: 158, h: 0.07, lbl: "7°C",  c: green  },
  ];

  return (
    <Base>
      <defs>
        <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={red}   />
          <stop offset="50%"  stopColor={warm}  />
          <stop offset="100%" stopColor={green} />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2.5" fontWeight="700">
        THERMAL-AWARE CORE SCHEDULER · K8s
      </text>

      {/* Dashed scheduling arc: hot → cool */}
      <path d="M70,85 C120,30 280,30 330,158"
        fill="none" stroke={amber} strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />

      {/* Node pulse tracer along arc */}
      <motion.circle r="3.5" fill={ambrBr} opacity="0.85"
        animate={{ offsetDistance: ["0%", "100%"] }}
        style={{ offsetPath: "path('M70,85 C120,30 280,30 330,158')" }}
        transition={{ ...loop(2.8, 0.4, 1.2) }}
      />

      {/* CPU Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="28" fill={surf} stroke={n.c} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="20"  fill={n.c} opacity={0.06 + n.h * 0.25} />
          {[-9, 0, 9].map(d => (
            <g key={d}>
              <line x1={n.x - 13} y1={n.y + d} x2={n.x + 13} y2={n.y + d}
                stroke={n.c} strokeWidth="0.7" opacity="0.5" />
              <line x1={n.x + d} y1={n.y - 13} x2={n.x + d} y2={n.y + 13}
                stroke={n.c} strokeWidth="0.7" opacity="0.5" />
            </g>
          ))}
          <text x={n.x} y={n.y + 40} textAnchor="middle"
            fill={n.c} fontSize="8.5" fontFamily="monospace" fontWeight="700">{n.lbl}</text>
          {/* Pulsing halo for hot nodes */}
          {n.h > 0.7 && (
            <motion.circle cx={n.x} cy={n.y} r="28" fill="none" stroke={n.c} strokeWidth="1.2"
              animate={{ opacity: [0.55, 0], scale: [1, 1.6] }}
              transition={loop(1.6, i * 0.3)}
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          )}
        </g>
      ))}

      {/* Animated POD (diamond) — hot to cool */}
      <motion.g
        animate={{
          x:       [62,  62,  322, 322, 62],
          y:       [77,  77,  150, 150, 77],
          opacity: [0,   1,   1,   0,   0],
        }}
        transition={{ duration: 4.8, times: [0, 0.06, 0.78, 0.92, 1], ...loop(4.8) }}
      >
        <polygon points="0,-9 9,0 0,9 -9,0" fill={ambrBr} />
        <text x="0" y="-13" textAnchor="middle"
          fill={ambrBr} fontSize="6.5" fontFamily="monospace" fontWeight="700">POD</text>
      </motion.g>

      {/* Heat legend bar */}
      <rect x="368" y="75" width="10" height="56" rx="3" fill="url(#hg1)" opacity="0.65" />
      <text x="382" y="79"  fill={red}   fontSize="7" fontFamily="monospace">HOT</text>
      <text x="382" y="133" fill={green} fontSize="7" fontFamily="monospace">COOL</text>

      {/* K8s wheel icon */}
      <g transform="translate(20,14)" opacity="0.45">
        <circle cx="0" cy="0" r="9" fill="none" stroke={amber} strokeWidth="1.2" />
        {[0,60,120,180,240,300].map((d,i) => {
          const r = d * Math.PI / 180;
          const x2 = parseFloat((Math.cos(r)*8).toFixed(3));
          const y2 = parseFloat((Math.sin(r)*8).toFixed(3));
          return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke={amber} strokeWidth="1" />;
        })}
      </g>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Go · Kubernetes · Docker · Node Agent · Research Paper</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 2. MAC-BASED SYN FLOOD DETECTION
// ══════════════════════════════════════════════════════════════════════
export function SynFloodThumb() {
  const cx = 200, cy = 115;
  const sources = [
    { x: 55,  y: 65,  bad: false },
    { x: 345, y: 65,  bad: true  },
    { x: 55,  y: 168, bad: true  },
    { x: 345, y: 168, bad: false },
    { x: 200, y: 45,  bad: true  },
  ];

  return (
    <Base>
      <text x="200" y="20" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">MAC-BASED SYN FLOOD DETECTION</text>

      {/* Connection lines */}
      {sources.map((s, i) => (
        <line key={i} x1={s.x} y1={s.y} x2={cx} y2={cy}
          stroke={s.bad ? red : amber} strokeWidth="1" strokeDasharray="5 7" opacity="0.35" />
      ))}

      {/* Animated packets */}
      {sources.map((s, i) => (
        <motion.circle key={i} r={s.bad ? 4.5 : 3.5} fill={s.bad ? red : amber}
          animate={{
            cx: [s.x, s.bad ? (s.x + cx) / 2 : cx],
            cy: [s.y, s.bad ? (s.y + cy) / 2 : cy],
            opacity: [0.9, s.bad ? 0 : 0.9],
          }}
          transition={loop(1.8, i * 0.38)}
        />
      ))}

      {/* Source nodes */}
      {sources.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="16" fill={surf} stroke={s.bad ? red : amber} strokeWidth="1.3" />
          <text x={s.x} y={s.y + 1} textAnchor="middle" dominantBaseline="middle"
            fill={s.bad ? red : amber} fontSize="7.5" fontFamily="monospace" fontWeight="700">
            {s.bad ? "ATK" : "SRC"}
          </text>
        </g>
      ))}

      {/* BLOCKED labels for bad sources */}
      {sources.filter(s => s.bad).map((s, i) => (
        <text key={i} x={(s.x + cx) / 2} y={(s.y + cy) / 2 - 8}
          textAnchor="middle" fill={red} fontSize="7" fontFamily="monospace" fontWeight="700">
          BLOCKED
        </text>
      ))}

      {/* Central server with shield */}
      <circle cx={cx} cy={cy} r="34" fill={surf} stroke={amber} strokeWidth="2" />
      <motion.circle cx={cx} cy={cy} r="34" fill="none" stroke={amber} strokeWidth="1.5"
        animate={{ opacity: [0.4, 0], scale: [1, 1.5] }}
        transition={loop(2)}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />
      {/* Shield */}
      <path d={`M${cx},${cy-16} l14,7 v12 c0,9 -14,16 -14,16 c0,0 -14,-7 -14,-16 v-12 z`}
        fill="none" stroke={green} strokeWidth="1.8" />
      <text x={cx} y={cy + 8} textAnchor="middle"
        fill={green} fontSize="9" fontFamily="monospace" fontWeight="700">SAFE</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Python · Jupyter · TypeScript · Network Security</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 3. BLOCKCHAIN DApp · ARBITRUM STYLUS
// ══════════════════════════════════════════════════════════════════════
export function BlockchainThumb() {
  const blocks = [
    { x: 18,  lbl: "Genesis", hash: "0x4a1f…" },
    { x: 110, lbl: "Block 1", hash: "0x9c2e…" },
    { x: 202, lbl: "Block 2", hash: "0x7b3d…" },
    { x: 294, lbl: "Block 3", hash: "0x1e8f…" },
  ];

  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">BLOCKCHAIN DApp · ARBITRUM STYLUS</text>

      {/* Chain links */}
      {blocks.slice(0, -1).map((b, i) => (
        <g key={i}>
          <line x1={b.x + 80} y1="100" x2={blocks[i+1].x + 8} y2="100"
            stroke={amber} strokeWidth="1.5" />
          <polygon
            points={`${blocks[i+1].x+8},96 ${blocks[i+1].x+15},100 ${blocks[i+1].x+8},104`}
            fill={amber} />
        </g>
      ))}

      {/* Blocks */}
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x + 8} y="68" width="76" height="64" rx="5"
            fill={surf} stroke={amber} strokeWidth="1.5" />
          <text x={b.x + 46} y="84" textAnchor="middle"
            fill={amber} fontSize="8" fontFamily="monospace" fontWeight="700">{b.lbl}</text>
          <line x1={b.x + 13} y1="90" x2={b.x + 79} y2="90" stroke={border} strokeWidth="0.8" />
          <text x={b.x + 46} y="103" textAnchor="middle"
            fill={dim} fontSize="7.5" fontFamily="monospace">{b.hash}</text>
          <text x={b.x + 46} y="118" textAnchor="middle"
            fill={border} fontSize="7" fontFamily="monospace">nonce: {i+1}42</text>
          <text x={b.x + 46} y="126" textAnchor="middle"
            fill={border} fontSize="7" fontFamily="monospace">tx: {i+2}</text>
        </g>
      ))}

      {/* Animated new block appearing */}
      <motion.g
        animate={{ x: [76, 0], opacity: [0, 1] }}
        transition={{ ...loop(3.5, 0.8, 1) }}
      >
        <rect x="394" y="68" width="76" height="64" rx="5"
          fill={surf} stroke={ambrBr} strokeWidth="2" />
        <text x="432" y="84" textAnchor="middle"
          fill={ambrBr} fontSize="8" fontFamily="monospace" fontWeight="700">Block 4</text>
        <line x1="399" y1="90" x2="465" y2="90" stroke={border} strokeWidth="0.8" />
        <text x="432" y="103" textAnchor="middle"
          fill={dim} fontSize="7.5" fontFamily="monospace">0x5a9b…</text>
        <text x="432" y="118" textAnchor="middle"
          fill={green} fontSize="8" fontFamily="monospace" fontWeight="600">✓ MINED</text>
      </motion.g>

      {/* ERC-721 badge */}
      <rect x="104" y="148" width="192" height="22" rx="11"
        fill={surf} stroke={purple} strokeWidth="1" />
      <text x="200" y="163" textAnchor="middle"
        fill={purple} fontSize="8.5" fontFamily="monospace" fontWeight="600">
        ERC-721 NFT · wagmi · RainbowKit
      </text>

      {/* Arbitrum diamond */}
      <polygon points="376,148 388,162 376,176 364,162"
        fill="none" stroke={blue} strokeWidth="1.5" opacity="0.85" />
      <text x="376" y="186" textAnchor="middle" fill={blue} fontSize="7" fontFamily="monospace">ARB</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">TypeScript · Rust · Next.js · wagmi · Web3</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 4. MIND-WEBS · MULTIFUNCTIONAL NLP
// ══════════════════════════════════════════════════════════════════════
export function MindWebsThumb() {
  const cx = 200, cy = 108;
  const modules = [
    { x: 52,  y: 68,  lbl: ["IMG", "CAPTION"], c: amber },
    { x: 348, y: 68,  lbl: ["SENTIMENT", "ANALYSIS"], c: warm  },
    { x: 52,  y: 150, lbl: ["SPEECH", "SYNTH"], c: green },
    { x: 348, y: 150, lbl: ["SPEECH", "RECOG"], c: teal  },
  ];

  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">MIND-WEBS · MULTIFUNCTIONAL NLP</text>

      {/* Connection lines with animated pulses */}
      {modules.map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1={m.y} x2={cx} y2={cy}
            stroke={m.c} strokeWidth="1" opacity="0.25" />
          <motion.circle r="4" fill={m.c}
            animate={{ cx: [m.x, cx], cy: [m.y, cy], opacity: [0.9, 0] }}
            transition={loop(2, i * 0.5)}
          />
        </g>
      ))}

      {/* Brain (central polygon) */}
      <polygon points="200,76 220,88 226,108 214,122 186,122 174,108 180,88"
        fill={surf} stroke={amber} strokeWidth="1.8" />
      {/* Brain folds */}
      <path d="M186,95 Q200,84 214,95" fill="none" stroke={amber} strokeWidth="1" opacity="0.6" />
      <path d="M183,108 Q200,100 217,108" fill="none" stroke={amber} strokeWidth="1" opacity="0.5" />
      {/* Central glow pulse */}
      <motion.circle cx={cx} cy={cy} r="8" fill={amber} opacity="0.15"
        animate={{ opacity: [0.1, 0.35], scale: [0.9, 1.2] }}
        transition={bounce(1.4)}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />

      {/* Module boxes */}
      {modules.map((m, i) => (
        <g key={i}>
          <rect x={m.x - 34} y={m.y - 20} width="68" height="40" rx="5"
            fill={surf} stroke={m.c} strokeWidth="1.2" />
          {m.lbl.map((line, li) => (
            <text key={li} x={m.x} y={m.y - 6 + li * 13}
              textAnchor="middle" fill={m.c} fontSize="8" fontFamily="monospace" fontWeight="600">
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Flask label */}
      <rect x="148" y="172" width="104" height="18" rx="9"
        fill={surf} stroke={dim} strokeWidth="0.8" />
      <text x="200" y="185" textAnchor="middle"
        fill={dim} fontSize="8" fontFamily="monospace">Flask · Transformers</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Python · Flask · Hugging Face Transformers · HTML</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 5. GENTALES · AI STORY GENERATOR
// ══════════════════════════════════════════════════════════════════════
export function GentalesThumb() {
  const sparkles = [
    { x: 118, y: 60 }, { x: 282, y: 58 }, { x: 85, y: 155 },
    { x: 315, y: 152 }, { x: 152, y: 172 }, { x: 248, y: 170 }, { x: 200, y: 48 },
  ];
  const textLines = [
    { t: "Once upon a time in a", y: 93  },
    { t: "world of code...", y: 106 },
    { t: "a developer built", y: 120 },
    { t: "something magical.", y: 133 },
  ];

  return (
    <Base>
      {/* Title */}
      <text x="200" y="22" textAnchor="middle"
        fontSize="20" fontFamily="sans-serif" fontWeight="800" letterSpacing="-0.5">
        <tspan fill={amber}>gen</tspan><tspan fill={warm}>tales</tspan>
      </text>

      {/* Book — left page */}
      <rect x="120" y="55" width="77" height="108" rx="3" fill={surf} stroke={border} strokeWidth="1.5" />
      {/* Book — right page */}
      <rect x="203" y="55" width="77" height="108" rx="3" fill={surf} stroke={border} strokeWidth="1.5" />
      {/* Spine */}
      <rect x="196" y="55" width="8" height="108" fill={amber} opacity="0.3" />

      {/* Animated text lines */}
      {textLines.map((l, i) => (
        <motion.text key={i} x="200" y={l.y} textAnchor="middle"
          fill={ink} fontSize="9" fontFamily="monospace"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ ...loop(5, i * 0.4), times: [0, 0.15, 0.8, 1] }}
        >
          {l.t}
        </motion.text>
      ))}

      {/* Typing cursor */}
      <motion.rect x="248" y="133" width="2" height="10" rx="1" fill={amber}
        animate={{ opacity: [1, 0] }}
        transition={bounce(0.9, 1.2)}
      />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <motion.text key={i} x={s.x} y={s.y} textAnchor="middle" fontSize="11"
          animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.3, 0.7] }}
          transition={loop(2.2, i * 0.3)}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%", fill: i % 2 === 0 ? ambrBr : warm }}
        >✦</motion.text>
      ))}

      {/* Live badge */}
      <rect x="314" y="168" width="72" height="20" rx="10" fill="none" stroke={green} strokeWidth="1" />
      <motion.circle cx="325" cy="178" r="3.5" fill={green}
        animate={{ opacity: [1, 0.3] }} transition={bounce(1)} />
      <text x="352" y="182" textAnchor="middle" fill={green} fontSize="8" fontFamily="monospace" fontWeight="600">LIVE</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Next.js · TypeScript · Generative AI · Vercel</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 6. AI PLANT IDENTIFIER
// ══════════════════════════════════════════════════════════════════════
export function PlantIDThumb() {
  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">AI PLANT IDENTIFIER</text>

      {/* Leaf silhouette */}
      <path d="M200,170 C158,145 128,108 144,74 C155,48 180,38 200,38 C220,38 245,48 256,74 C272,108 242,145 200,170 Z"
        fill={surf} stroke={green} strokeWidth="2" />
      {/* Soft leaf fill */}
      <path d="M200,170 C158,145 128,108 144,74 C155,48 180,38 200,38 C220,38 245,48 256,74 C272,108 242,145 200,170 Z"
        fill={green} opacity="0.09" />
      {/* Central vein */}
      <path d="M200,170 L200,38" fill="none" stroke={green} strokeWidth="1.2" opacity="0.4" />
      {/* Side veins */}
      {[[200,120,180,108,162,103],[200,120,220,108,238,103],
        [200,98, 182,88, 165,84], [200,98, 218,88, 235,84]].map((v,i)=>(
        <path key={i} d={`M${v[0]},${v[1]} C${v[2]},${v[3]} ${v[4]},${v[5]} ${v[4]},${v[5]}`}
          fill="none" stroke={green} strokeWidth="0.8" opacity="0.35" />
      ))}

      {/* Scanning beam */}
      <motion.line x1="145" x2="255" stroke={ambrBr} strokeWidth="2.5" opacity="0.8"
        animate={{ y1: [50, 165], y2: [50, 165] }}
        transition={bounce(2)}
      />
      <motion.rect x="145" width="110" height="3" rx="1" fill={ambrBr} opacity="0.3"
        animate={{ y: [50, 165] }}
        transition={bounce(2)}
      />

      {/* Classification popup */}
      <motion.g animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ ...loop(3.5, 0.6), times: [0, 0.2, 0.78, 1] }}>
        <rect x="96" y="175" width="208" height="32" rx="6"
          fill={surf} stroke={green} strokeWidth="1.2" />
        <circle cx="112" cy="191" r="4" fill={green} />
        <text x="200" y="187" textAnchor="middle"
          fill={green} fontSize="8.5" fontFamily="monospace" fontWeight="700">
          Monstera Deliciosa
        </text>
        <text x="200" y="200" textAnchor="middle"
          fill={dim} fontSize="7.5" fontFamily="monospace">Confidence: 97.3%</text>
      </motion.g>

      {/* Google AI badge */}
      <rect x="10" y="28" width="56" height="26" rx="4" fill={surf} stroke={blue} strokeWidth="0.8" />
      <text x="38" y="39" textAnchor="middle" fill={blue} fontSize="7" fontFamily="monospace" fontWeight="700">Google</text>
      <text x="38" y="50" textAnchor="middle" fill={blue} fontSize="7" fontFamily="monospace">Gen AI</text>

      {/* Live badge */}
      <rect x="314" y="28" width="72" height="20" rx="10" fill="none" stroke={green} strokeWidth="1" />
      <motion.circle cx="325" cy="38" r="3.5" fill={green}
        animate={{ opacity: [1, 0.3] }} transition={bounce(1)} />
      <text x="352" y="42" textAnchor="middle" fill={green} fontSize="8" fontFamily="monospace" fontWeight="600">LIVE</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Next.js · TypeScript · Google Generative AI</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 7. STEGANOSAFE · IMAGE STEGANOGRAPHY
// ══════════════════════════════════════════════════════════════════════
export function SteganosafeThumb() {
  const cols = 11, rows = 7;
  const pw = 26, ph = 20;
  const ox = 44, oy = 38;
  const hiddenIdx = [13, 17, 22, 26, 35, 43, 49, 57, 64];

  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">STEGANOSAFE · IMAGE STEGANOGRAPHY</text>

      {/* Pixel grid */}
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const isHidden = hiddenIdx.includes(i);
        const x = ox + col * pw, y = oy + row * ph;
        return (
          <g key={i}>
            <rect x={x} y={y} width={pw - 1} height={ph - 1} rx="1"
              fill={surf} stroke={border} strokeWidth="0.4" />
            {isHidden && (
              <motion.rect x={x} y={y} width={pw - 1} height={ph - 1} rx="1" fill={amber}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={loop(3.5, (i % 9) * 0.38)}
              />
            )}
          </g>
        );
      })}

      {/* Lock icon */}
      <g transform="translate(342, 60)">
        <rect x="0" y="18" width="38" height="32" rx="5"
          fill={surf} stroke={amber} strokeWidth="1.5" />
        <path d="M6,18 V9 a13,13 0 0,1 26,0 V18"
          fill="none" stroke={amber} strokeWidth="1.5" />
        <circle cx="19" cy="34" r="5" fill="none" stroke={amber} strokeWidth="1.5" />
        <line x1="19" y1="39" x2="19" y2="44" stroke={amber} strokeWidth="1.5" />
      </g>

      {/* Encode / Decode */}
      <rect x="46" y="182" width="308" height="22" rx="11" fill={surf} stroke={border} strokeWidth="1" />
      <text x="130" y="197" textAnchor="middle"
        fill={amber} fontSize="9" fontFamily="monospace" fontWeight="700">ENCODE</text>
      <text x="200" y="197" textAnchor="middle" fill={dim} fontSize="10">↔</text>
      <text x="270" y="197" textAnchor="middle"
        fill={warm} fontSize="9" fontFamily="monospace" fontWeight="700">DECODE</text>

      {/* Hidden msg reveal */}
      <motion.text x="52" y="176" fill={ambrBr} fontSize="7.5" fontFamily="monospace" fontStyle="italic"
        animate={{ opacity: [0, 0.8, 0] }} transition={loop(4.5, 1.8)}>
        Hidden: "secret message inside pixels"
      </motion.text>

      {/* Live badge */}
      <rect x="314" y="28" width="72" height="20" rx="10" fill="none" stroke={green} strokeWidth="1" />
      <motion.circle cx="325" cy="38" r="3.5" fill={green}
        animate={{ opacity: [1, 0.3] }} transition={bounce(1)} />
      <text x="352" y="42" textAnchor="middle" fill={green} fontSize="8" fontFamily="monospace" fontWeight="600">LIVE</text>

      <text x="200" y="213" textAnchor="middle" fill={border}
        fontSize="7.5" fontFamily="monospace">Next.js · TypeScript · LSB Pixel Manipulation</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 8. NOTE-FLOW · COLLABORATIVE EDITOR
// ══════════════════════════════════════════════════════════════════════
export function NoteFlowThumb() {
  const cursors = [
    { x: 258, y: 116, c: "#4080e8", name: "Pritesh" },
    { x: 182, y: 138, c: warm,      name: "Viraj"   },
    { x: 232, y: 150, c: purple,    name: "User3"   },
  ];

  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">NOTE-FLOW · COLLABORATIVE EDITOR</text>

      {/* Document frame */}
      <rect x="78" y="30" width="244" height="156" rx="7" fill={surf} stroke={border} strokeWidth="1.5" />
      {/* Title bar */}
      <rect x="78" y="30" width="244" height="22" rx="7" fill={border} />
      <rect x="78" y="42" width="244" height="10" fill={border} />
      <circle cx="93"  cy="41" r="4.5" fill={red}   opacity="0.75" />
      <circle cx="107" cy="41" r="4.5" fill={ambrBr} opacity="0.75" />
      <circle cx="121" cy="41" r="4.5" fill={green}  opacity="0.75" />
      <text x="200" y="45" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">notes.md</text>

      {/* Text line stubs */}
      <rect x="96" y="62" width="178" height="8" rx="2" fill={ink} opacity="0.7" />
      <rect x="96" y="78" width="145" height="7" rx="2" fill={dim} opacity="0.4" />
      <rect x="96" y="93" width="160" height="7" rx="2" fill={dim} opacity="0.4" />
      <rect x="96" y="108" width="120" height="7" rx="2" fill={dim} opacity="0.35" />
      <rect x="96" y="123" width="88"  height="7" rx="2" fill={amber} opacity="0.5" />

      {/* Typing cursor at the end of last line */}
      <motion.rect x="184" y="122" width="2" height="9" rx="1" fill={amber}
        animate={{ opacity: [1, 0] }} transition={bounce(0.85)} />

      {/* Cursors */}
      {cursors.map((c, i) => (
        <motion.g key={i}
          animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
          transition={bounce(1.8, i * 0.65)}>
          <polygon points={`${c.x},${c.y} ${c.x+5},${c.y+13} ${c.x+2},${c.y+10}`} fill={c.c} />
          <rect x={c.x + 6} y={c.y + 9} width={c.name.length * 5.2 + 6} height="13" rx="4" fill={c.c} opacity="0.88" />
          <text x={c.x + 9} y={c.y + 20} fill={bg} fontSize="7" fontFamily="monospace" fontWeight="600">{c.name}</text>
        </motion.g>
      ))}

      {/* Online indicator */}
      <rect x="96" y="162" width="78" height="16" rx="8" fill="none" stroke={green} strokeWidth="0.9" />
      <motion.circle cx="108" cy="170" r="3" fill={green}
        animate={{ opacity: [1, 0.3] }} transition={bounce(1)} />
      <text x="138" y="174" textAnchor="middle" fill={green} fontSize="8" fontFamily="monospace">3 online</text>

      <text x="270" y="174" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">Firebase · Liveblocks</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">Next.js · TypeScript · Firebase · Liveblocks</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 9. AI STREAMING CHATBOT
// ══════════════════════════════════════════════════════════════════════
export function ChatbotThumb() {
  return (
    <Base>
      <text x="200" y="18" textAnchor="middle" fill={dim}
        fontSize="9" fontFamily="monospace" letterSpacing="2">AI STREAMING CHATBOT</text>

      {/* Chat window */}
      <rect x="55" y="26" width="290" height="174" rx="9" fill={surf} stroke={border} strokeWidth="1.3" />
      {/* Header */}
      <rect x="55" y="26" width="290" height="22" rx="9" fill={border} />
      <rect x="55" y="37" width="290" height="11" fill={border} />
      <circle cx="72"  cy="37" r="4" fill={red}   opacity="0.7" />
      <circle cx="85"  cy="37" r="4" fill={ambrBr} opacity="0.7" />
      <circle cx="98"  cy="37" r="4" fill={green}  opacity="0.7" />
      <text x="200" y="41" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">AI Chatbot</text>

      {/* User message bubble (right) */}
      <rect x="168" y="52" width="162" height="36" rx="12"
        fill={border} stroke="none" />
      <text x="249" y="67" textAnchor="middle" fill={ink} fontSize="8.5" fontFamily="monospace">How does async/await</text>
      <text x="249" y="80" textAnchor="middle" fill={ink} fontSize="8.5" fontFamily="monospace">work in Next.js?</text>

      {/* AI message bubble (left) — with code */}
      <rect x="65" y="97" width="215" height="74" rx="12"
        fill={bg} stroke={amber} strokeWidth="1" />
      {/* Code block */}
      <rect x="73" y="105" width="199" height="58" rx="4" fill={surf} />
      <text x="82" y="118" fill={purple}  fontSize="7.5" fontFamily="monospace">async function </text>
      <text x="154" y="118" fill={blue}    fontSize="7.5" fontFamily="monospace">fetchData</text>
      <text x="197" y="118" fill={ink}     fontSize="7.5" fontFamily="monospace">() {"{"}</text>
      <text x="82" y="131" fill={amber}   fontSize="7.5" fontFamily="monospace">  const res = </text>
      <text x="153" y="131" fill={purple}  fontSize="7.5" fontFamily="monospace">await </text>
      <text x="185" y="131" fill={blue}    fontSize="7.5" fontFamily="monospace">fetch</text>
      <text x="207" y="131" fill={ink}     fontSize="7.5" fontFamily="monospace">(url);</text>
      <text x="82" y="144" fill={warm}    fontSize="7.5" fontFamily="monospace">  return res.</text>
      <text x="147" y="144" fill={green}   fontSize="7.5" fontFamily="monospace">json</text>
      <text x="170" y="144" fill={ink}     fontSize="7.5" fontFamily="monospace">(); {"// ✓"}</text>
      <text x="82" y="157" fill={ink}      fontSize="7.5" fontFamily="monospace">{"}"}</text>

      {/* Typing dots */}
      <rect x="65" y="180" width="56" height="22" rx="11" fill={bg} stroke={border} strokeWidth="0.9" />
      {[0, 1, 2].map(i => (
        <motion.circle key={i} cx={78 + i * 13} r="3.5" fill={dim}
          animate={{ cy: [191, 186, 191] }}
          transition={bounce(0.7, i * 0.22)}
        />
      ))}

      {/* OpenAI swirl icon */}
      <g transform="translate(306, 174)" opacity="0.65">
        <circle cx="12" cy="12" r="11" fill="none" stroke={amber} strokeWidth="1.2" />
        <path d="M8,8 C12,3 19,6 17,11 C15,15 8,14 10,19 C12,23 19,21 19,16"
          fill="none" stroke={amber} strokeWidth="1.2" />
      </g>

      <text x="200" y="213" textAnchor="middle" fill={border}
        fontSize="7.5" fontFamily="monospace">Next.js · OpenAI · Vercel AI SDK · shadcn-chat</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 10. PIXEL AURA · VS CODE THEME
// ══════════════════════════════════════════════════════════════════════
export function PixelAuraThumb() {
  // code lines: [parts array of {text, color}]
  const lines = [
    [{ t: "const ",    c: purple }, { t: "handler ",    c: blue   }, { t: "= async (", c: ink    }, { t: "req",        c: warm   }, { t: ") => {", c: ink    }],
    [{ t: "  if ",     c: purple }, { t: "(!",          c: ink    }, { t: "req.auth",  c: red    }, { t: ") {",        c: ink    }],
    [{ t: "    ",      c: dim    }, { t: "// 🔒 Auth guard", c: "#5a7f50" }],
    [{ t: "  const ",  c: purple }, { t: "data",        c: amber  }, { t: " = await ", c: purple }, { t: "db.get(id)", c: blue   }],
    [{ t: "  return ", c: purple }, { t: "{ ",          c: ink    }, { t: "data",      c: amber  }, { t: ", ok: ",    c: ink    }, { t: "true", c: green }, { t: " }", c: ink }],
    [{ t: "}",         c: ink    }],
  ];

  return (
    <Base>
      {/* "Pixel Aura Theme" label */}
      <text x="200" y="18" textAnchor="middle" fill={ambrBr}
        fontSize="10" fontFamily="monospace" fontWeight="700" letterSpacing="1">PIXEL AURA THEME</text>

      {/* Editor window */}
      <rect x="38" y="26" width="324" height="170" rx="9" fill={surf} stroke={border} strokeWidth="1.5" />
      {/* Title bar */}
      <rect x="38" y="26" width="324" height="22" rx="9" fill={border} />
      <rect x="38" y="37" width="324" height="11" fill={border} />
      <circle cx="55"  cy="37" r="4.5" fill={red}   opacity="0.75" />
      <circle cx="69"  cy="37" r="4.5" fill={ambrBr} opacity="0.75" />
      <circle cx="83"  cy="37" r="4.5" fill={green}  opacity="0.75" />
      {/* Tab */}
      <rect x="98" y="30" width="116" height="14" rx="3" fill={surf} />
      <text x="156" y="41" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">route.ts</text>

      {/* Line numbers */}
      {lines.map((_, i) => (
        <text key={i} x="55" y={63 + i * 17}
          fill={border} fontSize="9" fontFamily="monospace" textAnchor="middle">{i + 1}</text>
      ))}

      {/* Syntax-highlighted code */}
      {lines.map((parts, li) => {
        let xOff = 66;
        return (
          <g key={li}>
            {parts.map((p, pi) => {
              const el = (
                <text key={pi} x={xOff} y={63 + li * 17}
                  fill={p.c} fontSize="9" fontFamily="monospace">{p.t}</text>
              );
              xOff += p.t.length * 5.4;
              return el;
            })}
          </g>
        );
      })}

      {/* Blinking cursor */}
      <motion.rect x="66" y="175" width="2" height="11" rx="1" fill={amber}
        animate={{ opacity: [1, 0] }} transition={bounce(0.9)} />

      {/* Status bar */}
      <rect x="38" y="186" width="324" height="10" rx="4" fill={amber} opacity="0.65" />
      <text x="48" y="194" fill={bg} fontSize="6.5" fontFamily="monospace" fontWeight="600">
        TypeScript · ln 7 · Pixel Aura · UTF-8
      </text>

      {/* VS Code Marketplace badge */}
      <rect x="244" y="28" width="110" height="14" rx="7"
        fill="none" stroke={blue} strokeWidth="0.9" />
      <text x="299" y="38" textAnchor="middle"
        fill={blue} fontSize="7" fontFamily="monospace">VS Code Marketplace</text>

      <text x="200" y="212" textAnchor="middle" fill={border}
        fontSize="8" fontFamily="monospace">VS Code Extension · Aesthetic Theme · Published</text>
    </Base>
  );
}

// ── Registry ──────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════
// GPU INTERFERENCE RECOVERY  (HiPC 2026 paper)
// ══════════════════════════════════════════════════════════════════════
function gpuTrace() {
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5);
  const pts = [];
  for (let x = 40; x <= 360; x += 4) {
    let y = 150 + rnd() * 3;
    if (x >= 130 && x < 250) y = 150 - 78 + rnd() * 9;
    else if (x >= 250 && x < 266) y = 150 - 78 * Math.exp(-(x - 250) / 4) + rnd() * 3;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}
const GPU_TRACE = gpuTrace();
const GPU_CYCLE = 6;

export function GpuRecoveryThumb() {
  const sms = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) sms.push({ x: 24 + c * 11, y: 32 + r * 11, k: r * 3 + c });
  return (
    <Base>
      <text x="200" y="20" textAnchor="middle" fill={dim} fontSize="9" fontFamily="monospace" letterSpacing="2.5" fontWeight="700">
        GPU INTERFERENCE RECOVERY · CUDA
      </text>

      {/* interference window */}
      <motion.rect x="130" y="40" width="120" height="130" fill={warm}
        animate={{ opacity: [0, 0, 0.16, 0.16, 0, 0] }}
        transition={{ duration: GPU_CYCLE, times: [0, 0.18, 0.28, 0.5, 0.58, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="190" y="54" textAnchor="middle" fill={warm} fontSize="7.5" fontFamily="monospace" fontWeight="700">NEIGHBOUR ON</text>

      {/* axes */}
      <line x1="40" y1="150" x2="360" y2="150" stroke={dim} strokeWidth="0.8" strokeDasharray="3 5" opacity="0.7" />
      <line x1="40" y1="72" x2="360" y2="72" stroke={border} strokeWidth="0.8" />
      <text x="36" y="153" textAnchor="end" fill={dim} fontSize="7" fontFamily="monospace">1.0x</text>
      <text x="36" y="75" textAnchor="end" fill={dim} fontSize="7" fontFamily="monospace">2.7x</text>
      <text x="360" y="166" textAnchor="end" fill={dim} fontSize="7" fontFamily="monospace">time</text>

      {/* latency trace, drawn then reset */}
      <motion.path d={GPU_TRACE} fill="none" stroke={amber} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: GPU_CYCLE, times: [0, 0.6, 0.92, 1], repeat: Infinity, ease: "linear" }}
      />
      <motion.circle r="3.6" fill={ambrBr}
        style={{ offsetPath: `path('${GPU_TRACE}')` }}
        animate={{ offsetDistance: ["0%", "100%", "100%"], opacity: [1, 1, 0] }}
        transition={{ duration: GPU_CYCLE, times: [0, 0.6, 0.8], repeat: Infinity, ease: "linear" }}
      />

      {/* recovery callout */}
      <motion.g
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{ duration: GPU_CYCLE, times: [0, 0.52, 0.6, 0.9, 0.96, 1], repeat: Infinity }}
      >
        <line x1="268" y1="140" x2="268" y2="112" stroke={green} strokeWidth="1" />
        <text x="274" y="110" fill={green} fontSize="8" fontFamily="monospace" fontWeight="700">RECOVERS IN µs</text>
      </motion.g>

      {/* GPU die: streaming multiprocessors flicker harder while the neighbour runs */}
      <rect x="18" y="26" width="42" height="42" rx="4" fill="none" stroke={border} strokeWidth="1.2" />
      {sms.map((c) => (
        <motion.rect key={c.k} x={c.x} y={c.y} width="8" height="8" rx="1.5" fill={amber}
          animate={{ opacity: [0.2, 0.95, 0.2] }}
          transition={{ duration: 1.1 + (c.k % 4) * 0.35, delay: c.k * 0.12, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <text x="200" y="196" textAnchor="middle" fill={dim} fontSize="8" fontFamily="monospace">
        compute 2.7x · L2 cache 1.8x · baseline within tens of µs
      </text>
      <text x="200" y="212" textAnchor="middle" fill={border} fontSize="8" fontFamily="monospace">
        CUDA · C++ · RTX 4060 · Tesla T4 · IEEE HiPC 2026
      </text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// CLOUDINFRALAB: OPENSTACK ON THREE NODES
// ══════════════════════════════════════════════════════════════════════
export function CloudInfraThumb() {
  const links = [
    { a: [172, 84], b: [92, 128], c: amber, d: 2.6, delay: 0 },
    { a: [228, 84], b: [308, 128], c: teal, d: 2.6, delay: 0.9 },
    { a: [138, 158], b: [262, 158], c: blue, d: 2.2, delay: 1.7 },
  ];
  return (
    <Base>
      <text x="200" y="20" textAnchor="middle" fill={dim} fontSize="9" fontFamily="monospace" letterSpacing="2.5" fontWeight="700">
        CLOUDINFRALAB · OPENSTACK ON RHEL
      </text>

      {/* links with flowing dashes */}
      {links.map((l, i) => (
        <g key={i}>
          <motion.line x1={l.a[0]} y1={l.a[1]} x2={l.b[0]} y2={l.b[1]} stroke={l.c} strokeWidth="1.2" strokeDasharray="4 6" opacity="0.55"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle r="3.2" fill={l.c}
            animate={{ cx: [l.a[0], l.b[0]], cy: [l.a[1], l.b[1]], opacity: [0, 1, 1, 0] }}
            transition={{ duration: l.d, delay: l.delay, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.85, 1] }}
          />
        </g>
      ))}
      <text x="200" y="150" textAnchor="middle" fill={blue} fontSize="7" fontFamily="monospace" opacity="0.8">NEUTRON</text>

      {/* controller */}
      <rect x="145" y="38" width="110" height="46" rx="6" fill={surf} stroke={amber} strokeWidth="1.3" />
      <text x="200" y="56" textAnchor="middle" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">CONTROLLER</text>
      <text x="200" y="71" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">Keystone · Horizon</text>
      <motion.rect x="145" y="38" width="110" height="46" rx="6" fill="none" stroke={amber} strokeWidth="1.3"
        animate={{ opacity: [0.5, 0], scale: [1, 1.12] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />

      {/* compute + VMs launching */}
      <rect x="30" y="128" width="108" height="60" rx="6" fill={surf} stroke={ambrBr} strokeWidth="1.3" />
      <text x="84" y="143" textAnchor="middle" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">COMPUTE</text>
      {[0, 1, 2].map((k) => (
        <motion.rect key={k} x={44 + k * 30} y={152} width="22" height="26" rx="3" fill={ambrBr}
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 6, delay: 0.6 + k * 1.3, repeat: Infinity, times: [0, 0.12, 0.8, 1], ease: "easeOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        />
      ))}
      <text x="84" y="199" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">Nova · virtual machines</text>

      {/* storage */}
      <rect x="262" y="128" width="108" height="60" rx="6" fill={surf} stroke={teal} strokeWidth="1.3" />
      <text x="316" y="143" textAnchor="middle" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">STORAGE</text>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x="276" y={151 + k * 10} width="80" height="7" rx="2" fill={border} />
          <motion.rect x="276" y={151 + k * 10} height="7" rx="2" fill={teal}
            animate={{ width: [10, 20 + k * 22, 10] }}
            transition={{ duration: 3 + k * 0.7, repeat: Infinity, ease: "easeInOut", delay: k * 0.4 }}
          />
        </g>
      ))}
      <text x="316" y="199" textAnchor="middle" fill={dim} fontSize="7.5" fontFamily="monospace">Glance · Cinder</text>

      <text x="200" y="214" textAnchor="middle" fill={border} fontSize="8" fontFamily="monospace">RHEL 9.2 · DevStack · Docker · Kubernetes</text>
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QAOA QUANTUM COMPUTING RESEARCH
// ══════════════════════════════════════════════════════════════════════
export function QaoaThumb() {
  const wires = [58, 88, 118];
  const gates = [
    { x: 70, label: "H", all: true },
    { x: 130, label: "Rz", all: true },
    { x: 250, label: "Rx", all: true },
  ];
  const bars = [0.5, 0.9, 0.3, 0.75, 0.45, 0.95, 0.35, 0.6];
  return (
    <Base>
      <text x="200" y="20" textAnchor="middle" fill={dim} fontSize="9" fontFamily="monospace" letterSpacing="2.5" fontWeight="700">
        QAOA · QUANTUM OPTIMIZATION
      </text>
      {wires.map((y, i) => (
        <g key={y}>
          <text x="30" y={y + 3} textAnchor="end" fill={dim} fontSize="8" fontFamily="monospace">q{i}</text>
          <line x1="40" y1={y} x2="360" y2={y} stroke={border} strokeWidth="1.2" />
          <motion.circle r="3" fill={ambrBr} cy={y}
            animate={{ cx: [40, 360], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.4, delay: i * 0.35, repeat: Infinity, ease: "linear", times: [0, 0.05, 0.95, 1] }}
          />
        </g>
      ))}
      {gates.map((g) =>
        wires.map((y, i) => (
          <motion.g key={g.x + "-" + y}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 3.4, delay: i * 0.35 + ((g.x - 40) / 320) * 3.4, repeat: Infinity, ease: "easeOut", times: [0, 0.04, 0.2] }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect x={g.x - 11} y={y - 11} width="22" height="22" rx="4" fill={surf} stroke={amber} strokeWidth="1.2" />
            <text x={g.x} y={y + 3.5} textAnchor="middle" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">{g.label}</text>
          </motion.g>
        ))
      )}
      {/* CNOT chain */}
      {[[58, 88, 190], [88, 118, 214]].map(([a, b, x]) => (
        <g key={x}>
          <line x1={x} y1={a} x2={x} y2={b} stroke={warm} strokeWidth="1.4" />
          <circle cx={x} cy={a} r="3.5" fill={warm} />
          <circle cx={x} cy={b} r="7" fill={bg} stroke={warm} strokeWidth="1.4" />
          <line x1={x - 7} y1={b} x2={x + 7} y2={b} stroke={warm} strokeWidth="1.4" />
          <line x1={x} y1={b - 7} x2={x} y2={b + 7} stroke={warm} strokeWidth="1.4" />
        </g>
      ))}
      {/* measurement */}
      {wires.map((y) => (
        <g key={"m" + y}>
          <rect x="326" y={y - 11} width="24" height="22" rx="4" fill={surf} stroke={teal} strokeWidth="1.2" />
          <path d={`M331,${y + 5} a7,7 0 0 1 14,0`} fill="none" stroke={teal} strokeWidth="1.2" />
          <line x1="338" y1={y + 5} x2="343" y2={y - 4} stroke={teal} strokeWidth="1.2" />
        </g>
      ))}
      {/* outcome histogram */}
      {bars.map((h, i) => (
        <motion.rect key={i} x={70 + i * 34} y={158} width="22" height="46" rx="2" fill={i === 5 ? ambrBr : amber} opacity={i === 5 ? 1 : 0.55}
          animate={{ scaleY: [h * 0.5, h, h * 0.5] }}
          transition={{ duration: 2.4 + (i % 3) * 0.5, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        />
      ))}
    </Base>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QUICKSHELL RICE (QML DESKTOP SHELL)
// ══════════════════════════════════════════════════════════════════════
export function QuickshellThumb() {
  return (
    <Base>
      <defs>
        <linearGradient id="qs-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={surf} />
          <stop offset="100%" stopColor={bg} />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#qs-wall)" />

      {/* top bar */}
      <rect x="10" y="10" width="380" height="24" rx="12" fill={bg} stroke={border} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={30 + k * 16} cy={22} r="3.2" fill={border} />
      ))}
      <motion.rect y="17" width="14" height="10" rx="5" fill={amber}
        animate={{ x: [23, 39, 55, 71, 87, 23] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
      />
      <text x="200" y="26" textAnchor="middle" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">21:04</text>
      <g transform="translate(330,22)">
        {[0, 1, 2].map((k) => (
          <motion.rect key={k} x={k * 5} y={-2 - k * 2} width="3" height={4 + k * 2} rx="1" fill={teal}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: k * 0.25, repeat: Infinity }}
          />
        ))}
        <rect x="26" y="-5" width="22" height="10" rx="2.5" fill="none" stroke={ink} strokeWidth="1" />
        <rect x="28" y="-3" width="14" height="6" rx="1" fill={green} />
      </g>

      {/* cpu / ram widget */}
      <rect x="22" y="52" width="150" height="70" rx="10" fill={bg} stroke={border} strokeWidth="1" />
      {[["CPU", amber, 1], ["RAM", teal, 1.7]].map(([label, c, d], k) => (
        <g key={label}>
          <text x="36" y={78 + k * 24} fill={dim} fontSize="8" fontFamily="monospace">{label}</text>
          <rect x="66" y={71 + k * 24} width="90" height="8" rx="4" fill={border} />
          <motion.rect x="66" y={71 + k * 24} height="8" rx="4" fill={c}
            animate={{ width: [18, 70, 36, 82, 18] }}
            transition={{ duration: 6 * d, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* now playing */}
      <rect x="188" y="52" width="190" height="70" rx="10" fill={bg} stroke={border} strokeWidth="1" />
      <rect x="198" y="62" width="50" height="50" rx="8" fill={surf} stroke={border} />
      {[0, 1, 2, 3, 4].map((k) => (
        <motion.rect key={k} x={206 + k * 7} y={84} width="4" height="26" rx="2" fill={ambrBr}
          animate={{ scaleY: [0.25, 1, 0.4, 0.8, 0.25] }}
          transition={{ duration: 1.4 + k * 0.18, repeat: Infinity, ease: "easeInOut", delay: k * 0.1 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        />
      ))}
      <text x="258" y="80" fill={ink} fontSize="9" fontFamily="monospace" fontWeight="700">Now playing</text>
      <rect x="258" y="90" width="100" height="4" rx="2" fill={border} />
      <motion.rect x="258" y="90" height="4" rx="2" fill={amber}
        animate={{ width: [4, 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* launcher */}
      <rect x="22" y="140" width="356" height="34" rx="12" fill={bg} stroke={border} strokeWidth="1" />
      <text x="40" y="161" fill={dim} fontSize="9" fontFamily="monospace">search apps</text>
      <motion.rect x="104" y="150" width="1.6" height="14" fill={amber}
        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />

      <text x="200" y="202" textAnchor="middle" fill={dim} fontSize="8" fontFamily="monospace" letterSpacing="2">QUICKSHELL · QML · ARCH LINUX</text>
      <text x="200" y="214" textAnchor="middle" fill={border} fontSize="8" fontFamily="monospace">a desktop shell, written by hand</text>
    </Base>
  );
}

export const THUMBS = {
  thermal:     ThermalK8sThumb,
  synflood:    SynFloodThumb,
  blockchain:  BlockchainThumb,
  mindwebs:    MindWebsThumb,
  gentales:    GentalesThumb,
  plantid:     PlantIDThumb,
  steganosafe: SteganosafeThumb,
  noteflow:    NoteFlowThumb,
  chatbot:     ChatbotThumb,
  pixelaura:   PixelAuraThumb,
  gpu:         GpuRecoveryThumb,
  cloudinfra:  CloudInfraThumb,
  qaoa:        QaoaThumb,
  quickshell:  QuickshellThumb,
};
