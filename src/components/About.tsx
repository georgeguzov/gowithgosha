"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { icon: "🌏", title: "Не экскурсия, а путешествие", desc: "Мы не бежим от точки к точке. Здесь важны атмосфера, люди и впечатления." },
  { icon: "🤝", title: "Маленькая компания", desc: "До 8 человек в группе. Больше общения, меньше суеты и никакого туристического конвейера." },
  { icon: "📸", title: "Контент, который хочется выкладывать", desc: "Панды, футуристичный Чунцин, традиционный Китай и лучшие фотолокации маршрута." },
  { icon: "🍜", title: "Китай на вкус", desc: "Хот-пот, уличная еда, лапша и места, которые редко находят обычные туристы." },
  { icon: "🎒", title: "Никакой головной боли", desc: "Маршрут, билеты, трансферы и логистика уже продуманы. Можно просто наслаждаться поездкой." },
  { icon: "⚡", title: "Каждый день — новая история", desc: "От панд и древних храмов до ночного Чунцина и природных чудес Сычуани." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,rgba(200,16,46,0.08),transparent)]" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">О туре</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Для тех, кто давно хотел в Китай —
            <span className="gradient-text"> но не вот так</span>
          </h2>
        </motion.div>

        {/* Big quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-red rounded-3xl p-8 md:p-12 mb-16 text-center"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-[#f5f0e8]/90 leading-relaxed max-w-3xl mx-auto">
            Случайный бар с видом на ночной Чунцин, разговоры до двух ночи, самый острый хот-пот в жизни,
            панды утром — и&nbsp;ощущение, что за неделю ты прожил
            <span className="text-[#d4a843] font-semibold"> маленькую отдельную жизнь</span>.
          </p>
          <p className="mt-6 text-base text-[#f5f0e8]/50 max-w-xl mx-auto">
            Это не экскурсионный тур. Это неделя в Китае с людьми, с которыми хочется путешествовать ещё.
          </p>
        </motion.blockquote>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.3 }}
              className="glass rounded-2xl p-6 group hover:border-[#c8102e]/30 transition-all duration-300 hover:-translate-y-1"
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