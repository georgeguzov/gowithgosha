"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const moments = [
  { src: "/travel-iceland-skogafoss-rainbow.jpg", label: "Скоугафосс, Исландия" },
  { src: "/travel-indonesia-komodo-swim.jpg", label: "Комодо, Индонезия" },
  { src: "/travel-china-chengdu-ifs-panda.jpg", label: "Чэнду, Китай" },
  { src: "/travel-australia-twelve-apostles-1.jpg", label: "Great Ocean Road, Австралия" },
  { src: "/travel-cyprus-sea-caves.jpg", label: "Пещеры Айя-Напы, Кипр" },
  { src: "/travel-italy-lake-maggiore.jpg", label: "Озеро Маджоре, Италия" },
];

export default function MomentsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % moments.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[480px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={moments[index].src}
            alt={moments[index].label}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/35 to-transparent pointer-events-none" />

      <div className="relative z-10 p-8 md:p-12 max-w-2xl pointer-events-none">
        <div className="text-5xl text-[#c8102e]/40 font-serif leading-none mb-3 select-none">&ldquo;</div>
        <p className="text-xl md:text-2xl text-white leading-snug font-medium">
          Большинство туров заканчиваются в аэропорту.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 right-6 md:right-8 text-xs text-white/55 z-10"
        >
          {moments[index].label}
        </motion.span>
      </AnimatePresence>

      <div className="absolute bottom-6 left-8 md:left-12 flex gap-1.5 z-10">
        {moments.map((m, i) => (
          <button
            key={m.src}
            onClick={() => setIndex(i)}
            aria-label={m.label}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-[#d4a843]" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
