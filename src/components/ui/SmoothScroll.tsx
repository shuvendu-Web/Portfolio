import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Instantiate Lenis for ultra buttery inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame loop
    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Track scroll position for progress & top button
    const handleScroll = (e: any) => {
      const scroll = e.scroll || window.scrollY;
      const limit = e.limit || (document.documentElement.scrollHeight - window.innerHeight);
      const progress = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
      
      setScrollProgress(progress);
      setShowScrollTop(scroll > 300);
    };

    lenis.on("scroll", handleScroll);

    // Smooth scroll hash anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -70,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <>
      {/* Top Reading Progress Bar with Sky Blue Glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 origin-left shadow-[0_0_12px_rgba(14,165,233,0.8)]"
        style={{ scaleX }}
      />

      {children}

      {/* Floating Back To Top Button with Circular Progress Indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-12 h-12 rounded-full neu-glass-button bg-white/90 shadow-xl border border-sky-300/50 group focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label="Scroll to top"
            >
              {/* Circular SVG progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5">
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  className="stroke-sky-100"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  className="stroke-sky-500 transition-all duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <ArrowUp className="w-5 h-5 text-sky-600 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmoothScroll;
