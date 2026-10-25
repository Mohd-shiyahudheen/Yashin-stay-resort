import React from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { ScrollReveal } from "./ui/ScrollReveal";
import { MapPin, ArrowUpRight, Navigation } from "lucide-react";

export function Location() {
  return (
    <SectionWrapper id="location" className="bg-mist relative overflow-hidden py-14 sm:py-20">
      <SectionHeading
        tag="Resort Location"
        title="Find Your Way to Yashin Stay"
        subtitle="Vythiri, Wayanad, Kerala • Coordinates: 11°32'33.9&quot;N 76°03'05.1&quot;E"
        className="mb-8 sm:mb-10"
      />

      {/* Interactive Google Map Embed Frame */}
      <ScrollReveal className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-forest-dark border border-forest/15 shadow-2xl">
          {/* Top Bar for Map Frame */}
          <div className="px-5 sm:px-8 py-4 bg-forest-dark/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center text-amber">
                <MapPin className="w-4 h-4 text-amber" />
              </span>
              <div>
                <p className="font-serif font-medium text-sm sm:text-base text-white">
                  {siteData.name} • {siteData.location.village}, Wayanad
                </p>
                <p className="text-mist/70 font-mono text-[11px]">
                  11°32&apos;33.9&quot;N 76°03&apos;05.1&quot;E • {siteData.location.altitude}
                </p>
              </div>
            </div>

            <a
              href={siteData.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber text-forest-dark font-sans text-xs sm:text-sm font-semibold hover:bg-amber-light transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] bg-forest-dark/20">
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
      </ScrollReveal>
    </SectionWrapper>
  );
}

