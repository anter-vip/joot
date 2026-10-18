import { profile } from "@/data/profile";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import DashboardShowcase from "@/components/sections/DashboardShowcase";
import Certifications from "@/components/sections/Certifications";
import Recommendations from "@/components/sections/Recommendations";
import Activity from "@/components/sections/Activity";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      {/* Ambient background layers */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fine opacity-70 mask-fade" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(0,229,255,0.08), transparent 70%), radial-gradient(50% 40% at 85% 100%, rgba(124,58,237,0.09), transparent 70%)",
          }}
        />
      </div>

      <main className="relative" aria-label={profile.name}>
        <Hero />
        <Activity />
        <About />
        <Experience />
        <Stats />
        <Projects />
        <Skills />
        <DashboardShowcase />
        <Certifications />
        <Recommendations />
        <Contact />
      </main>
    </>
  );
}
