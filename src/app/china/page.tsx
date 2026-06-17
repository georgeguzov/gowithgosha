import Link from "next/link";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Program from "@/components/Program";
import TripMap from "@/components/TripMap";
import Guide from "@/components/Guide";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Панды и Киберпанк — Авторский тур в Китай",
  description: "Чэнду + Чунцин, 10–18 октября 2026. Авторский тур.",
};

export default function ChinaPage() {
  return (
    <main>
      {/* Back to home */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/60 hover:text-white transition-all duration-300 backdrop-blur-sm"
        >
          ← Все туры
        </Link>
      </div>

      <Hero />
      <Ticker />
      <About />
      <Gallery />
      <Program />
      <TripMap />
      <Guide />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}