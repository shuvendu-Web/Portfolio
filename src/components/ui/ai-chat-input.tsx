"use client" 

import { useState, useEffect, useRef } from "react";
import { Mic, Gauge, Link, Send, Loader2, Phone, MessageCircle, Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
 
const PLACEHOLDERS = [
  "Analyze Website Performance",
];
 
const AIChatInput = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{domain: string} | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
 
  // Cycle placeholder text when input is inactive
  useEffect(() => {
    if (isActive || inputValue) return;
 
    const interval = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 400);
    }, 3000);
 
    return () => clearInterval(interval);
  }, [isActive, inputValue]);
 
  // Close input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (!inputValue) setIsActive(false);
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue]);
 
  const handleActivate = () => setIsActive(true);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResponse(null);
    setIsActive(true);

    try {
      // Extract domain to make it look realistic
      let domain = inputValue;
      try {
        if (!domain.startsWith('http')) {
          domain = 'https://' + domain;
        }
        domain = new URL(domain).hostname;
      } catch (e) {
        // Fallback if it's not a valid URL
        domain = inputValue.substring(0, 30);
      }

      const simulatedResponse = { domain };
      
      setResponse(simulatedResponse);
    } catch (error: any) {
      setResponse(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setIsActive(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const containerVariants = {
    collapsed: {
      height: 68,
      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
      transition: { type: "spring" as const, stiffness: 120, damping: 18 },
    },
    expanded: {
      height: "auto",
      minHeight: 128,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.16)",
      transition: { type: "spring" as const, stiffness: 120, damping: 18 },
    },
  };
 
  const placeholderContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.025 } },
    exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
  };
 
  const letterVariants = {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
      y: 10,
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        opacity: { duration: 0.25 },
        filter: { duration: 0.4 },
        y: { type: "spring" as const, stiffness: 80, damping: 20 },
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      y: -10,
      transition: {
        opacity: { duration: 0.2 },
        filter: { duration: 0.3 },
        y: { type: "spring" as const, stiffness: 80, damping: 20 },
      },
    },
  };
 
  return (
    <>
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .rgba-animated-text {
            background: linear-gradient(90deg, rgba(255,51,102,1), rgba(0,240,255,1), rgba(138,43,226,1), rgba(255,51,102,1));
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-x 3s linear infinite;
          }
        `}
      </style>
      <div className="w-full flex justify-center items-center text-black mt-8 pointer-events-auto z-50">
      <motion.div
        ref={wrapperRef}
        className="w-full max-w-2xl px-4 sm:px-0"
        variants={containerVariants}
        animate={isActive || inputValue ? "expanded" : "collapsed"}
        initial="collapsed"
        style={{ overflow: "hidden", borderRadius: 32, background: "#fff" }}
        onClick={handleActivate}
      >
        <div className="flex flex-col items-stretch w-full h-full p-1 border border-gray-100 rounded-[32px]">
          {/* Input Row */}
          <div className="flex items-center gap-2 p-2 rounded-full bg-white max-w-3xl w-full">
            <button
              className="p-3 rounded-full hover:bg-gray-100 transition"
              title="Add link"
              type="button"
              tabIndex={-1}
            >
              <Link size={20} className="text-gray-500" />
            </button>
 
            {/* Text Input & Placeholder */}
            <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 border-0 outline-0 rounded-md py-2 text-base bg-transparent w-full font-normal"
                  style={{ position: "relative", zIndex: 1 }}
                  onFocus={handleActivate}
                  disabled={isLoading}
                />
              <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex items-center px-1 py-2">
                <AnimatePresence mode="wait">
                  {showPlaceholder && !isActive && !inputValue && (
                    <motion.span
                      key={placeholderIndex}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        zIndex: 0,
                      }}
                      variants={placeholderContainerVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {PLACEHOLDERS[placeholderIndex]
                        .split("")
                        .map((char, i) => (
                          <motion.span
                            key={i}
                            variants={letterVariants}
                            style={{ display: "inline-block" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
 
            <button
              className={`p-3 rounded-full transition ${isListening ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-100'}`}
              title="Voice input"
              type="button"
              tabIndex={-1}
              onClick={handleMicClick}
            >
              <Mic size={20} className={isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'} />
            </button>
            <button
              className="flex items-center gap-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 shadow-md shadow-sky-500/20 text-white p-3 rounded-full font-medium justify-center transition-all disabled:opacity-50"
              title="Send"
              type="button"
              tabIndex={-1}
              onClick={handleSearch}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
 


          {/* AI Response Area */}
          <AnimatePresence>
            {(isLoading || response) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full px-6 py-4 text-sm text-gray-700 text-left border-t border-gray-100 mt-2"
              >
                {response && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm mt-1">
                      <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-3 border-b border-sky-100 flex items-center justify-between">
                        <h4 className="font-semibold text-sky-900 flex items-center gap-2 m-0 text-sm">
                          <Gauge size={16} className="text-sky-500" />
                          Performance Audit: <span className="text-sky-600 font-normal truncate max-w-[150px] sm:max-w-[200px]">{response.domain}</span>
                        </h4>
                        <button 
                          onClick={(e) => { e.preventDefault(); setResponse(null); setIsActive(false); }}
                          className="text-sky-400 hover:text-sky-700 transition-colors p-1 rounded-md hover:bg-sky-100 flex-shrink-0"
                          aria-label="Close"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="p-0 overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                          <thead className="bg-gray-50 text-gray-500">
                            <tr>
                              <th className="px-4 py-3 font-medium">Metric</th>
                              <th className="px-4 py-3 font-medium">Score</th>
                              <th className="px-4 py-3 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/50 transition">
                              <td className="px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Speed
                              </td>
                              <td className="px-4 py-3 text-gray-600">1.1s Load</td>
                              <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">Excellent</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50/50 transition">
                              <td className="px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lighthouse
                              </td>
                              <td className="px-4 py-3 text-gray-600">96 / 100</td>
                              <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Optimized</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50/50 transition">
                              <td className="px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Responsive
                              </td>
                              <td className="px-4 py-3 text-gray-600">100% Mobile</td>
                              <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">Perfect</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* CTA Section */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 mb-3 text-center sm:text-left inline-block w-full shadow-sm">
                        <p className="text-[13px] sm:text-sm font-extrabold rgba-animated-text">
                          Make Your Website Future-Ready gsap 3d website
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a 
                        href="#contact" 
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-full text-sm font-medium transition shadow-sm shadow-sky-500/20"
                      >
                        <Mail size={16} />
                        Contact UI/UX Expert
                      </a>
                      <a 
                        href="https://wa.me/91980453216" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-sm font-medium transition shadow-sm shadow-green-500/20"
                      >
                        <MessageCircle size={16} />
                        WhatsApp Me
                      </a>
                      <a 
                        href="tel:+91980453216" 
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-medium transition shadow-sm shadow-gray-900/20"
                      >
                        <Phone size={16} />
                        Tap to Call
                      </a>
                    </div>
                  </div>
                </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </>
  );
};
 
export { AIChatInput };
