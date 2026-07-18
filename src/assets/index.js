// Hero
import InstagramLineIcon from "remixicon-react/InstagramLineIcon";
import FacebookCircleLineIcon from "remixicon-react/FacebookCircleLineIcon";
import NewspaperLineIcon from "remixicon-react/NewspaperLineIcon";
import GithubLineIcon from "remixicon-react/GithubLineIcon";
import LinkedinBoxLineIcon from "remixicon-react/LinkedinBoxLineIcon";

//Hero Icons Array
export const heroIcons = [
  <LinkedinBoxLineIcon />,
  <GithubLineIcon />,
  <InstagramLineIcon />,
  <FacebookCircleLineIcon />,
  <NewspaperLineIcon />,
];

//Links for Hero Icons Array
export const heroLinks = [
  "https://www.linkedin.com/in/viraj-nalbalwar-895365255/",
  "https://github.com/VNalbalwar",
  "https://www.instagram.com/viraj_nalbalwar/",
  "https://www.facebook.com/profile.php?id=61558032755634&mibextid=ZbWKwL",
  "https://virajblogs.hashnode.dev/",
];

// AboutMe icons
import GithubFillIcon from "remixicon-react/GithubFillIcon";
import GroupLineIcon from "remixicon-react/GroupLineIcon";
import AwardFillIcon from "remixicon-react/AwardFillIcon";
import LinksFillIcon from "remixicon-react/LinksFillIcon";

export const aboutData = [
  {
    title: "Github Repos",
    amount: 20,
    liveKey: "githubRepos",
    icon: <GithubFillIcon />,
  },
  {
    title: "Blogs Written",
    amount: 10,
    liveKey: "hashnodePosts",
    icon: <AwardFillIcon />,
  },
  {
    // LinkedIn has no public API — kept as manually-updated static value
    title: "LinkedIn Followers",
    amount: 2000,
    liveKey: null,
    icon: <GroupLineIcon />,
  },
  {
    // LinkedIn has no public API — kept as manually-updated static value
    title: "LinkedIn Connections",
    amount: 1700,
    liveKey: null,
    icon: <LinksFillIcon />,
  },
];

import DownloadLineIcon from "remixicon-react/DownloadLineIcon";
import ArrowLeftSFillIcon from "remixicon-react/ArrowLeftSFillIcon";

export const downloadIcon = <DownloadLineIcon />;
export const arrowLeftIcon = <ArrowLeftSFillIcon />;

export const aboutText =
  "Yo, I’m Viraj! 👨‍💻⚡ I build across the stack—from polished interfaces to the systems and infrastructure running underneath them. My journey has taken me through cloud engineering at Jio, software engineering at Mastercard, and even Kubernetes research that made its way to the international HPC stage 🌍🚀. I love figuring out how things work, turning ambitious ideas into something real, and making sure whatever I build feels as good as it works. Off-code? You’ll probably find me speedcubing 🧩, chasing another tech rabbit hole, or wondering what to build next.";

// End of AboutMe icons

