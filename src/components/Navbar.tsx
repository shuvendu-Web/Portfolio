import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Menu, X, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["hero", "about", "projects", "testimonials", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Testimonials", href: "#testimonials", id: "testimonials" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md py-3 shadow-md shadow-sky-500/5 border-b border-sky-100/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Brand - Light Theme */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight group"
        >
          <img
            src={logoImg}
            alt="Shuvendu Dhenki Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform"
          />
          <span className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 bg-clip-text text-transparent font-black">
            {PORTFOLIO_DATA.personal.name}
          </span>
        </a>

        {/* Desktop Links Navigation - Light Glassmorphism Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-sky-200/80 backdrop-blur-md shadow-sm shadow-sky-500/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "text-sky-900 font-extrabold"
                    : "text-slate-600 hover:text-sky-700"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-300/60 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Socials - Light Theme Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-2xl bg-white/90 text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-sky-200/80 shadow-sm transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-2xl bg-white/90 text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-sky-200/80 shadow-sm transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Header Right Corner: Download CV Button - Light Theme Primary */}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            download="Shuvendu_Dhenki_Resume_Ui.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-sky-600 via-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-md shadow-sky-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Download CV</span>
            <Download className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle - Light Theme */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-white/90 text-slate-700 hover:text-sky-700 border border-sky-200/80 shadow-sm"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu - Light Theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-sky-200/80 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl text-sm font-black text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-slate-50 text-slate-700 hover:text-sky-700 border border-sky-200/80"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-slate-50 text-slate-700 hover:text-sky-700 border border-sky-200/80"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  download="Shuvendu_Dhenki_Resume_Ui.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-white" />
                  <span>Download CV</span>
                  <Download className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
