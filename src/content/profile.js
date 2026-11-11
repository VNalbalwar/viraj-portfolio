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
  title: "Viraj Nalbalwar: cloud and systems engineer in Pune",
  description:
    "Viraj Nalbalwar is a final-year Computer Engineering student at COEP Technological University working on cloud infrastructure, Kubernetes scheduling, GPU performance research and Linux. Ex-Mastercard, ex-Jio, RHCSA.",
  tagline: "Cloud and systems engineer. I build, and measure, how shared machines behave under load.",
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
  "I'm a final-year computer engineering student at COEP Technological University in Pune. I work on how shared machines behave under load: Kubernetes scheduling, GPU interference, and the Linux and cloud plumbing underneath.",
  "Last year I built a multi-node OpenStack cloud at Jio. This summer I wrote Spark migration services at Mastercard that move financial data from DB2 to Oracle. Two research papers I worked on were accepted in 2026, at ISC High Performance in Hamburg and IEEE HiPC in Bengaluru.",
  "Outside work I run Arch on my laptop, write about Linux on Hashnode, and solve Rubik's cubes in competitions.",
];

export const aboutFacts = [
  ["Based in", "Pune, Maharashtra"],
  ["Studying", "B.Tech, Computer Engineering, COEP (2027)"],
  ["Earlier", "Diploma, Computer Engineering, gold medal and state rank 2"],
  ["Certified", "Red Hat Certified System Administrator"],
];

// ── Experience, education, certifications (from LinkedIn and the resume) ───
export const experience = [
  {
    role: "Software Engineer Intern",
    org: "Mastercard",
    place: "Pune",
    when: "May to Jul 2026",
    points: [
      "Built Apache Spark and Spring Boot services that migrate enterprise financial data from legacy DB2 systems to Oracle.",
      "Wrote REST-triggered batch workflows with partitioned JDBC reads, audit metadata and Oracle target writes.",
      "Added thread-safe controls so two long-running loads cannot collide on the same endpoint.",
    ],
  },
  {
    role: "Cloud Intern",
    org: "Jio Platforms",
    place: "Navi Mumbai",
    when: "Jun to Jul 2025",
    points: [
      "Set up a multi-node OpenStack cloud (controller, compute and storage) on RHEL and Ubuntu, configuring Keystone, Nova, Neutron, Glance and Cinder.",
      "Ran Docker and Kubernetes workloads with Prometheus and Grafana monitoring.",
    ],
  },
  {
    role: "Responsive Web Design Intern",
    org: "SEED Infotech",
    place: "Pune",
    when: "Jun to Jul 2023",
    points: [
      "Built production web interfaces in Next.js, React and Tailwind CSS, checked with Lighthouse for sub-second loads.",
    ],
  },
];

export const education = [
  {
    name: "COEP Technological University",
    detail: "B.Tech, Computer Engineering. CGPA 8.74. Member of CSI COEP.",
    when: "2024 to 2027",
  },
  {
    name: "Dr. Babasaheb Ambedkar Technological University",
    detail: "Diploma, Computer Engineering. CGPA 9.92, Maharashtra state rank 2, gold medalist.",
    when: "2021 to 2024",
  },
  {
    name: "S.S. Nikam English School, Lonere",
    detail: "SSC, 97.40%.",
    when: "2021",
  },
];

export const certifications = [
  ["Red Hat Certified System Administrator", "Red Hat", "Aug 2026"],
  ["Building LLM Applications With Prompt Engineering", "NVIDIA", "Sep 2026"],
  ["Accelerating End-to-End Data Science Workflows", "NVIDIA", "Aug 2026"],
  ["Getting Started with Deep Learning", "NVIDIA", "Jul 2026"],
  ["Claude Code in Action", "Anthropic", "Jun 2026"],
];

