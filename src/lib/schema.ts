import { siteData } from "@/data/siteData";

export function getLodgingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteData.name,
    description: siteData.description,
    url: siteData.siteUrl,
    telephone: siteData.contact.phone,
    email: siteData.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteData.location.village,
      addressRegion: siteData.location.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.542740",
      longitude: "76.051415",
    },
    image: "/media/images/og-image.jpg",
    amenityFeature: [
      "Family Swimming Pool with Kids Splash Zone",
      "Kindergarten & Children's Nature Play Park",
      "Scenic Photoshoot & Portrait Backdrops",
      "Enchanting Luxury Ambiance with Starlit Bonfire",
      "Private Hillside Cottages",
      "Western Ghats Nature Setting",
      "Forest Veranda Balconies",
      "Traditional Kerala Breakfast",
    ].map((feature) => ({
      "@type": "LocationFeatureSpecification",
      name: feature,
      value: true,
    })),
  };
}
