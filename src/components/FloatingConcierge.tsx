"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Phone, X } from "lucide-react";

export function FloatingConcierge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      const enquiryEl = document.getElementById("enquiry");
      let nearEnquiry = false;
      if (enquiryEl) {
        const rect = enquiryEl.getBoundingClientRect();
        nearEnquiry = rect.top < window.innerHeight - 100 && rect.bottom > 100;
      }

      const nearBottom = docHeight - scrollPos < 450;

      if (scrollPos > 450 && !nearBottom && !nearEnquiry) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="pointer-events-auto max-w-md w-full sm:w-auto bg-forest-dark/96 backdrop-blur-3xl border border-amber/35 p-2 sm:p-2.5 rounded-full shadow-[0_20px_60px_rgba(8,19,11,0.8),0_0_30px_rgba(197,160,89,0.1)] flex items-center justify-between gap-2 text-xs relative overflow-hidden">
            {/* Shimmer accent at top */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent pointer-events-none" />

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                "Hello Yashin Stay, I would like to inquire about reserving a stay in Vythiri, Wayanad."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/8 hover:bg-emerald-900/30 text-white transition-all duration-300 border border-white/10 hover:border-emerald-400/40 group active:scale-95 hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[11px] font-medium hidden min-[380px]:inline">
                Host Chat
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919847123859"
              className="p-2 rounded-full bg-white/8 hover:bg-amber/15 text-white transition-all duration-300 border border-white/10 hover:border-amber/30 active:scale-95 hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] group"
              aria-label="Direct Phone Line"
            >
              <Phone className="w-3.5 h-3.5 text-amber group-hover:scale-110 transition-transform" />
            </a>

            {/* CTA */}
            <a
              href="#enquiry"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-forest-dark font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(197,160,89,0.4)] hover:shadow-[0_0_25px_rgba(197,160,89,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-1/3 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 ease-out pointer-events-none" />
              <Sparkles className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Check Dates</span>
            </a>

            {/* Dismiss */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-full text-mist/35 hover:text-mist hover:bg-white/10 transition-all duration-200 cursor-pointer hover:rotate-90"
              aria-label="Dismiss quick bar"
            >
              <X className="w-3.5 h-3.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
