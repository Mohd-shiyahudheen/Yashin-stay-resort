"use client";

import React from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
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

export function Footer() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-forest-dark text-mist border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative ambient blurred glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-moss/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
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

              <p className="text-mist/75 text-sm sm:text-base leading-relaxed max-w-sm mb-6 font-light">
                An intimate forest retreat featuring our family swimming pool with kids&apos; splash zone, kindergarten play park, scenic photoshoot vistas, and luxury evening ambiance in Vythiri, Wayanad.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-mist/60 font-mono">
              <MapPin className="w-4 h-4 text-amber/80 shrink-0" />
              <span>{siteData.location.village}, {siteData.location.district}, {siteData.location.state}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber mb-6 font-semibold">
              Sanctuary
            </h4>
            <ul className="space-y-3.5 text-sm text-mist/80 font-light">
              <li>
                <a href="#story" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>The Sanctuary & Grounds</span>
                </a>
              </li>
              <li>
                <a href="#stays" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>Pool Cottages & Stays</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>Visual Gallery & Nature</span>
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>Destination & Transit</span>
                </a>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-amber transition-colors flex items-center gap-1.5">
                  <span>Direct Reservations</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber mb-6 font-semibold">
              Concierge & Enquiries
            </h4>
            <ul className="space-y-4 text-sm text-mist/85 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-mist/50">WhatsApp Concierge</span>
                  <a
                    href="https://wa.me/919847123859"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white hover:text-emerald-400 transition-colors"
                  >
                    {siteData.contact.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-mist/50">Direct Line</span>
                  <a
                    href="tel:+919847123859"
                    className="font-medium text-white hover:text-amber transition-colors"
                  >
                    {siteData.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-mist/50">Reservations Email</span>
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="font-medium text-white hover:text-amber transition-colors"
                  >
                    {siteData.contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <h4 className="text-xs font-mono uppercase tracking-widest text-amber mb-3 font-semibold">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteData.socials.instagram.startsWith("http") ? siteData.socials.instagram : "#"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-mist border border-white/10 text-xs transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-amber" />
                <span>Instagram</span>
              </a>
              <a
                href={siteData.socials.facebook.startsWith("http") ? siteData.socials.facebook : "#"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-mist border border-white/10 text-xs transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-amber" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist/60 font-light">
          <p>© {currentYear} {siteData.name}. All rights reserved.</p>
          
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-mist/80 hover:text-amber transition-colors font-mono cursor-pointer py-1 px-3 rounded-full hover:bg-white/5"
          >
            <span>Return to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