// ── Research ───────────────────────────────────────────────────────────────
export const research = [
  {
    id: "gpu",
    title: "Characterizing Performance Recovery After Transient GPU Resource Interference",
    status: "Accepted",
    venue: "IEEE HiPC 2026, Student Research Symposium",
    place: "Bengaluru, December 16 to 19, 2026",
    question:
      "When a noisy neighbour stops hammering a shared GPU, does your workload recover at once, or does the slowdown linger?",
    result:
      "On an RTX 4060 Laptop GPU, with cross-checks on a Tesla T4, compute interference slowed the victim kernel by about 2.7x and L2 cache interference by 1.8x. Latency returned to baseline within tens of microseconds of the interferer stopping.",
    stack: ["CUDA", "C++", "Holm-adjusted tests"],
    repo: "https://github.com/VNalbalwar/gpu-recovery-experiment",
  },
  {
    id: "thermal",
    title: "Thermal-Aware Core-Level Scheduling for Kubernetes Workloads",
    status: "Presented",
    venue: "EESP workshop at ISC High Performance 2026",
    place: "Hamburg, Springer LNCS",
    question:
      "The most capable core is not always the right one for the next pod. Can a scheduler read each core's temperature before placing it?",
    result:
      "A custom Kubernetes scheduler in Go that scores nodes on per-core temperature from a DaemonSet exporter and pins pods with cgroups v2. The adaptive version keeps a moving average of each node's thermal history.",
    stack: ["Go", "Kubernetes", "cgroups v2"],
    repo: "https://github.com/VNalbalwar/static-thermal-aware-scheduler-phase-1",
  },
];

// ── Skills ─────────────────────────────────────────────────────────────────
// icon: file in /public/icons (real logos, see README); text-only items have none.
export const skills = [
  {
    name: "Cloud and infrastructure",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Docker", icon: "docker" },
      { name: "OpenStack", icon: "openstack" },
      { name: "OpenShift", icon: "openshift" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
    ],
  },
  {
    name: "Linux and systems",
    items: [
      { name: "Red Hat Enterprise Linux", icon: "redhat" },
      { name: "Arch Linux", icon: "archlinux" },
      { name: "Linux", icon: "linux-tux" },
      { name: "Bash", icon: "bash" },
      { name: "systemd" },
      { name: "cgroups v2" },
      { name: "SELinux" },
      { name: "LVM" },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "Go", icon: "go" },
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "C++", icon: "c-plusplus" },
      { name: "CUDA" },
      { name: "SQL" },
    ],
  },
  {
    name: "Web and data",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Spring Boot", icon: "spring" },
      { name: "Flask", icon: "flask" },
      { name: "Firebase", icon: "firebase" },
      { name: "Apache Spark", icon: "apache-spark" },
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
    thumbKey: "gpu",
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
    thumbKey: "cloudinfra",
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
    thumbKey: "quickshell",
    featured: true,
  },
  "QAOA-QC-Research-Project": {
    title: "QAOA Quantum Computing Research",
    desc: "Research project on the Quantum Approximate Optimization Algorithm (QAOA).",
    tech: ["Quantum", "Research"],
    thumbKey: "qaoa",
    featured: true,
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
    q: "What's your story?",
    a: "I started with a diploma, finished with a gold medal and Maharashtra rank 2, and that got me into COEP. Since then it has been web apps, a cloud internship at Jio, data migration at Mastercard, and research on Kubernetes and GPUs. I never picked one lane. I follow whatever makes me curious enough to build something.",
  },
  {
    q: "Are you a cloud person or a software person?",
    a: "Both, and I'd rather not choose. I've built front ends in Next.js, wired up OpenStack and OpenShift, shipped Spark services, and written a Kubernetes scheduler. I like knowing the whole path from the button someone clicks to the hardware underneath it.",
  },
  {
    q: "What is the research about?",
    a: "Shared machines under pressure. One paper asks whether a GPU keeps a performance hangover after a noisy neighbour leaves. It mostly doesn't: latency recovers within microseconds. The other teaches Kubernetes to check how hot each CPU core is before it puts more work there.",
  },
  {
    q: "How do you learn something new?",
    a: "Badly at first, on purpose. I pick something I can't do yet, break it, read way too much documentation, and ask the question I'm embarrassed by. Most of what I know started with me having no idea how to do it.",
  },
  {
    q: "Are you a perfectionist?",
    a: "Unfortunately, yes. If something works but doesn't feel right, I keep touching it. I've learned that shipping matters too, but when my name is on something I want it to look intentional.",
  },
  {
    q: "What do you do when tech gets too loud?",
    a: "I cube. Turning a scrambled mess into a solved state one algorithm at a time is suspiciously close to debugging. I also reinstall Arch more often than I need to.",
  },
  {
    q: "What's next?",
    a: "More systems work: cloud, distributed infrastructure, performance. I want to build things that are useful, and sometimes unnecessarily nice to look at.",
  },
];
