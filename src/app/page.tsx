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
    <div className="blueprint min-h-screen bg-ink">
      <Hero />
      <About />
      <Stats />
      <Experience />
      <Projects />
      <Skills />
      <DashboardShowcase />
      <Certifications />
      <Recommendations />
      <Activity />
      <Contact />
    </div>
  );
}
