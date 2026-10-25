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

export function OurStory() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const pillars = [
    {
      icon: Waves,
      title: "Family Pool & Kids Zone",
      tag: "Mountain Water",
      description: "Crystal mountain waters with shallow splash zones for children.",
    },
    {
      icon: Smile,
      title: "Kindergarten Play Park",
      tag: "Safe Lawns",
      description: "Swings, slides & manicured lawns safe for all little adventurers.",
    },
    {
      icon: Camera,
      title: "Photoshoot Vistas",
      tag: "Golden Hour",
      description: "Misty mountain horizons & reflecting poolside photography angles.",
    },
    {
      icon: Flame,
      title: "Luxury Evening Glow",
      tag: "Campfire Nights",
      description: "Lantern pathways, starlit campfire & candlelit poolside ambiance.",
    },
  ];

  return (
    <SectionWrapper id="story" className="bg-mist relative overflow-hidden py-8 sm:py-16 md:py-20">
      {/* Anchor targets for backwards-compatibility */}
      <span id="amenities" className="absolute -top-24 pointer-events-none" />
      <span id="inauguration" className="absolute -top-24 pointer-events-none" />
      <span id="tour" className="absolute -top-24 pointer-events-none" />

      {/* Decorative ambient blurred aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-moss/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
        {/* Left Column: Portrait Video Reel with Phone Bezel */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[320px] sm:max-w-[360px]">
            <div className="relative rounded-[2.5rem] p-2.5 sm:p-3 bg-gradient-to-b from-forest/15 via-white/40 to-forest/10 backdrop-blur-2xl border-2 border-amber/40 shadow-[0_20px_50px_rgba(10,20,14,0.18)] group">
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
                  preload="metadata"
                  poster="/media/images/real-pool-cottage.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/media/videos/hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Top Badge: Reel Tag & Sound Toggle */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/85 backdrop-blur-md border border-white/20 text-amber shadow-md">
                    <Smartphone className="w-3 h-3 text-amber" />
                    <span>Resort Reel</span>
                  </span>

                  <button
                    type="button"
                    onClick={toggleSound}
                    className="w-8 h-8 rounded-full bg-forest-dark/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-amber hover:text-forest-dark transition-colors pointer-events-auto cursor-pointer"
                    aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                </div>

                {/* Center Play/Pause Overlay indicator when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-10 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-amber/90 text-forest-dark flex items-center justify-center shadow-xl">
                      <Play className="w-7 h-7 ml-1 fill-forest-dark text-forest-dark" />
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 text-white z-20 pointer-events-none">
                  <div className="px-3.5 py-2 rounded-xl bg-forest-dark/85 backdrop-blur-md border border-white/15">
                    <p className="font-serif text-sm font-medium text-white">Yashin Stay in Motion</p>
                    <p className="text-[10px] text-amber-light/90 font-mono">Vythiri • 12 Rooms Across 3 Cottages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story Narrative & 4 Resort Highlights */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-full">
            <SectionHeading
              title="A Sanctuary Carved in Nature"
              tag="The Sanctuary & Grounds"
              centered={false}
              className="mb-4"
            />

            <div className="space-y-3.5 text-bark/85 text-base sm:text-lg leading-relaxed font-light mb-6">
              <p>
                Tucked into the emerald hillside folds of Vythiri, Wayanad,{" "}
                <strong className="font-semibold text-forest font-serif text-xl">{siteData.name}</strong> was
                crafted for families seeking pure forest tranquility, a large family swimming pool, and understated luxury across 3 hillside cottages.
              </p>
              <p className="text-sm sm:text-base text-bark/75">
                From sunny afternoons by the family swimming pool and laughter on the playground swings to golden-hour photoshoots against misty peaks and starlit campfire evenings, every moment is designed for lasting memories.
              </p>
            </div>

            {/* Quick Sanctuary Stats Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-3 sm:p-4 rounded-2xl bg-white/70 border border-forest/10 text-center shadow-xs">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-forest">12</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-hover font-semibold">Ensuite Rooms</span>
              </div>
              <div className="border-x border-forest/10">
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-forest">3</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-hover font-semibold">Pool Cottages</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-forest">700m</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-hover font-semibold">Misty Altitude</span>
              </div>
            </div>

            {/* 4 Pillars 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7 pt-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-white/80 border border-forest/10 hover:border-amber/45 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber/10 border border-amber/25 flex items-center justify-center text-amber-hover shrink-0 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4 text-amber-hover" />
                        </div>
                        <h4 className="font-serif text-base font-medium text-forest group-hover:text-forest-light transition-colors">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-hover font-semibold px-2 py-0.5 rounded-full bg-amber/10 border border-amber/20 shrink-0">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-xs text-bark/75 leading-relaxed font-light pl-10">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <CTAButton href="#stays" variant="primary" size="md">
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
    </SectionWrapper>
  );
}
