import React from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}

export function SectionWrapper({
  id,
  className = "",
  containerClassName = "",
  children,
  dark = false,
  style,
}: SectionWrapperProps) {
  const hasBgClass = /\bbg-/.test(className);
  const defaultBg = hasBgClass
    ? ""
    : dark
    ? "bg-forest-dark text-mist"
    : "bg-mist text-bark";

  return (
    <section
      id={id}
      style={style}
      className={`py-14 sm:py-20 md:py-28 lg:py-32 relative transition-colors ${defaultBg} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 md:px-12 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
