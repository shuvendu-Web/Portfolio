import React, { useState } from "react";
import { createPortal } from "react-dom";
import { type Project } from "@/data/portfolioData";
import { 
  X, 
  ArrowLeft, 
  ExternalLink, 
  Lock, 
  RotateCw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LivePreviewModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
}) => {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyCounter, setKeyCounter] = useState<number>(0);

  if (!project) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setKeyCounter((prev) => prev + 1);
  };

  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : allProjects[0];

  // Device viewport width styling
  const viewportWidthClass = {
    desktop: "w-full max-w-none h-full",
    tablet: "w-[768px] max-w-full h-full shadow-2xl rounded-xl my-auto border-x-4 border-slate-700",
    mobile: "w-[375px] max-w-full h-full shadow-2xl rounded-2xl my-auto border-x-4 border-slate-700",
  }[deviceMode];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999999] flex flex-col bg-slate-950/95 backdrop-blur-xl text-slate-100 overflow-hidden font-sans"
        style={{ zIndex: 9999999 }}
      >
        {/* TOP BAR NAVIGATION & BROWSER MOCKUP */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-md">
          
          {/* Back to Home & Project Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-black tracking-wide transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Return to main portfolio home"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-black text-sky-400 uppercase tracking-wider">
                {project.category}
              </span>
              <h2 className="text-sm font-black text-white truncate max-w-[180px] sm:max-w-[240px]">
                {project.title}
              </h2>
            </div>
          </div>

          {/* DESKTOP BROWSER ADDRESS BAR & DEVICE SWITCHER */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-2">
            {/* Mac OS Window Controls */}
            <div className="hidden md:flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-slate-300 font-mono overflow-hidden shadow-inner">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate text-slate-200 select-all font-sans text-[11px] font-semibold">
                {project.demoUrl}
              </span>
              <button
                onClick={handleRefresh}
                className="ml-auto text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reload Frame"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
              </button>
            </div>

            {/* Device Responsive Viewport Toggles */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-full transition-all ${
                  deviceMode === "desktop" ? "bg-sky-500 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
                title="Desktop View (Full Screen)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode("tablet")}
                className={`p-1.5 rounded-full transition-all ${
                  deviceMode === "tablet" ? "bg-sky-500 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-full transition-all ${
                  deviceMode === "mobile" ? "bg-sky-500 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-black border border-slate-700 transition-all cursor-pointer"
              title="Open site in standalone browser tab"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
              aria-label="Close modal"
              title="Close modal preview"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* MAIN IFRAME VIEWPORT CANVAS AREA */}
        <div className="relative flex-1 bg-slate-950 flex justify-center items-center overflow-hidden p-2 sm:p-4">
          
          {/* Previous / Next Project Quick Switch Buttons (Side Floating Arrows) */}
          <button
            onClick={() => onSelectProject(prevProject)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hidden sm:flex items-center justify-center"
            title={`Previous Example: ${prevProject.title}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hidden sm:flex items-center justify-center"
            title={`Next Example: ${nextProject.title}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Loading Indicator Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-400 absolute inset-0 m-auto" />
              </div>
              <p className="text-xs font-black text-slate-300 tracking-wider uppercase">
                Loading Live Preview: <span className="text-sky-400">{project.title}</span>...
              </p>
            </div>
          )}

          {/* Iframe Viewport Container */}
          <div className={`relative transition-all duration-300 ease-in-out ${viewportWidthClass}`}>
            <iframe
              key={`${project.id}-${keyCounter}`}
              src={project.demoUrl}
              title={`Live Preview - ${project.title}`}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full bg-white border-0 rounded-lg shadow-2xl"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-storage-access-by-user-activation"
              loading="eager"
            />
          </div>
        </div>

        {/* BOTTOM DRAWER BAR — "VIEW MORE EXAMPLES" CAROUSEL */}
        <div className="bg-slate-900/95 border-t border-slate-800 p-3 shrink-0 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-2">
            
            {/* Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>View More Examples ({allProjects.length})</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                Click any thumbnail to load live preview instantly
              </span>
            </div>

            {/* Horizontal Scrollable Thumbnails Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {allProjects.map((item) => {
                const isActive = item.id === project.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsLoading(true);
                      onSelectProject(item);
                    }}
                    className={`group relative shrink-0 w-44 sm:w-52 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left ${
                      isActive
                        ? "border-sky-400 ring-4 ring-sky-500/30 scale-105 z-10 shadow-lg"
                        : "border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-sky-950/90 via-slate-950/40" : "from-slate-950/90 via-slate-950/50"} to-transparent`} />
                    
                    <div className="absolute inset-x-0 bottom-0 p-2 space-y-0.5">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-900/90 text-sky-300 text-[9px] font-black tracking-wider uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-[11px] font-black text-white truncate drop-shadow">
                        {item.title}
                      </h4>
                    </div>

                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-sky-500 text-white text-[9px] font-black tracking-wider shadow">
                        Active Preview
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default LivePreviewModal;
