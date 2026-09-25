import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  } | null;
  showArchiveButton?: boolean;
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton,
  showArchiveButton = false,
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-64 sm:-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard Design",
      title: "Nexus AI Workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
      title: "HyperGrid Real-Time Analytics",
    },
    {
      src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop&q=80",
      alt: "E-Commerce Platform",
      title: "Synth UI Design System",
    },
    {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App Design",
      title: "Orbit Distributed Storage",
    },
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80",
      alt: "Biometric Monitoring App",
      title: "Pulse Health Tracker",
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80",
      alt: "Cloud IDE Platform",
      title: "Aether Cloud IDE",
    },
  ];

  const images = customImages || defaultImages;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Title Header */}
      {title && (
        <div className="relative z-10 text-center pt-6 pb-4 px-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor mb-4">
            {title}
          </h2>
          {showArchiveButton && archiveButton && (
            <a
              href={archiveButton.href}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-slate-800 transition-all shadow-md group mb-12"
            >
              <span>{archiveButton.text}</span>
            </a>
          )}
        </div>
      )}

      {/* Desktop 3D overlapping layout - hidden on mobile */}
      <div className="hidden md:block relative overflow-hidden h-[380px] -mb-[160px]">
        <div className={`flex ${spacing} pb-8 pt-36 items-end justify-center`}>
          {images.map((image, index) => {
            const totalImages = images.length;
            const middle = Math.floor(totalImages / 2);
            const distanceFromMiddle = Math.abs(index - middle);
            const staggerOffset = maxHeight - distanceFromMiddle * 20;
            const zIndex = totalImages - index;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

            return (
              <motion.div
                key={index}
                className="group cursor-pointer flex-shrink-0"
                style={{
                  zIndex: zIndex,
                }}
                initial={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                  opacity: 0,
                }}
                animate={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onImageClick?.(index)}
              >
                <div
                  className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 border-2 border-white/80 shadow-2xl"
                  style={{
                    boxShadow: `
                      rgba(0, 0, 0, 0.04) 0.796192px 0px 0.796192px 0px,
                      rgba(0, 0, 0, 0.08) 2.41451px 0px 2.41451px 0px,
                      rgba(0, 0, 0, 0.15) 6.38265px 0px 6.38265px 0px,
                      rgba(0, 0, 0, 0.3) 20px 0px 20px 0px
                    `,
                  }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover object-left-top"
                    loading="lazy"
                    decoding="async"
                  />
                  {image.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-black tracking-wide drop-shadow-md">
                        {image.title}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile marquee layout */}
      <div className="block md:hidden relative pb-6 pt-4">
        <div
          className={cn(
            "group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)]",
            "flex-row"
          )}
        >
          {Array(marqueeRepeat)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex shrink-0 justify-around [gap:var(--gap)]",
                  "animate-marquee flex-row",
                  {
                    "group-hover:[animation-play-state:paused]": pauseOnHover,
                  }
                )}
              >
                {images.map((image, index) => (
                  <div
                    key={`${i}-${index}`}
                    className="group cursor-pointer flex-shrink-0"
                    onClick={() => onImageClick?.(index)}
                  >
                    <div
                      className="relative aspect-video w-64 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-white/60 shadow-lg"
                      style={{
                        boxShadow: `
                          rgba(0, 0, 0, 0.03) 0.796192px 0px 0.796192px 0px,
                          rgba(0, 0, 0, 0.06) 2.41451px 0px 2.41451px 0px,
                          rgba(0, 0, 0, 0.12) 6.38265px 0px 6.38265px 0px,
                          rgba(0, 0, 0, 0.2) 15px 0px 15px 0px
                        `,
                      }}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover object-left-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
