"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { CTAButton } from "./ui/CTAButton";
import {
  Waves,
  Smile,
  Camera,
  Flame,
  Volume2,
  VolumeX,
  Play,
  ArrowRight,
  Smartphone,
} from "lucide-react";

// Animated counter hook
function useCountUp(target: number, duration = 1500, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

const pillars = [
  {
    icon: Waves,
    title: "Family Pool & Kids Zone",
    tag: "Mountain Water",
    description: "Crystal mountain waters with shallow splash zones for children.",
    color: "from-cyan-500/10 to-blue-600/5",
    borderColor: "hover:border-cyan-400/40",
    glowColor: "rgba(6,182,212,0.15)",
  },
  {
    icon: Smile,
    title: "Kindergarten Play Park",
    tag: "Safe Lawns",
    description: "Swings, slides & manicured lawns safe for all little adventurers.",
    color: "from-emerald-500/10 to-green-600/5",
    borderColor: "hover:border-emerald-400/40",
    glowColor: "rgba(52,211,153,0.15)",
  },
  {
    icon: Camera,
    title: "Photoshoot Vistas",
    tag: "Golden Hour",
    description: "Misty mountain horizons & reflecting poolside photography angles.",
    color: "from-amber/10 to-yellow-600/5",
    borderColor: "hover:border-amber/40",
    glowColor: "rgba(197,160,89,0.2)",
  },
  {
    icon: Flame,
    title: "Luxury Evening Glow",
    tag: "Campfire Nights",
    description: "Lantern pathways, starlit campfire & candlelit poolside ambiance.",
    color: "from-orange-500/10 to-red-600/5",
    borderColor: "hover:border-orange-400/40",
    glowColor: "rgba(249,115,22,0.15)",
  },
];

export function OurStory() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Intersection observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const roomCount = useCountUp(12, 1200, statsVisible);
  const cottageCount = useCountUp(3, 800, statsVisible);

  return (
    <SectionWrapper id="story" className="bg-[#070F0A] text-mist relative overflow-hidden py-8 sm:py-16 md:py-20" dark>
      {/* Anchor targets */}
      <span id="amenities" className="absolute -top-24 pointer-events-none" />
      <span id="inauguration" className="absolute -top-24 pointer-events-none" />
      <span id="tour" className="absolute -top-24 pointer-events-none" />

      {/* ── Ambient aurora orbs ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-moss/8 blur-[130px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber/8 blur-[120px] pointer-events-none animate-aurora-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-900/10 blur-[100px] pointer-events-none" />

      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
        {/* ── Left: Phone Reel ── */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[300px] sm:max-w-[340px]">
            {/* Outer glow ring */}
            <div className="relative">
              {/* Rotating halo */}
              <div className="absolute -inset-4 rounded-[3rem] opacity-30 animate-rotate-halo pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(197,160,89,0.5) 25%, transparent 50%, rgba(197,160,89,0.3) 75%, transparent 100%)",
                  filter: "blur(6px)",
                }}
              />

              <div className="relative rounded-[2.5rem] p-2.5 sm:p-3 bg-gradient-to-b from-white/12 via-forest-light/25 to-white/6 backdrop-blur-2xl border-2 border-amber/45 shadow-[0_30px_70px_rgba(0,0,0,0.7),0_0_40px_rgba(197,160,89,0.12)] group animate-float-slow">
                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/10 z-30" />

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
                  {/* Video */}
                  <video
                    ref={videoRef}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    poster="/media/images/real-pool-cottage.jpg"
                    className="w-full h-full object-cover"
                  >
                    <source src="/media/videos/hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Gradient vignette on video */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-forest-dark/30 pointer-events-none" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-dark/90 backdrop-blur-md border border-amber/25 text-amber shadow-md">
                      <Smartphone className="w-3 h-3 text-amber" />
                      <span>Resort Reel</span>
                    </span>

                    <button
                      type="button"
                      onClick={toggleSound}
                      className="w-8 h-8 rounded-full bg-forest-dark/90 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-amber hover:text-forest-dark transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110"
                      aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                    </button>
                  </div>

                  {/* Play overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-amber/90 text-forest-dark flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.6)]">
                        <Play className="w-8 h-8 ml-1 fill-forest-dark text-forest-dark" />
                      </div>
                    </div>
                  )}

                  {/* Bottom label */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-20 pointer-events-none">
                    <div className="px-3.5 py-2 rounded-xl bg-forest-dark/90 backdrop-blur-md border border-white/15">
                      <p className="font-serif text-sm font-medium text-white">Yashin Stay in Motion</p>
                      <p className="text-[10px] text-amber-light/90 font-mono">Vythiri • 12 Rooms Across 3 Cottages</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Story Content ── */}
        <div className="lg:col-span-7 flex flex-col justify-center" ref={sectionRef}>
          <div className="w-full">
            <SectionHeading
              title="A Sanctuary Carved in Nature"
              tag="The Sanctuary & Grounds"
              centered={false}
              className="mb-4"
            />

            <div className="space-y-3.5 text-white/90 text-base sm:text-lg leading-relaxed font-light mb-6">
              <p>
                Tucked into the emerald hillside folds of Vythiri, Wayanad,{" "}
                <strong className="font-semibold text-white font-serif text-xl sm:text-2xl">{siteData.name}</strong> was
                crafted for families seeking pure forest tranquility, a large family swimming pool, and understated luxury across 3 hillside cottages.
              </p>
              <p className="text-sm sm:text-base text-mist/80 leading-relaxed">
                From sunny afternoons by the family swimming pool and laughter on the playground swings to golden-hour photoshoots against misty peaks and starlit campfire evenings, every moment is designed for lasting memories.
              </p>
            </div>

            {/* ── Animated Stats Strip ── */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-center shadow-lg relative overflow-hidden">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="animate-shimmer absolute inset-0" />
              </div>

              <div className="relative">
                <span className="block font-serif text-3xl sm:text-4xl font-medium text-white text-glow-amber">
                  {statsVisible ? roomCount : 0}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-light font-bold">Ensuite Rooms</span>
              </div>
              <div className="border-x border-white/10 relative">
                <span className="block font-serif text-3xl sm:text-4xl font-medium text-white text-glow-amber">
                  {statsVisible ? cottageCount : 0}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-light font-bold">Pool Cottages</span>
              </div>
              <div className="relative">
                <span className="block font-serif text-3xl sm:text-4xl font-medium text-white text-glow-amber">700m</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-light font-bold">Misty Altitude</span>
              </div>
            </div>

            {/* ── Pillars 2×2 Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7 pt-1">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`flex flex-col gap-1.5 p-4 rounded-2xl bg-gradient-to-br ${pillar.color} bg-white/[0.04] backdrop-blur-xl border border-white/10 ${pillar.borderColor} transition-all duration-400 shadow-md group cursor-default`}
                    style={{
                      transitionDuration: "350ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 35px ${pillar.glowColor}, 0 0 0 1px rgba(255,255,255,0.05)`;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber/15 border border-amber/35 flex items-center justify-center text-amber shrink-0 group-hover:scale-110 group-hover:bg-amber group-hover:text-forest-dark transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(197,160,89,0.4)]">
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-amber-light transition-colors leading-tight">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-light font-bold px-2 py-0.5 rounded-full bg-amber/12 border border-amber/25 shrink-0 whitespace-nowrap">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-mist/80 leading-relaxed font-light pl-[3.25rem]">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <CTAButton href="#stays" variant="luxury" size="md">
                <span>View Pool Cottages</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </CTAButton>
              <CTAButton href="#location" variant="outline" size="md">
                <span>Location & Transit</span>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />
    </SectionWrapper>
  );
}
