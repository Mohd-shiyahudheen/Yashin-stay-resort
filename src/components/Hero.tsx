"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Leaf, Star, Wind } from "lucide-react";

const heroSlides = [
  {
    src: "/media/images/gallery-real-pool.jpg",
    alt: "Yashin Stay authentic two-story cottage and family swimming pool in Wayanad",
    label: "Pool Cottage",
  },
  {
    src: "/media/images/hero-misty-morning.jpg",
    alt: "Misty morning sunbeams filtering through ancient rainforest trees in Vythiri, Wayanad",
    label: "Misty Sunbeams",
  },
  {
    src: "/media/images/hero-canopy-avenue.jpg",
    alt: "Canopy trail lined with majestic forest trees and fallen red blossoms in Wayanad",
    label: "Canopy Trail",
  },
  {
    src: "/media/images/gallery-wayanad-ghats.jpg",
    alt: "Misty Vythiri ghats rainforest mountain road and emerald canopy in Wayanad",
    label: "Vythiri Rainforest",
  },
  {
    src: "/media/images/real-pool-cottage.jpg",
    alt: "Forest cottage surrounded by tea gardens and misty mountain peaks in Vythiri",
    label: "Tea Plantations",
  },
  {
    src: "/media/images/gallery-wildlife-deer.jpg",
    alt: "Wild spotted deer foraging peacefully in the lush rainforest hills of Wayanad",
    label: "Rainforest Wildlife",
  },
];

