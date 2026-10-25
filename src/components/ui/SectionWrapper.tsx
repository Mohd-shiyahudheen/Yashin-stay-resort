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
  dark = true,
  style,
}: SectionWrapperProps) {
  const hasBgClass = /\bbg-/.test(className);
  const defaultBg = hasBgClass
    ? ""
    : "bg-forest-dark text-mist";

  return (
    <section
      id={id}
      style={style}
      className={`py-10 sm:py-16 md:py-20 lg:py-24 relative transition-colors ${defaultBg} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 md:px-12 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
