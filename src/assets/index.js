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
    icon: <GithubFillIcon />,
  },
  {
    title: "Blogs Written",
    amount: 10,
    icon: <AwardFillIcon />,
  },
  {
    title: "LinkedIn Followers",
    amount: 2000,
    icon: <GroupLineIcon />,
  },
  {
    title: "LinkedIn Connections",
    amount: 1700,
    icon: <LinksFillIcon />,
  },
];

import DownloadLineIcon from "remixicon-react/DownloadLineIcon";
import ArrowLeftSFillIcon from "remixicon-react/ArrowLeftSFillIcon";

export const downloadIcon = <DownloadLineIcon />;
export const arrowLeftIcon = <ArrowLeftSFillIcon />;

export const aboutText =
  "Yo, I’m Viraj! ☁️💻 Knee-deep in the cloud game—rockin’ OpenStack, OpenShift, and all that DevOps magic 🛠️🔥. From spinning up VMs to automating infra, I’m on a roll with real-world cloud wizardry. Before that? Built sleek frontends with Next.js, Tailwind, and ShadCN, and crafted smooth UIs using Figma + Framer. Full-stack vibes, start to finish 🚀 Off-code? I’m probably speedcubing 🧩 or vibing with the latest tech drops. Let’s make the web (and the cloud) cooler together! 🌐⚡";

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
  { section: "Building the Future: My BTech Story🔧", date: "2024 - Till 2027" },
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
    name: "MindWebs - AI Mods",
    desc: "An open innovation project. To address the challenge of enhancing user interaction with AI Models, making them more accessible to everyone.",
    url: "/projects/image-1.jpg",
    tech: ["Flask", "Hugging Face", "JS"],
  },
  {
    name: "PlantID",
    desc: "PlantID is your go-to resource for identifying and learning about plants. Our AI-powered tool helps nature enthusiasts discover the world of flora.",
    url: "/projects/image-2.jpg",
    tech: ["HTML", "CSS", "JS", "TypeScript"],
  },
  {
    name: "CozyNestHomes.org",
    desc: "A resource for homeowners and renters alike, offering tips on interior design, home improvement projects, and sustainable living practices.",
    url: "/projects/image-3.jpg",
    tech: ["HTML", "CSS", "JS"],
  },
  {
    name: "WanderLuxeTravels.co",
    desc: "A travel website that provides luxury travel guides, destination reviews, and tips for planning unforgettable vacations.",
    url: "/projects/image-4.jpg",
    tech: ["HTML", "CSS", "JS", "TailwindCSS"],
  },
  {
    name: "ByteBoosters.io",
    desc: "A tech startup specializing in software development, offering innovative solutions and services for businesses looking to enhance their digital presence.",
    url: "/projects/image-5.jpg",
    tech: ["TypeScript", "ReactJS", "TailwindCSS", "CSS"],
  },
  {
    name: "GreenLeafGardens.biz",
    desc: "An online store and community hub for gardening enthusiasts, featuring a wide range of plants, gardening tools, and expert advice.",
    url: "/projects/image-6.jpg",
    tech: ["ReactJS", "TailwindCSS", , "CSS", "FramerMotion"],
  },
  {
    name: "PixelPerfectDesigns.info",
    desc: "A graphic design portfolio showcasing the work of a freelance designer, including branding, web design, and illustration projects.",
    url: "/projects/image-7.jpg",
    tech: ["NextJS", "FramerMotion"],
  },
  {
    name: "HarmonyHealthHub.com",
    desc: " A wellness website focused on holistic health, offering articles on nutrition, fitness, mental health, and alternative therapies.",
    url: "/projects/image-8.jpg",
    tech: ["NextJS", "ReactJS", "FramerMotion"],
  },
  {
    name: "StellarSkiesAstronomy.org",
    desc: "An educational site dedicated to astronomy, providing resources for amateur astronomers, star maps, and information on celestial events.",
    url: "/projects/image-9.jpg",
    tech: ["ReactJS", "JS"],
  },
  {
    name: "UrbanEatsDelights.com",
    desc: "An educational site dedicated to astronomy, providing resources for amateur astronomers, star maps, and information on celestial events.",
    url: "/projects/image-10.jpg",
    tech: ["NextJS"],
  },
];

export const projectsButton = [
  "All",
  "TypeScript",
  "HTML",
  "CSS",
  "JS",
  "ReactJS",
  "TailwindCSS",
  "NextJS",
  "FramerMotion",
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
    question: "What’s your story, Viraj 👨‍💻?",
    answer:
      "I’m a BTech CSE student at COEP Pune, currently vibing with cloud infra, DevOps, and full-stack builds. From coding UIs to configuring OpenStack nodes, I love mixing creativity with chaos. Oh, and speedcubing still keeps me sharp! 🧠⚡",
  },
  {
    question: "Why did you start your website 💻🌐?",
    answer:
      "Honestly, I wanted a space to showcase what I build, write about what I learn, and keep everything under one hood. It’s like my digital brain dump—code meets creativity. 🚀🧠",
  },
  {
    question: "What’s the hardest part of being a techie 😅?",
    answer:
      "Balancing learning and building. Some days you're setting up cloud infra, and others you're debugging for hours. But that rollercoaster is what makes the ride worth it! 🎢💻",
  },
  {
    question: "How do you manage your time with all these projects 🕐?",
    answer:
      "I work in bursts! I break big tasks into mini missions and stay flexible. Sometimes it’s chaos, sometimes it flows—but keeping things exciting helps me stay on track. ⚙️🔁",
  },
  {
    question: "What tech are you deep into lately 🔍☁️?",
    answer:
      "Lately, I’m neck-deep in OpenStack, OpenShift, and cloud-native infra setups. Automating systems, setting up nodes, and managing backend chaos—it’s fun in a weirdly satisfying way. 🛠️☁️",
  },
  {
    question: "What’s one tech myth you want to bust 🧐?",
    answer:
      "You don’t need to know everything to get started! Real growth comes from building, failing, googling stuff, and trying again. Consistency > genius. 🔁📚",
  },
  {
    question: "Got any advice for new tech explorers 💡?",
    answer:
      "Follow your curiosity. Learn by building. Start with the basics, ship small things, and keep leveling up. And remember—bugs are just plot twists in your dev journey. 🐞🛠️",
  },
  {
    question: "What inspires your coding projects 🤔💻?",
    answer:
      "Solving real problems or scratching my own itch. If it makes my workflow easier or teaches me something new, I’m in. Bonus points if it looks cool too 😎🖥️",
  },
  {
    question: "How do you deal with coding burnout 🤯🔥?",
    answer:
      "I just disconnect. A speedcube, a music break, or stepping outside helps recharge. You gotta reboot the brain sometimes. 🔋🍃",
  },
  {
    question: "What’s next for you 🚀✨?",
    answer:
      "Diving deeper into cloud automation, real-time systems, and maybe sprinkling in more quantum computing. Basically—breaking stuff, learning fast, and building smarter. 💥🛠️",
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
