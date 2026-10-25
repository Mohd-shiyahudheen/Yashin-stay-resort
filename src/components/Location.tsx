import React from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import {
  MapPin,
  ArrowUpRight,
  Navigation,
  Plane,
  Train,
  Car,
  Compass,
} from "lucide-react";

export function Location() {
  const transitPoints = [
    {
      icon: Plane,
      title: "Calicut Airport (CCJ)",
      distance: "72 km",
      time: "2.5 Hours scenic drive",
    },
    {
      icon: Train,
      title: "Kozhikode Railway (CLT)",
      distance: "65 km",
      time: "2 Hours mountain route",
    },
    {
      icon: Car,
      title: "Bangalore via Mysore",
      distance: "275 km",
      time: "5.5 Hours NH 766",
    },
    {
      icon: Compass,
      title: "Pookode Lake & Ghat View",
      distance: "6 km",
      time: "10 Mins local excursion",
    },
  ];

  return (
    <SectionWrapper id="location" className="bg-[#050A06] text-mist relative overflow-hidden py-8 sm:py-16 md:py-20" dark>
      <SectionHeading
        tag="Highland Coordinates"
        title="Find Your Way to Yashin Stay"
        subtitle="Vythiri, Wayanad, Kerala • Coordinates: 11°32'33.9&quot;N 76°03'05.1&quot;E • 700m Altitude"
        className="mb-5 sm:mb-8"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Interactive Google Map Embed Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-dark border border-amber/35 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          {/* Top Bar for Map Frame */}
          <div className="px-4 sm:px-8 py-3.5 sm:py-4 bg-forest-dark/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-amber/15 border border-amber/35 flex items-center justify-center text-amber shrink-0">
                <MapPin className="w-4 h-4 text-amber" />
              </span>
              <div>
                <p className="font-serif font-medium text-sm sm:text-base text-white">
                  {siteData.name} • {siteData.location.village}, Wayanad
                </p>
                <p className="text-amber-light font-mono text-[11px] font-semibold">
                  11°32&apos;33.9&quot;N 76°03&apos;05.1&quot;E • {siteData.location.altitude}
                </p>
              </div>
            </div>

            <a
              href={siteData.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber to-amber-light text-forest-dark font-sans text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-forest-dark/20">
            <iframe
              src={siteData.location.embedUrl}
              title="Yashin Stay Resort Google Maps Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[1.1] contrast-[1.05]"
            />
          </div>
        </div>

        {/* Transit & Accessibility Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {transitPoints.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber/40 hover:bg-white/[0.07] transition-all duration-300 shadow-md group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-light font-bold">
                    {pt.distance}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-base font-medium text-white mb-0.5 group-hover:text-amber-light transition-colors truncate">
                  {pt.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-mist/90 font-light truncate">
                  {pt.time}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
