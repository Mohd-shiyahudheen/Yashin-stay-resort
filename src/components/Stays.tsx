"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { CTAButton } from "./ui/CTAButton";
import {
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Waves,
  BedDouble,
  MessageCircle,
} from "lucide-react";

export function Stays() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredStays =
    selectedFilter === "all"
      ? siteData.stays
      : siteData.stays.filter((s) => s.id === selectedFilter);

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  return (
    <SectionWrapper id="stays" className="bg-[#050A06] text-mist relative" dark>
      <SectionHeading
        tag="Hillside Cottages & Family Pool"
        title="Our Cottages & Pool Stay"
        subtitle="12 total rooms spread across 3 dedicated hillside cottages. Each cottage features ensuite bedrooms, panoramic forest sit-outs, and direct access to our large family swimming pool."
      />

      {/* Property Overview Pill */}
      <div className="max-w-2xl mx-auto -mt-2 sm:-mt-4 mb-5 sm:mb-8 text-center px-2">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-lg text-xs font-mono text-mist">
          <div className="flex items-center gap-1.5 font-semibold text-amber-light">
            <BedDouble className="w-4 h-4 text-amber" />
            <span>12 Total Rooms</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-1.5 font-semibold text-amber-light">
            <Sparkles className="w-4 h-4 text-amber" />
            <span>3 Hillside Cottages</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Big Family Swimming Pool</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-10">
        {[
          { label: "All Residences", value: "all" },
          { label: "6-Bedroom (Up to 18)", value: "cottage-6" },
          { label: "4-Bedroom (Up to 12)", value: "cottage-4" },
          { label: "2-Bedroom (Up to 6)", value: "cottage-2" },
        ].map((tab) => {
          const isActive = selectedFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-amber to-amber-light text-forest-dark border-amber shadow-lg shadow-amber/25 font-bold scale-105"
                  : "bg-white/[0.06] text-white/85 hover:text-white border border-white/15 hover:border-amber/40 font-medium"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredStays.map((stay, idx) => {
          const cottageWaText = encodeURIComponent(
            `Hello Yashin Stay, I am interested in reserving the "${stay.name}" in Vythiri, Wayanad. Please let me know available dates.`
          );
          const cottageWaLink = `https://wa.me/${waClean}?text=${cottageWaText}`;

          return (
            <div key={stay.id} className="h-full">
              <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(201,155,70,0.22)] transition-all duration-500 flex flex-col h-full border border-white/10 hover:border-amber/50 group hover:-translate-y-2">
                {/* Image Container with Badge & Rate */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/10">
                  <Image
                    src={stay.image}
                    alt={stay.alt}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/25 to-black/30" />

                  {/* Stay Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/90 backdrop-blur-md text-amber-light text-[11px] font-mono tracking-wider uppercase border border-amber/30 shadow-md font-semibold">
                      <Waves className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{stay.badge}</span>
                    </span>
                  </div>

                  {/* Rate & Capacity Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      <Users className="w-3.5 h-3.5 text-amber" />
                      <span>{stay.capacity}</span>
                    </div>

                    <span className="inline-block bg-gradient-to-r from-[#C5A059] to-[#DFBA73] text-forest-dark px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-md">
                      {stay.rate}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white group-hover:text-amber-light transition-colors mb-1.5">
                      {stay.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block text-xs font-mono text-amber-light font-bold uppercase tracking-wider">
                        {stay.rooms} • Natural Pool Privileges
                      </span>
                    </div>

                    {/* Amenities List */}
                    <div className="mb-5 pt-3.5 border-t border-white/10">
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-amber-light font-bold mb-2.5">
                        Included Privileges
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {stay.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.07] border border-white/15 text-white text-xs font-medium hover:border-amber/40 transition-colors"
                          >
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <a
                      href={cottageWaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-[#25D366]/20 text-white hover:text-emerald-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-white/15 hover:border-emerald-400/50 shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inquire via Host</span>
                    </a>

                    <CTAButton
                      href="#enquiry"
                      variant="luxury"
                      size="sm"
                      className="text-xs font-bold"
                    >
                      <span>Check Dates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

