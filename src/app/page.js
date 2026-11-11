import About from "@/components/About";
import Chrome from "@/components/Chrome";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Questions from "@/components/Questions";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Writing from "@/components/Writing";
import { getGithub } from "@/lib/github";
import { getPosts } from "@/lib/hashnode";

// Rebuild this page in the background at most once an hour, so new repos and
// blog posts show up without a redeploy.
export const revalidate = 3600;

export default async function Home() {
  const [github, blog] = await Promise.all([getGithub(), getPosts()]);
  return (
    <>
      <Chrome />
      <main>
        <Hero />
        <About repoCount={github.repoCount} postCount={blog.postCount} live={{ github: github.live, hashnode: blog.live }} />
        <Journey />
        <Research />
        <Skills />
        <Projects projects={github.projects} live={github.live} />
        <Writing posts={blog.posts} />
        <Contact />
        <Questions />
      </main>
      <Footer />
    </>
  );
}
