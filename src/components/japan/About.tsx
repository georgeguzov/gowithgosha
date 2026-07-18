"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "🍁", title: "Пик сезона клёнов", desc: "Едем ровно в те даты, когда момидзи в Киото в самом разгаре." },
  { icon: "❄️", title: "Первый снег Нисэко", desc: "Три дня катания на одном из лучших курортов мира — знаменитый японский пухляк." },
  { icon: "🤝", title: "Небольшая группа", desc: "До 10 человек. Без туристического конвейера." },
  { icon: "🎒", title: "Всё продумано", desc: "Маршрут, отели, билеты на синкансэн и перелёт внутри Японии — уже организовано." },
  { icon: "📸", title: "Фотогеничный маршрут", desc: "Клёны, Фудзи, храмы в подсветке, горы Хоккайдо — заранее выбранные точки съёмки." },
  { icon: "🍜", title: "Япония на вкус", desc: "Идзакая, уличная еда Осаки, онсэн после катания." },
];

const vp = { once: true, margin: "-60px" } as const;

export default function About() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,rgba(217,100,31,0.08),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[#d9641f] text-sm font-semibold uppercase tracking-[0.3em] mb-4">О туре</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Для тех, кто не хочет выбирать
            <span className="gradient-text-japan"> между клёнами и снегом</span>
          </h2>
        </motion.div>

        <motion.blockquote
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-amber rounded-3xl p-8 md:p-12 mb-16 text-center"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-[#f5f0e8]/90 leading-relaxed max-w-3xl mx-auto">
            Красный клён на фоне древнего храма — и через несколько дней тот же ты, только на лыжах,
            среди свежего снега Хоккайдо.
            <span className="text-[#d4a843] font-semibold"> Один перелёт внутри страны</span> — и Япония
            показывает себя с двух совершенно разных сторон.
          </p>
          <p className="mt-6 text-base text-[#f5f0e8]/50 max-w-xl mx-auto">
            Это не два тура в одном автобусе. Это логичный маршрут с юга на север, без спешки и без лишних переездов.
          </p>
        </motion.blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={vp}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
              className="glass rounded-2xl p-6 group hover:border-[#d9641f]/30 transition-[border-color,transform] duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-[#f5f0e8] mb-2">{f.title}</h3>
              <p className="text-sm text-[#f5f0e8]/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
