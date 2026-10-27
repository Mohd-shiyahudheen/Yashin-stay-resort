"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/data/siteData";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { CTAButton } from "./ui/CTAButton";
import {
  User,
  Phone,
  Sparkles,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Star,
  Calendar,
} from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    stayType: "6-Bedroom Grand Pool Cottage (6 Rooms)",
    checkIn: "",
    checkOut: "",
    guests: "2 Adults",
    message: "",
  });

  const [todayStr, setTodayStr] = useState<string>("");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  const stayOptions = [
    { label: "6-Bedroom Grand Pool Cottage (6 Rooms)", value: "6-Bedroom Grand Pool Cottage (6 Rooms)", subtitle: "Tariff on Request" },
    { label: "4-Bedroom Hillside Cottage (4 Rooms)", value: "4-Bedroom Hillside Cottage (4 Rooms)", subtitle: "Tariff on Request" },
    { label: "2-Bedroom Sanctuary Cottage (2 Rooms)", value: "2-Bedroom Sanctuary Cottage (2 Rooms)", subtitle: "Tariff on Request" },
    { label: "Full Resort Buyout (All 12 Rooms & Pool)", value: "Full Resort Buyout (All 12 Rooms & Pool)", subtitle: "Tariff on Request" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cleanWaNumber = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  // Calculate nights
  let nights = 1;
  if (formData.checkIn && formData.checkOut) {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    if (diffDays > 0) nights = diffDays;
  }

  const generateEnquiryText = () => {
    return `*New Reservation Enquiry — ${siteData.name}*
────────────────────────────
*Guest Name:* ${formData.name || "Guest"}
*Contact:* ${formData.phone || "Not provided"}
*Selected Dwelling:* ${formData.stayType}
*Dates:* ${formData.checkIn || "Flexible"} → ${formData.checkOut || "Flexible"} (${nights} ${nights === 1 ? "night" : "nights"})
*Guests:* ${formData.guests}
*Tariff:* Requesting current seasonal rates & availability
*Special Notes:* ${formData.message || "None"}
────────────────────────────
_Sent via Yashin Stay Reservation Suite_`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(generateEnquiryText());
    const waUrl = cleanWaNumber
      ? `https://wa.me/${cleanWaNumber}?text=${text}`
      : `https://wa.me/?text=${text}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const mailtoLink = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    `Reservation Enquiry - ${formData.name || siteData.name}`
  )}&body=${encodeURIComponent(generateEnquiryText())}`;

  const inputBase = "w-full px-4 py-3.5 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder-white/35 focus:outline-none transition-all text-sm font-sans input-luxury";

  return (
    <SectionWrapper id="enquiry" className="bg-forest-dark text-mist relative overflow-hidden py-8 sm:py-16 md:py-20" dark>
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-amber/12 rounded-full blur-[150px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-moss/20 rounded-full blur-[150px] pointer-events-none animate-aurora-reverse" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-amber/6 blur-[80px] pointer-events-none" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/25 to-transparent" />

      <SectionHeading
        tag="Direct Reservation Suite"
        title="Plan Your Forest Escape"
        subtitle="Share your preferred stay dates. Our villa host will verify availability and confirm your reservation directly via WhatsApp with transparent group rates."
        dark
      />

      {/* Testimonials anchor */}
      <span id="testimonials" className="absolute -top-24 pointer-events-none" />

      {/* Trust strip */}
      <div className="max-w-xl mx-auto text-center mb-6 sm:mb-10 px-2">
        <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono font-semibold text-mist uppercase tracking-wider px-4 sm:px-5 py-2 bg-white/[0.08] backdrop-blur-md rounded-full border border-amber/25 shadow-[0_0_20px_rgba(197,160,89,0.08)]">
          <div className="flex items-center gap-0.5 text-amber">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
            ))}
          </div>
          <span className="text-white/30">•</span>
          <span>4.9 / 5.0 Rating</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-400">Verified Family Stays</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto w-full min-w-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/12 p-5 sm:p-7 md:p-10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(197,160,89,0.04)] flex flex-col gap-6 sm:gap-8 relative w-full min-w-0 overflow-hidden box-border"
        >
          {/* Form shimmer top accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

          {/* Contact Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-mist/80 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs">
                Direct WhatsApp Concierge: <strong className="text-amber">{siteData.contact.whatsapp}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-light">
              <ShieldCheck className="w-4 h-4 text-amber shrink-0" />
              <span>Direct Best Rates Guaranteed</span>
            </div>
          </div>

          {/* Stay Type Chips */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-3 font-bold">
              1. Select Preferred Dwelling
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stayOptions.map((opt) => {
                const isSelected = formData.stayType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, stayType: opt.value }))}
                    className={`flex flex-col justify-between p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-r from-amber to-amber-light text-forest-dark border-transparent shadow-[0_0_25px_rgba(197,160,89,0.4)] font-bold scale-[1.02]"
                        : "bg-white/[0.05] hover:bg-white/[0.08] text-white border-white/15 hover:border-amber/40 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 animate-shimmer pointer-events-none" />
                    )}
                    <div className="flex items-center justify-between w-full mb-1 relative z-10">
                      <span className="text-xs sm:text-sm font-semibold">{opt.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-forest-dark shrink-0 ml-1" />}
                    </div>
                    <span className={`text-[11px] font-mono relative z-10 ${isSelected ? "text-forest-dark/90 font-bold" : "text-amber-light font-semibold"}`}>
                      {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-2 font-semibold">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-amber absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`${inputBase} pl-11 pr-4`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-2 font-semibold">
                WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-amber absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`${inputBase} pl-11 pr-4`}
                />
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
            <div className="w-full min-w-0">
              <label htmlFor="checkIn" className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-2 font-semibold">
                Check-in Date
              </label>
              <div className="relative w-full min-w-0">
                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  min={todayStr || undefined}
                  value={formData.checkIn}
                  onChange={handleChange}
                  className={`${inputBase} cursor-pointer [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="w-full min-w-0">
              <label htmlFor="checkOut" className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-2 font-semibold">
                Check-out Date
              </label>
              <div className="relative w-full min-w-0">
                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  min={formData.checkIn || todayStr || undefined}
                  value={formData.checkOut}
                  onChange={handleChange}
                  className={`${inputBase} cursor-pointer [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="w-full min-w-0">
              <label htmlFor="guests" className="block text-xs uppercase font-mono tracking-wider text-amber-light mb-2 font-semibold">
                Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full max-w-full min-w-0 box-border block px-4 py-3.5 rounded-2xl bg-[#08130B] border border-white/20 text-white focus:border-amber/70 focus:outline-none transition-all text-sm cursor-pointer font-sans input-luxury"
              >
                <option value="1-2 Adults">1-2 Adults</option>
                <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                <option value="4 Adults (Family)">4 Adults (Family)</option>
                <option value="6-8 Guests (Group)">6-8 Guests (Group)</option>
                <option value="10-18 Guests (Grand Gathering)">10-18 Guests (Grand Gathering)</option>
                <option value="Full Resort Buyout (20+ Guests)">Full Resort Buyout (20+ Guests)</option>
              </select>
            </div>
          </div>

          {/* Tariff Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber/10 to-amber/5 border border-amber/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber font-semibold block">
                Direct Host Confirmation • Best Seasonal Rates
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-serif text-white font-medium">
                  Tariff on Request
                </span>
                <span className="text-xs font-mono text-mist/70">
                  ({nights} {nights === 1 ? "night" : "nights"} duration)
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-1.5 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Complimentary Plantation Breakfast & Family Swimming Pool Access</span>
              </span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-mist/70">
              <ShieldCheck className="w-4 h-4 text-amber shrink-0" />
              <span>Direct Host Confirmation</span>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label htmlFor="message" className="block text-xs uppercase font-mono tracking-wider text-amber-light font-semibold">
                Special Requests & Preferred Amenities
              </label>
              <span className="text-[11px] text-amber-light font-mono font-medium">
                Click to add preferences:
              </span>
            </div>

            {/* Preference Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Family Pool & Kids Splash",
                "Kindergarten Play Park",
                "Photoshoot / Pre-Wedding Session",
                "Starlit Bonfire & BBQ Night",
                "Luxury Candlelight Dinner",
              ].map((badge) => {
                const isSelected = formData.message.includes(badge);
                return (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => {
                        if (prev.message.includes(badge)) {
                          const updated = prev.message
                            .replace(badge, "")
                            .replace(/,\s*,/g, ",")
                            .replace(/^,\s*|,\s*$/g, "")
                            .trim();
                          return { ...prev, message: updated };
                        } else {
                          const updated = prev.message
                            ? `${prev.message}, ${badge}`
                            : badge;
                          return { ...prev, message: updated };
                        }
                      });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer font-sans border ${
                      isSelected
                        ? "bg-gradient-to-r from-amber to-amber-light text-forest-dark border-transparent font-bold shadow-[0_0_15px_rgba(197,160,89,0.35)] scale-105"
                        : "bg-white/[0.06] border-white/20 text-white hover:bg-white/[0.1] hover:border-amber/40 font-medium"
                    }`}
                  >
                    {isSelected ? `✓ ${badge}` : `+ ${badge}`}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="e.g. Family with kids, photoshoot guide, barbecue setup, arrival time..."
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1 flex flex-col gap-4">
            <CTAButton
              type="submit"
              variant="luxury"
              size="lg"
              className="w-full text-sm sm:text-base font-bold shadow-[0_6px_30px_rgba(212,163,70,0.4)] hover:shadow-[0_10px_40px_rgba(212,163,70,0.55)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Send Reservation via WhatsApp</span>
            </CTAButton>

            <div className="flex items-center justify-center gap-2 text-xs text-mist/55 font-mono">
              <Mail className="w-3.5 h-3.5 text-amber" />
              <span>Prefer email enquiry?</span>
              <a
                href={mailtoLink}
                className="text-amber-light hover:text-amber hover:underline font-medium ml-1 transition-colors"
              >
                Send via Email →
              </a>
            </div>
          </div>

          {/* Form bottom accent */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber/25 to-transparent" />
        </form>
      </div>
    </SectionWrapper>
  );
}
