"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Sanctuary", href: "#story", id: "story" },
  { label: "Stays", href: "#stays", id: "stays" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Reel", href: "#inauguration", id: "inauguration" },
  { label: "Experiences", href: "#experiences", id: "experiences" },
  { label: "Location", href: "#location", id: "location" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // ScrollSpy to track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollPos > 30);

      // Section tracking
      const sectionElements = navLinks.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (scrollPos < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber via-amber-light to-amber z-50 transition-all duration-150 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Island Navigation Container */}
      <header className="fixed top-0 left-0 right-0 z-40 pt-2.5 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-500">
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto mx-auto max-w-6xl w-full flex items-center justify-between rounded-full transition-all duration-500 ${isScrolled
              ? "bg-forest-dark/92 backdrop-blur-2xl border border-amber/30 shadow-[0_18px_50px_rgba(8,19,11,0.7)] py-2 sm:py-2.5 px-3.5 sm:px-6"
              : "bg-forest-dark/75 backdrop-blur-xl border border-amber/20 shadow-[0_10px_35px_rgba(8,19,11,0.4)] py-2 sm:py-3 px-3.5 sm:px-6"
            }`}
        >
          {/* Brand Logo - Clear & Properly Proportioned */}
          <Link
            href="#"
            className="group flex items-center select-none cursor-pointer py-0.5"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Yashin Stay Home"
          >
            <div className="relative h-9 sm:h-12 w-20 min-[360px]:w-24 sm:w-36 transition-all duration-300 group-hover:scale-105 active:scale-95 flex items-center">
              <Image
                src="/media/images/logo-full.png"
                alt="Yashin Stay"
                fill
                sizes="(max-width: 640px) 96px, 144px"
                className="object-contain object-left filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links with Animated Sliding Indicator */}
          <nav
            className="hidden lg:flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium text-white/80"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredNav === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${isActive ? "text-amber font-semibold" : "text-white/85 hover:text-white"
                    }`}
                >
                  {/* Sliding Pill Background on Hover or Active */}
                  {(isHovered || isActive) && (
                    <motion.span
                      layoutId="navTabIndicator"
                      className={`absolute inset-0 rounded-full -z-10 ${isActive
                          ? "bg-amber/15 border border-amber/30"
                          : "bg-white/10"
                        }`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Concierge WhatsApp Icon with Pulse Indicator */}
            <a
              href={`https://wa.me/${waClean}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Concierge"
              className="relative hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white transition-all duration-300 border border-white/15 hover:border-transparent hover:scale-108 active:scale-95 group shadow-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="w-4 h-4 text-white group-hover:text-white transition-colors" />
              {/* Online Pulse Dot */}
              <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] border border-forest-dark" />
              </span>
            </a>

            {/* Shimmering "Reserve Stay" CTA Button */}
            <a
              href="#enquiry"
              className="relative group overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-forest-dark font-semibold text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_4px_22px_rgba(197,160,89,0.38)] hover:shadow-[0_6px_28px_rgba(197,160,89,0.58)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
            >
              {/* Continuous Light Sweep Animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/35 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              <span className="relative z-10 font-bold">Reserve</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:text-amber hover:bg-white/15 focus:outline-none transition-all active:scale-90"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Fullscreen Mobile Drawer with Spring Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-forest-dark/98 backdrop-blur-3xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Header Brand Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="relative h-12 w-36">
                <Image
                  src="/media/images/logo-full.png"
                  alt="Yashin Stay"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <div className="flex flex-col gap-4 py-8">
              <span className="text-[10px] tracking-[0.25em] text-amber uppercase font-mono font-semibold">
                Explore The Sanctuary
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-white/90 hover:text-amber transition-colors flex items-center justify-between py-2 border-b border-white/5 active:text-amber"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-amber/60" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Footer Quick Actions */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <a
                href="#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-amber to-amber-light text-forest-dark font-bold text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reserve A Stay</span>
              </a>

              <a
                href={`https://wa.me/${waClean}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-white/15 border border-white/15 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat with Concierge</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
