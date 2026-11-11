# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Everyone who looks Viraj up: recruiters and engineers hiring for cloud, infrastructure, and software roles; professors and research peers; classmates and friends. Confirmed by Viraj as a personal-brand site first, with proof following personality. Most arrive from LinkedIn, GitHub, or a resume link and skim on a phone or laptop.

## Product Purpose

The personal site of Viraj Nalbalwar, final-year B.Tech Computer Engineering student at COEP Technological University (class of 2027). It exists because a resume says what he did but not who he is. Success: a visitor leaves knowing he works on systems under pressure (cloud, Kubernetes, GPU/HPC research, Linux), has shipped real work, and is someone they want to talk to, and the site stays current without him editing it by hand.

## Positioning

A systems person who also builds polished front ends: published HPC research (ISC High Performance 2026 workshop, IEEE HiPC 2026 Student Research Symposium), internships at Mastercard and Jio, RHCSA, and a self-built site. Few student portfolios can truthfully claim both peer-reviewed systems research and the interface it is presented in.

## Operating Context

- Hosted free on Vercel at viraj-verse.vercel.app, Next.js App Router. Must stay on free tiers everywhere.
- GitHub (VNalbalwar) is the source of truth for projects and repo counts; the public API is free and can sync automatically.
- Hashnode blog (viraj-verse.hashnode.dev) holds a Linux series; its RSS feed can sync automatically.
- LinkedIn holds experience, certifications, research posts, and follower counts. It has no free public API, so this content is curated in one data file and updated by hand.
- Contact form sends email through Gmail SMTP using environment variables set in Vercel.

## Capabilities and Constraints

- Light and dark themes are required.
- Sections: intro, about, journey (experience and education), research, skills, projects, writing, contact, Q&A. The reviews section is removed at Viraj's request.
- Projects, repo count, and blog posts update from GitHub and Hashnode without code changes.
- A Docker image is built and published to GitHub Container Registry by CI; Vercel remains the host.
- SEO matters: the site should rank for his name.
- Latest stable versions of all tooling.

## Brand Commitments

- Name: Viraj Nalbalwar. Site nickname in the wild: "viraj-verse".
- Voice: casual, a little Gen Z, self-aware and funny, never corporate. Emoji are part of his voice in Q&A copy.
- Personal facts that recur: speedcubing (CFOP, Roux, WCA events), Arch Linux tinkering, "deliberately broken Linux machines".
- His LinkedIn line: "The most interesting things in computing happen when a system is under pressure."

- Visual preference (Viraj, Nov 2026): clean and modern with one accent colour. No site-wide metaphor or theme built from a personal fact (a cube theme and a thermal theme were both tried and rejected as forced).

## Evidence on Hand

- Resume: public/resumes/Viraj-Nalbalwar-Resume.pdf
- Portrait: public/viraj-nalbalwar.jpg
- Experience: Mastercard (Software Engineer intern, May to Jul 2026), Jio (Cloud intern, Jun to Jul 2025), SEED Infotech (Responsive Web Design intern, Jun to Jul 2023).
- Education: COEP Tech B.Tech (2024 to 2027, CGPA 8.74); DBATU Diploma (2021 to 2024, CGPA 9.92, State Rank 2, Gold Medalist); S.S. Nikam English School SSC 97.40%.
- Research: "Thermal-Aware Core-Level Scheduling for Kubernetes Workloads" (EESP workshop at ISC High Performance 2026, Hamburg; Springer LNCS). "Characterizing Performance Recovery After Transient GPU Resource Interference" (IEEE HiPC 2026 Student Research Symposium, Bengaluru, Dec 16 to 19, 2026).
- Certifications: RHCSA (Aug 2026); NVIDIA DLI courses (2026); Anthropic Claude courses (2026).
- 28 public GitHub repositories, 9 Hashnode posts, about 4,300 LinkedIn followers (Nov 2026).
- No client testimonials exist; do not fabricate any.

## Product Principles

1. Personality first, proof right behind it.
2. If it can sync itself, it must; hand-edited content lives in one file.
3. Show the systems work doing its job, do not just list it.
4. Free forever: no paid service anywhere in the stack.
5. Fast and readable on a phone before it is impressive on a desktop.
