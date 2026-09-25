import React, { useState, useEffect } from "react";
import { Smartphone, Download, X, Share, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallAppPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState<boolean>(false);

  useEffect(() => {
    // Check if already running as standalone app
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("pwa_install_dismissed");

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Handle beforeinstallprompt for Android/Chrome/Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (dismissed !== "true") {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If on iOS and not standalone, show prompt after a short delay
    if (isIosDevice && !isStandalone && dismissed !== "true") {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    // Show native browser install prompt
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed top-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50"
      >
        <div className="relative overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-sky-400/40 p-4 shadow-[0_20px_40px_rgba(2,132,199,0.35)] text-white">
          
          {/* Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-sky-500/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* App Icon / Graphic */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/40 shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Mobile App Available</span>
                </div>
                <h4 className="text-sm font-extrabold text-white leading-tight">
                  Install Shuvendu App
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Save to home screen for 1-tap access!
                </p>
              </div>
            </div>

            {/* Action & Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-500/40 hover:shadow-sky-500/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                <span>Install</span>
              </button>

              <button
                onClick={handleDismiss}
                aria-label="Dismiss app install prompt"
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* iOS Instructions Drawer */}
          {showIOSInstructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1.5"
            >
              <p className="font-semibold text-sky-300 flex items-center gap-1.5">
                <Share className="w-3.5 h-3.5 text-sky-400" />
                To install on iOS Safari:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                <span>1. Tap the <strong>Share</strong> button in Safari toolbar.</span>
                <br />
                <span>2. Scroll down & tap <strong>"Add to Home Screen"</strong>.</span>
              </ol>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallAppPrompt;
