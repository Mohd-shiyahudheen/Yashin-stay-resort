import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "luxury";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  target,
  rel,
  ariaLabel,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider font-medium",
    md: "px-6 py-3 text-xs sm:text-sm uppercase tracking-wider font-semibold",
    lg: "px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-forest-dark font-semibold shadow-[0_4px_22px_rgba(197,160,89,0.35)] hover:shadow-[0_8px_32px_rgba(197,160,89,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-white/30",
    secondary:
      "bg-forest hover:bg-forest-light text-mist-light font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-amber/30 hover:border-amber",
    outline:
      "border border-amber/50 text-forest hover:bg-forest hover:text-mist hover:border-forest font-medium transition-all duration-300",
    whatsapp:
      "bg-gradient-to-r from-[#174F2F] via-[#1E6B3F] to-[#174F2F] hover:from-[#1E6B3F] hover:to-[#247F4B] text-white font-medium border border-white/20 shadow-[0_4px_20px_rgba(23,79,47,0.35)] hover:shadow-[0_6px_28px_rgba(30,107,63,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300",
    luxury:
      "bg-gradient-to-r from-[#B08230] via-[#E8C988] to-[#C5A059] text-forest-dark font-bold tracking-wider border border-white/50 shadow-[0_6px_28px_rgba(197,160,89,0.45)] hover:shadow-[0_10px_38px_rgba(197,160,89,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300",
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full cursor-pointer text-center select-none ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (href.startsWith("http") ? "_blank" : undefined)}
          rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
          className={baseClasses}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
