"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const days = [
  {
    day: 1,
    emoji: "🇨🇳",
    title: "Привет, Китай",
    city: "Чэнду",
    desc: "Встречаемся в Чэнду, заселяемся в отель и отправляемся на первую прогулку по вечернему городу. Нас ждут современные кварталы, огромная панда на крыше IFS и знакомство друг с другом за настоящим сычуаньским hotpot — тем самым легендарным китайским ужином, о котором потом вспоминают весь тур.",
    highlights: ["Прогулка по Чэнду", "Гигантская панда на IFS", "Сычуаньский ужин"],
  },
  {
    day: 2,
    emoji: "🐼",
    title: "День панд",
    city: "Чэнду",
    desc: "Утром отправимся в знаменитый центр разведения больших панд — именно в это время они самые активные и милые. После прогулки погрузимся в атмосферу спокойного Чэнду: традиционный чайный парк, местные жители, играющие в маджонг, и уютные улочки старого города.",
    highlights: ["Центр разведения панд", "Чайный парк", "Улочки старого города"],
  },
  {
    day: 3,
    emoji: "✨",
    title: "Старый и новый Китай",
    city: "Чэнду",
    desc: "Сегодня увидим две стороны Чэнду. Прогуляемся по древним кварталам и храмам, а затем перенесёмся в современный Китай с футуристическими небоскрёбами, модными улицами и огромными 3D-экранами. Вечером нас ждёт знаменитое шоу смены лиц.",
    highlights: ["Древние храмы", "3D-экраны и небоскрёбы", "Шоу смены лиц 🎭"],
  },
  {
    day: 4,
    emoji: "🏞",
    title: "Китайская природа",
    city: "Сычуань",
    desc: "Отправимся за пределы города к одному из самых удивительных мест Сычуани. Древние мосты, горные пейзажи, бирюзовая вода и старинные улочки — день без спешки, чтобы почувствовать совсем другой Китай и сделать невероятные фотографии.",
    highlights: ["Горные пейзажи", "Бирюзовая вода", "Древние мосты"],
  },
  {
    day: 5,
    emoji: "🚄",
    title: "Переход в другую реальность",
    city: "Чунцин",
    desc: "На скоростном поезде отправимся в Чунцин — город, который называют столицей киберпанка. Здесь небоскрёбы вырастают прямо из скал, а улицы напоминают декорации фантастического фильма. Вечером увидим знаменитый район Hongyadong.",
    highlights: ["Скоростной поезд", "Прибытие в Чунцин", "Hongyadong 🏮"],
  },
  {
    day: 6,
    emoji: "🌃",
    title: "Город будущего",
    city: "Чунцин",
    desc: "Сегодня исследуем самый необычный мегаполис Китая. Увидим легендарное метро, проходящее прямо сквозь жилой дом, прокатимся над рекой по канатной дороге и найдём лучшие панорамные виды Чунцина.\n" +
        "\n" +
        "А вечером — неоновые улицы, атмосферные бары и rooftop с видом на город, который ночью выглядит как декорации к фантастическому фильму.",
    highlights: ["Метро сквозь дом", "Канатная дорога над рекой", "Лучшие панорамы"],
  },
  {
    day: 7,
    emoji: "🎬",
    title: "Место, где снимали кино",
    city: "Чунцин",
    desc: "Поедем к знаменитым природным мостам и каньонам, которые стали декорациями для голливудских фильмов. Огромные каменные арки, невероятные пейзажи и ощущение, будто оказался в другом мире — один из самых впечатляющих дней всего путешествия.",
    highlights: ["Природные мосты", "Голливудские каньоны", "Локации из фильмов"],
  },
  {
    day: 8,
    emoji: "🏮",
    title: "Финальная китайская сказка",
    city: "Чунцин",
    desc: "Последний день проведём без суеты: немного свободного времени, прогулки, сувениры и красивые кадры на память. А вечером переоденемся в традиционные китайские костюмы и отправимся на праздничный ужин.",
    highlights: ["Свободное время", "Традиционные костюмы 👘", "Праздничный ужин"],
  },
  {
    day: 9,
    emoji: "✈️",
    title: "До новых приключений",
    city: "Чунцин → Домой",
    desc: "Спокойное утро, завтрак и трансфер в аэропорт. Улетим домой с тысячей фотографий, новыми друзьями и ощущением, что за эти дни прожили сразу несколько разных миров — от ленивых панд до настоящего киберпанка.",
    highlights: ["Завтрак", "Трансфер в аэропорт", "Лучшие воспоминания ❤️"],
  },
];

function DayCard({ d, index, inView }: { d: typeof days[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="day-card glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300"
      onClick={() => setOpen(!open)}
    >
      <div className="p-6 flex items-start gap-4">
        {/* Day number */}
        <div className="shrink-0">
          <div className="day-number text-5xl md:text-6xl font-bold text-[#f5f0e8]/10 leading-none transition-all duration-300 select-none">
            {String(d.day).padStart(2, "0")}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#f5f0e8]/40 uppercase tracking-widest font-medium">{d.city}</span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-[#f5f0e8] flex items-center gap-2">
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
                <p className="text-[#f5f0e8]/60 text-sm leading-relaxed mt-3 mb-4">{d.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {d.highlights.map((h, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#c8102e]/15 text-[#f5f0e8]/70 border border-[#c8102e]/20">
                      {h}
                    </span>
                  ))}
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

  return (
    <section ref={ref} id="program" className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_30%,rgba(0,100,200,0.07),transparent)]" />

      <div className="max-w-4xl mx-auto">
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8102e]/0 via-[#c8102e]/30 to-[#c8102e]/0 ml-[calc(2.5rem+2px)] hidden md:block" />

          <div className="space-y-3">
            {days.map((d, i) => (
              <DayCard key={d.day} d={d} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}