// Skills
export const skillsData = [
  {
    name: "Bash",
    icon: "/skills/bash.png",
  },
  {
    name: "Docker",
    icon: "/skills/docker.png",
  },
  {
    name: "OpenStack",
    icon: "/skills/openstack.png",
  },
  {
    name: "OpenShift",
    icon: "/skills/openshift.png",
  },
  {
    name: "Systemd",
    icon: "/skills/systemd.png",
  },
  // {
  //   name: "HTML",
  //   icon: "/skills/html.png",
  // },
  // {
  //   name: "CSS",
  //   icon: "/skills/css.png",
  // },
  {
    name: "JavaScript",
    icon: "/skills/js.png",
  },
  {
    name: "TypeScript",
    icon: "/skills/ts.png",
  },
  {
    name: "VS Code",
    icon: "/skills/vscode.png",
  },
  {
    name: "ReactJS",
    icon: "/skills/react.png",
  },
  {
    name: "NextJS",
    icon: "/skills/nextjs.png",
  },
  {
    name: "Github",
    icon: "/skills/github.png",
  },
  {
    name: "TailwindCSS",
    icon: "/skills/tailwind.png",
  },
  {
    name: "Framer Motion",
    icon: "/skills/framer.png",
  },
  // {
  //   name: "Figma",
  //   icon: "/skills/figma.png",
  // },
  // {
  //   name: "Cloudflare",
  //   icon: "/skills/cloudflare.png",
  // },
  {
    name: "NodeJS",
    icon: "/skills/nodejs.png",
  },
  {
    name: "MongoDB",
    icon: "/skills/mongodb.png",
  },
  // {
  //   name: "ChatGPT",
  //   icon: "/skills/chatgpt.png",
  // },
  {
    name: "Linux",
    icon: "/skills/linux.png",
  },
  // {
  //   name: "C",
  //   icon: "/skills/c.png",
  // },
  {
    name: "C++",
    icon: "/skills/cpp.png",
  },
  {
    name: "Hashnode",
    icon: "/skills/hashnode.png",
  },
];

// import { PiCopyrightThin } from 'react-icons/pi'
import CopyrightLineIcon from "remixicon-react/CopyrightLineIcon";

// export const copyRightIcon = <PiCopyrightThin />
export const copyRightIcon = <CopyrightLineIcon />;
// Experience
// export const experienceData = [
//   {
//     year: 1,
//     title: 'Foundation and Basics',
//     education:
//       'High School Diploma: Focus on computer science, mathematics, and art/design courses.',
//     experience: [
//       'Basic HTML/CSS: Learn through online tutorials and courses.',
//       'Personal Projects: Create simple personal websites or blogs.',
//     ],
//   },
//   {
//     year: 2,
//     title: 'Advanced Learning and Early Experience',
//     education:
//       'Associate’s Degree in Web Development or Design: Enroll in a 2-year program covering web development and design principles.',
//     experience: [
//       'Freelance Work: Take on small freelance projects to build a portfolio.',
//       'Online Courses and Certifications: Learn JavaScript, responsive design, and UX/UI design.',
//     ],
//   },
//   {
//     year: 3,
//     title: 'Specialized Education and Real-World Application',
//     education:
//       'Online Courses and Bootcamps: Focus on specialized areas like front-end frameworks (React, Angular) and back-end technologies (Node.js).',
//     experience: [
//       'Internships: Secure internships with tech companies or design agencies.',
//       'Contribute to Open Source: Collaborate on open-source projects.',
//     ],
//   },
//   {
//     year: 4,
//     title: 'Building Expertise and Expanding Skills',
//     education: 'Certifications: Obtain certifications in advanced web technologies.',
//     experience: [
//       'Full-Time Position: Work as a junior web developer or designer.',
//       'Portfolio Development: Continuously update your portfolio with professional and personal projects.',
//     ],
//   },
//   {
//     year: 5,
//     title: 'Mastery and Leadership',
//     education: 'Workshops and Conferences: Attend industry events to stay updated.',
//     experience: [
//       'Senior Position: Aim for a senior web developer or lead designer role, mentoring junior colleagues.',
//       'Freelance and Consulting: Consider starting a freelance business or consulting practice.',
//     ],
//   },
// ]

export const myDates = [
  { section: "Speedcubing Skills🧩", date: "2019 - Forever" },
  { section: "The Beginning of the Journey 🚀", date: "2021" },
  { section: "Tech Arsenal: My Skillset🚀", date: "2021 - Present" },
  { section: "Building Blocks: My Diploma Journey 😎", date: "2021 - 2024" },
  {
    section: "Building the Future: My BTech Story🔧",
    date: "2024 - 2027",
  },
  { section: "Cloud, Code & Everything Dope ☁️💻", date: "2025" },
];

