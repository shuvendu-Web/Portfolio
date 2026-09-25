import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const clayColors = [
  "clay-peach",
  "clay-cyan",
  "clay-mint",
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge clay-mint text-[#114b25] text-xs font-black tracking-wider uppercase mb-2">
            <Briefcase className="w-4 h-4 text-[#114b25]" />
            <span>Professional Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor">
            Shuvendu Dhenki — Professional Experience
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600">
            Shuvendu Dhenki's 10+ year career journey across UI/UX design, website design, mobile app development, and agency product engineering.
          </p>
        </div>

        {/* Claymorphism 3D Timeline */}
        <div className="mt-16 max-w-4xl mx-auto relative border-l-4 border-slate-300 pl-6 sm:pl-10 space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => {
            const clayTheme = clayColors[idx % clayColors.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* 3D Clay Timeline Node Dot */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-3 w-6 h-6 rounded-full clay-badge clay-yellow shadow-md group-hover:scale-130 transition-transform" />

                <div className={`p-6 sm:p-8 clay-card ${clayTheme} hover:scale-[1.015] transition-all duration-300 space-y-4 relative overflow-hidden`}>
                  {/* Bottom Right Corner Company Logo Thumbnail */}
                  {exp.logo && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-white/90 shrink-0 hover:scale-110 transition-transform flex items-center justify-center z-10">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} Logo`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2 border-b border-black/10 pb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-black text-slate-900">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 shadow-xs">
                        <Calendar className="w-4 h-4 text-slate-800" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 shadow-xs">
                        <MapPin className="w-4 h-4 text-slate-800" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-900 list-disc list-inside leading-relaxed font-semibold">
                    {exp.description.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-black/10 pr-14 sm:pr-20">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
