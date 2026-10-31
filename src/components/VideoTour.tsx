"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { ScrollReveal } from "./ui/ScrollReveal";
import { CTAButton } from "./ui/CTAButton";
import { ReelModal } from "./ReelModal";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  PartyPopper,
  CheckCircle2,
  MessageCircle,
  Smartphone,
  Maximize2,
} from "lucide-react";

export function VideoTour() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Bulletproof autoplay and user-interaction listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property enforcement for browser autoplay policy
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Retrying once muted if policy restricted
            video.muted = true;
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          });
      }
    };

    video.addEventListener("canplay", attemptPlay);
    video.addEventListener("loadeddata", attemptPlay);

    if (video.readyState >= 2) {
      attemptPlay();
    }

    // IntersectionObserver to auto-play when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Passive listener for first user touch/click/scroll to guarantee playback
    const handleGesture = () => {
      if (video.paused) {
        attemptPlay();
      }
    };
    window.addEventListener("pointerdown", handleGesture, { once: true, passive: true });
    window.addEventListener("scroll", handleGesture, { once: true, passive: true });

    return () => {
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("loadeddata", attemptPlay);
      observer.disconnect();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("scroll", handleGesture);
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  return (
    <SectionWrapper
      id="inauguration"
      dark
      style={{ backgroundColor: "#0E1E15", color: "#F4F7F2" }}
      className="bg-forest-dark text-mist relative overflow-hidden py-16 sm:py-24"
    >
      {/* Invisible anchor target for backwards compatibility */}
      <span id="tour" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric ambient lighting effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-moss/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Narrative, Inauguration Highlights & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ScrollReveal direction="left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber/15 border border-amber/30 text-amber text-xs font-mono tracking-wider uppercase mb-5 w-fit">
              <Smartphone className="w-3.5 h-3.5 text-amber" />
              <span>Official Portrait Reel • Always In Motion</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight mb-5">
              The Grand Opening <br />
              <span className="italic font-light text-gradient bg-gradient-to-r from-white via-mist-light to-amber bg-clip-text text-transparent">
                Celebrated in Motion.
              </span>
            </h2>

            <p className="text-mist/80 text-base sm:text-lg font-light leading-relaxed mb-8">
              Experience the celebratory ribbon-cutting, family pool gathering, and serene rainforest atmosphere of Yashin Stay in Vythiri, Wayanad — captured in genuine high-definition vertical video.
            </p>

            {/* 3 Milestone Feature Points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber/20 flex items-center justify-center shrink-0 text-amber mt-0.5">
                  <PartyPopper className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium">
                    Ceremonial Ribbon-Cutting
                  </h3>
                  <p className="text-xs text-mist/75 mt-0.5">
                    Family and guests gathering at the illuminated villa entrance to celebrate our inauguration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber/20 flex items-center justify-center shrink-0 text-amber mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium">
                    12 Ensuite Rooms across 3 Hillside Cottages
                  </h3>
                  <p className="text-xs text-mist/75 mt-0.5">
                    Our 6-room, 4-room, and 2-room villa layouts with Italian marble baths and pool deck access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium">
                    Direct Host WhatsApp Booking
                  </h3>
                  <p className="text-xs text-mist/75 mt-0.5">
                    Instant date availability, custom family packages, and personalized hospitality.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <CTAButton
                href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                  "Hello Yashin Stay, I watched your reel and would like to enquire about reserving a cottage in Vythiri, Wayanad."
                )}`}
                variant="whatsapp"
                size="md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Chat with Host on WhatsApp</span>
              </CTAButton>

              <button
                type="button"
                onClick={() => setIsReelModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-amber hover:text-forest-dark text-white border border-white/20 transition-all duration-300 cursor-pointer font-mono text-xs uppercase tracking-wider font-semibold shadow-md"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Fullscreen Cinema Reel</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Always Playing Muted Vertical Reel Player */}
        <div className="lg:col-span-5 flex justify-center" ref={containerRef}>
          <ScrollReveal direction="right" className="w-full max-w-[340px] sm:max-w-[370px]">
            {/* Phone Bezel / Luxury Vertical Reel Stage */}
            <div className="relative rounded-[2.5rem] p-2.5 sm:p-3 bg-gradient-to-b from-white/25 via-white/10 to-white/5 backdrop-blur-2xl border-2 border-amber/40 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
              <div
                className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-black shadow-inner cursor-pointer"
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? "Pause Video Reel" : "Play Video Reel"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
              >
                {/* Always Playing Muted HTML5 Video */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  poster={siteData.video.poster}
                  className="w-full h-full object-cover scale-102"
                >
                  <source src={siteData.video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Top Overlay Badge & Sound Toggle Button */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-mono z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/85 backdrop-blur-md border border-white/20 text-amber shadow-md">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                    </span>
                    <span>LIVE REEL</span>
                  </span>

                  {/* Sound Toggle (Interactive Mute/Unmute) */}
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                    className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-dark/90 hover:bg-amber hover:text-forest-dark text-white border border-white/25 hover:border-amber transition-all duration-300 shadow-lg cursor-pointer hover:scale-108 active:scale-95"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-light" />
                        <span className="text-[10px] uppercase font-mono">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#25D366] animate-pulse" />
                        <span className="text-[10px] uppercase font-mono text-[#25D366]">Sound On</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Center Paused Indicator (only shows if paused) */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-amber text-forest-dark flex items-center justify-center shadow-xl">
                      <Play className="w-8 h-8 ml-1 fill-forest-dark" />
                    </div>
                    <span className="mt-3 text-xs font-mono text-white tracking-wider uppercase font-semibold">
                      Tap to Play
                    </span>
                  </div>
                )}

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4 z-20 pointer-events-none">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-forest-dark/85 backdrop-blur-md border border-white/15 text-left flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs font-serif font-medium truncate">
                        Yashin Stay • Vythiri
                      </p>
                      <p className="text-amber text-[10px] font-mono mt-0.5 truncate">
                        {isMuted ? "Playing Muted • Tap for sound" : "Sound Enabled"}
                      </p>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-white/80">
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Fullscreen Vertical Smartphone Reel Modal */}
      <ReelModal isOpen={isReelModalOpen} onClose={() => setIsReelModalOpen(false)} />
    </SectionWrapper>
  );
}
