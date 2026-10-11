"use client";

import { AnimatePresence, motion } from "framer-motion";
import FadeImage from "@/components/FadeImage";
import { useEffect, useRef, useState } from "react";

const SLIDE_MS = 5000;
const SWIPE_THRESHOLD = 40;

const moments = [
  {
    src: "/travel-iceland-aurora.jpg",
    label: "Северное сияние, Исландия",
    emoji: "🌌",
    pos: "50% 58%",
  },
  {
    src: "/travel-japan-osaka-dotonbori.jpg",
    label: "Осака, Япония",
    emoji: "🏮",
  },
  {
    src: "/travel-indonesia-komodo-swim.jpg",
    label: "Комодо, Индонезия",
    emoji: "🤿",
  },
  {
    src: "/travel-indonesia-bromo-sunrise.jpg",
    label: "Вулкан Бромо, Индонезия",
    emoji: "🌋",
    pos: "50% 25%",
  },
  {
    src: "/travel-hongkong-victoria-peak.jpg",
    label: "Гонконг",
    emoji: "🌃",
    pos: "50% 70%",
  },
  {
    src: "/travel-cyprus-sea-caves.jpg",
    label: "Пещеры Айя-Напы, Кипр",
    emoji: "🏖️",
  },
  {
    src: "/travel-iceland-skogafoss-arms.jpg",
    label: "Скоугафосс, Исландия",
    emoji: "🌈",
  },
  {
    src: "/travel-china-chengdu-ifs-panda.jpg",
    label: "Чэнду, Китай",
    emoji: "🐼",
  },
  {
    src: "/travel-indonesia-komodo-padar-golden.jpg",
    label: "Остров Падар, Индонезия",
    emoji: "🏝️",
  },
  {
    src: "/travel-indonesia-ijen-crater.jpg",
    label: "Кавах-Иджен, Индонезия",
    emoji: "😷",
  },
  {
    src: "/travel-australia-twelve-apostles-1.jpg",
    label: "Great Ocean Road, Австралия",
    emoji: "🌅",
  },
  {
    src: "/travel-iceland-gljufrabui-cave.jpg",
    label: "Скрытый водопад, Исландия",
    emoji: "💧",
  },
  {
    src: "/travel-france-alps-montblanc.jpg",
    label: "Монблан, Альпы",
    emoji: "🏔️",
    pos: "50% 38%",
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
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % moments.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused]);

  function go(delta: number) {
    setIndex((i) => (i + delta + moments.length) % moments.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current !== null) {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    setPaused(false);
  }

  return (
    <div
      className="group relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[480px] touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            style={{ objectPosition: moments[index].pos ?? "50% 50%" }}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-[#0a0a0f]/5 to-transparent pointer-events-none" />

      {/* prev / next */}
      <button
        onClick={() => go(-1)}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white opacity-50 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
      >
        <ArrowIcon dir="left" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white opacity-50 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
      >
        <ArrowIcon dir="right" />
      </button>

      {/* bottom-anchored content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="px-8 md:px-12 pt-10 text-xl md:text-3xl font-bold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]"
          >
            <span className="mr-2">{moments[index].emoji}</span>
            {moments[index].label}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center gap-1.5 px-8 md:px-12 py-6 pointer-events-auto">
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
    </div>
  );
}
