import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Numbers from "@/components/Numbers";
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
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Numbers repoCount={github.repoCount} postCount={blog.postCount} />
        <Experience />
        <Research />
        <Skills />
        <Projects projects={github.projects} repoCount={github.repoCount} live={github.live} />
        <Writing posts={blog.posts} />
        <Contact />
        <Questions />
      </main>
      <Footer />
    </>
  );
}
