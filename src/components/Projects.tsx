import React, { useState } from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolioData";
import { FolderGit2, Sparkles, X, ArrowRight, Monitor, Image as ImageIcon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import LivePreviewModal from "@/components/LivePreviewModal";
import ImageGalleryModal from "@/components/ImageGalleryModal";

interface ProjectsProps {
  onOpenAllProjects?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAllProjects }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);
  const [galleryModalProject, setGalleryModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "3d paralax website",
    "Sass project",
    "website UI",
    "Logo",
    "creative post",
  ];

  const projectsWithAssetImages = PORTFOLIO_DATA.projects;

  const filteredProjects = activeCategory === "All"
    ? (() => {
        const catMap = new Map<string, Project[]>();
        projectsWithAssetImages.forEach((p) => {
          const list = catMap.get(p.category) || [];
          if (list.length < 2) {
            list.push(p);
            catMap.set(p.category, list);
          }
        });
        const combined: Project[] = [];
        catMap.forEach((list) => combined.push(...list));
        return combined.length > 0 ? combined : projectsWithAssetImages.slice(0, 6);
      })()
    : projectsWithAssetImages.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Multi-color Claymorphism card styles map
  const clayCardColors = [
    "clay-blue",
    "clay-peach",
    "clay-yellow",
    "clay-pink",
    "clay-cyan",
    "clay-mint",
  ];

  // Exclude "creative post" category from top 3D gallery animation stack
  const galleryProjects = projectsWithAssetImages.filter(
    (p) => p.category.toLowerCase() !== "creative post"
  );

  const galleryImages = galleryProjects.map((p) => ({
    src: p.image,
    alt: p.title,
    title: p.title,
  }));

  const handleOpenPreview = (project: Project) => {
    const cat = project.category.toLowerCase();
    if (cat === "logo" || cat === "creative post") {
      setGalleryModalProject(project);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 3D Overlapping Gallery Effect */}
        <div className="text-center max-w-5xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black tracking-wider uppercase mb-1">
            <FolderGit2 className="w-4 h-4 text-[#0f2b66]" />
            <span>Featured Projects & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor">
            Shuvendu Dhenki — UI/UX & Web Design Portfolio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Explore selected UI/UX design case studies, website design projects, mobile app UI designs, and digital products by Shuvendu Dhenki.
          </p>

          {/* 3D Overlapping Staggered Image Cards Stack */}
          <PortfolioGallery
            title=""
            showArchiveButton={false}
            images={galleryImages}
            onImageClick={(idx) => handleOpenPreview(galleryProjects[idx])}
            className="py-4 min-h-0"
          />
        </div>

        {/* Claymorphism Category Filter Pills (Including Logo & Creative Post) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            const clayTheme = clayCardColors[idx % clayCardColors.length];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wide transition-all cursor-pointer capitalize ${
                  isSelected
                    ? `clay-badge ${clayTheme} clay-button-active shadow-md scale-105`
                    : "clay-badge bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Claymorphism 3D Projects Grid */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.slice(0, 6).map((project, idx) => {
              const clayClass = clayCardColors[idx % clayCardColors.length];
              const isGraphicCategory = 
                project.category.toLowerCase() === "logo" || 
                project.category.toLowerCase() === "creative post" || 
                project.category.toLowerCase() === "social media post";

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative flex flex-col clay-card ${clayClass} overflow-hidden`}
                >
                  {/* Image Cover */}
                  <div 
                    onClick={() => handleOpenPreview(project)}
                    className="relative h-56 w-full overflow-hidden rounded-t-[1.5rem] bg-slate-900 cursor-pointer group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Hover Preview Hint Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white font-black text-xs shadow-xl tracking-wider uppercase">
                        {isGraphicCategory ? <ImageIcon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                        <span>{isGraphicCategory ? "Open Image Gallery" : "Live Desktop Preview"}</span>
                      </span>
                    </div>

                    {/* Category Clay Badge */}
                    <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full clay-badge bg-white/90 text-slate-900 text-[11px] font-black shadow-md uppercase">
                      {project.category}
                    </span>

                    {/* Metrics Tag */}
                    {project.metrics && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full clay-badge bg-sky-600 text-white text-[10px] font-black tracking-wide flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 
                        onClick={() => handleOpenPreview(project)}
                        className="text-xl font-black text-slate-950 group-hover:text-sky-900 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-800 line-clamp-2 leading-relaxed font-semibold">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10">
                      {/* Liquid Glassmorphism Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                          >
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-black text-slate-900 hover:text-sky-950 flex items-center gap-1 cursor-pointer underline underline-offset-4 decoration-2"
                        >
                          <span>Case Study</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenPreview(project)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black shadow-md hover:scale-105 transition-all cursor-pointer"
                            title={isGraphicCategory ? "Open Gallery Image View Modal" : "Open Desktop Live Modal Preview"}
                          >
                            {isGraphicCategory ? <ImageIcon className="w-3.5 h-3.5 text-[#0f2b66]" /> : <Monitor className="w-3.5 h-3.5 text-[#0f2b66]" />}
                            <span>{isGraphicCategory ? "View Gallery" : "Live Preview"}</span>
                          </button>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full clay-badge bg-white text-slate-800 hover:text-sky-900 shadow-sm transition-all hover:scale-110 active:scale-95"
                            title="Open Site in New Window"
                          >
                            <ExternalLink className="w-4 h-4 text-sky-600" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Bottom Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              if (onOpenAllProjects) {
                onOpenAllProjects();
              } else {
                window.location.hash = "#/projects";
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full clay-badge clay-blue text-[#0f2b66] font-black text-sm tracking-wide shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-white"
          >
            <FolderGit2 className="w-5 h-5 text-[#0f2b66]" />
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 text-[#0f2b66]" />
          </button>
        </div>

        {/* Project Detail Claymorphism Modal */}
        {createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-lg"
                style={{ zIndex: 9999999 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative z-[10000000] max-w-2xl w-full clay-container p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto border-4 border-white"
                  style={{ zIndex: 10000000 }}
                  data-lenis-prevent
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-50 p-3 rounded-full clay-badge bg-slate-900 text-white hover:bg-rose-600 border-2 border-white cursor-pointer shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                    aria-label="Close popup"
                  >
                    <X className="w-5 h-5 text-white stroke-[2.5]" />
                  </button>

                  <div className="relative h-52 sm:h-64 w-full rounded-2xl overflow-hidden mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3.5 py-1 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black shadow-md uppercase">
                      {selectedProject.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-700 leading-relaxed font-semibold">
                    {selectedProject.longDescription}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black clay-badge bg-slate-200 hover:bg-rose-500 hover:text-white text-slate-800 shadow-md cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Close</span>
                    </button>
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black clay-badge bg-white text-slate-800 shadow-md hover:scale-105 transition-transform"
                      title="Open Site in New Window"
                    >
                      <ExternalLink className="w-4 h-4 text-sky-600" />
                      <span>Open Site in New Window</span>
                    </a>
                    <button
                      onClick={() => {
                        const proj = selectedProject;
                        setSelectedProject(null);
                        handleOpenPreview(proj);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black clay-badge clay-blue text-[#0f2b66] shadow-md cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Monitor className="w-4 h-4 text-[#0f2b66]" />
                      <span>Open Preview</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Desktop Live Site Preview Modal Screen */}
        <LivePreviewModal
          project={livePreviewProject}
          allProjects={PORTFOLIO_DATA.projects}
          onClose={() => setLivePreviewProject(null)}
          onSelectProject={(p) => setLivePreviewProject(p)}
        />

        {/* Image Gallery Modal Screen for Logo & Creative Post */}
        <ImageGalleryModal
          project={galleryModalProject}
          allProjects={PORTFOLIO_DATA.projects}
          onClose={() => setGalleryModalProject(null)}
          onSelectProject={(p) => setGalleryModalProject(p)}
        />

      </div>
    </section>
  );
};

export default Projects;
