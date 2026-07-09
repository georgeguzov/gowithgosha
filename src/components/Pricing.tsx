"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const included = [
  "Проживание в комфортных отелях (8 ночей)",
  "Завтраки",
  "Все трансферы по программе",
  "Скоростной поезд Чэнду → Чунцин",
  "Входные билеты во все локации маршрута",
  "Шоу смены лиц в Чэнду",
  "Фотосессия в традиционных китайских костюмах",
  "Праздничный прощальный ужин",
  "Автор тура рядом на всём маршруте",
];

const notIncluded = [
  "Перелёт до Чэнду и обратно",
  "Обеды и ужины (можно выбирать на свой вкус)",
  "Личные покупки и сувениры",
  "Медицинская страховка",
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="booking" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(200,16,46,0.1),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 40 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Стоимость</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Панды и Киберпанк&nbsp;— <span className="gradient-text">$&thinsp;1&thinsp;490</span>
          </h2>
          <p className="text-[#f5f0e8]/50 max-w-xl mx-auto">
            Мы уже организовали маршрут, отели, трансферы и все основные активности. Вам остаётся купить билет и наслаждаться путешествием.
          </p>
          <p className="mt-3 text-sm text-[#f5f0e8]/35">
            Предоплата для брони места — $300
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Included */}
          <motion.div
            initial={{ y: 30 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-lg font-semibold text-[#f5f0e8] mb-6 flex items-center gap-2">
              <span className="text-2xl">✅</span> Включено в стоимость
            </h3>
            <ul className="space-y-3">
              {included.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10 }}
                  animate={inView ? { x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-[#f5f0e8]/70"
                >
                  <span className="text-[#d4a843] mt-0.5 shrink-0">·</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not included + CTA */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 30 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="text-lg font-semibold text-[#f5f0e8] mb-6 flex items-center gap-2">
                <span className="text-2xl">📋</span> Оплачивается отдельно
              </h3>
              <ul className="space-y-3">
                {notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/50">
                    <span className="text-[#f5f0e8]/30 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Dates + spots */}
            <motion.div
              initial={{ y: 30 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-red rounded-3xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mb-1">Даты</p>
                  <p className="text-xl font-bold text-[#f5f0e8]">10–18 октября 2026</p>
                </div>
                <div className="text-4xl">🗓️</div>
              </div>
              <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mb-1">Группа</p>
                  <p className="text-base font-semibold text-[#f5f0e8]">до 10 человек</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mb-1">Осталось мест</p>
                  <p className="text-base font-semibold text-[#d4a843]">6</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ y: 30 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-7 py-4 md:px-10 md:py-5 bg-[#c8102e] rounded-full text-white font-semibold text-lg md:text-xl overflow-hidden transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10">Записаться в тур</span>
            <span className="relative z-10 text-2xl">🚀</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e] via-[#e8203e] to-[#c8102e] bg-[length:200%] animate-[shimmer_2s_linear_infinite]" />
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com/gowithgosha"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/60 hover:text-white transition-all duration-300"
            >
              @gowithgosha 📸
            </a>
            <a
              href="https://t.me/g_zov"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/60 hover:text-white transition-all duration-300"
            >
              @g_zov 💬
            </a>
          </div>
          <p className="mt-3 text-sm text-[#f5f0e8]/40">
            Если чувствуешь, что это твой вайб — напиши мне в Telegram. Расскажу все детали и помогу понять, подходит ли тебе этот трип.
          </p>
        </motion.div>
      </div>
    </section>
  );
}