import Link from "next/link";
import Hero from "@/components/japan/Hero";
import Ticker from "@/components/japan/Ticker";
import About from "@/components/japan/About";
import Gallery from "@/components/japan/Gallery";
import Program from "@/components/japan/Program";
import TripMap from "@/components/japan/TripMap";
import Guide from "@/components/Guide";
import Pricing from "@/components/japan/Pricing";
import Preparation from "@/components/japan/Preparation";
import FAQ from "@/components/japan/FAQ";
import ContactForm from "@/components/japan/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "От Огня к Снегу — Авторский тур в Японию",
  description: "Токио + Киото + Нисэко, 22 ноября – 2 декабря 2026. Авторский тур.",
  openGraph: {
    title: "От Огня к Снегу — Авторский тур в Японию",
    description: "Токио + Киото + Нисэко, 11 дней. Авторский тур.",
    url: "https://gowithgosha.xyz/japan",
    images: [{ url: "/клены-фудзи-обложка.jpg" }],
  },
};

export default function JapanPage() {
  return (
    <main>
      {/* Back to home */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/60 hover:text-white transition-colors duration-300 backdrop-blur-sm"
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
      <Pricing />
      <FAQ />
      <ContactForm />
      <Preparation />
      <Guide />
      <Footer route="Токио + Киото + Нисэко" dates="22 ноября – 2 декабря 2026" />
    </main>
  );
}
