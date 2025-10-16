import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Section from "./components/Section";

// Lazy load components with loading fallback
const About = dynamic(() => import("./components/About"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

const StatsDisplay = dynamic(() => import("./components/StatsDisplay"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <div className="animate-pulse h-48 bg-slate-800 rounded-lg"></div>,
});

const Certifications = dynamic(() => import("./components/Certifications"), {
  loading: () => <div className="animate-pulse h-64 bg-slate-800 rounded-lg"></div>,
});

const Skills = dynamic(() => import("./components/Skills"), {
  loading: () => <div className="animate-pulse h-40 bg-slate-800 rounded-lg"></div>,
});

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

export default function Home() {
  return (
    <div className="bg-slate-950 px-60 py-10">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start min-h-screen">
        <Section id="home" title="Welcome">
          <Hero />
        </Section>
        <div className="flex gap-5">
          <Section id="about" title="About Me">
            <About />
          </Section>
          <Section id="stats" title="GitHub Snapshot">
            <StatsDisplay />
          </Section>
        </div>
        <Section id="projects" title="Projects">
          <Projects />
        </Section>
        <Section id="certifications" title="Certifications">
          <Certifications />
        </Section>
        <Section id="skills" title="Skills">
          <Skills />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
