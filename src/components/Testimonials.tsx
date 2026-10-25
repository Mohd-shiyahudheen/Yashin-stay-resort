import React from "react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { ScrollReveal } from "./ui/ScrollReveal";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const sampleTestimonials = [
    {
      author: "Priya & Rohan M.",
      location: "Bengaluru",
      stay: "6-Bedroom Pool Cottage",
      quote:
        "Our entire family gathered for a weekend reunion. Having the big family pool and spacious rooms amidst Wayanad's mist was an extraordinary experience.",
    },
    {
      author: "David & Sarah K.",
      location: "London, UK",
      stay: "4-Bedroom Pool Cottage",
      quote:
        "The sheer serenity here is remarkable. Relaxing by the swimming pool overlooking the jungle canopy made our Kerala trip unforgettable.",
    },
    {
      author: "Ananya S.",
      location: "Kochi",
      stay: "2-Bedroom Pool Cottage",
      quote:
        "The intimate 2-room cottage was peaceful, scenic, and impeccably maintained. The large family pool and forest sounds made it the ideal getaway.",
    },
  ];

  return (
    <SectionWrapper id="testimonials" className="bg-[#050A06] text-mist relative overflow-hidden" dark>
      <SectionHeading
        tag="Guest Chronicles"
        title="What Our Guests Say"
        subtitle="Memories, impressions, and stories penned by travelers who sought sanctuary in our forest retreat."
      />

      {/* Verified Guest Rating Strip */}
      <div className="max-w-xl mx-auto text-center mb-12 px-2">
        <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono font-semibold text-mist uppercase tracking-wider px-4 sm:px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15 shadow-sm">
          <div className="flex items-center gap-0.5 text-amber">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
            ))}
          </div>
          <span className="text-white/30">•</span>
          <span className="text-white">4.9 / 5.0 Rating</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-400">Verified Family Stays</span>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {sampleTestimonials.map((item, idx) => (
          <ScrollReveal key={item.author} delay={idx * 0.15}>
            <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-[0_20px_40px_rgba(201,160,89,0.15)] transition-all duration-500 border border-white/10 hover:border-amber/40 flex flex-col justify-between h-full relative group hover:-translate-y-1.5">
              <div>
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-white/20 group-hover:text-amber/50 transition-colors" />
                </div>

                <p className="text-mist/95 text-sm sm:text-base italic leading-relaxed mb-6 font-serif">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-medium text-white text-base group-hover:text-amber-light transition-colors">
                    {item.author}
                  </h4>
                  <span className="text-xs text-mist/60 font-light block">
                    {item.location}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-light bg-amber/15 px-2.5 py-1 rounded-full border border-amber/30 font-semibold">
                  {item.stay}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
