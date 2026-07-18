"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const days = [
  {
    day: 1,
    emoji: "👋",
    title: "Привет, Япония",
    city: "Токио",
    image: "/токио-прилет-1.jpg",
    desc: "Прилёт, заселение в отель. Вечером — общий ужин, знакомимся с группой, никакой программы в первый день.",
    highlights: ["Прилёт в Токио", "Заселение", "Ужин знакомства"],
    snow: false,
  },
  {
    day: 2,
    emoji: "🍂",
    title: "Город в осенних красках",
    city: "Токио",
    image: "/токио-сад-осень-2.jpg",
    desc: "Сады Rikugien и Meiji Jingu Gaien, квартал Асакуса и храм Sensō-ji. Вечер свободный.",
    highlights: ["Сад Rikugien", "Аллея гинкго", "Асакуса и Sensō-ji"],
    snow: false,
  },
  {
    day: 3,
    emoji: "🗻",
    title: "Фудзи и клёны на воде",
    city: "Кавагутико",
    image: "/кавагутико-фудзи-3.jpg",
    desc: "Дневная поездка к озеру Кавагутико — момидзи вдоль берега, гора Фудзи как открыточный фон. Вечером возвращаемся в Токио.",
    highlights: ["Озеро Кавагутико", "Гора Фудзи", "Клёны у воды"],
    snow: false,
  },
  {
    day: 4,
    emoji: "🚄",
    title: "Едем в старую столицу",
    city: "Киото",
    image: "/киото-гион-вечер-4.jpg",
    desc: "Синкансэн Токио → Киото, заселение. Вечером — первая прогулка по кварталу Гион в закатном свете.",
    highlights: ["Синкансэн", "Заселение в Киото", "Квартал Гион"],
    snow: false,
  },
  {
    day: 5,
    emoji: "⛩️",
    title: "Тысяча тории и храм на скале",
    city: "Киото",
    image: "/фушими-инари-тории-5.jpg",
    desc: "Fushimi Inari рано утром, пока пусто, затем Kiyomizu-dera с видом на осенний склон.",
    highlights: ["Fushimi Inari", "Тысяча тории", "Kiyomizu-dera"],
    snow: false,
  },
  {
    day: 6,
    emoji: "🍁",
    title: "Пик момидзи",
    city: "Киото",
    image: "/арашияма-бамбук-6.jpg",
    desc: "Arashiyama — бамбуковая роща и клёны вдоль реки Хозугава. Вечером — ночная подсветка одного из храмов.",
    highlights: ["Бамбуковая роща", "Река Хозугава", "Ночная подсветка"],
    snow: false,
  },
  {
    day: 7,
    emoji: "🦌",
    title: "Олени, чемоданы и ночная Осака",
    city: "Нара → Осака",
    image: "/нара-олени-7.jpg",
    desc: "Утром едем в Нару налегке (чемоданы — в камере хранения на вокзале Киото), гуляем среди оленей у храма Tōdai-ji. Вечером забираем вещи и едем в Осаку — Dōtonbori, уличная еда.",
    highlights: ["Олени Нары", "Tōdai-ji", "Dōtonbori"],
    snow: false,
  },
  {
    day: 8,
    emoji: "✈️",
    title: "От клёнов к снегу",
    city: "Осака → Нисэко",
    image: "/нисэко-трансфер-8.jpg",
    desc: "Утро в Осаке (замок, по желанию), днём перелёт в Саппоро и трансфер в Нисэко. Долгий переездный день — но вечером уже ждёт онсэн.",
    highlights: ["Перелёт в Саппоро", "Трансфер в Нисэко", "Вечерний онсэн"],
    snow: true,
  },
  {
    day: 9,
    emoji: "🎿",
    title: "Первый день на склоне",
    city: "Нисэко",
    image: "/нисэко-катание-9.jpg",
    desc: "Полный день катания в Niseko Grand Hirafu. Вечером — онсэн и ужин.",
    highlights: ["Niseko Grand Hirafu", "Катание", "Онсэн"],
    snow: true,
  },
  {
    day: 10,
    emoji: "🏂",
    title: "Второй день на склоне",
    city: "Нисэко",
    image: "/нисэко-снег-10.jpg",
    desc: "Ещё один день катания, для желающих — свободное катание или снегоступы вместо лыж.",
    highlights: ["Свободное катание", "Снегоступы", "Горы Хоккайдо"],
    snow: true,
  },
  {
    day: 11,
    emoji: "✈️",
    title: "Рынок морепродуктов и домой",
    city: "Саппоро",
    image: "/саппоро-рынок-11.jpg",
    desc: "Утром — рынок в Саппоро, снежный краб на завтрак. Трансфер в аэропорт.",
    highlights: ["Рынок Саппоро", "Снежный краб", "Трансфер домой"],
    snow: true,
  },
];

function DayCard({ d, open, onToggle }: {
  d: typeof days[0]; open: boolean; onToggle: () => void;
}) {
  const accent = d.snow ? "#4fa8e0" : "#d9641f";
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`day-card-japan glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-colors duration-300 ${d.snow ? "is-snow" : ""}`}
      onClick={onToggle}
    >
      <div className="p-5 md:p-6 flex items-start gap-4">
        <div className="shrink-0">
          <div className="day-number text-5xl md:text-6xl font-bold text-[#f5f0e8]/10 leading-none transition-[color,text-shadow] duration-300 select-none">
            {String(d.day).padStart(2, "0")}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#f5f0e8]/40 uppercase tracking-widest font-medium">{d.city}</span>
          </div>
          <h3 className="text-base md:text-xl font-semibold text-[#f5f0e8] flex items-center gap-2">
            <span>{d.emoji}</span> {d.title}
          </h3>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <p className="text-[#f5f0e8]/60 text-sm leading-relaxed whitespace-pre-line mb-4">{d.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {d.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full text-[#f5f0e8]/70 border"
                          style={{ backgroundColor: `${accent}26`, borderColor: `${accent}40` }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-[#f5f0e8]/30 text-2xl font-light mt-1"
        >
          +
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Program() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openDay, setOpenDay] = useState<number | null>(null);

  return (
    <section ref={ref} id="program" className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_30%,rgba(79,168,224,0.07),transparent)] pointer-events-none" />

      {/* Preload day images at real size so they're instant when a day is opened */}
      {inView && (
        <div className="hidden">
          {days.map(d => (
            <Image key={d.day} src={d.image} alt="" width={300} height={208} loading="eager" />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#d9641f] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Программа</p>
          <h2 className="text-4xl md:text-6xl font-bold">
            11 дней <span className="gradient-text-japan">впечатлений</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/50">Нажми на день, чтобы узнать подробности</p>
        </motion.div>

        <div className="space-y-3">
          {days.map((d) => (
            <DayCard
              key={d.day}
              d={d}
              open={openDay === d.day}
              onToggle={() => setOpenDay(openDay === d.day ? null : d.day)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
