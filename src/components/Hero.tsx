"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { CTAButton } from "./ui/CTAButton";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

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
    src: "/media/images/gallery-wildlife-deer.jpg",
    alt: "Spotted deer grazing peacefully in sunlit morning mist of Wayanad forest",
    label: "Wayanad Wildlife",
  },
  {
    src: "/media/images/gallery-wildlife-monkey.jpg",
    alt: "Bonnet macaque monkey perched peacefully in Wayanad rainforest canopy",
    label: "Western Ghats Fauna",
  },
  {
    src: "/media/images/hero-poster.jpg",
    alt: "Yashin Stay luxury pool cottage nestled in Wayanad forest canopy",
    label: "Forest Sanctuary",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");
  const waLink = waClean
    ? `https://wa.me/${waClean}?text=${encodeURIComponent(
        `Hello ${siteData.name}, I would like to enquire about reserving a stay in Wayanad.`
      )}`
    : "#enquiry";

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-forest-dark">
      {/* Background Cinematic Slideshow with Ambient Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" },
              }}
              className={`absolute inset-0 ${isActive ? "z-10" : "z-0"}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className="object-cover filter brightness-[0.82]"
                sizes="100vw"
              />
            </motion.div>
          );
        })}

        {/* Multi-layered Vignette & Cinematic Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-forest-dark via-forest-dark/35 to-forest-dark/65 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-forest-dark/50 via-transparent to-forest-dark/50 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-radial-[circle_at_center,_transparent_0%,_rgba(10,20,14,0.55)_100%] pointer-events-none" />
      </div>

      {/* Subtle Slideshow Indicator Dots */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
        <span className="text-[10px] font-mono text-amber-light tracking-widest uppercase mr-1 hidden sm:inline font-semibold">
          {heroSlides[currentSlide].label}
        </span>
        <div className="flex items-center gap-1.5">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide
                  ? "w-7 bg-gradient-to-r from-amber to-amber-light shadow-[0_0_10px_rgba(212,163,70,0.9)]"
                  : "w-2 bg-white/35 hover:bg-white/70"
              }`}
              aria-label={`Show ${slide.label}`}
            />
          ))}
        </div>
      </div>

      {/* Top Spacer for Nav */}
      <div className="h-28 sm:h-36" />

      {/* Hero Center Content - Clean, Uncluttered & Breathtaking */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center flex flex-col items-center my-auto">
        {/* Subtle Minimalist Location Chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-dark/85 backdrop-blur-md border border-amber/35 text-white/95 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] mb-6 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
          <span className="text-amber-light font-medium">Vythiri • Wayanad • 700m Rainforest Sanctuary</span>
        </motion.div>

        {/* Primary Resort Title */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.08] mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        >
          Untouched Forest. <br />
          <span className="italic font-light bg-gradient-to-r from-[#FFF5DC] via-[#E8C988] to-[#DFBA73] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            Timeless Sanctuary.
          </span>
        </motion.h1>

        {/* Refined, Single-Sentence Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-mist/90 max-w-xl font-light leading-relaxed mb-8 px-2 drop-shadow"
        >
          Hillside cottages & large family swimming pool enveloped in the misty rainforest peaks of Wayanad.
        </motion.p>

        {/* Just Two Clean, Balanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto px-2"
        >
          <CTAButton
            href="#enquiry"
            variant="luxury"
            size="lg"
            className="w-full sm:w-auto shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reserve Cottage</span>
          </CTAButton>

          <CTAButton
            href={waLink}
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto shadow-xl"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Chat with Villa Host</span>
          </CTAButton>
        </motion.div>

        {/* Luxury Highland Sanctuary Quick Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 sm:mt-10 w-full max-w-3xl mx-auto rounded-2xl sm:rounded-full bg-forest-dark/85 backdrop-blur-2xl border border-amber/35 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(8,19,11,0.6)]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber">Resort Living</span>
              <span className="block text-xs font-serif text-white font-medium truncate">3 Pool Cottages</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber">Capacity</span>
              <span className="block text-xs font-serif text-white font-medium truncate">12 Ensuite Rooms</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber">Atmosphere</span>
              <span className="block text-xs font-serif text-white font-medium truncate">Family Pool & Lawn</span>
            </div>
            <a
              href="#enquiry"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFBA73] text-forest-dark flex items-center justify-between font-semibold text-xs tracking-wider uppercase shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Check Dates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Elegant Minimalist Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 pb-6 sm:pb-8 flex flex-col items-center justify-center text-center"
      >
        <a
          href="#story"
          className="inline-flex flex-col items-center gap-1.5 text-white/60 hover:text-amber transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-amber/80 group-hover:text-amber transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
