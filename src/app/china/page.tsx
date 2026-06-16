import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Program from "@/components/Program";
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
      <Hero />
      <Ticker />
      <About />
      <Gallery />
      <Program />
      <Guide />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}