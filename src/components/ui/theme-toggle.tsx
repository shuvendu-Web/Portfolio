import React from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const FloatingThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
    >
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        className="group relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-full glass-panel border shadow-2xl transition-all duration-300 hover:scale-105 hover:border-indigo-500/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur group-hover:opacity-60 transition duration-300" />
        
        <div className="relative flex items-center gap-2 text-slate-800 dark:text-slate-100 font-medium text-xs tracking-wide">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20 group-hover:text-indigo-300" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 group-hover:text-amber-600" />
            )}
          </motion.div>

          <span className="hidden sm:inline font-semibold">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>

          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        </div>
      </button>

      {/* Quick mode indicator tag */}
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 text-slate-300 text-[11px] font-mono border border-slate-700/50 backdrop-blur-md shadow-lg pointer-events-none">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        <span>Canvas Sync</span>
      </div>
    </motion.div>
  );
};

export default FloatingThemeToggle;
