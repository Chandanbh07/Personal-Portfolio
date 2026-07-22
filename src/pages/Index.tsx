import { useState } from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import TerminalModal from "../components/TerminalModal";

export default function Index() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      <main className="bg-bg">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>

      <TerminalModal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}