export const experienceData = [
  {
    year: 1,
    title: "Speedcubing Skills🧩",
    education: "",
    experience: [
      "-Techniques Mastered: Mastered various methods like CFOP and Roux for quicker solves",
      "-Finger Tricks: Focused on improving finger dexterity for executing algorithms smoothly, reducing solve time.",
      "-Competitive Solving: Participated in WCA (World Cube Association) events, and performed strategies like ZBLL and COLL.",
    ],
  },
  {
    year: 2,
    title: "The Beginning of the Journey 🚀",
    education: "S.S. Nikam English School, Lonere",
    experience: [
      "-Scored an impressive 97.40% in the SSC (10th) board exams.",
      "-Developed a passion for learning and growth.",
    ],
  },
  {
    year: 3,
    title: "Tech Arsenal: My Skillset🚀",
    education: "",
    experience: [
      "-Programming Proficiency: Expertise in C, C++ with a focus on Data Structures & Algorithms.",
      "-Web Development: Specialized in front-end frameworks like React.js and backend with Node.js, creating dynamic, responsive applications.",
      "-System Programming: Hands-on experience with 8086 Assembly Language, including interrupt handling and PPI programming.",
      "-Graph Algorithms: Designed a complete Graph Algorithm Library in C, implementing traversal and advanced graph functionalities.",
    ],
  },
  {
    year: 4,
    title: "Building Blocks: My Diploma Journey 😎",
    education: "DBATU, Lonere",
    experience: [
      "-CGPA - 9.92",
      "-Actively participated in coding competitions and technical events.",
      "-Specialized in Data Structures and Algorithms (DSA), Web Development, and System Programming.",
    ],
  },
  {
    year: 5,
    title: "Building the Future: My BTech Story🔧",
    education: "COEP Technological University, Pune",
    experience: [
      "-Member of CSI COEP",
      "-Specialized in front-end frameworks like React, NextJS, and back-end technologies such as Node.js.",
    ],
  },
  {
    year: 6,
    title: "Cloud, Code & Everything Dope ☁️💻",
    education: "",
    experience: [
      "-Interning at Reliance Jio as a CloudOps Intern, working hands-on with OpenStack and OpenShift in production-grade infra setups.",
      "-Configured multi-node OpenStack environments from scratch with Nova, Neutron, Cinder, Keystone & Horizon.",
      "-Explored full-stack magic using Next.js, Tailwind, and ShadCN for clean UI + Firebase for quick deployments.",
      "-Actively building real-world infra, mastering automation, monitoring, and deployment flows 🚀",
    ],
  },
];

