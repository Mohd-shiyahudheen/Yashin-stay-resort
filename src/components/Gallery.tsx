"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Waves,
  TreePine,
  Sunset,
  Compass,
  X,
  ExternalLink,
} from "lucide-react";

type GalleryCategory = "all" | "architecture" | "rooms" | "leisure";

interface FilterTab {
  id: GalleryCategory;
  label: string;
  icon: React.ElementType;
  count: number;
}

export function Gallery() {
  const allSlides = siteData.gallery;
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Filter gallery items by category
  const filteredSlides = allSlides.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "architecture")
      return item.category.includes("Architecture") || item.category.includes("Moments");
    if (activeCategory === "rooms")
      return item.category.includes("Rooms");
    if (activeCategory === "leisure")
      return item.category.includes("Leisure") || item.category.includes("Play");
    return true;
  });

  const categories: FilterTab[] = [
    {
      id: "all",
      label: "All Perspectives",
      icon: Compass,
      count: allSlides.length,
    },
    {
      id: "architecture",
      label: "Architecture & Pool",
      icon: Waves,
      count: allSlides.filter(
        (i) => i.category.includes("Architecture") || i.category.includes("Moments")
      ).length,
    },
    {
      id: "rooms",
      label: "Suites & Interior",
      icon: Sunset,
      count: allSlides.filter((i) => i.category.includes("Rooms")).length,
    },
    {
      id: "leisure",
      label: "Garden & Leisure",
      icon: TreePine,
      count: allSlides.filter((i) => i.category.includes("Leisure") || i.category.includes("Play")).length,
    },
  ];

  const openLightbox = (indexInFiltered: number) => {
    const item = filteredSlides[indexInFiltered];
    const globalIdx = allSlides.findIndex((s) => s.id === item.id);
    setCurrentIndex(globalIdx >= 0 ? globalIdx : 0);
    setLightboxOpen(true);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen, nextSlide, prevSlide]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (lightboxOpen && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex, lightboxOpen]);

  const activeSlide = allSlides[currentIndex] || allSlides[0];
  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  // Bento grid height styling
  const getBentoSpan = (index: number) => {
    switch (index % 6) {
      case 0:
        return "md:col-span-2 md:row-span-2 min-h-[380px] sm:min-h-[460px]";
      case 1:
        return "md:col-span-1 min-h-[260px] sm:min-h-[300px]";
      case 2:
        return "md:col-span-1 min-h-[260px] sm:min-h-[300px]";
      case 3:
        return "md:col-span-1 min-h-[280px] sm:min-h-[320px]";
      case 4:
        return "md:col-span-2 min-h-[280px] sm:min-h-[320px]";
      default:
        return "md:col-span-1 min-h-[260px] sm:min-h-[300px]";
    }
  };

  return (
    <SectionWrapper id="gallery" className="bg-[#070F0A] text-mist relative overflow-hidden py-16 sm:py-24" dark>
      {/* Anchors for smooth navigation */}
      <span id="areas" className="absolute -top-24 pointer-events-none" />
      <span id="tour" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/8 rounded-full blur-[120px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-aurora-reverse" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <SectionHeading
        tag="Sanctuary Perspectives • 12 Authentic Frames"
        title="Sanctuary in Frames"
        subtitle="Explore authentic photography of Yashin Stay — from sparkling family pool sun decks and stone-clad villas to executive king suites and starry night garden walkways in Vythiri, Wayanad."
      />

      <div className="max-w-6xl mx-auto">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((tab) => {
            const isActive = activeCategory === tab.id;
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
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

        {/* Dynamic Animated Bento Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSlides.map((item, index) => {
              const spanClass = getBentoSpan(index);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => openLightbox(index)}
                  className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer bg-forest-dark border border-white/10 hover:border-amber/60 shadow-lg hover:shadow-[0_15px_40px_rgba(197,160,89,0.18)] transition-all duration-500 ${spanClass}`}
                >
                  {/* Photo Canvas */}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Layered Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/85 backdrop-blur-md border border-amber/35 text-amber text-[10px] font-mono tracking-wider uppercase shadow-md">
                      <Sparkles className="w-2.5 h-2.5 text-amber" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Top-Right Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-forest-dark/80 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-amber group-hover:border-amber group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Captions & Info */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-light font-semibold mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-white line-clamp-1 group-hover:text-amber-light transition-colors drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-xs text-mist/75 font-light line-clamp-2 mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Bespoke Fullscreen Animated Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar: Title & Close Button */}
            <div
              className="flex items-center justify-between z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber/20 border border-amber/40 text-amber font-mono text-xs uppercase tracking-wider">
                  {activeSlide.tag}
                </span>
                <span className="text-white/60 font-mono text-xs hidden sm:inline">
                  {currentIndex + 1} / {allSlides.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                    `Hello Yashin Stay, I am interested in reserving the cottage featuring "${activeSlide.title}". Could you share availability and rates?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mr-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Enquire on WhatsApp</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-amber text-white hover:text-forest-dark border border-white/20 transition-all duration-300 cursor-pointer group"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Central Stage: High-Resolution Photo + Prev / Next Arrows */}
            <div
              className="relative flex-1 flex items-center justify-center my-3 sm:my-4 max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Arrow */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-amber text-white hover:text-forest-dark border border-white/20 transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Photo */}
              <div className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  fill
                  priority
                  className="object-contain select-none"
                  sizes="100vw"
                />

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                  <h2 className="font-serif text-lg sm:text-2xl text-white font-medium drop-shadow-md">
                    {activeSlide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-mist/85 font-light mt-1 max-w-2xl drop-shadow-sm">
                    {activeSlide.description}
                  </p>
                </div>
              </div>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-amber text-white hover:text-forest-dark border border-white/20 transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Filmstrip Thumbnails */}
            <div
              className="z-20 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={filmstripRef}
                className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto px-2 py-1 scrollbar-none"
              >
                {allSlides.map((thumb, idx) => {
                  const isThumbActive = idx === currentIndex;
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isThumbActive
                          ? "ring-2 ring-amber scale-105 shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                          : "opacity-45 hover:opacity-85 border border-white/20"
                      }`}
                    >
                      <Image
                        src={thumb.src}
                        alt={thumb.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
