"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

type Card = {
  icon: string;
  title: string;
  ready: boolean;
  content?: React.ReactNode;
};

function ESIMContent() {
  return (
    <div className="space-y-6">
      <p className="text-[#f5f0e8]/70 leading-relaxed">
        Для путешествия по Китаю я рекомендую использовать eSIM через{" "}
        <span className="text-[#d4a843] font-medium">Trip.com</span>. Это самый простой способ
        оставаться на связи сразу после прилёта — без поиска местных SIM-карт.
      </p>

      {/* Why eSIM */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Почему eSIM?</h4>
        <div className="space-y-2">
          {[
            "Работает сразу после прилёта",
            "Не нужно покупать физическую SIM-карту",
            "Сохраняется ваш основной номер",
            "Работают Google, WhatsApp, Telegram, Instagram, YouTube и другие привычные сервисы без дополнительной настройки VPN — благодаря международной маршрутизации трафика.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How to install */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Как установить</h4>
        <div className="space-y-3">
          {[
            "Купите eSIM заранее через Trip.com.",
            "Установите eSIM дома через приложение Trip.com или QR-код.",
            "По прилёте в Китай включите eSIM и активируйте Data Roaming.",
            "Через несколько минут телефон автоматически подключится к сети.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/30 text-[#c8102e] text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="mt-0.5">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data needs */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Сколько интернета нужно?</h4>
        <div className="space-y-2">
          {[
            { range: "1–2 ГБ / день", desc: "карты, мессенджеры, соцсети" },
            { range: "3–5 ГБ / день", desc: "активная загрузка фото и видео" },
            { range: "Безлимит", desc: "обычно не нужен большинству путешественников" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-[#d4a843] font-semibold whitespace-nowrap">{item.range}</span>
              <span className="text-[#f5f0e8]/40">—</span>
              <span className="text-[#f5f0e8]/60">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important */}
      <div className="glass-red rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed space-y-2">
        <p>
          <span className="text-[#d4a843] font-semibold">Важно:</span> перед поездкой проверьте,
          поддерживает ли ваш телефон eSIM. Большинство современных iPhone, Google Pixel и флагманских
          Android-смартфонов поддерживают эту функцию.
        </p>
        <p>Рекомендую установить eSIM ещё до вылета, пока есть стабильный интернет.</p>
      </div>

      {/* Personal note */}
      <div className="flex items-start gap-3 text-sm text-[#f5f0e8]/50 italic">
        <span className="text-lg shrink-0">💡</span>
        <span>Именно такой вариант связи я использую сам во время поездок по Китаю.</span>
      </div>
    </div>
  );
}

function ComingSoonContent({ title }: { title: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-4xl mb-3">🔜</div>
      <p className="text-[#f5f0e8]/50 text-sm">
        Подробный гайд по теме «{title}» скоро появится здесь.
      </p>
    </div>
  );
}

const cards: Card[] = [
  {
    icon: "📱",
    title: "Интернет и eSIM",
    ready: true,
    content: <ESIMContent />,
  },
  {
    icon: "💳",
    title: "Оплата в Китае",
    ready: false,
  },
  {
    icon: "🚄",
    title: "Транспорт",
    ready: false,
  },
  {
    icon: "📲",
    title: "Полезные приложения",
    ready: false,
  },
  {
    icon: "🛂",
    title: "Виза",
    ready: false,
  },
];

const vp = { once: true, margin: "-60px" } as const;

export default function Preparation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_50%,rgba(200,16,46,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">До поездки</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Подготовка к <span className="gradient-text">путешествию</span>
          </h2>
          <p className="text-[#f5f0e8]/50 max-w-xl mx-auto">
            Я не просто продаю тур — я помогаю подготовиться к нему заранее.
            Всё, что нужно знать перед поездкой, собрано здесь.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Card list */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
            {cards.map((card, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`group shrink-0 lg:w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 border ${
                  openIndex === i
                    ? "bg-[#c8102e]/10 border-[#c8102e]/30 text-[#f5f0e8]"
                    : "glass border-white/[0.06] text-[#f5f0e8]/60 hover:text-[#f5f0e8] hover:border-white/15"
                }`}
              >
                <span className="text-2xl shrink-0">{card.icon}</span>
                <div className="min-w-0">
                  <span className="font-medium text-sm leading-tight block">{card.title}</span>
                  {!card.ready && (
                    <span className="text-xs text-[#f5f0e8]/30 mt-0.5 block">Скоро</span>
                  )}
                </div>
                {openIndex === i && (
                  <span className="ml-auto text-[#c8102e] text-lg shrink-0">›</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            {openIndex !== null && (
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-7 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.07]">
                  <span className="text-3xl">{cards[openIndex].icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5f0e8]">{cards[openIndex].title}</h3>
                    {!cards[openIndex].ready && (
                      <span className="text-xs text-[#f5f0e8]/30">Гайд в разработке</span>
                    )}
                  </div>
                </div>
                {cards[openIndex].ready
                  ? cards[openIndex].content
                  : <ComingSoonContent title={cards[openIndex].title} />
                }
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}