export const projectsData = [
  {
    name: "Thermal-Aware Core Scheduler",
    desc: "Custom Kubernetes scheduler in Go that routes workloads to CPU cores with the lowest thermal footprint. Includes a DaemonSet node-agent thermal exporter, k8s manifests, and a Phase-1 research paper on static scheduling strategies.",
    thumbKey: "thermal",
    url: null,
    tech: ["Go", "Kubernetes", "Docker", "Research"],
    github: "https://github.com/VNalbalwar/static-thermal-aware-scheduler-phase-1",
    live: null,
  },
  {
    name: "MAC-Based SYN Flood Detection",
    desc: "Network security mini-project detecting and mitigating SYN flood attacks using MAC-layer fingerprinting. Features Python packet simulation, Jupyter notebooks for live visualization, a TypeScript dashboard, and a formal research paper.",
    thumbKey: "synflood",
    url: null,
    tech: ["Python", "TypeScript", "Security"],
    github: "https://github.com/VNalbalwar/CN-Mini-Project-MAC-Based-SYN-Flood-Detection",
    live: null,
  },
  {
    name: "Blockchain DApp on Arbitrum",
    desc: "Full-stack Web3 decentralized app on Arbitrum Stylus with ERC-721 NFT smart contracts written in Rust, a Next.js frontend using wagmi + RainbowKit, and end-to-end WalletConnect integration.",
    thumbKey: "blockchain",
    url: null,
    tech: ["TypeScript", "Web3", "Rust"],
    github: "https://github.com/VNalbalwar/my-blockchain-dapp",
    live: null,
  },
  {
    name: "Mind-Webs NLP App",
    desc: "Multifunctional NLP web app featuring image captioning, sentiment analysis, speech recognition & synthesis — all in one platform. Powered by Flask, Hugging Face Transformers, and custom ML pipelines.",
    thumbKey: "mindwebs",
    url: null,
    tech: ["Python", "AI", "Flask"],
    github: "https://github.com/VNalbalwar/mind-webs",
    live: null,
  },
  {
    name: "Gentales — AI Story Generator",
    desc: "AI-powered story generation platform built with Next.js 14. Generate imaginative tales from prompts using generative AI, with Vercel Analytics integration and a polished reader experience.",
    thumbKey: "gentales",
    url: null,
    tech: ["Next.js", "TypeScript", "AI"],
    github: "https://github.com/VNalbalwar/gentales",
    live: "https://gentales.vercel.app/",
  },
  {
    name: "SteganоSafe — Steganography Tool",
    desc: "No-code steganography web app to encode and decode hidden messages inside images using LSB (Least Significant Bit) pixel manipulation. Built with Next.js and TypeScript, deployed live.",
    thumbKey: "steganosafe",
    url: null,
    tech: ["Next.js", "TypeScript", "Security"],
    github: "https://github.com/VNalbalwar/no-code-steganosafe",
    live: "https://steganosafe.vercel.app/",
  },
  {
    name: "Plant Identifier AI",
    desc: "AI-powered plant identification app using Google Generative AI. Upload a photo or use camera capture to identify any plant — returns scientific name, sunlight requirements, water needs, soil type, and growth info.",
    thumbKey: "plantid",
    url: null,
    tech: ["Next.js", "TypeScript", "AI"],
    github: "https://github.com/VNalbalwar/Plant-Identifier",
    live: "https://plant-identifier-vn.vercel.app/",
  },
  {
    name: "Note-Flow — Collaborative Editor",
    desc: "Real-time collaborative note editor built with Next.js, Firebase Auth, and Liveblocks for live multi-cursor presence. Supports rich-text editing and real-time sync across multiple users simultaneously.",
    thumbKey: "noteflow",
    url: null,
    tech: ["Next.js", "TypeScript", "Firebase"],
    github: "https://github.com/VNalbalwar/note-flow",
    live: null,
  },
  {
    name: "AI Streaming Chatbot",
    desc: "Modern AI chatbot with real-time streaming responses using Vercel AI SDK, OpenAI GPT, and shadcn-chat components. Supports code blocks, markdown rendering, and a smooth streaming UX built at lightspeed.",
    thumbKey: "chatbot",
    url: null,
    tech: ["Next.js", "TypeScript", "AI"],
    github: "https://github.com/VNalbalwar/next-js-chatbot",
    live: null,
  },
  {
    name: "Pixel Aura VS Code Theme",
    desc: "Dark VS Code theme with a vibrant, aesthetic palette designed for long coding sessions — focus-friendly contrasts, consistent syntax highlighting across all major languages, and zero lag. Published on the VS Code Marketplace.",
    thumbKey: "pixelaura",
    url: null,
    tech: ["VS Code", "Theme"],
    github: "https://github.com/VNalbalwar/pixel-aura-extension",
    live: null,
  },
];

export const projectsButton = [
  "All",
  "Go",
  "Python",
  "TypeScript",
  "Next.js",
  "Security",
  "AI",
  "Web3",
];

//Navbar Data:
import Home5LineIcon from "remixicon-react/Home5LineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import HistoryLineIcon from "remixicon-react/HistoryLineIcon";
import BriefcaseLineIcon from "remixicon-react/BriefcaseLineIcon";
import UserStarLineIcon from "remixicon-react/UserStarLineIcon";
import ProjectorLineIcon from "remixicon-react/ProjectorLineIcon";
import PriceTag3LineIcon from "remixicon-react/PriceTag3LineIcon";
import ContactsBook2LineIcon from "remixicon-react/ContactsBook2LineIcon";
import QuestionAnswerLineIcon from "remixicon-react/QuestionAnswerLineIcon";

