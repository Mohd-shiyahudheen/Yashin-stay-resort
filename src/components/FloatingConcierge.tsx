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
      // Show when scrolled past 450px, but hide if inside enquiry form or near footer
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const enquiryEl = document.getElementById("enquiry");
      let nearEnquiry = false;
      if (enquiryEl) {
        const rect = enquiryEl.getBoundingClientRect();
        // Hide while enquiry form is on screen
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
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="pointer-events-auto max-w-md w-full sm:w-auto bg-forest-dark/95 backdrop-blur-2xl border border-amber/30 p-2 sm:p-2.5 rounded-full shadow-[0_20px_50px_rgba(8,19,11,0.7)] flex items-center justify-between gap-2 text-xs">
            {/* Direct WhatsApp Concierge with Pulse */}
            <a
              href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                "Hello Yashin Stay, I would like to inquire about reserving a stay in Vythiri, Wayanad."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white transition-all duration-300 border border-white/10 hover:border-emerald-400/40 group active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] font-medium hidden min-[380px]:inline">
                Host Chat
              </span>
            </a>

            {/* Quick Phone Call on mobile */}
            <a
              href="tel:+919847123859"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 active:scale-95"
              aria-label="Direct Phone Line"
            >
              <Phone className="w-3.5 h-3.5 text-amber" />
            </a>

            {/* Check Dates / Reserve Button */}
            <a
              href="#enquiry"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-forest-dark font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-transform border border-white/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Check Dates</span>
            </a>

            {/* Dismiss Pill button */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-full text-mist/40 hover:text-mist hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss quick bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
