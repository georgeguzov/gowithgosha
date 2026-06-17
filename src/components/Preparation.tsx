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

function AlipayContent() {
  return (
    <div className="space-y-6">
      <p className="text-[#f5f0e8]/70 leading-relaxed">
        В Китае наличные используются всё реже. Большинство покупок — от метро и кофе до ресторанов
        и магазинов — оплачиваются через{" "}
        <span className="text-[#d4a843] font-medium">Alipay</span>.
      </p>

      {/* How to prepare */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Как подготовиться</h4>
        <div className="space-y-3">
          {[
            "Скачайте приложение Alipay до поездки.",
            "Зарегистрируйтесь по номеру телефона.",
            "Привяжите свою банковскую карту Visa или Mastercard.",
            "Убедитесь, что карта успешно добавлена в приложение.",
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

      {/* How to pay */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Как платить</h4>
        <p className="text-sm text-[#f5f0e8]/70 leading-relaxed">
          После привязки карты достаточно открыть раздел{" "}
          <span className="text-[#f5f0e8] font-medium">Pay / Scan</span> и отсканировать QR-код продавца
          или показать свой QR-код для оплаты.
        </p>
      </div>

      {/* What can be paid */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Что можно оплачивать</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Кафе и рестораны",
            "Магазины и супермаркеты",
            "Метро и общественный транспорт",
            "Такси",
            "Достопримечательности",
            "Вендинговые автоматы",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="glass-red rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed">
        <p>
          <span className="text-[#d4a843] font-semibold">Полезный совет:</span> настройте Alipay ещё
          дома до вылета. После прилёта вы сможете пользоваться оплатой практически сразу и не
          переживать из-за обмена наличных.
        </p>
      </div>

      {/* Personal note */}
      <div className="flex items-start gap-3 text-sm text-[#f5f0e8]/50 italic">
        <span className="text-lg shrink-0">💡</span>
        <span>
          Лично я использую Alipay во всех поездках по Китаю. Для большинства путешественников
          этого приложения достаточно практически на 100% поездки.
        </span>
      </div>
    </div>
  );
}

function AppsContent() {
  return (
    <div className="space-y-6">
      <p className="text-[#f5f0e8]/70 leading-relaxed">
        Перед поездкой рекомендую установить эти приложения. Сам использую именно их
        во время путешествий по Китаю.
      </p>

      {/* Apps list */}
      <div className="space-y-5">
        {[
          {
            icon: "💳",
            name: "Alipay",
            desc: "Главное приложение для оплаты в Китае. Через него можно оплачивать практически всё: метро, такси, кафе, магазины и достопримечательности.",
          },
          {
            icon: "💬",
            name: "WeChat",
            desc: "Самый популярный мессенджер в Китае. Многие местные общаются только через него — пригодится для связи с отелями, гидами и новыми знакомыми.",
          },
          {
            icon: "🚇",
            name: "MetroMan",
            desc: "Лучшее приложение для метро в Китае. Показывает схемы, маршруты, пересадки и стоимость поездок во всех крупных городах.",
          },
          {
            icon: "✈️",
            name: "Trip.com",
            desc: "Для бронирования отелей, поездов и внутренних перелётов. Одно из самых удобных приложений для путешествий по Китаю.",
          },
        ].map((app, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl">
              {app.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f5f0e8] mb-1">{app.name}</h4>
              <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">{app.desc}</p>
            </div>
          </div>
        ))}

        {/* Maps — special */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl">
            🗺️
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f5f0e8] mb-1">Карты</h4>
            <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
              <span className="text-[#f5f0e8]/80 font-medium">Maps.me</span> — основной выбор для пеших прогулок и навигации.
              Рекомендую заранее скачать карты нужных городов.
            </p>
            <p className="text-sm text-[#f5f0e8]/60 leading-relaxed mt-1">
              Если у вас iPhone — также рекомендую <span className="text-[#f5f0e8]/80 font-medium">Apple Maps</span>.
              В Китае они работают очень хорошо и часто точнее привычных карт.
            </p>
          </div>
        </div>

        {/* ChatGPT */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f5f0e8] mb-1">ChatGPT или DeepSeek</h4>
            <p className="text-sm text-[#f5f0e8]/60 leading-relaxed mb-2">
              Для перевода и общения с местными — намного лучше понимают контекст, чем классические переводчики.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {["перевод меню", "общение с местными", "расшифровка вывесок", "нестандартные ситуации"].map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#f5f0e8]/50">
                  <span className="text-[#d4a843]">·</span> {u}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VPN */}
      <div className="glass rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-semibold text-[#f5f0e8] flex items-center gap-2">
          <span>🌐</span> VPN
        </h4>
        <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
          В Китае многие привычные сервисы работают с ограничениями при использовании местного Wi-Fi или SIM-карты:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "Telegram", "WhatsApp", "YouTube", "Gmail", "Google"].map((s, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-[#f5f0e8]/50">
              {s}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
          Если планируете пользоваться местным Wi-Fi — рекомендую установить VPN ещё до вылета и проверить его работу заранее.
        </p>
      </div>

      {/* eSIM note */}
      <div className="glass-red rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed space-y-2">
        <p className="font-semibold text-[#d4a843]">💡 Важный момент про eSIM</p>
        <p>
          Если вы используете международную eSIM через Trip.com, Instagram, Telegram, WhatsApp, YouTube и Gmail
          чаще всего работают{" "}
          <span className="text-[#f5f0e8]/90 font-medium">без дополнительного VPN</span>.
        </p>
      </div>

      {/* My kit */}
      <div className="border border-white/[0.07] rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">🎒 Мой набор для Китая</h4>
        <div className="flex flex-wrap gap-2">
          {["Alipay", "WeChat", "MetroMan", "Trip.com", "Maps.me", "ChatGPT", "eSIM"].map((app, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#c8102e]/10 border border-[#c8102e]/20 text-[#f5f0e8]/70 font-medium">
              {app}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#f5f0e8]/40">
          С этой связкой вы будете готовы практически к любой ситуации во время путешествия.
        </p>
      </div>
    </div>
  );
}

function VisaContent() {
  return (
    <div className="space-y-6">

      {/* BY + RU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { flag: "🇧🇾", country: "Граждане Беларуси", text: "Виза не нужна. Можно находиться в Китае до 30 дней без оформления визы заранее." },
          { flag: "🇷🇺", country: "Граждане России", text: "Виза не нужна для туристических поездок при пребывании до 30 дней." },
        ].map((item, i) => (
          <div key={i} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{item.flag}</span>
              <h4 className="text-sm font-semibold text-[#f5f0e8]">{item.country}</h4>
            </div>
            <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* What's needed at border */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">🛂 Что понадобится на границе</h4>
        <div className="space-y-2">
          {[
            "Загранпаспорт",
            "Адрес проживания или бронь отеля",
            "Обратный билет или билет в следующую страну",
            "Информация о маршруте поездки",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] mt-0.5 shrink-0">·</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#f5f0e8]/50 leading-relaxed">
          Проверка обычно проходит быстро, но лучше иметь все документы под рукой.
          Для участников тура я заранее предоставлю всю необходимую информацию по отелям, маршруту и бронированиям.
        </p>
      </div>

      {/* Arrival card */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">✍️ Иммиграционная карта</h4>
        <p className="text-sm text-[#f5f0e8]/60 leading-relaxed mb-3">
          Во время перелёта или по прилёте может потребоваться заполнить карту прибытия. Обычно нужно указать:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {["ФИО", "Номер паспорта", "Номер рейса", "Адрес проживания в Китае", "Цель поездки"].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#f5f0e8]/60">
              <span className="text-[#d4a843] shrink-0">·</span> {f}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#f5f0e8]/40">Заполнение занимает несколько минут.</p>
      </div>

      {/* Don't worry */}
      <div className="glass-red rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed">
        <p className="font-semibold text-[#d4a843] mb-2">💡 Не переживайте</p>
        <p>
          Если вы едете со мной в тур, я заранее пришлю подробную инструкцию по въезду в Китай,
          помогу проверить документы и отвечу на все вопросы до вылета.
        </p>
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
    ready: true,
    content: <AlipayContent />,
  },
  {
    icon: "📲",
    title: "Полезные приложения",
    ready: true,
    content: <AppsContent />,
  },
  {
    icon: "🛂",
    title: "Виза",
    ready: true,
    content: <VisaContent />,
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