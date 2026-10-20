import { Cursor } from "@/components/effects/Cursor";
import { Loader } from "@/components/effects/Loader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { AskAI } from "@/components/sections/AskAI";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AskAI />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
