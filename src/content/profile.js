// ─────────────────────────────────────────────────────────────────────────
// THE ONE FILE YOU EDIT BY HAND.
//
// Synced automatically (no edits needed):
//   • Projects + repo count  ← GitHub public API   (src/lib/github.js)
//   • Blog posts + post count ← Hashnode RSS feed  (src/lib/hashnode.js)
//
// Everything below is content GitHub/Hashnode can't provide. LinkedIn has no
// free public API, so anything that lives there (experience, certifications,
// follower count, post highlights) is updated here.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Viraj Nalbalwar",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://viraj-verse.vercel.app",
  title: "Viraj Nalbalwar — Cloud, Kubernetes & Systems Engineer",
  description:
    "Viraj Nalbalwar is a final-year Computer Engineering student at COEP Technological University working on cloud infrastructure, Kubernetes scheduling, GPU performance research and Linux. Ex-Mastercard, ex-Jio, RHCSA.",
  tagline: "The most interesting things in computing happen when a system is under pressure.",
  location: "Pune, Maharashtra, India",
  githubUser: "VNalbalwar",
  hashnodeHost: "viraj-verse.hashnode.dev",
  resume: "/resumes/Viraj-Nalbalwar-Resume.pdf",
};

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/VNalbalwar" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/viraj-nalbalwar-895365255/" },
  { id: "hashnode", label: "Blog on Hashnode", href: "https://viraj-verse.hashnode.dev/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/viraj_nalbalwar/" },
];

// Manual numbers (LinkedIn can't be synced). Update whenever you feel like it.
export const manualStats = {
  linkedinFollowers: 4349,
  papersAccepted: 2,
  // Used only if the GitHub / Hashnode fetch fails at build time.
  fallbackRepos: 28,
  fallbackPosts: 9,
};

export const about = [
  "Yo, I'm Viraj. I like the part of computing most people never see: how clouds share hardware, why performance dips and then recovers, and how tiny decisions snowball at scale.",
  "That curiosity has dragged me through cloud engineering at Jio, enterprise data migration at Mastercard, and Kubernetes and GPU research that made it to international HPC venues. Somewhere along the way I also collected a Red Hat certification and a lot of deliberately broken Linux machines I'm weirdly fond of.",
  "Off the keyboard I'm usually ricing my Arch setup or solving a cube. Turning chaos into order one algorithm at a time is suspiciously similar to debugging.",
];

// ── Journey: education and experience, oldest first ───────────────────────
export const journey = [
  {
    stage: "Foundations",
    years: "2019 – 2021",
    line: "Curiosity doing most of the work.",
    entries: [
      {
        title: "Picked up a cube and never put it down",
        org: "Speedcubing",
        when: "2019 – forever",
        points: ["CFOP and Roux, finger tricks, ZBLL and COLL, and WCA competitions."],
      },
      {
        title: "SSC, 97.40%",
        org: "S.S. Nikam English School, Lonere",
        when: "2021",
        points: [],
      },
    ],
  },
  {
    stage: "Diploma years",
    years: "2021 – 2024",
    line: "First real code, first internship, first blog.",
    entries: [
      {
        title: "Diploma in Computer Engineering",
        org: "Dr. Babasaheb Ambedkar Technological University, Lonere",
        when: "2021 – 2024",
        points: ["CGPA 9.92, Maharashtra State Rank 2, Gold Medalist."],
      },
      {
        title: "Responsive Web Design Intern",
        org: "SEED Infotech Ltd., Pune",
        when: "Jun – Jul 2023",
        points: [
          "Built production web interfaces with Next.js, React and Tailwind CSS.",
          "Git, code reviews and Lighthouse audits for sub-second page loads.",
        ],
      },
      {
        title: "Started writing about Linux",
        org: "Hashnode",
        when: "Jul 2023",
        points: ["A beginner-to-shell-scripting series, written while learning it."],
      },
    ],
  },
  {
    stage: "COEP and cloud",
    years: "2024 – 2025",
    line: "Real infrastructure, real pressure.",
    entries: [
      {
        title: "B.Tech, Computer Engineering",
        org: "COEP Technological University, Pune",
        when: "2024 – 2027",
        points: ["CGPA 8.74. Member of CSI COEP."],
      },
      {
        title: "Cloud Intern",
        org: "Jio Platforms, Navi Mumbai",
        when: "Jun – Jul 2025",
        points: [
          "Stood up a multi-node OpenStack cloud (controller, compute, storage) on RHEL and Ubuntu.",
          "Configured Keystone, Nova, Neutron, Glance and Cinder end to end.",
          "Ran Docker and Kubernetes workloads with Prometheus and Grafana monitoring.",
        ],
      },
    ],
  },
  {
    stage: "The big year",
    years: "2026",
    line: "Research, Mastercard and a Red Hat cert, all at once.",
    entries: [
      {
        title: "Software Engineer Intern",
        org: "Mastercard, Pune",
        when: "May – Jul 2026",
        points: [
          "Built Apache Spark and Spring Boot services migrating enterprise financial data from DB2 to Oracle.",
          "REST-triggered batch workflows with partitioned JDBC reads and audit metadata.",
          "Thread-safe execution controls so long-running loads never collide.",
        ],
      },
      {
        title: "Paper presented at ISC High Performance 2026",
        org: "EESP Workshop, Hamburg, Germany",
        when: "Jun 2026",
        points: ["Thermal-Aware Core-Level Scheduling for Kubernetes Workloads."],
      },
      {
        title: "Red Hat Certified System Administrator",
        org: "Red Hat",
        when: "Aug 2026",
        points: ["Plus NVIDIA Deep Learning Institute courses on deep learning, data science and LLM apps."],
      },
      {
        title: "Paper accepted at IEEE HiPC 2026",
        org: "Student Research Symposium, Bengaluru",
        when: "Dec 2026",
        points: ["Characterizing Performance Recovery After Transient GPU Resource Interference."],
      },
    ],
  },
];

