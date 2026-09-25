import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowUp, Code2 } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-slate-200/80 bg-[#f0f9ff] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl clay-badge clay-blue flex items-center justify-center font-bold text-sm text-[#0f2b66] shrink-0">
            <Code2 className="w-5 h-5 text-[#0f2b66]" />
          </div>
          <div>
            <span className="text-xs text-slate-700 font-bold block">
              © {new Date().getFullYear()} <strong className="text-slate-900 font-extrabold">{PORTFOLIO_DATA.personal.name}</strong>. All rights reserved. — <a href="https://shuvendu-dhenki-cv.netlify.app/" className="hover:underline text-sky-800">Shuvendu Dhenki CV</a>
            </span>
            <span className="text-[11px] text-slate-500 font-semibold block">
              UI/UX Designer, Web Designer & Mobile App Designer | <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-700">Shuvendu Dhenki LinkedIn</a> | <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-700">Shuvendu Dhenki GitHub</a>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-800 font-black flex-wrap justify-center">
          <a href="#about" className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-800 hover:bg-slate-100 shadow-xs">About Shuvendu</a>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-800 hover:bg-slate-100 shadow-xs">UI/UX Projects</a>
          <a href="#skills" className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-800 hover:bg-slate-100 shadow-xs">Web Design Skills</a>
          <a href="#experience" className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-800 hover:bg-slate-100 shadow-xs">CV Experience</a>
          <a href="#contact" className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-800 hover:bg-slate-100 shadow-xs">Contact</a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3.5 rounded-full clay-badge clay-yellow clay-button-active text-[#713f12] cursor-pointer shadow-md"
          title="Scroll Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-[#713f12]" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
