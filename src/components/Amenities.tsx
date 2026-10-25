"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { ScrollReveal } from "./ui/ScrollReveal";
import { CTAButton } from "./ui/CTAButton";
import {
  Waves,
  Smile,
  Camera,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Flame,
  Sun,
  Trees,
} from "lucide-react";

export function Amenities() {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [Waves, Smile, Camera, Sparkles];

  const quickBadges = [
    {
      title: "Family Swimming Pool",
      desc: "Freshwater with dedicated kids splash zone",
      icon: Waves,
    },
    {
      title: "Kindergarten Play Area",
      desc: "Swings, slides & soft lawn grounds",
      icon: Smile,
    },
    {
      title: "Photoshoot Backdrops",
      desc: "Pre-wedding & family portrait vistas",
      icon: Camera,
    },
    {
      title: "Luxury Evening Ambiance",
      desc: "Lantern paths, starlit bonfire & candlelight",
      icon: Flame,
    },
  ];

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  return (
    <SectionWrapper id="amenities" className="bg-[#FAF8F3] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-moss/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <SectionHeading
        tag="Resort Highlights & Grounds"
        title="Curated for Family Joy & Timeless Luxury"
        subtitle="Discover our sparkling family pool, dedicated children's kindergarten playground, picturesque photoshoot backdrops, and an enchanting evening ambiance nestled in the Vythiri rainforest."
      />

      {/* Quick 4-Pillar Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {quickBadges.map((badge, idx) => {
          const Icon = badge.icon;
          const isSelected = activeTab === idx;
          return (
            <button
              key={badge.title}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-left p-5 rounded-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? "bg-forest-dark text-white border-amber shadow-xl scale-[1.02]"
                  : "bg-white/80 text-bark border-forest/10 hover:border-amber/50 hover:bg-white shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-amber text-forest-dark font-bold"
                      : "bg-forest/5 text-forest group-hover:bg-amber/15 group-hover:text-amber-hover"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/15 text-amber-light"
                      : "bg-forest/5 text-moss font-semibold"
                  }`}
                >
                  0{idx + 1}
                </span>
              </div>
              <h4
                className={`font-serif text-lg font-medium leading-snug mb-1 ${
                  isSelected ? "text-white" : "text-forest"
                }`}
              >
                {badge.title}
              </h4>
              <p
                className={`text-xs leading-relaxed ${
                  isSelected ? "text-mist/80" : "text-bark/70"
                }`}
              >
                {badge.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Featured Amenity Spotlight Showcase */}
      <ScrollReveal className="mb-14">
        {siteData.luxuryAmenities.map((amenity, idx) => {
          if (idx !== activeTab) return null;
          const IconComponent = icons[idx] || Sparkles;

          const waUrl = waClean
            ? `https://wa.me/${waClean}?text=${encodeURIComponent(
                `Hello Yashin Stay, I would like to enquire about your ${amenity.title} and book a cottage in Wayanad.`
              )}`
            : "#enquiry";

          return (
            <div
              key={amenity.id}
              className="bg-white rounded-3xl shadow-2xl border border-forest/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] bg-forest-dark">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badge Tag */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-dark/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs tracking-wider uppercase font-semibold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber" />
                    <span>{amenity.badge}</span>
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono tracking-widest uppercase text-amber-light">
                      Vythiri Rainforest Grounds
                    </span>
                  </div>
                  <p className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-md">
                    {amenity.title}
                  </p>
                </div>
              </div>

              {/* Right Column: Editorial Details & Features */}
              <div className="lg:col-span-6 p-7 sm:p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-moss font-mono text-xs uppercase tracking-widest font-semibold mb-3">
                    <IconComponent className="w-4 h-4 text-amber" />
                    <span>{amenity.tagline}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-forest font-medium leading-tight mb-4">
                    {amenity.title}
                  </h3>

                  <p className="text-bark/85 text-base sm:text-lg font-light leading-relaxed mb-6">
                    {amenity.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-forest/10">
                    <span className="block text-xs uppercase tracking-wider font-mono text-moss font-semibold">
                      Included Privileges & Features:
                    </span>
                    {amenity.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-bark/90 font-light">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Strip */}
                <div className="pt-6 border-t border-forest/10 flex flex-wrap items-center gap-3">
                  <CTAButton href="#enquiry" variant="luxury" size="md">
                    <span>Reserve Cottage</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </CTAButton>
                  <CTAButton
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="md"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Enquire This Feature</span>
                  </CTAButton>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollReveal>

      {/* Comprehensive Resort Comforts Grid */}
      <div className="bg-forest-dark text-mist rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber text-xs font-mono uppercase tracking-widest mb-3">
            <Trees className="w-3.5 h-3.5" />
            <span>Complete Family Sanctuary</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-3">
            Everything for an Unforgettable Wayanad Holiday
          </h3>
          <p className="text-mist/80 text-sm sm:text-base font-light leading-relaxed mb-8">
            Whether you are swimming under the afternoon sun in the large family pool, watching your kids laugh on the playground swings, snapping breathtaking pre-wedding photographs, or dining beside a crackling campfire, our 12 rooms across 3 hillside cottages offer total comfort.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  Family Pool & Kids Zone
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Natural mountain springwaters with shallow splash steps for children.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  Kindergarten Nature Park
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Swings, slides, lawn games & safe enclosed nature lawns for toddlers.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  Photoshoot Vantage Points
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Misty Western Ghats mountain views, poolside reflections & garden walks.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  Luxury Evening Ambiance
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Warm brass sconces, nightly starlit bonfires, barbecue & candlelight dining.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  Kerala Breakfast Feast
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Hot fresh appams, puttu, and estate coffee included every morning.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-base text-white font-medium mb-1">
                  100% Power & Concierge
                </h5>
                <p className="text-xs text-mist/70 leading-relaxed">
                  Silent generator backup, high-speed fiber Wi-Fi & 24/7 dedicated host care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