// ── Research ───────────────────────────────────────────────────────────────
export const research = [
  {
    id: "gpu",
    title: "Characterizing Performance Recovery After Transient GPU Resource Interference",
    venue: "IEEE HiPC 2026, Student Research Symposium",
    place: "Bengaluru, India · Dec 16–19, 2026",
    status: "Accepted",
    question:
      "When a noisy neighbour stops hammering a shared GPU, does your workload bounce back instantly, or does the damage linger?",
    findings: [
      { value: "2.7×", label: "slowdown under compute interference" },
      { value: "1.8×", label: "slowdown under L2 cache pressure" },
      { value: "µs", label: "back to baseline within tens of microseconds" },
    ],
    stack: ["CUDA", "C++", "RTX 4060", "Tesla T4", "Holm-adjusted stats"],
    repo: "https://github.com/VNalbalwar/gpu-recovery-experiment",
  },
  {
    id: "thermal",
    title: "Thermal-Aware Core-Level Scheduling for Kubernetes Workloads",
    venue: "EESP Workshop at ISC High Performance 2026",
    place: "Hamburg, Germany · Springer LNCS",
    status: "Presented",
    question:
      "The busiest core might be the most capable one, but is it the right choice right now? A scheduler that reads per-core temperature before it places a pod.",
    findings: [
      { value: "Go", label: "custom Kubernetes scheduler plugin" },
      { value: "v2", label: "cgroups CPU pinning at core level" },
      { value: "EMA", label: "adaptive phase tracks thermal history per node" },
    ],
    stack: ["Kubernetes", "Go", "DaemonSets", "cgroups v2", "Linux"],
    repo: "https://github.com/VNalbalwar/static-thermal-aware-scheduler-phase-1",
  },
];

// ── Skills ─────────────────────────────────────────────────────────────────
// [name, where it was used]
export const skills = [
  {
    name: "Cloud & Infra",
    items: [
      ["Kubernetes", "Custom thermal-aware scheduler"],
      ["Docker", "Jio workloads, this site"],
      ["OpenStack", "Multi-node cloud at Jio"],
      ["OpenShift", "Jio CloudOps"],
      ["Prometheus", "Cluster monitoring"],
      ["Grafana", "Dashboards at Jio"],
      ["DevStack", "CloudInfraLab"],
      ["HPE iLO", "Bare-metal management"],
    ],
  },
  {
    name: "Linux & Systems",
    items: [
      ["RHEL", "RHCSA certified"],
      ["Arch Linux", "Daily driver, btw"],
      ["Bash", "Hashnode series"],
      ["systemd", "Services and units"],
      ["cgroups v2", "Core-level CPU pinning"],
      ["SELinux", "Learned the hard way"],
      ["LVM", "Storage that survives reboots"],
      ["SDN / Mininet", "SYN flood detection"],
    ],
  },
  {
    name: "Languages",
    items: [
      ["Go", "Kubernetes scheduler"],
      ["Java", "Spring Boot at Mastercard"],
      ["Python", "ML pipelines, Scapy"],
      ["TypeScript", "Most of my web apps"],
      ["C++", "CUDA benchmarks, DSA"],
      ["CUDA", "GPU microbenchmarks"],
      ["SQL", "Oracle and DB2 migration"],
      ["C", "Graph algorithm library"],
    ],
  },
  {
    name: "Web",
    items: [
      ["Next.js", "This site, SteganoSafe"],
      ["React", "Since SEED Infotech"],
      ["Tailwind CSS", "Every UI I ship"],
      ["Motion", "The animations here"],
      ["Spring Boot", "Migration services"],
      ["Node.js", "APIs and tooling"],
      ["Flask", "MindWebs NLP app"],
      ["Firebase", "Note-Flow auth"],
    ],
  },
  {
    name: "Data & ML",
    items: [
      ["Apache Spark", "DB2 to Oracle at Mastercard"],
      ["Perf Analysis", "GPU latency research"],
      ["Deep Learning", "BiLSTM failure prediction"],
      ["XGBoost", "Hard-drive failure ensemble"],
      ["LightGBM", "Hard-drive failure ensemble"],
      ["Generative AI", "Plant Identifier, Gentales"],
      ["Statistics", "Holm-adjusted trial tests"],
      ["Scapy", "Packet crafting for SDN tests"],
    ],
  },
];

