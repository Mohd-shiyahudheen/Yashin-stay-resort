"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Sparkles,
  Camera,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  LayoutGrid,
  Film,
  Eye,
  Waves,
  TreePine,
  Sunset,
  Compass,
} from "lucide-react";

type GalleryCategory = "all" | "resort" | "misty" | "wildlife";

interface FilterTab {
  id: GalleryCategory;
  label: string;
  icon: React.ElementType;
  count: number;
}

export function Gallery() {
  const allSlides = siteData.gallery;
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "cinema">("grid");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Cinema mode states
  const [cinemaIndex, setCinemaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Filter gallery items by category
  const filteredSlides = allSlides.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "resort")
      return (
        item.category.includes("Pool") ||
        item.category.includes("Resort") ||
        item.category.includes("Ambiance")
      );
    if (activeCategory === "misty")
      return item.category.includes("Photoshoot") || item.category.includes("Nature");
    if (activeCategory === "wildlife") return item.category.includes("Wildlife");
    return true;
  });

  const categories: FilterTab[] = [
    {
      id: "all",
      label: "All Views",
      icon: Compass,
      count: allSlides.length,
    },
    {
      id: "resort",
      label: "Resort & Cottages",
      icon: Waves,
      count: allSlides.filter(
        (s) =>
          s.category.includes("Pool") ||
          s.category.includes("Resort") ||
          s.category.includes("Ambiance")
      ).length,
    },
    {
      id: "misty",
      label: "Misty Vistas & Trails",
      icon: TreePine,
      count: allSlides.filter(
        (s) => s.category.includes("Photoshoot") || s.category.includes("Nature")
      ).length,
    },
    {
      id: "wildlife",
      label: "Sanctuary Wildlife",
      icon: Sparkles,
      count: allSlides.filter((s) => s.category.includes("Wildlife")).length,
    },
  ];

  // Helper to open lightbox at a specific photo
  const openPhotoInLightbox = (slideId: string) => {
    const fullIndex = allSlides.findIndex((s) => s.id === slideId);
    setLightboxIndex(fullIndex >= 0 ? fullIndex : 0);
    setLightboxOpen(true);
  };

  // Cinema pagination
  const paginateCinema = useCallback(
    (newDirection: number) => {
      setCinemaIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = allSlides.length - 1;
        if (next >= allSlides.length) next = 0;
        return next;
      });
      setSlideProgress(0);
    },
    [allSlides.length]
  );

  // Auto-scroll the filmstrip when cinemaIndex changes
  useEffect(() => {
    if (viewMode === "cinema" && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[cinemaIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [cinemaIndex, viewMode]);

  // Autoplay timer with progress bar
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "cinema") {
      setSlideProgress(0);
      return;
    }

    const interval = 50;
    const totalTime = 5000;
    const increment = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          paginateCinema(1);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, paginateCinema]);

  // Format slides for lightbox
  const lightboxSlides = allSlides.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    description: item.description,
  }));

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");
  const currentCinemaSlide = allSlides[cinemaIndex];

  // Bento layout classes for grid items (8 unique images)
  const getBentoClasses = (itemIndex: number) => {
    if (activeCategory !== "all") {
      return "col-span-1 h-[320px] sm:h-[360px]";
    }
    switch (itemIndex) {
      case 0:
        // Main pool cottage feature
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 h-[420px] sm:h-[480px] lg:h-[530px]";
      case 1:
        // Grand opening ceremony
        return "col-span-1 h-[250px]";
      case 2:
        // Tropical flora and sconce lighting
        return "col-span-1 h-[250px]";
      case 3:
        // Wayanad Ghats wide panoramic view
        return "col-span-1 sm:col-span-2 h-[320px] sm:h-[350px]";
      case 4:
        // Misty sunbeams
        return "col-span-1 h-[320px] sm:h-[350px]";
      case 5:
        // Canopy avenue
        return "col-span-1 h-[320px] sm:h-[350px]";
      case 6:
        // Wildlife deer
        return "col-span-1 h-[320px] sm:h-[350px]";
      case 7:
        // Wildlife monkey
        return "col-span-1 h-[320px] sm:h-[350px]";
      default:
        return "col-span-1 h-[320px]";
    }
  };

  return (
    <SectionWrapper id="gallery" className="bg-[#070F0A] text-mist relative overflow-hidden" dark>
      {/* Anchor for experiences */}
      <span id="experiences" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/8 rounded-full blur-[120px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-aurora-reverse" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <SectionHeading
        tag="Sanctuary Perspectives • 8 Authentic Scenes"
        title="Sanctuary in Frames"
        subtitle="Immerse yourself in authentic resort perspectives — the sparkling family pool, two-story stone cottages, grand family celebrations, starlit evening pathways, and misty mountain viewpoints."
      />

      <div className="max-w-6xl mx-auto">
        {/* Navigation & Controls Bar: Category Pills + View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.id;
              const IconComponent = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-forest-dark font-bold shadow-[0_0_20px_rgba(201,155,70,0.35)] scale-105"
                      : "text-mist/75 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeGalleryTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber via-amber-light to-amber border border-white/30 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? "bg-forest-dark/30 text-forest-dark" : "bg-white/10 text-mist/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (Mosaic Grid vs Cinema Tour) */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-forest-dark/90 border border-white/15 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-amber text-forest-dark font-bold shadow-sm"
                  : "text-mist/70 hover:text-white"
              }`}
              title="Interactive Mosaic Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("cinema")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                viewMode === "cinema"
                  ? "bg-amber text-forest-dark font-bold shadow-sm"
                  : "text-mist/70 hover:text-white"
              }`}
              title="Cinematic Slideshow Tour"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinema Tour</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 1: EDITORIAL BENTO MOSAIC GRID (User-Friendly & Rich) */}
        {/* ============================================================== */}
        {viewMode === "grid" && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredSlides.map((slide, index) => {
                const bentoSpan = getBentoClasses(index);

                return (
                  <motion.div
                    key={slide.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.04, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-amber/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_20px_45px_rgba(8,19,11,0.9),0_0_25px_rgba(201,155,70,0.18)] ${bentoSpan}`}
                    onClick={() => openPhotoInLightbox(slide.id)}
                  >
                    {/* Background Image with Ambient Zoom */}
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      priority={index === 0}
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/40 to-black/20 group-hover:from-forest-dark/98 group-hover:via-forest-dark/50 transition-colors duration-300" />

                    {/* Subtle Golden Shimmer Line on Hover */}
                    <span className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

                    {/* Top Pill Bar: Category & Expand Icon */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/75 backdrop-blur-md text-amber-light text-[11px] font-mono tracking-wider border border-white/15 shadow-sm">
                        <Camera className="w-3 h-3 text-amber" />
                        <span>{slide.category}</span>
                      </span>

                      <div className="w-8 h-8 rounded-full bg-forest-dark/75 backdrop-blur-md text-white/80 group-hover:text-amber group-hover:bg-forest-dark flex items-center justify-center border border-white/15 group-hover:border-amber/40 transition-all shadow-sm group-hover:scale-110">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Details Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber mb-1 opacity-90">
                        {slide.tag}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-white font-medium drop-shadow leading-snug line-clamp-1 group-hover:text-amber-light transition-colors">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-mist/80 font-light mt-1 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {slide.description}
                      </p>

                      {/* Quick Action Footer on Card Hover */}
                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber">
                          <Eye className="w-3 h-3" />
                          <span>Click to Zoom</span>
                        </span>

                        <span className="text-white/30">•</span>

                        <a
                          href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                            `Hello Yashin Stay, I loved the photo "${slide.title}" on your website and want to ask about booking this stay.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-emerald-200"
                        >
                          <MessageCircle className="w-3 h-3 text-[#25D366]" />
                          <span>Enquire on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 2: CINEMATIC TOUR WITH THUMBNAIL FILMSTRIP */}
        {/* ============================================================== */}
        {viewMode === "cinema" && (
          <div className="relative rounded-3xl bg-forest-dark border border-amber/30 shadow-[0_30px_80px_rgba(8,19,11,0.85),0_0_35px_rgba(201,155,70,0.1)] overflow-hidden">
            {/* Top Stage Control Strip */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5 pb-3 border-b border-white/10 bg-forest-dark/95">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber text-xs font-mono tracking-wider border border-white/15">
                  <Camera className="w-3.5 h-3.5 text-amber" />
                  <span>{currentCinemaSlide.category}</span>
                </span>
                <span className="text-white/40">•</span>
                <span className="text-mist/80 text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {cinemaIndex + 1} / {allSlides.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Autoplay Toggle */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                    isAutoPlaying
                      ? "bg-amber text-forest-dark border-amber font-semibold shadow-[0_0_15px_rgba(201,155,70,0.4)]"
                      : "bg-white/10 text-white border-white/15 hover:bg-white/20"
                  }`}
                  aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Autoplay</span>
                    </>
                  )}
                </button>

                {/* Fullscreen Zoom */}
                <button
                  type="button"
                  onClick={() => openPhotoInLightbox(currentCinemaSlide.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono border border-white/15 transition-all cursor-pointer active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber" />
                  <span className="hidden sm:inline">Full Zoom</span>
                </button>
              </div>
            </div>

            {/* Slide Timer Progress Bar */}
            {isAutoPlaying && (
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber via-amber-light to-amber transition-all duration-75"
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
            )}

            {/* Main Cinema Viewport */}
            <div className="relative w-full h-[50vh] sm:h-[62vh] md:h-[68vh] flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-black/40">
              {/* Blurred background backdrop filling the stage */}
              <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
                <Image
                  key={`blur-${currentCinemaSlide.id}`}
                  src={currentCinemaSlide.src}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-35 scale-125 transition-all duration-700"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-forest-dark/60 backdrop-blur-md" />
              </div>

              {/* Main Image Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCinemaSlide.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
                  onClick={() => openPhotoInLightbox(currentCinemaSlide.id)}
                >
                  <Image
                    src={currentCinemaSlide.src}
                    alt={currentCinemaSlide.alt}
                    fill
                    className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] rounded-xl"
                    sizes="(max-width: 1200px) 100vw, 1100px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Left & Right Pagination Arrows */}
              <button
                type="button"
                onClick={() => paginateCinema(-1)}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-dark/85 hover:bg-amber hover:text-forest-dark text-white border border-white/20 hover:border-amber flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => paginateCinema(1)}
                aria-label="Next slide"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-forest-dark/85 hover:bg-amber hover:text-forest-dark text-white border border-white/20 hover:border-amber flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Interactive Filmstrip Thumbnails Bar */}
            <div className="bg-forest-dark/95 border-t border-white/10 px-4 sm:px-6 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono tracking-wider text-mist/60 uppercase">
                  Jump to Scene
                </span>
                <span className="text-[11px] font-mono text-amber">
                  {allSlides[cinemaIndex].tag}
                </span>
              </div>

              <div
                ref={filmstripRef}
                className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber/30 scrollbar-track-transparent select-none"
              >
                {allSlides.map((slide, idx) => {
                  const isCurrent = idx === cinemaIndex;
                  return (
                    <button
                      key={`thumb-${slide.id}`}
                      type="button"
                      onClick={() => {
                        setCinemaIndex(idx);
                        setSlideProgress(0);
                      }}
                      className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? "border-amber shadow-[0_0_18px_rgba(201,155,70,0.6)] scale-105 opacity-100"
                          : "border-white/15 opacity-50 hover:opacity-90 hover:border-white/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    >
                      <Image
                        src={slide.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-amber/15 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Caption & Quick Booking Strip */}
            <div className="bg-forest-dark border-t border-white/10 px-5 sm:px-8 py-5 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber" />
                    <span className="text-[11px] font-mono tracking-wider uppercase text-amber font-bold">
                      {currentCinemaSlide.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white drop-shadow-sm leading-snug">
                    {currentCinemaSlide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mist/90 font-light mt-1 leading-relaxed">
                    {currentCinemaSlide.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                      `Hello Yashin Stay, I saw the photo "${currentCinemaSlide.title}" and would like more details about booking.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#174F2F] via-[#1E6B3F] to-[#174F2F] hover:from-[#1E6B3F] hover:to-[#247F4B] text-white text-xs font-semibold border border-emerald-400/30 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Enquire This Scene</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openPhotoInLightbox(currentCinemaSlide.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/15 text-white text-xs font-semibold border border-white/20 hover:border-amber/40 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber" />
                    <span>Zoom Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner & Fullscreen Album CTA */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-forest-dark via-[#0C1B10] to-forest-dark border border-amber/25 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber font-semibold block mb-1">
              Want to experience this in person?
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white font-normal">
              Book your tranquil hill stay at Yashin Stay
            </h4>
            <p className="text-xs sm:text-sm text-mist/75 mt-1 max-w-lg">
              12 rooms, 3 private cottages, family swimming pool, children&apos;s play lawn, and mountain mist views in Vythiri, Wayanad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs uppercase tracking-wider border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber" />
              <span>Full Screen Album</span>
            </button>

            <a
              href="#enquiry"
              className="relative group overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-forest-dark font-bold text-xs uppercase tracking-wider shadow-[0_4px_22px_rgba(197,160,89,0.38)] hover:shadow-[0_6px_28px_rgba(197,160,89,0.58)] transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/35 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reserve A Stay</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox for High-Resolution Fullscreen View with Thumbnails & Zoom */}
      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        plugins={[Thumbnails, Zoom]}
      />

      {/* Bottom Subtle Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />
    </SectionWrapper>
  );
}
