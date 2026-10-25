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

  return (
    <SectionWrapper id="enquiry" className="bg-forest-dark text-mist relative overflow-hidden py-8 sm:py-16 md:py-20" dark>
      {/* Decorative ambient blurred circles */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 bg-moss/20 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="Direct Reservation Suite"
        title="Plan Your Forest Escape"
        subtitle="Share your preferred stay dates. Our villa host will verify availability and confirm your reservation directly via WhatsApp with transparent group rates."
        dark
      />

      {/* Testimonials Anchor & Verified Guest Trust Strip */}
      <span id="testimonials" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-xl mx-auto text-center mb-5 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono font-semibold text-mist uppercase tracking-wider px-3.5 sm:px-5 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15 shadow-sm">
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

      <div className="max-w-3xl mx-auto w-full min-w-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] backdrop-blur-2xl border border-white/15 p-4 sm:p-7 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-5 sm:gap-8 relative w-full min-w-0 overflow-hidden box-border"
        >
          {/* Official Resort Contact Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-mist/80 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs">
                Direct WhatsApp Concierge: <strong className="text-amber">{siteData.contact.whatsapp}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-light">
              <ShieldCheck className="w-4 h-4 text-amber shrink-0" />
              <span>Direct Best Rates Guaranteed</span>
            </div>
          </div>

          {/* Stay Type Choice Chips */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-amber mb-3 font-semibold">
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
                    className={`flex flex-col justify-between p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-amber to-amber-light text-forest-dark border-amber shadow-lg shadow-amber/25 font-semibold scale-102"
                        : "bg-white/5 hover:bg-white/10 text-mist/90 border-white/10 hover:border-amber/30"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-forest-dark shrink-0 ml-1" />}
                    </div>
                    <span className={`text-[11px] font-mono ${isSelected ? "text-forest-dark/80 font-bold" : "text-amber-light/80"}`}>
                      {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 mb-2 font-medium"
              >
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-amber/80 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:border-amber focus:bg-white/10 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 mb-2 font-medium"
              >
                WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-amber/80 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:border-amber focus:bg-white/10 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
            <div className="w-full min-w-0">
              <label
                htmlFor="checkIn"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 mb-2 font-medium"
              >
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
                  className="w-full max-w-full min-w-0 box-border block pl-4 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white focus:border-amber focus:bg-white/10 focus:outline-none transition-all text-sm [color-scheme:dark] cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-amber/80 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="w-full min-w-0">
              <label
                htmlFor="checkOut"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 mb-2 font-medium"
              >
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
                  className="w-full max-w-full min-w-0 box-border block pl-4 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white focus:border-amber focus:bg-white/10 focus:outline-none transition-all text-sm [color-scheme:dark] cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-amber/80 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="w-full min-w-0">
              <label
                htmlFor="guests"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 mb-2 font-medium"
              >
                Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full max-w-full min-w-0 box-border block px-4 py-3.5 rounded-2xl bg-[#0B1710] border border-white/15 text-white focus:border-amber focus:outline-none transition-all text-sm cursor-pointer"
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

          {/* Direct Host Reservation Privileges */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber/10 border border-amber/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber font-semibold block">
                Direct Host Confirmation • Best Seasonal Rates
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-serif text-white font-medium">
                  Tariff on Request
                </span>
                <span className="text-xs font-mono text-mist/75">
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
              <label
                htmlFor="message"
                className="block text-xs uppercase font-mono tracking-wider text-mist/90 font-medium"
              >
                Special Requests & Preferred Amenities
              </label>
              <span className="text-[11px] text-amber-light font-mono">
                Click to add preferences:
              </span>
            </div>

            {/* Quick Preference / Feature Badges */}
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
                    className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-sans border ${
                      isSelected
                        ? "bg-amber text-forest-dark border-amber font-semibold shadow-md"
                        : "bg-white/5 border-white/15 text-mist/80 hover:bg-white/10 hover:border-amber/40"
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
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:border-amber focus:bg-white/10 focus:outline-none transition-all text-sm resize-none"
              />
            </div>
          </div>

          {/* Submission Action with Shimmer Button */}
          <div className="pt-2 flex flex-col gap-4">
            <CTAButton
              type="submit"
              variant="luxury"
              size="lg"
              className="w-full text-sm sm:text-base font-bold shadow-[0_6px_30px_rgba(212,163,70,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Send Reservation via WhatsApp</span>
            </CTAButton>

            <div className="flex items-center justify-center gap-2 text-xs text-mist/60 font-mono">
              <Mail className="w-3.5 h-3.5 text-amber" />
              <span>Prefer email enquiry?</span>
              <a
                href={mailtoLink}
                className="text-amber-light hover:underline font-medium ml-1"
              >
                Send via Email →
              </a>
            </div>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
