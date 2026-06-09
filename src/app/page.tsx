import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Program from "@/components/Program";
import Guide from "@/components/Guide";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
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
      <Footer />
    </main>
  );
}