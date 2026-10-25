import React from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { ScrollReveal } from "./ui/ScrollReveal";
import {
  Compass,
  Bird,
  Flame,
  Trees,
  Coffee,
  Camera,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export function Experiences() {
  const iconMap: Record<string, React.ElementType> = {
    trek: Compass,
    birds: Bird,
    campfire: Flame,
    walk: Trees,
    tea: Coffee,
    photo: Camera,
  };

  return (
    <SectionWrapper id="experiences" className="bg-forest-dark text-mist relative overflow-hidden py-20 sm:py-28" dark>
      {/* Background radial glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-moss/20 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="Wilderness Encounters"
        title="Curated Forest Experiences"
        subtitle="Step beyond conventional hospitality. Unearth ancient botanical trails, tea estate panoramas, and peaceful starlit campfire gatherings nestled in Vythiri's cloud forest."
        dark
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {siteData.experiences.map((exp, idx) => {
          const IconComp = iconMap[exp.id] || Sparkles;
          const waExpLink = `https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Hello Yashin Stay, I would like to know more about the "${exp.name}" experience during our stay in Vythiri.`
          )}`;

          return (
            <ScrollReveal key={exp.name} delay={idx * 0.1}>
              <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/12 rounded-3xl p-7 sm:p-8 hover:bg-white/[0.08] transition-all duration-500 hover:border-amber/50 hover:-translate-y-1.5 group flex flex-col justify-between h-full shadow-2xl">
                <div>
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber group-hover:scale-110 group-hover:bg-amber group-hover:text-forest-dark transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-light/95 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {exp.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-amber transition-colors mb-2.5">
                    {exp.name}
                  </h3>
                  <p className="text-mist/80 text-sm leading-relaxed font-light mb-6">
                    {exp.description}
                  </p>
                </div>

                {/* Footer: Duration & WhatsApp Inquire */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-mist/65">
                    <Clock className="w-3.5 h-3.5 text-amber" />
                    <span>{exp.duration}</span>
                  </div>

                  <a
                    href={waExpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-light hover:text-white text-xs font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
