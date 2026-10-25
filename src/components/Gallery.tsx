"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Camera,
  Play,
  Pause,
  MessageCircle,
} from "lucide-react";

export function Gallery() {
  const slides = siteData.gallery;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const currentSlide = slides[currentIndex];

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = slides.length - 1;
        if (next >= slides.length) next = 0;
        return next;
      });
    },
    [slides.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const lightboxSlides = slides.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    description: item.description,
  }));

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <SectionWrapper id="gallery" className="bg-mist relative overflow-hidden">
      {/* Anchor for experiences */}
      <span id="experiences" className="absolute -top-24 pointer-events-none" />

      <SectionHeading
        tag="Rainforest Canvas • Uncropped Full View"
        title="Scenes of Yashin Stay"
        subtitle="Explore real resort photographs in complete, uncropped clarity — from the crystal-clear family swimming pool and two-story cottages to misty mountain peaks and starlit gatherings."
      />

      <div className="max-w-5xl mx-auto">
        {/* Curated Theme Quick Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          {[
            { label: "All Views", targetIndex: 0 },
            { label: "Pool & Stays", targetIndex: 0 },
            { label: "Kindergarten Lawns", targetIndex: 2 },
            { label: "Luxury Evening Glow", targetIndex: 3 },
            { label: "Misty Photoshoot Vistas", targetIndex: 4 },
          ].map((tab) => {
            const isActive = currentIndex === tab.targetIndex;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setDirection(tab.targetIndex > currentIndex ? 1 : -1);
                  setCurrentIndex(tab.targetIndex);
                }}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-forest-dark text-amber-light border border-amber/40 shadow-sm font-semibold scale-105"
                    : "bg-white/80 text-bark/75 hover:text-forest border border-forest/10 hover:border-amber/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Cinema Slider Stage */}
        <div className="relative rounded-3xl bg-forest-dark border border-amber/25 shadow-[0_25px_65px_rgba(8,19,11,0.45)] overflow-hidden">
          {/* Ambient blurred backdrop echoing the current photo colors */}
          <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
            <Image
              key={`blur-${currentSlide.id}`}
              src={currentSlide.src}
              alt=""
              fill
              className="object-cover blur-3xl opacity-25 scale-125 transition-all duration-700"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-forest-dark/70 backdrop-blur-md" />
          </div>

          {/* Top Stage Controls Strip */}
          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6 pb-2 text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber text-xs font-mono tracking-wider uppercase border border-white/15">
                <Camera className="w-3.5 h-3.5 text-amber" />
                <span>{currentSlide.category}</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="text-mist/80 text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Autoplay Toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2 rounded-full border text-xs transition-all ${
                  isAutoPlaying
                    ? "bg-amber text-forest-dark border-amber font-semibold"
                    : "bg-white/10 text-white border-white/15 hover:bg-white/20"
                }`}
                title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Fullscreen Zoom */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono border border-white/15 transition-all cursor-pointer shadow hover:scale-105 active:scale-95"
                title="View full image in high resolution"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber" />
                <span className="hidden sm:inline">Full View</span>
              </button>
            </div>
          </div>

          {/* Uncropped Image Display Stage (object-contain ensures zero cropping) */}
          <div className="relative z-10 w-full h-[52vh] sm:h-[65vh] md:h-[72vh] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  priority={currentIndex === 0}
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Left & Right Arrow Buttons */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-dark/80 hover:bg-amber hover:text-forest-dark text-white border border-white/20 hover:border-amber flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-dark/80 hover:bg-amber hover:text-forest-dark text-white border border-white/20 hover:border-amber flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Caption & Details Footer */}
          <div className="relative z-10 bg-forest-dark/95 border-t border-white/10 px-5 sm:px-8 py-5 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber" />
                  <span className="text-[11px] font-mono tracking-wider uppercase text-amber">
                    {currentSlide.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-mist/80 font-light mt-1.5 leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                    `Hello Yashin Stay, I saw the photo "${currentSlide.title}" and would like more details about booking.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#174F2F] via-[#1E6B3F] to-[#174F2F] hover:from-[#1E6B3F] hover:to-[#247F4B] text-white text-xs font-medium border border-amber/30 shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Enquire This Scene</span>
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-mist text-xs font-medium border border-white/15 transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber" />
                  <span>Zoom Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for High-Resolution Fullscreen Zoom */}
      <Lightbox
        open={lightboxOpen}
        index={currentIndex}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
      />
    </SectionWrapper>
  );
}
