import React from "react";
import { createPortal } from "react-dom";
import { type Project } from "@/data/portfolioData";
import { 
  X, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
}) => {
  if (!project) return null;

  // Filter gallery items (Logo and creative post items)
  const galleryItems = allProjects.filter(
    (p) =>
      p.category.toLowerCase() === "logo" ||
      p.category.toLowerCase() === "creative post" ||
      p.category.toLowerCase() === "social media post"
  );

  const activeList = galleryItems.length > 0 ? galleryItems : allProjects;
  const currentIdx = activeList.findIndex((p) => p.id === project.id);
  const prevProject = currentIdx > 0 ? activeList[currentIdx - 1] : activeList[activeList.length - 1];
  const nextProject = currentIdx < activeList.length - 1 ? activeList[currentIdx + 1] : activeList[0];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999999] flex flex-col bg-slate-950/95 backdrop-blur-2xl text-slate-100 overflow-hidden font-sans select-none"
        style={{ zIndex: 9999999 }}
      >
        {/* TOP BAR NAVIGATION */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 shrink-0 shadow-lg">
          
          {/* Back to Home & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-black tracking-wide transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Return to home page"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-black text-amber-400 uppercase tracking-wider">
                {project.category} Gallery
              </span>
              <h2 className="text-sm sm:text-base font-black text-white truncate max-w-[200px] sm:max-w-[320px]">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-black border border-slate-700 transition-all cursor-pointer"
              title="Open full resolution image in new tab"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Full Size</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
              aria-label="Close gallery modal"
              title="Close modal preview"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* MAIN IMAGE DISPLAY CANVAS */}
        <div className="relative flex-1 bg-slate-950 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 overflow-hidden gap-6">
          
          {/* Floating Left Arrow */}
          <button
            onClick={() => onSelectProject(prevProject)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md flex items-center justify-center"
            title={`Previous Design: ${prevProject.title}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Floating Right Arrow */}
          <button
            onClick={() => onSelectProject(nextProject)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md flex items-center justify-center"
            title={`Next Design: ${nextProject.title}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Showcase Frame */}
          <motion.div
            key={project.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-4xl max-h-[62vh] lg:max-h-[72vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/50 p-2"
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-[60vh] lg:max-h-[70vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>

          {/* Details Sidebar Panel (Mobile/Desktop Overlay) */}
          <div className="w-full lg:w-80 shrink-0 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-black uppercase">
                {project.category} Design
              </span>
              {project.metrics && (
                <span className="text-[11px] font-black text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {project.metrics}
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-white leading-tight">
              {project.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-4">
              {project.longDescription || project.description}
            </p>

            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                Tools & Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM DRAWER BAR — "MORE DESIGN EXAMPLES" CAROUSEL */}
        <div className="bg-slate-900/95 border-t border-slate-800 p-3 shrink-0 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-2">
            
            {/* Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>More Design Examples ({activeList.length})</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                Click thumbnail to view design in high resolution
              </span>
            </div>

            {/* Horizontal Scrollable Thumbnails Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {activeList.map((item) => {
                const isActive = item.id === project.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                    className={`group relative shrink-0 w-40 sm:w-48 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left ${
                      isActive
                        ? "border-amber-400 ring-4 ring-amber-500/30 scale-105 z-10 shadow-lg"
                        : "border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-amber-950/90 via-slate-950/40" : "from-slate-950/90 via-slate-950/50"} to-transparent`} />
                    
                    <div className="absolute inset-x-0 bottom-0 p-2 space-y-0.5">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-900/90 text-amber-300 text-[9px] font-black tracking-wider uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-[11px] font-black text-white truncate drop-shadow">
                        {item.title}
                      </h4>
                    </div>

                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black tracking-wider shadow">
                        Active
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

export default ImageGalleryModal;