export const navbarData = [
  {
    id: "home",
    name: "Home",
    icon: <Home5LineIcon />,
  },
  {
    id: "about",
    name: "About",
    icon: <UserLineIcon />,
  },
  {
    id: "experience",
    name: "MyRoad",
    icon: <HistoryLineIcon />,
  },
  {
    id: "skills",
    name: "Skills",
    icon: <BriefcaseLineIcon />,
  },
  {
    id: "reviews",
    name: "Reviews",
    icon: <UserStarLineIcon />,
  },
  {
    id: "projects",
    name: "Projects",
    icon: <ProjectorLineIcon />,
  },
  // {
  //   id: 'pricing',
  //   name: 'Pricing',
  //   icon: <PriceTag3LineIcon />,
  // },
  {
    id: "contact",
    name: "Contact",
    icon: <ContactsBook2LineIcon />,
  },
  {
    id: "questions",
    name: "Questions",
    icon: <QuestionAnswerLineIcon />,
  },
];

// Questions & Answers (Q&A):

export const questions = [
  {
    question: "So, what’s your story, Viraj 👨‍💻?",
    answer:
      "Started with a diploma, somehow ended up with a gold medal and Maharashtra Rank 2, and that journey brought me to COEP. Since then, I’ve gone from building slick web experiences to working with cloud infrastructure, enterprise systems, and Kubernetes research. I guess I’ve never really stuck to one lane—I just keep following whatever makes me curious enough to build. 🚀",
  },
  {
    question: "Why does this website even exist 💻🌐?",
    answer:
      "Because a resume can tell you what I’ve done, but not really who I am. This is my little corner of the internet where projects, experiments, milestones, questionable design obsessions, and everything I learn along the way get to live together. Basically, less of a portfolio... more of a timeline of me figuring things out. ✨",
  },
  {
    question: "Wait... cloud guy or software guy ☁️💻?",
    answer:
      "Why choose? 😭 I’ve built frontends with Next.js, worked hands-on with OpenStack and OpenShift at Jio, explored enterprise software engineering at Mastercard, and somehow ended up researching Kubernetes schedulers too. I like understanding the whole journey—from the interface someone clicks to the infrastructure quietly keeping everything alive underneath.",
  },
  {
    question: "What changed the way you look at tech 🧠?",
    answer:
      "Working on things outside tutorials. Real infrastructure, real codebases, research problems, deadlines, presentations—basically situations where there isn’t a neat 'Step 1, Step 2, Step 3.' That taught me something important: knowing a technology is useful, but learning how to figure things out when you don’t know the answer is probably the bigger skill. ⚡",
  },
  {
    question: "What’s something you’re genuinely proud of 🏆?",
    answer:
      "Probably the trajectory more than any single achievement. From a diploma classroom to COEP, internships at places like Jio and Mastercard, and taking our Kubernetes research all the way to an international HPC workshop—it sometimes feels wild when I connect the dots. Every chapter felt like a huge jump at the time. Looking back, they somehow became one continuous story. 🌍",
  },
  {
    question: "What kind of problems pull you in 🔍?",
    answer:
      "The ones where I initially have no idea how I’m going to solve them. 😭 Whether it’s debugging infrastructure, understanding a massive codebase, designing a system, or turning an idea into something people can actually experience—I love that phase where everything looks confusing... until the pieces slowly start connecting.",
  },
  {
    question: "Are you a perfectionist with your work 😭?",
    answer:
      "Unfortunately... yes. 😂 If something works but doesn’t feel right, I’ll probably keep touching it. Code structure, animations, tiny spacing, presentation flow—I care a lot about how things come together. I’ve learned that 'done' matters too, but if I’m putting my name on something, I want it to feel intentional.",
  },
  {
    question: "What do you do when tech gets too loud 🧩🎧?",
    answer:
      "Speedcubing is still my favorite reset button. There’s something satisfying about turning complete chaos into a solved cube one algorithm at a time—which, now that I think about it, is suspiciously similar to debugging. 😭 Add some music, random tech rabbit holes, and occasionally doing absolutely nothing... system reboot complete.",
  },
  {
    question: "What’s one thing you believe about learning 💡?",
    answer:
      "You don’t have to feel ready before starting something difficult. Most of the things that taught me the most started with me thinking, 'I have absolutely no clue how to do this.' You start anyway, break things, ask stupid questions, read way too much documentation, and eventually yesterday’s impossible thing becomes something you just... know how to do. 🔁",
  },
  {
    question: "Okay then... what’s next for Viraj 🚀✨?",
    answer:
      "No perfectly scripted five-year answer here. 😭 I want to keep getting deeper into systems, cloud, distributed infrastructure, and software engineering while building things that are actually useful—and occasionally unnecessarily beautiful. Wherever that takes me, I just want future-me to look back and think: damn, we really kept leveling up. ⚡",
  },
];