// Floating particle config — deterministic to avoid SSR hydration mismatch
const particles = [
  { id: 0, size: 2.1, left: 8.3, delay: 0.5, duration: 18, opacity: 0.45 },
  { id: 1, size: 1.2, left: 18.7, delay: 3.2, duration: 22, opacity: 0.25 },
  { id: 2, size: 3.0, left: 27.4, delay: 6.1, duration: 17, opacity: 0.55 },
  { id: 3, size: 1.5, left: 35.9, delay: 1.8, duration: 20, opacity: 0.35 },
  { id: 4, size: 2.8, left: 44.2, delay: 8.4, duration: 16, opacity: 0.60 },
  { id: 5, size: 1.0, left: 52.6, delay: 4.9, duration: 24, opacity: 0.20 },
  { id: 6, size: 2.5, left: 61.1, delay: 2.3, duration: 19, opacity: 0.50 },
  { id: 7, size: 1.8, left: 70.5, delay: 7.6, duration: 15, opacity: 0.40 },
  { id: 8, size: 3.2, left: 79.3, delay: 0.9, duration: 21, opacity: 0.65 },
  { id: 9, size: 1.3, left: 88.0, delay: 5.5, duration: 23, opacity: 0.30 },
  { id: 10, size: 2.4, left: 12.5, delay: 10.2, duration: 18, opacity: 0.42 },
  { id: 11, size: 1.6, left: 23.8, delay: 7.0, duration: 25, opacity: 0.28 },
  { id: 12, size: 2.9, left: 47.6, delay: 3.8, duration: 16, opacity: 0.58 },
  { id: 13, size: 1.1, left: 58.9, delay: 9.5, duration: 22, opacity: 0.22 },
  { id: 14, size: 2.7, left: 66.3, delay: 1.5, duration: 19, opacity: 0.48 },
  { id: 15, size: 3.5, left: 74.1, delay: 6.7, duration: 17, opacity: 0.70 },
  { id: 16, size: 1.9, left: 83.7, delay: 4.2, duration: 20, opacity: 0.38 },
  { id: 17, size: 2.2, left: 93.4, delay: 11.0, duration: 26, opacity: 0.45 },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-forest-dark">
      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: "-10px",
              background:
                p.id % 3 === 0
                  ? `rgba(197, 160, 89, ${p.opacity})`
                  : p.id % 3 === 1
                  ? `rgba(255, 255, 255, ${p.opacity * 0.4})`
                  : `rgba(52, 211, 153, ${p.opacity * 0.5})`,
              animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
              boxShadow:
                p.id % 3 === 0
                  ? `0 0 ${p.size * 3}px rgba(197, 160, 89, 0.6)`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* ── Background Slideshow ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.07 : 1.0,
              }}
              transition={{
                opacity: { duration: 1.6, ease: "easeInOut" },
                scale: { duration: 7, ease: "easeOut" },
              }}
              className={`absolute inset-0 ${isActive ? "z-10" : "z-0"}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className="object-cover transition-all duration-700"
                sizes="100vw"
              />
            </motion.div>
          );
        })}

        {/* Layered cinematic gradient overlays */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050A06] via-[#050A06]/20 to-[#050A06]/50 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050A06]/40 via-transparent to-[#050A06]/40 pointer-events-none" />
        {/* Vignette ring */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,10,6,0.7) 100%)'}} />
      </div>

      {/* ── Aurora ambient orbs ── */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-900/25 to-transparent blur-[120px] z-[3] animate-aurora pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber/15 to-transparent blur-[100px] z-[3] animate-aurora-reverse pointer-events-none" />

      {/* ── Slide Indicator Pill ── */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-2 bg-black/40 backdrop-blur-2xl px-3 py-1.5 rounded-full border border-white/15 shadow-xl"
        >
          <span className="text-[10px] font-mono text-amber-light tracking-widest uppercase mr-1 hidden sm:inline font-semibold">
            {heroSlides[currentSlide]?.label || ""}
          </span>
          <div className="flex items-center gap-1.5">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentSlide
                    ? "w-7 bg-gradient-to-r from-amber to-amber-light shadow-[0_0_12px_rgba(212,163,70,1)]"
                    : "w-2 bg-white/35 hover:bg-white/70"
                }`}
                aria-label={`Show ${slide.label}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Top Nav Spacer ── */}
      <div className="h-20 sm:h-28 md:h-32" />

      {/* ── Hero Center Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center flex flex-col items-center my-auto">
        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20, scale: isLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest-dark/80 backdrop-blur-xl border border-amber/40 text-white/95 text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] mb-5 sm:mb-7 shadow-[0_0_20px_rgba(197,160,89,0.15)] luxury-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <Leaf className="w-3 h-3 text-emerald-400 opacity-80" />
          <span className="text-amber-light font-medium">Vythiri • Wayanad • 700m Sanctuary</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 25 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal text-white tracking-tight leading-[1.08] mb-3 drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)]"
        >
          Untouched Forest.{" "}
          <br />
          <span className="italic font-light gold-text-gradient-vivid drop-shadow-[0_2px_20px_rgba(197,160,89,0.4)]">
            Timeless Sanctuary.
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-white/70 font-light tracking-wide mb-7 max-w-lg"
        >
          A family haven of pool villas, misty peaks &amp; starlit memories
        </motion.p>

        {/* Stats Quick Bar */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 18, scale: isLoaded ? 1 : 0.97 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto rounded-2xl sm:rounded-full bg-forest-dark/80 backdrop-blur-2xl border border-amber/35 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(8,19,11,0.6),0_0_30px_rgba(197,160,89,0.08)] animate-border-glow"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center sm:text-left">
            {[
              { label: "Cottages", value: "3 Pool Villas" },
              { label: "Capacity", value: "12 Rooms" },
              { label: "Features", value: "Pool & Lawn" },
            ].map((stat) => (
              <div key={stat.label} className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber/30 hover:bg-white/8 transition-all duration-300 group">
                <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-light font-bold group-hover:text-amber transition-colors">{stat.label}</span>
                <span className="block text-xs font-serif text-white font-medium truncate">{stat.value}</span>
              </div>
            ))}
            <a
              href="#enquiry"
              className="hidden sm:flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFBA73] text-forest-dark items-center justify-between font-semibold text-xs tracking-wider uppercase shadow-md hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] transition-all duration-300 group overflow-hidden relative"
            >
              <span className="absolute inset-0 w-1/3 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 ease-out pointer-events-none" />
              <span className="relative z-10">Check Dates</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Star rating micro-bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center gap-2 mt-5"
        >
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3 h-3 fill-amber text-amber" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">4.9 · Verified Family Stays</span>
        </motion.div>
      </div>

      {/* ── Scroll Cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 pb-5 sm:pb-7 flex flex-col items-center justify-center text-center"
      >
        <a
          href="#story"
          className="inline-flex flex-col items-center gap-2 text-white/55 hover:text-amber transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber/50 group-hover:bg-amber/10 transition-all"
          >
            <ChevronDown className="w-3.5 h-3.5 text-amber/80 group-hover:text-amber transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
