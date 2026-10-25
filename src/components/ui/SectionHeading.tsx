import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  tag,
  centered = true,
  dark = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-6 sm:mb-8 md:mb-12 ${centered ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      {tag && (
        <div className={`flex items-center gap-2.5 mb-3.5 ${centered ? "justify-center" : "justify-start"}`}>
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber/80" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold text-amber-light">
            {tag}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber/80" />
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-light text-mist/95">
          {subtitle}
        </p>
      )}
    </div>
  );
}