import ArrowDropDownLineIcon from "remixicon-react/ArrowDropDownLineIcon";
export const questionArrow = <ArrowDropDownLineIcon />;

// Reviews

import StarFillIcon from "remixicon-react/StarFillIcon";
import StarHalfLineIcon from "remixicon-react/StarHalfLineIcon";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import StarLineIcon from "remixicon-react/StarLineIcon";

export const starIcons = [
  <StarFillIcon />,
  <StarHalfLineIcon />,
  <StarLineIcon />,
];
export const arrowIcons = [<ArrowLeftSLineIcon />, <ArrowRightSLineIcon />];

export const reviewsData = [
  {
    image: "/reviews/client-8.png",
    name: "Sanjay Nalbalwar, Dean, DBATU Lonere",
    comment:
      "This website is absolutely amazing!✨The design feels modern, and the transitions are buttery smooth. Navigating through the sections was super easy, and I loved how interactive everything was. Definitely one of the best personal websites I've seen!",
    stars: [1, 1, 1, 1, 0.5],
  },
  {
    image: "/reviews/client-7.png",
    name: "Bhumi Batawale, VJTI Mumbai",
    comment:
      "Bro, this site is straight fire! 🔥 The vibes are unmatched—smooth animations, sleek design, and everything flows like a dream. Navigating is a breeze, and the portfolio? It's next-level 👏. Seriously, if this was a flex, it's on a whole other level. Keep doing your thing, Viraj!",
    stars: [1, 1, 1, 1, 1],
  },
  {
    image: "/reviews/client-5.png",
    name: "Prathmesh Pattewar, VIT Pune",
    comment:
      "Yo, this site is lowkey fire 🔥! The design is sleek, and everything feels smooth as heck. It’s easy to find your way around, and the projects are insane. Just a tiny delay on some pages, but honestly, still vibes all the way. Keep flexing, Viraj!",
    stars: [1, 1, 1, 1, 0.5],
  },
  {
    image: "/reviews/client-4.png",
    name: "Amogh Waskar, Modern College Pune",
    comment:
      "Honestly, this website slaps! 😎 The transitions and animations are smooth, and the content is super engaging. Mobile could use a little fine-tuning, but that’s minor. Overall, it’s a vibe and definitely stands out. Keep doing you!",
    stars: [1, 1, 1, 1, 0],
  },
  {
    image: "/reviews/client-3.png",
    name: "Rudrakshi Sawant, VIIT Pune",
    comment:
      "Okay, this site is straight-up a flex! 💯 The animations are crispy, the design is sleek, and the vibe is just on point. Honestly, it feels like I’m browsing through the future. Definitely a must-see for anyone looking for inspiration!",
    stars: [1, 1, 1, 1, 0.5],
  },
];

import CheckLineIcon from "remixicon-react/CheckLineIcon";

export const checkIcon = <CheckLineIcon />;

// Toggle
import MoonFoggyFillIcon from "remixicon-react/MoonFoggyFillIcon";
import SunFoggyFillIcon from "remixicon-react/SunFoggyFillIcon";

export const sunIcon = <SunFoggyFillIcon />;
export const moonIcon = <MoonFoggyFillIcon />;
