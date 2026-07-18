"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const days = [
  {
    day: 1,
    emoji: "🇨🇳",
    title: "Привет, Китай",
    city: "Чэнду",
    image: "/день-1.jpg",
    desc: "Встречаемся в Чэнду, заселяемся в отель и отправляемся на первую прогулку по вечернему городу. Нас ждут современные кварталы, огромная панда на крыше IFS и знакомство друг с другом за настоящим сычуаньским hotpot — тем самым легендарным китайским ужином, о котором потом вспоминают весь тур.",
    highlights: ["Прогулка по Чэнду", "Гигантская панда на IFS", "Сычуаньский ужин"],
  },
  {
    day: 2,
    emoji: "🐼",
    title: "День панд",
    city: "Чэнду",
    image: "/день-2.jpg",
    desc: "Утром отправимся в знаменитый центр разведения больших панд — именно в это время они самые активные и милые. После прогулки погрузимся в атмосферу спокойного Чэнду: традиционный чайный парк, местные жители, играющие в маджонг, и уютные улочки старого города.",
    highlights: ["Центр разведения панд", "Чайный парк", "Улочки старого города"],
  },
  {
    day: 3,
    emoji: "✨",
    title: "Старый и новый Китай",
    city: "Чэнду",
    image: "/день-3.jpg",
    desc: "Сегодня увидим две стороны Чэнду. Прогуляемся по древним кварталам и храмам, а затем перенесёмся в современный Китай с футуристическими небоскрёбами, модными улицами и огромными 3D-экранами. Вечером нас ждёт знаменитое шоу смены лиц.",
    highlights: ["Древние храмы", "3D-экраны и небоскрёбы", "Шоу смены лиц 🎭"],
  },
  {
    day: 4,
    emoji: "🏞",
    title: "Китайская природа",
    city: "Сычуань",
    image: "/день-4.jpg",
    desc: "Сегодня отправимся в Dujiangyan — древний город среди гор и одно из самых атмосферных мест Сычуани. Нас ждут старинные мосты, бирюзовая вода, зелёные горные пейзажи и спокойный день без суеты, чтобы почувствовать совсем другой Китай и сделать невероятные фотографии.",
    highlights: ["Горные пейзажи", "Бирюзовая вода", "Древние мосты"],
  },
  {
    day: 5,
    emoji: "🚄",
    title: "Переход в другую реальность",
    city: "Чунцин",
    image: "/день-5.jpg",
    desc: "На скоростном поезде отправимся в Чунцин — город, который называют столицей киберпанка. Здесь небоскрёбы вырастают прямо из скал, а улицы напоминают декорации фантастического фильма.\n\nВечером увидим легендарный Hongyadong, погуляем по неоновым улицам и впервые почувствуем тот самый вайб ночного Чунцина, ради которого сюда прилетают со всего мира.",
    highlights: ["Скоростной поезд", "Прибытие в Чунцин", "Hongyadong 🏮"],
  },
  {
    day: 6,
    emoji: "🌃",
    title: "Город будущего",
    city: "Чунцин",
    image: "/день-6.jpg",
    desc: "Сегодня исследуем самый необычный мегаполис Китая. Увидим легендарное метро, проходящее прямо сквозь жилой дом, прокатимся над рекой по канатной дороге и найдём лучшие панорамные виды Чунцина.\n\nА вечером — rooftop-бары, неоновые улицы и атмосферные места, где кажется, будто оказался внутри киберпанк-фильма.",
    highlights: ["Метро сквозь дом", "Канатная дорога над рекой", "Лучшие панорамы"],
  },
  {
    day: 7,
    emoji: "🎬",
    title: "Three Natural Bridges",
    city: "Чунцин",
    image: "/день-7.jpg",
    desc: "Сегодня отправимся к знаменитым Three Natural Bridges — гигантским каменным аркам и каньонам, которые стали декорациями для голливудских фильмов. Это одно из самых впечатляющих природных мест Китая: огромные мосты среди скал, туман, водопады и ощущение, будто находишься внутри фантастического мира.\n\nПоедем без спешки, чтобы спокойно насладиться природой, погулять, сделать красивые кадры и на время полностью переключиться с шумного мегаполиса на другой, почти нереальный Китай.",
    highlights: ["Природные мосты", "Голливудские каньоны", "Локации из фильмов"],
  },
  {
    day: 8,
    emoji: "🏮",
    title: "Финальная китайская сказка",
    city: "Чунцин",
    image: "/день-8.jpg",
    desc: "Последний день проведём без суеты: немного свободного времени, прогулки, сувениры и красивые кадры на память. А вечером переоденемся в традиционные китайские костюмы, устроим финальную фотосессию и отправимся на праздничный ужин, чтобы красиво завершить это путешествие.",
    highlights: ["Свободное время", "Традиционные костюмы 👘", "Праздничный ужин"],
  },
  {
    day: 9,
    emoji: "✈️",
    title: "До новых приключений",
    city: "Чунцин → Домой",
    image: "/день-9.jpg",
    desc: "Спокойное утро, завтрак и трансфер в аэропорт. Улетим домой с тысячей фотографий, новыми друзьями и ощущением, что за эти дни прожили сразу несколько разных миров — от ленивых панд до настоящего киберпанка.",
    highlights: ["Завтрак", "Трансфер в аэропорт", "Лучшие воспоминания ❤️"],
  },
];

function DayCard({ d, open, onToggle }: {
  d: typeof days[0]; open: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="day-card glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300"
      onClick={onToggle}
    >
      <div className="p-5 md:p-6 flex items-start gap-4">
        <div className="shrink-0">
          <div className="day-number text-5xl md:text-6xl font-bold text-[#f5f0e8]/10 leading-none transition-all duration-300 select-none">
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
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#c8102e]/15 text-[#f5f0e8]/70 border border-[#c8102e]/20">
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_30%,rgba(0,100,200,0.07),transparent)] pointer-events-none" />

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
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Программа</p>
          <h2 className="text-4xl md:text-6xl font-bold">
            9 дней <span className="gradient-text">впечатлений</span>
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