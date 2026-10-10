"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const moments = [
  { src: "/travel-iceland-skogafoss-rainbow.jpg", label: "Скоугафосс, Исландия" },
  { src: "/travel-indonesia-komodo-swim.jpg", label: "Комодо, Индонезия" },
  { src: "/travel-china-chengdu-ifs-panda.jpg", label: "Чэнду, Китай" },
  { src: "/travel-australia-twelve-apostles-1.jpg", label: "Great Ocean Road, Австралия" },
  { src: "/travel-cyprus-sea-caves.jpg", label: "Пещеры Айя-Напы, Кипр" },
  { src: "/travel-italy-lake-maggiore.jpg", label: "Озеро Маджоре, Италия" },
];

export default function HomeMoments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
      setViewportWidth(window.innerWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -Math.max(trackWidth - viewportWidth + 64, 0)]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-6 mb-10 w-full text-center shrink-0"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Моменты</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Из <span className="gradient-text">моих поездок</span>
          </h2>
        </motion.div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 md:gap-6 pl-6 pr-[20vw] w-max">
          {moments.map((m) => (
            <div
              key={m.src}
              className="relative shrink-0 w-[72vw] sm:w-[340px] md:w-[400px] h-[56vh] max-h-[480px] rounded-3xl overflow-hidden group"
            >
              <Image
                src={m.src}
                alt={m.label}
                fill
                className="object-cover grayscale-[35%] saturate-75 transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105"
                sizes="(max-width: 768px) 72vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