// ── Projects ───────────────────────────────────────────────────────────────
// Every public, non-fork GitHub repo shows up automatically.
// This map only *enriches* repos (nicer title, description, tags, a custom
// animated thumbnail) and pins the featured ones to the top, in this order.
// A brand-new repo with no entry here still appears, with a generated
// patterned thumbnail. Tip: give repos a description and topics on GitHub.
export const projectOverrides = {
  "gpu-recovery-experiment": {
    title: "GPU Interference Recovery",
    desc: "CUDA microbenchmarks that stress compute, L2 cache and memory, then measure how fast a victim kernel recovers once the noisy neighbour stops. The code behind my HiPC 2026 paper.",
    tech: ["CUDA", "C++", "Research"],
    featured: true,
  },
  "static-thermal-aware-scheduler-phase-1": {
    title: "Thermal-Aware Core Scheduler",
    desc: "Custom Kubernetes scheduler in Go that places pods on the coolest CPU cores, with a DaemonSet thermal exporter and cgroups v2 pinning. Presented at ISC 2026.",
    tech: ["Go", "Kubernetes", "Research"],
    thumbKey: "thermal",
    featured: true,
  },
  "CN-Mini-Project-MAC-Based-SYN-Flood-Detection": {
    title: "MAC-Based SYN Flood Detection",
    desc: "Detects and mitigates TCP SYN floods in an SDN using MAC tracking and cuckoo hashing on Mininet and Open vSwitch, with a port-diversity tracker and an adaptive baseline added on top of the original paper.",
    tech: ["Python", "Security", "SDN"],
    thumbKey: "synflood",
    featured: true,
  },
  "no-code-steganosafe": {
    title: "SteganoSafe",
    desc: "Hide a secret message inside an image and read it back, entirely in the browser, using LSB steganography and lossless PNG export.",
    tech: ["Next.js", "TypeScript", "Security"],
    thumbKey: "steganosafe",
    featured: true,
  },
  "openstack-setup-three-nodes": {
    title: "CloudInfraLab: OpenStack on Three Nodes",
    desc: "A full private-cloud lab built by hand on RHEL: identity, images, compute, networking and block storage across controller, compute and storage nodes.",
    tech: ["OpenStack", "RHEL", "Cloud"],
    featured: true,
  },
  "Plant-Identifier": {
    title: "Plant Identifier",
    desc: "Snap or upload a photo and get the plant's name, sunlight, water and soil needs back as structured data from Google Generative AI.",
    tech: ["Next.js", "TypeScript", "AI"],
    thumbKey: "plantid",
    featured: true,
  },
  "my-blockchain-dapp": {
    title: "Blockchain DApp on Arbitrum",
    desc: "Web3 app on Arbitrum Stylus with ERC-721 contracts in Rust and a Next.js front end using wagmi and RainbowKit.",
    tech: ["TypeScript", "Rust", "Web3"],
    thumbKey: "blockchain",
  },
  gentales: {
    title: "Gentales",
    desc: "AI story generator: give it a prompt, get an imaginative tale back.",
    tech: ["Next.js", "TypeScript", "AI"],
    thumbKey: "gentales",
  },
  "mind-webs": {
    title: "MindWebs NLP App",
    desc: "Image captioning, sentiment analysis, speech recognition and synthesis in one Flask app powered by Hugging Face Transformers.",
    tech: ["Python", "Flask", "AI"],
    thumbKey: "mindwebs",
  },
  "note-flow": {
    title: "Note-Flow",
    desc: "Real-time collaborative notes with live cursors, built on Next.js, Firebase Auth and Liveblocks.",
    tech: ["Next.js", "TypeScript", "Firebase"],
    thumbKey: "noteflow",
  },
  "next-js-chatbot": {
    title: "AI Streaming Chatbot",
    desc: "Chatbot with real-time streaming responses using the Vercel AI SDK and shadcn-chat.",
    tech: ["Next.js", "TypeScript", "AI"],
    thumbKey: "chatbot",
  },
  "pixel-aura-extension": {
    title: "Pixel Aura VS Code Theme",
    desc: "A dark VS Code theme with a vivid palette tuned for long sessions. Published on the Marketplace.",
    tech: ["VS Code", "Theme"],
    thumbKey: "pixelaura",
  },
  "viraj-quickshell-config": {
    title: "Quickshell Rice",
    desc: "My Arch desktop shell config, written in QML for Quickshell.",
    tech: ["QML", "Linux"],
  },
  "QAOA-QC-Research-Project": {
    title: "QAOA Quantum Computing Research",
    tech: ["Quantum", "Research"],
  },
  "viraj-portfolio": {
    title: "This Website",
    desc: "The site you're on. Next.js, Motion, and data that syncs itself from GitHub and Hashnode.",
    tech: ["Next.js", "Motion", "Docker"],
  },
};

