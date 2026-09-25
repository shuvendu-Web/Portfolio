import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolioData";
import { 
  ExternalLink,
  Sparkles, 
  X, 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RefreshCw,
  Code,
  Layers,
  Monitor,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LivePreviewModal from "@/components/LivePreviewModal";
import ImageGalleryModal from "@/components/ImageGalleryModal";

// Projects list loaded directly from PORTFOLIO_DATA
const categories = [
  "All",
  "3d paralax website",
  "Sass project",
  "website UI",
  "Logo",
  "creative post",
  "mobile Ui",
  "social media post",
];

const clayCardColors = [
  "clay-blue",
  "clay-peach",
  "clay-yellow",
  "clay-pink",
  "clay-cyan",
  "clay-mint",
];

interface AllProjectsViewProps {
  onBackToHome: () => void;
}

export const AllProjectsView: React.FC<AllProjectsViewProps> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);
  const [galleryModalProject, setGalleryModalProject] = useState<Project | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Map asset images reliably from PORTFOLIO_DATA
  const allProjectsWithImages = useMemo(() => {
    return PORTFOLIO_DATA.projects;
  }, []);

  // Collect all unique tech tags
  const allTechTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProjectsWithImages.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [allProjectsWithImages]);

  // Filter projects based on category, search query, and selected tag
  const filteredProjects = useMemo(() => {
    return allProjectsWithImages.filter((p) => {
      // Category match
      const matchCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));

      // Tag match
      const matchTag = !selectedTag || p.tags.includes(selectedTag);

      return matchCategory && matchSearch && matchTag;
    });
  }, [allProjectsWithImages, activeCategory, searchQuery, selectedTag]);

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSelectedTag(null);
  };

  const handleOpenPreview = (project: Project) => {
    const cat = project.category.toLowerCase();
    if (cat === "logo" || cat === "creative post" || cat === "social media post") {
      setGalleryModalProject(project);
    } else {
      setLivePreviewProject(project);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-sky-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Back Button & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-badge bg-white text-slate-800 hover:text-sky-900 text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-sky-600" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Browse my library</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black clay-badge clay-blue text-[#0f2b66]">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"}
                </span>
              </h1>
            </div>
          </div>

          {/* Search Bar & Mobile Sidebar Trigger */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === "grid" ? "bg-white text-sky-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === "list" ? "bg-white text-sky-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2.5 rounded-full clay-badge bg-white text-slate-800 shadow-md cursor-pointer flex items-center gap-1.5 text-xs font-black"
            >
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Left Side Panel & Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Mobile Search Bar */}
        <div className="md:hidden mb-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDE PANEL (Desktop & Mobile Drawer) */}
          <aside
            className={`w-full lg:w-72 shrink-0 ${
              isMobileSidebarOpen ? "block" : "hidden lg:block"
            } space-y-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-lg sticky top-28`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Filter Side Panel
                </h2>
              </div>

              {(activeCategory !== "All" || searchQuery || selectedTag) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-black text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter Options */}
            <div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>Categories</span>
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
                  const count =
                    cat === "All"
                      ? allProjectsWithImages.length
                      : allProjectsWithImages.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer capitalize ${
                        isSelected
                          ? "clay-badge clay-blue text-[#0f2b66] shadow-md translate-x-1"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/80 text-[#0f2b66]" : "bg-slate-100 text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack Filter Badges */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-sky-600" />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTechTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`px-3 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                        isSelected
                          ? "bg-sky-600 text-white shadow-md scale-105"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="pt-4 border-t border-slate-100 p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-sky-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Portfolio Highlights</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                Explore hand-crafted 3D web apps, SaaS tools, brand logos, creative social posts, and responsive interfaces.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-black text-slate-700">
                <span>Total Live Demos:</span>
                <span className="text-sky-700">{allProjectsWithImages.length}</span>
              </div>
            </div>
          </aside>

          {/* MAIN PROJECTS CONTENT AREA */}
          <main className="flex-1 w-full">
            
            {/* Active Filters Bar */}
            {(activeCategory !== "All" || searchQuery || selectedTag) && (
              <div className="mb-6 flex flex-wrap items-center gap-2 p-3.5 rounded-2xl bg-white/80 border border-sky-100 shadow-sm">
                <span className="text-xs font-black text-slate-500">Active Filters:</span>
                {activeCategory !== "All" && (
                  <span className="px-3 py-1 rounded-full text-xs font-black clay-badge clay-blue text-[#0f2b66] capitalize">
                    Category: {activeCategory}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 rounded-full text-xs font-black clay-badge bg-slate-200 text-slate-800">
                    Query: "{searchQuery}"
                  </span>
                )}
                {selectedTag && (
                  <span className="px-3 py-1 rounded-full text-xs font-black clay-badge bg-sky-600 text-white">
                    Tag: {selectedTag}
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="ml-auto text-xs font-black text-rose-500 hover:text-rose-700 underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white/70 rounded-3xl border border-dashed border-slate-300 p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">No Projects Found</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-semibold">
                  We couldn't find any projects matching your search criteria. Try clearing filters or using a different search query.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black shadow-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Projects Grid / List View */
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                <AnimatePresence>
                  {filteredProjects.map((project, idx) => {
                    const clayClass = clayCardColors[idx % clayCardColors.length];
                    const isGraphicCategory = 
                      project.category.toLowerCase() === "logo" || 
                      project.category.toLowerCase() === "creative post" || 
                      project.category.toLowerCase() === "social media post";

                    if (viewMode === "list") {
                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`group relative flex flex-col md:flex-row clay-card ${clayClass} overflow-hidden p-4 gap-6 items-center`}
                        >
                          <div 
                            onClick={() => handleOpenPreview(project)}
                            className="relative h-48 md:h-40 w-full md:w-64 shrink-0 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer group"
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500 text-white font-black text-xs shadow-xl uppercase">
                                {isGraphicCategory ? <ImageIcon className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                                <span>{isGraphicCategory ? "Open Gallery" : "Live Preview"}</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-3 py-1 rounded-full clay-badge bg-white/90 text-slate-900 text-[11px] font-black shadow-sm uppercase">
                                {project.category}
                              </span>
                              {project.metrics && (
                                <span className="text-[10px] font-black text-sky-700 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  {project.metrics}
                                </span>
                              )}
                            </div>

                            <h3 
                              onClick={() => handleOpenPreview(project)}
                              className="text-lg font-black text-slate-950 group-hover:text-sky-900 transition-colors cursor-pointer"
                            >
                              {project.title}
                            </h3>

                            <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed font-semibold">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                              <div className="flex flex-wrap gap-1.5">
                                {project.tags.slice(0, 4).map((t, tIdx) => (
                                  <span key={tIdx} className="px-2.5 py-0.5 rounded-full text-[10px] font-black liquid-glass-badge text-slate-900">
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setSelectedProject(project)}
                                  className="px-3.5 py-1.5 rounded-full clay-badge bg-white text-slate-900 text-xs font-black hover:text-sky-950 cursor-pointer shadow-sm"
                                >
                                  Case Study
                                </button>
                                <button
                                  onClick={() => handleOpenPreview(project)}
                                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black shadow-sm hover:scale-105 transition-all cursor-pointer"
                                >
                                  {isGraphicCategory ? <ImageIcon className="w-3 h-3 text-[#0f2b66]" /> : <Monitor className="w-3 h-3 text-[#0f2b66]" />}
                                  <span>{isGraphicCategory ? "View Gallery" : "Live Preview"}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }

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
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full clay-badge clay-blue text-[#0f2b66] text-xs font-black shadow-sm hover:scale-105 transition-all cursor-pointer"
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
              </div>
            )}
          </main>
        </div>
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
        allProjects={allProjectsWithImages}
        onClose={() => setLivePreviewProject(null)}
        onSelectProject={(p) => setLivePreviewProject(p)}
      />

      {/* Image Gallery Modal Screen for Logo & Creative Post */}
      <ImageGalleryModal
        project={galleryModalProject}
        allProjects={allProjectsWithImages}
        onClose={() => setGalleryModalProject(null)}
        onSelectProject={(p) => setGalleryModalProject(p)}
      />
    </div>
  );
};

export default AllProjectsView;
