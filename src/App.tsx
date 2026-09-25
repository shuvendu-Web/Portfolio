import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import AllProjectsView from "@/components/AllProjectsView";
import ContactPopup from "@/components/ui/ContactPopup";
import InstallAppPrompt from "@/components/ui/InstallAppPrompt";
import TestimonialMarqueeDemo from "@/components/ui/marquee-01";

export function App() {
  const [currentView, setCurrentView] = useState<"home" | "projects">(() => {
    return window.location.hash === "#/projects" ? "projects" : "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/projects") {
        setCurrentView("projects");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (window.location.hash === "" || window.location.hash.startsWith("#projects") || window.location.hash.startsWith("#about")) {
        setCurrentView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToProjects = () => {
    window.location.hash = "#/projects";
    setCurrentView("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    window.location.hash = "#projects";
    setCurrentView("home");
    setTimeout(() => {
      const projectsElem = document.getElementById("projects");
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (currentView === "projects") {
    return (
      <SmoothScroll>
        <div className="min-h-screen bg-[#f0f9ff] text-slate-900 selection:bg-sky-500 selection:text-white">
          <AllProjectsView onBackToHome={navigateToHome} />
          <Footer />
        </div>
      </SmoothScroll>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f0f9ff] text-slate-900 selection:bg-sky-500 selection:text-white">
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section with Interactive 3D Robot */}
        <Hero />

        {/* Main Portfolio Content */}
        <main className="relative z-10 space-y-8">
          <About />
          <Projects onOpenAllProjects={navigateToProjects} />
          <TestimonialMarqueeDemo />
          <Skills />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile PWA Install Prompt Banner */}
        <InstallAppPrompt />

        {/* Floating Bottom Contact Popup */}
        <ContactPopup />
      </div>
    </SmoothScroll>
  );
}

export default App;

