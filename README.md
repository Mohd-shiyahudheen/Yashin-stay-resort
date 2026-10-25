# Yashin Stay — Luxury Jungle Resort Website

A high-end, mobile-first single-page marketing website built for **Yashin Stay**, an intimate jungle retreat nestled in the Western Ghats rainforest of Wayanad, Kerala.

---

## ✨ Features & Visual Highlights

- **Bespoke Art Direction**: Tailored luxury color palette with Deep Forest (`#172D20`), Moss (`#3D612E`), Bark (`#2C2117`), Mist (`#F4F7F2`), and Gold accents (`#D9A441`).
- **Editorial Typography**: Pairing of classic serif `Cormorant Garamond` with clean `Inter` sans-serif via `next/font/google` for zero CLS.
- **Glassmorphism & Fluid Navigation**: Frosted glass sticky header that smoothly transitions on scroll with quick WhatsApp concierge access and a slide-in mobile navigation sheet.
- **Cinematic Hero**: Full-screen video background with poster fallback, ambient biosphere status tag, and a floating quick-reservation concierge bar.
- **Interactive Stays Showcase**: Accommodation cards (Treehouse, Villa, Cottage) featuring image zoom on hover, amenity pills, capacity tags, and boutique pricing badges.
- **Vector-Powered Experiences**: Curated wilderness activities featuring Lucide vector icons, duration counters, and subtle gold border glow transitions.
- **Interactive Visual Anthology**: Responsive masonry gallery with category filters (*Landscapes*, *Nature*, *Experiences*, *Dining & Stays*) powered by `yet-another-react-lightbox`.
- **4K Cinematic Video Tour**: Embedded theatre card with pulsing gold play ring and click-to-play audio controls.
- **Transit & Location Guide**: Full destination breakdown with mode indicators (Flight, Train, Drive), coordinates, and direct Google Maps routing.
- **Direct WhatsApp Reservation Suite**: Interactive form with dwelling selection chips, date inputs, and one-click structured WhatsApp deep linking + mailto fallback.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with custom theme tokens & glassmorphic utilities
- **Animations**: Framer Motion with reduced-motion support
- **Icons**: Lucide React & inline custom vectors
- **Lightbox**: `yet-another-react-lightbox`
- **SEO & Structured Data**: Schema.org `LodgingBusiness` JSON-LD & Open Graph metadata

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📝 Updating Resort Details & Media

All text, contact information, rates, and distances are managed centrally in:
👉 [`src/data/siteData.ts`](file:///d:/Test%20project/Yashin%20Stay%20Website/src/data/siteData.ts)

To replace placeholder images or videos with real resort photography:
- Images: Drop into `/public/media/images/`
- Videos: Drop `hero.mp4` and `tour.mp4` into `/public/media/videos/`
