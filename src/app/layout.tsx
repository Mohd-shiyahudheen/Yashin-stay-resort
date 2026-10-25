import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/siteData";
import { getLodgingSchema } from "@/lib/schema";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1F3D2B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${siteData.name} — ${siteData.tagline} | Jungle Resort in Wayanad, Kerala`,
  description: siteData.description,
  metadataBase: new URL("https://yashinstay.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteData.name} — Jungle Retreat in Wayanad, Kerala`,
    description: siteData.description,
    url: "/",
    siteName: siteData.name,
    images: [
      {
        url: "/media/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteData.name} — Wayanad Jungle Resort`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} — Jungle Retreat in Wayanad, Kerala`,
    description: siteData.description,
    images: ["/media/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getLodgingSchema();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-mist text-bark font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber focus:text-forest focus:font-semibold focus:rounded-md focus:shadow-lg transition-transform"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
