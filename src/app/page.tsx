import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { Stays } from "@/components/Stays";
import { Gallery } from "@/components/Gallery";
import { Location } from "@/components/Location";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Footer } from "@/components/Footer";
import { FloatingConcierge } from "@/components/FloatingConcierge";

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#050A06] text-mist overflow-x-hidden w-full selection:bg-amber selection:text-forest-dark">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <OurStory />
        <Stays />
        <Gallery />
        <Location />
        <EnquiryForm />
      </main>
      <Footer />
      <FloatingConcierge />
    </div>
  );
}
