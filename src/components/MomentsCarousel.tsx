"use client";

import { AnimatePresence, motion } from "framer-motion";
import FadeImage from "@/components/FadeImage";
import { useEffect, useState } from "react";

const SLIDE_MS = 6500;

const moments = [
  {
    src: "/travel-iceland-skogafoss-rainbow.jpg",
    label: "Скоугафосс, Исландия",
    quote: "Зачем сидеть дома, если можно не сидеть дома?",
  },
  {
    src: "/travel-indonesia-komodo-swim.jpg",
    label: "Комодо, Индонезия",
    quote: "Понедельник? Не, я в океане.",
  },
  {
    src: "/travel-china-chengdu-ifs-panda.jpg",
    label: "Чэнду, Китай",
    quote: "Паспорт, кроссовки, вайб — поехали.",
  },
  {
    src: "/travel-australia-twelve-apostles-1.jpg",
    label: "Great Ocean Road, Австралия",
    quote: "Кто сказал, что жизнь одна? У меня их уже пять.",
  },
  {
    src: "/travel-cyprus-sea-caves.jpg",
    label: "Пещеры Айя-Напы, Кипр",
    quote: "Это не отпуск, это терапия подешевле.",
  },
  {
    src: "/travel-italy-lake-maggiore.jpg",
    label: "Озеро Маджоре, Италия",
    quote: "Пока вы скроллите, я коллекционирую закаты.",
  },
];

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MomentsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % moments.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused]);

  function go(delta: number) {
    setIndex((i) => (i + delta + moments.length) % moments.length);
  }

  return (
    <div
      className="group relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[480px]"
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
          <FadeImage
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

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 p-8 md:p-12 max-w-2xl pointer-events-none"
        >
          <div className="text-5xl text-[#c8102e]/40 font-serif leading-none mb-3 select-none">&ldquo;</div>
          <p className="text-xl md:text-2xl text-white leading-snug font-medium">{moments[index].quote}</p>
        </motion.div>
      </AnimatePresence>

      {/* prev / next */}
      <button
        onClick={() => go(-1)}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
      >
        <ArrowIcon dir="left" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
      >
        <ArrowIcon dir="right" />
      </button>

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

      {/* dots doubling as a progress timer */}
      <div className="absolute bottom-6 left-8 md:left-12 flex gap-1.5 z-10">
        {moments.map((m, i) => (
          <button
            key={m.src}
            onClick={() => setIndex(i)}
            aria-label={m.label}
            className={`relative h-1.5 rounded-full overflow-hidden bg-white/25 hover:bg-white/40 transition-[width] duration-300 ${
              i === index ? "w-8" : "w-1.5"
            }`}
          >
            {i === index && (
              <span
                key={index}
                className="absolute inset-y-0 left-0 bg-[#d4a843]"
                style={{
                  animation: `carousel-fill ${SLIDE_MS}ms linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
