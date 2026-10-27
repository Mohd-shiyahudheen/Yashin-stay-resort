"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Leaf,
  Star,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Star positions — deterministic to avoid SSR hydration mismatch
const stars = [
  { id: 0, top: 8.3, left: 5.2, delay: 0.5, duration: 3.8, size: 1 },
  { id: 1, top: 15.7, left: 22.4, delay: 1.2, duration: 2.6, size: 2 },
  { id: 2, top: 3.1, left: 38.9, delay: 2.8, duration: 4.2, size: 1 },
  { id: 3, top: 22.5, left: 51.3, delay: 0.3, duration: 3.1, size: 1 },
  { id: 4, top: 11.9, left: 67.8, delay: 3.5, duration: 2.9, size: 2 },
  { id: 5, top: 5.6, left: 82.1, delay: 1.9, duration: 4.5, size: 1 },
  { id: 6, top: 28.4, left: 14.6, delay: 4.1, duration: 3.3, size: 1 },
  { id: 7, top: 18.2, left: 44.7, delay: 2.2, duration: 2.7, size: 2 },
  { id: 8, top: 7.5, left: 58.9, delay: 0.8, duration: 3.9, size: 1 },
  { id: 9, top: 35.1, left: 74.3, delay: 3.7, duration: 4.1, size: 1 },
  { id: 10, top: 42.8, left: 29.2, delay: 1.5, duration: 2.5, size: 2 },
  { id: 11, top: 13.4, left: 91.7, delay: 2.6, duration: 3.6, size: 1 },
  { id: 12, top: 50.2, left: 7.8, delay: 0.1, duration: 4.8, size: 1 },
  { id: 13, top: 25.7, left: 34.1, delay: 3.9, duration: 2.3, size: 1 },
  { id: 14, top: 47.6, left: 63.5, delay: 1.1, duration: 3.4, size: 2 },
  { id: 15, top: 9.3, left: 48.2, delay: 4.4, duration: 4.0, size: 1 },
  { id: 16, top: 39.5, left: 87.6, delay: 2.0, duration: 2.8, size: 1 },
  { id: 17, top: 55.8, left: 19.9, delay: 3.3, duration: 3.7, size: 1 },
  { id: 18, top: 21.3, left: 76.4, delay: 0.6, duration: 4.3, size: 2 },
  { id: 19, top: 44.1, left: 42.8, delay: 2.9, duration: 3.0, size: 1 },
];

export function Footer() {
  const currentYear = 2026;
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="bg-forest-dark text-mist border-t border-amber/15 pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 relative overflow-hidden">
      {/* ── Top divider glow ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />

      {/* ── Star field ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Aurora glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-moss/10 rounded-full blur-[140px] pointer-events-none animate-aurora" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber/6 rounded-full blur-[100px] pointer-events-none animate-aurora-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/10">

          {/* ── Brand Column ── */}
          <div
            className="lg:col-span-5 flex flex-col justify-between transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <div>
              <div className="mb-5">
                <div className="relative h-14 sm:h-20 w-36 sm:w-52">
                  <Image
                    src="/media/images/logo-full.png"
                    alt="Yashin Stay Official Logo"
                    fill
                    sizes="(max-width: 640px) 144px, 208px"
                    className="object-contain object-left filter drop-shadow-lg"
                  />
                </div>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm mb-5 font-light">
                An intimate forest retreat featuring our family swimming pool with kids&apos; splash zone, kindergarten play park, scenic photoshoot vistas, and luxury evening ambiance in Vythiri, Wayanad.
              </p>

              {/* Rating strip */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
                  ))}
                </div>
                <span className="text-xs font-mono text-white/50 tracking-wide">4.9 · Verified Family Stays</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/70 font-mono bg-white/[0.03] border border-white/8 px-3 py-2 rounded-xl w-fit">
              <MapPin className="w-4 h-4 text-amber shrink-0" />
              <span>{siteData.location.village}, {siteData.location.district}, {siteData.location.state}</span>
            </div>
          </div>

          {/* ── Navigation Column ── */}
          <div
            className="lg:col-span-3 transition-all duration-700 delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-3.5 h-3.5 text-amber" />
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-light font-bold">
                Sanctuary
              </h4>
            </div>
            <ul className="space-y-3.5 text-sm text-white/80 font-normal">
              {[
                { href: "#story", label: "The Sanctuary & Grounds" },
                { href: "#stays", label: "Pool Cottages & Stays" },
                { href: "#gallery", label: "Visual Gallery & Nature" },
                { href: "#location", label: "Destination & Transit" },
                { href: "#enquiry", label: "Direct Reservations" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-amber transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-amber group-hover:w-4 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div
            className="lg:col-span-4 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-light mb-6 font-bold">
              Concierge & Enquiries
            </h4>
            <ul className="space-y-4 text-sm text-white/90 mb-8">
              {[
                {
                  icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
                  bg: "bg-emerald-400/10 border-emerald-400/20",
                  label: "WhatsApp Concierge",
                  value: siteData.contact.whatsapp,
                  href: "https://wa.me/919847123859",
                  hoverColor: "hover:text-emerald-400",
                },
                {
                  icon: <Phone className="w-4 h-4 text-amber" />,
                  bg: "bg-amber/10 border-amber/20",
                  label: "Direct Line",
                  value: siteData.contact.phone,
                  href: `tel:+919847123859`,
                  hoverColor: "hover:text-amber",
                },
                {
                  icon: <Mail className="w-4 h-4 text-amber" />,
                  bg: "bg-amber/10 border-amber/20",
                  label: "Reservations Email",
                  value: siteData.contact.email,
                  href: `mailto:${siteData.contact.email}`,
                  hoverColor: "hover:text-amber",
                },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${item.bg} border flex items-center justify-center shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-amber-light font-semibold">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`font-medium text-white ${item.hoverColor} transition-colors`}
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-mono uppercase tracking-widest text-amber mb-4 font-semibold">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteData.socials.instagram.startsWith("http") ? siteData.socials.instagram : "#"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 text-mist hover:text-pink-300 border border-white/10 hover:border-pink-400/30 text-xs transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-amber group-hover:text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href={siteData.socials.facebook.startsWith("http") ? siteData.socials.facebook : "#"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-blue-600/15 text-mist hover:text-blue-300 border border-white/10 hover:border-blue-400/30 text-xs transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-amber" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist/50 font-light">
          <p>© {currentYear} {siteData.name}. All rights reserved. &nbsp;·&nbsp; Vythiri, Wayanad, Kerala</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-mist/70 hover:text-amber transition-colors font-mono cursor-pointer py-2 px-4 rounded-full hover:bg-amber/10 border border-transparent hover:border-amber/25"
          >
            <span>Return to top</span>
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:bg-amber group-hover:border-amber group-hover:text-forest-dark transition-all duration-300">
              <ArrowUp className="w-2.5 h-2.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
