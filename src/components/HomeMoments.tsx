"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const moments = [
  { src: "/travel-iceland-skogafoss-rainbow.jpg", label: "Скоугафосс, Исландия" },
  { src: "/travel-indonesia-komodo-swim.jpg", label: "Комодо, Индонезия" },
  { src: "/travel-china-chengdu-ifs-panda.jpg", label: "Чэнду, Китай" },
  { src: "/travel-australia-twelve-apostles-1.jpg", label: "Great Ocean Road, Австралия" },
  { src: "/travel-cyprus-sea-caves.jpg", label: "Пещеры Айя-Напы, Кипр" },
  { src: "/travel-italy-lake-maggiore.jpg", label: "Озеро Маджоре, Италия" },
];

const vp = { once: true, margin: "-80px" } as const;

export default function HomeMoments() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Моменты</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Из <span className="gradient-text">моих поездок</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {moments.map((m, i) => (
            <motion.div
              key={m.src}
              className={`relative rounded-2xl overflow-hidden group ${i % 2 === 1 ? "md:mt-8" : ""}`}
              style={{ aspectRatio: "3 / 4" }}
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              viewport={vp}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={m.src}
                alt={m.label}
                fill
                className="object-cover grayscale-[35%] saturate-75 transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
