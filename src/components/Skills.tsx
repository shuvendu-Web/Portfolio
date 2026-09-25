import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Wrench, Layout, Server, Cloud, Cpu, CheckCircle2, ShieldCheck, Smartphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Server,
  Cloud,
  Cpu,
  ShieldCheck,
  Smartphone,
  Palette,
};

const clayColors = [
  "clay-blue",
  "clay-peach",
  "clay-yellow",
  "clay-mint",
  "clay-cyan",
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge clay-yellow text-[#713f12] text-xs font-black tracking-wider uppercase mb-2">
            <Wrench className="w-4 h-4 text-[#713f12]" />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor">
            Shuvendu Dhenki — UI/UX & Web Design Skills
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600">
            Comprehensive skill set across UI/UX design, website design, mobile app design, React frontend engineering, and design systems.
          </p>
        </div>

        {/* Skill Category Clay Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.skillCategories.map((category, idx) => {
            const IconComp = iconMap[category.icon] || Cpu;
            const clayTheme = clayColors[idx % clayColors.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 clay-card ${clayTheme} hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl clay-badge bg-white flex items-center justify-center shadow-md shrink-0">
                      <IconComp className="w-7 h-7 text-slate-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950">
                        {category.title}
                      </h3>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white/80 shadow-xs inline-block mt-0.5">
                        {category.skills.length} Core Competencies
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-black text-slate-900">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-slate-900" />
                            {skill.name}
                          </span>
                          <span className="font-mono font-black text-slate-900 bg-white/70 px-2 py-0.5 rounded-full text-[11px] shadow-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/60 p-0.5 shadow-inner overflow-hidden border border-black/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-slate-900 shadow-md"
                          />
                        </div>
                      </div>
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

export default Skills;