// Repos that should never show up (profile README, coursework, etc.).
export const hiddenRepos = ["VNalbalwar", "DTL-Exp-11", "Team-21", "mindwebs-ai"];

// ── LinkedIn highlights (manual) ───────────────────────────────────────────
export const linkedinHighlights = [
  {
    title: "Our GPU interference paper got into IEEE HiPC 2026",
    blurb: "One workload stops hogging a shared GPU. Does the other recover instantly? We measured it.",
    when: "Nov 2026",
  },
  {
    title: "From research to the international stage: ISC 2026, Hamburg",
    blurb: "Thermal-aware scheduling for Kubernetes, presented at the EESP workshop.",
    when: "Oct 2026",
  },
  {
    title: "I started by memorising commands. I ended up thinking in systems.",
    blurb: "What breaking and rebuilding RHEL machines taught me on the way to RHCSA.",
    when: "Sep 2026",
  },
];
export const linkedinActivityUrl =
  "https://www.linkedin.com/in/viraj-nalbalwar-895365255/recent-activity/all/";

// ── Q&A ────────────────────────────────────────────────────────────────────
export const questions = [
  {
    q: "So, what's your story, Viraj? 👨‍💻",
    a: "Started with a diploma, somehow walked out with a gold medal and Maharashtra Rank 2, and that got me to COEP. Since then it's been web apps, cloud infrastructure at Jio, enterprise data at Mastercard, and Kubernetes and GPU research. I never really picked a lane. I just follow whatever makes me curious enough to build. 🚀",
  },
  {
    q: "Wait... cloud guy or software guy? ☁️💻",
    a: "Why choose? 😭 I've built front ends in Next.js, wired up OpenStack and OpenShift at Jio, shipped Spark migration services at Mastercard, and wrote a Kubernetes scheduler for research. I like knowing the whole trip, from the button someone clicks to the hardware quietly sweating underneath.",
  },
  {
    q: "Why does this website even exist? 💻",
    a: "Because a resume tells you what I've done, not who I am. This is my corner of the internet where projects, research, milestones and questionable design obsessions live together. It also updates itself from GitHub and Hashnode, because I refuse to maintain it by hand. ✨",
  },
  {
    q: "What's the research actually about? 🔬",
    a: "Systems under pressure. One paper asks whether a GPU keeps a performance hangover after a noisy neighbour leaves (it mostly doesn't, it recovers in microseconds). The other teaches Kubernetes to check how hot each CPU core is before dumping more work on it. Both are about making shared machines behave better. 🌡️",
  },
  {
    q: "What changed how you look at tech? 🧠",
    a: "Working on things that don't come with a tutorial. Real infrastructure, real codebases, real deadlines, no neat step 1, step 2, step 3. Knowing a tool is useful. Knowing how to figure things out when you have no idea is the actual skill. ⚡",
  },
  {
    q: "Are you a perfectionist? 😭",
    a: "Unfortunately, yes. 😂 If something works but doesn't feel right, I keep touching it. Code structure, animations, tiny spacing, all of it. I've learned that done matters too, but if my name is on it, I want it to feel intentional.",
  },
  {
    q: "What do you do when tech gets too loud? 🎧",
    a: "Cube. There's something deeply satisfying about turning total chaos into a solved state. Add music, a random rabbit hole, an unnecessary Arch reinstall, and occasionally doing absolutely nothing. System reboot complete.",
  },
  {
    q: "Okay, what's next? 🚀",
    a: "No perfectly scripted five-year answer here. 😭 Deeper into systems, cloud and distributed infrastructure, building things that are actually useful and occasionally unnecessarily beautiful. I just want future me to look back and think: damn, we really kept levelling up. ⚡",
  },
];
