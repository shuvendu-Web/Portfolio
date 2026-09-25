import React, { useState, useEffect } from "react";
import { X, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ContactPopupProps {
  onNavigateToContact?: () => void;
}

export const ContactPopup: React.FC<ContactPopupProps> = ({ onNavigateToContact }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if dismissed in current session
    const dismissed = sessionStorage.getItem("contact_popup_dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }

    // Show popup after a slight delay for smooth entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Automatically hide when user scrolls near/into contact section to avoid overlap
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const contactElem = document.getElementById("contact");
      if (!contactElem) return;

      const rect = contactElem.getBoundingClientRect();
      // If contact section is in viewport or above it
      if (rect.top <= window.innerHeight * 0.7) {
        setIsOpen(false);
      } else {
        const dismissed = sessionStorage.getItem("contact_popup_dismissed");
        if (dismissed !== "true") {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
    sessionStorage.setItem("contact_popup_dismissed", "true");
  };

  const handleContactClick = () => {
    handleClose();
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -1 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-84"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-200/90 p-5 shadow-[0_20px_50px_rgba(14,165,233,0.25)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(14,165,233,0.35)]">
            
            {/* Ambient Background Glow Effect */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar with Status Badge & Close Button (×) */}
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available Let’s Talk</span>
              </div>

              {/* Close Button × */}
              <button
                onClick={handleClose}
                aria-label="Close popup"
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Message */}
            <div className="space-y-1 my-2">
              <h4 className="text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                Let's work together
                <Sparkles className="w-4 h-4 text-amber-400 inline-block animate-pulse" />
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Have a project in mind?
              </p>
            </div>

            {/* 2 Buttons Section: WhatsApp & Contact */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {/* WhatsApp Button */}
              <a
                href={PORTFOLIO_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="group relative inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
              >
                <WhatsappIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>WhatsApp</span>
              </a>

              {/* Contact Button */}
              <button
                onClick={handleContactClick}
                className="group relative inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/30 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
              >
                <span>Contact</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
