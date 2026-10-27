"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transitPoints = [
    {
      icon: Plane,
      title: "Calicut Airport (CCJ)",
      distance: "72 km",
      time: "2.5 Hours scenic drive",
      color: "from-sky-500/15 to-sky-600/5",
      borderHover: "hover:border-sky-400/50",
      iconBg: "bg-sky-400/15 border-sky-400/30",
      iconColor: "text-sky-400",
      glow: "0 10px 30px rgba(14,165,233,0.15)",
    },
    {
      icon: Train,
      title: "Kozhikode Railway (CLT)",
      distance: "65 km",
      time: "2 Hours mountain route",
      color: "from-violet-500/15 to-violet-600/5",
      borderHover: "hover:border-violet-400/50",
      iconBg: "bg-violet-400/15 border-violet-400/30",
      iconColor: "text-violet-400",
      glow: "0 10px 30px rgba(139,92,246,0.15)",
    },
    {
      icon: Car,
      title: "Bangalore via Mysore",
      distance: "275 km",
      time: "5.5 Hours NH 766",
      color: "from-amber/15 to-amber/5",
      borderHover: "hover:border-amber/50",
      iconBg: "bg-amber/15 border-amber/30",
      iconColor: "text-amber",
      glow: "0 10px 30px rgba(197,160,89,0.2)",
    },
    {
      icon: Compass,
      title: "Pookode Lake & Ghat View",
      distance: "6 km",
      time: "10 Mins local excursion",
      color: "from-emerald-500/15 to-emerald-600/5",
      borderHover: "hover:border-emerald-400/50",
      iconBg: "bg-emerald-400/15 border-emerald-400/30",
      iconColor: "text-emerald-400",
      glow: "0 10px 30px rgba(52,211,153,0.15)",
    },
  ];

  return (
    <SectionWrapper id="location" className="bg-[#050A06] text-mist relative overflow-hidden py-8 sm:py-16 md:py-20" dark>
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-900/15 blur-[100px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber/8 blur-[100px] pointer-events-none animate-aurora-reverse" />

      {/* Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <SectionHeading
        tag="Highland Coordinates"
        title="Find Your Way to Yashin Stay"
        subtitle="Vythiri, Wayanad, Kerala • Coordinates: 11°32′33.9″N 76°03′05.1″E • 700m Altitude"
        className="mb-5 sm:mb-8"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-6" ref={ref}>
        {/* Map Frame */}
        <div
          className="relative rounded-3xl overflow-hidden border border-amber/30 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(197,160,89,0.06)] transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          {/* Top Bar */}
          <div className="px-4 sm:px-8 py-3.5 sm:py-4 bg-forest-dark/98 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-amber/15 border border-amber/35 flex items-center justify-center text-amber shrink-0 shadow-[0_0_12px_rgba(197,160,89,0.2)]">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber to-amber-light text-forest-dark font-sans text-xs sm:text-sm font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 shadow-md active:scale-95 group overflow-hidden relative"
            >
              <span className="absolute inset-0 w-1/3 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 ease-out" />
              <Navigation className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10" />
            </a>
          </div>

          {/* Map iframe */}
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
              className="w-full h-full filter saturate-[1.15] contrast-[1.05] brightness-[0.9]"
            />
          </div>
        </div>

        {/* Transit Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {transitPoints.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${pt.color} bg-white/[0.03] backdrop-blur-xl border border-white/10 ${pt.borderHover} transition-all duration-400 shadow-md group cursor-default`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `opacity 0.6s ease ${0.15 + idx * 0.08}s, transform 0.6s ease ${0.15 + idx * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = pt.glow;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className={`w-8 h-8 rounded-xl ${pt.iconBg} border flex items-center justify-center ${pt.iconColor} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold ${pt.iconColor}`}>
                    {pt.distance}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-base font-medium text-white mb-0.5 group-hover:text-amber-light transition-colors truncate">
                  {pt.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-mist/80 font-light truncate">
                  {pt.time}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />
    </SectionWrapper>
  );
}
