"use client";

import React, { useEffect, useRef, useState } from "react";

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-6 sm:mb-8 md:mb-12 ${centered ? "text-center mx-auto" : "text-left"} max-w-3xl ${className} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {tag && (
        <div
          className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : "justify-start"} transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Left ornament */}
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-amber/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber/60 animate-gentle-pulse" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] font-semibold text-amber-light px-3 py-1 rounded-full luxury-badge">
            {tag}
          </span>

          {/* Right ornament */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber/60 animate-gentle-pulse" style={{ animationDelay: "1.25s" }} />
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-amber/70" />
          </div>
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)] transition-all duration-700 delay-150 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed font-light text-mist/90 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Animated underline accent */}
      <div
        className={`mt-5 transition-all duration-1000 delay-300 ${
          centered ? "mx-auto" : ""
        } ${visible ? "opacity-100 w-24" : "opacity-0 w-0"} h-[1px] bg-gradient-to-r from-transparent via-amber/60 to-transparent`}
        style={{ maxWidth: "6rem" }}
      />
    </div>
  );
}
