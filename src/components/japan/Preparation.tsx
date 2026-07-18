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
        Для путешествия по Японии я рекомендую использовать eSIM через{" "}
        <span className="text-[#d4a843] font-medium">Trip.com</span>. Это самый простой способ
        оставаться на связи сразу после прилёта — без поиска местных SIM-карт и стоек операторов в аэропорту.
      </p>

      {/* Why eSIM */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Почему eSIM?</h4>
        <div className="space-y-2">
          {[
            "Работает сразу после прилёта",
            "Не нужно покупать физическую SIM-карту",
            "Сохраняется ваш основной номер",
            "Google Maps, Google Translate, Instagram, WhatsApp, Telegram — всё работает без ограничений, VPN в Японии не нужен.",
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
            "По прилёте в Японию включите eSIM и активируйте Data Roaming.",
            "Через несколько минут телефон автоматически подключится к сети.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#d9641f]/20 border border-[#d9641f]/30 text-[#d9641f] text-xs font-bold flex items-center justify-center">
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
      <div className="glass-amber rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed space-y-2">
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
        <span>Именно такой вариант связи я использую сам во время поездок по Японии.</span>
      </div>
    </div>
  );
}

function MoneyContent() {
  return (
    <div className="space-y-6">
      <p className="text-[#f5f0e8]/70 leading-relaxed">
        Япония — страна контрастов в плане оплаты: в больших сетевых магазинах и отелях карты принимают
        почти везде, а вот в маленьких ресторанчиках, храмах и в Нисэко вне сезона курортной суеты
        по-прежнему часто просят{" "}
        <span className="text-[#d4a843] font-medium">наличные</span>. Носите с собой немного йен на всякий случай.
      </p>

      {/* IC card */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">IC-карта (Suica / Pasmo)</h4>
        <div className="space-y-3">
          {[
            "Купите физическую карту в автомате на вокзале сразу по прилёте (или подключите Mobile Suica в Apple Wallet, если у вас iPhone).",
            "Пополняйте баланс в любом автомате на станции — наличными или картой.",
            "Прикладывайте карту на турникетах метро, синкансэна (на пригородных участках) и автобусов.",
            "Той же картой можно расплатиться в konbini (7-Eleven, Lawson, FamilyMart) и в автоматах с напитками.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#d9641f]/20 border border-[#d9641f]/30 text-[#d9641f] text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="mt-0.5">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cash / ATM */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Наличные и снятие денег</h4>
        <p className="text-sm text-[#f5f0e8]/70 leading-relaxed">
          Самый надёжный способ снять наличные с иностранной карты — банкоматы в магазинах{" "}
          <span className="text-[#f5f0e8] font-medium">7-Eleven</span>. Они есть почти на каждом углу
          и стабильно работают с Visa/Mastercard, в отличие от многих обычных банковских банкоматов.
        </p>
      </div>

      {/* What can be paid */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">Где обычно принимают карту</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Отели",
            "Сетевые рестораны и кафе",
            "Крупные магазины",
            "Синкансэн и авиабилеты",
            "Скипассы в Нисэко",
            "Такси в крупных городах",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="glass-amber rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed">
        <p>
          <span className="text-[#d4a843] font-semibold">Полезный совет:</span> держите под рукой
          5–10 тысяч йен наличными на каждый день — храмы, небольшие идзакая и сувенирные лавки часто
          работают только с кэшем.
        </p>
      </div>

      {/* Personal note */}
      <div className="flex items-start gap-3 text-sm text-[#f5f0e8]/50 italic">
        <span className="text-lg shrink-0">💡</span>
        <span>
          Сам всегда беру с собой и IC-карту, и немного наличных — с этой связкой ни разу не было проблем.
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
        во время путешествий по Японии.
      </p>

      {/* Apps list */}
      <div className="space-y-5">
        {[
          {
            icon: "🗺️",
            name: "Google Maps",
            desc: "В Японии работает отлично — точные маршруты метро и синкансэна, время прибытия, пересадки. Основной навигатор на всю поездку.",
          },
          {
            icon: "🔤",
            name: "Google Translate",
            desc: "Режим камеры переводит меню, вывески и таблички в реальном времени — очень выручает там, где нет английского.",
          },
          {
            icon: "💳",
            name: "Mobile Suica",
            desc: "IC-карта прямо в Apple Wallet (для iPhone) — не нужно искать автомат, чтобы пополнить баланс.",
          },
          {
            icon: "🚄",
            name: "Navitime / Japan Transit Planner",
            desc: "Точные расписания поездов, включая синкансэн и пересадки — удобнее универсальных карт для сложных маршрутов.",
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

        {/* ChatGPT */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f5f0e8] mb-1">ChatGPT</h4>
            <p className="text-sm text-[#f5f0e8]/60 leading-relaxed mb-2">
              Для перевода живых разговоров и нестандартных ситуаций — понимает контекст лучше классических переводчиков.
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

      {/* No VPN needed */}
      <div className="glass-ice rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-semibold text-[#f5f0e8] flex items-center gap-2">
          <span>🌐</span> Хорошая новость про VPN
        </h4>
        <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
          В отличие от Китая, в Японии все привычные сервисы работают без ограничений и без VPN:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "Telegram", "WhatsApp", "YouTube", "Gmail", "Google"].map((s, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-[#f5f0e8]/50">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* My kit */}
      <div className="border border-white/[0.07] rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">🎒 Мой набор для Японии</h4>
        <div className="flex flex-wrap gap-2">
          {["Google Maps", "Google Translate", "Mobile Suica", "Navitime", "ChatGPT", "eSIM"].map((app, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#d9641f]/10 border border-[#d9641f]/20 text-[#f5f0e8]/70 font-medium">
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

      <div className="glass-amber rounded-2xl p-5 text-sm text-[#f5f0e8]/80 leading-relaxed">
        <p>
          <span className="text-[#d4a843] font-semibold">Важное отличие от Китая:</span> безвизового
          режима с Японией для граждан России и Беларуси нет — виза нужна.
        </p>
      </div>

      {/* What's typically needed */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">🛂 Что обычно нужно для подачи</h4>
        <div className="space-y-2">
          {[
            "Загранпаспорт (с достаточным сроком действия)",
            "Заполненная анкета и фото",
            "Бронь отелей и авиабилетов",
            "Подтверждение финансовой состоятельности и цели поездки",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] mt-0.5 shrink-0">·</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#f5f0e8]/50 leading-relaxed">
          Для участников тура я подготовлю бронь отелей, билеты внутри Японии и маршрут — всё, что
          обычно требуется приложить к заявлению.
        </p>
      </div>

      {/* Help commitment */}
      <div className="glass-amber rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed">
        <p className="font-semibold text-[#d4a843] mb-2">💡 Как я помогаю</p>
        <p>
          С визой я помогаю после заключения договора на тур: подскажу, что нужно подготовить,
          помогу с бронями и справками для консульства и буду на связи на всех этапах оформления —
          одному разбираться не придётся.
        </p>
      </div>
    </div>
  );
}

function PackingContent() {
  return (
    <div className="space-y-6">
      <p className="text-[#f5f0e8]/70 leading-relaxed">
        Главная особенность этого тура — два климата в одной поездке. В Токио и Киото в конце ноября
        комфортная прохладная осень, а через несколько дней вы уже в заснеженном Нисэко.
        Собирайтесь слоями — тогда чемодан не разрастётся вдвое.
      </p>

      {/* Tokyo/Kyoto */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">🍁 Токио и Киото (+5…+15°C днём)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Демисезонная куртка",
            "Свитер или флиска",
            "Удобная обувь для долгих прогулок и лестниц в храмах",
            "Лёгкий шарф",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#d4a843] shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Niseko */}
      <div>
        <h4 className="text-sm font-semibold text-[#f5f0e8]/50 uppercase tracking-widest mb-3">❄️ Нисэко (настоящая зима)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Термобельё",
            "Непромокаемая куртка и штаны",
            "Тёплые перчатки и шапка",
            "Солнцезащитные очки для снега",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#f5f0e8]/70">
              <span className="text-[#4fa8e0] shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#f5f0e8]/50 leading-relaxed">
          Лыжи, сноуборд и ботинки брать не нужно — аренда уже включена в стоимость тура.
        </p>
      </div>

      {/* Onsen */}
      <div className="glass-ice rounded-2xl p-5 text-sm text-[#f5f0e8]/70 leading-relaxed space-y-2">
        <p className="font-semibold text-[#4fa8e0]">♨️ Про онсэн</p>
        <p>
          Возьмите с собой небольшое полотенце. В онсэн купаются без купальника, поэтому важно
          знать: в некоторых традиционных источниках просят закрывать татуировки или могут попросить
          не проходить — уточню заранее, какие онсэн на маршруте лояльны к татуировкам.
        </p>
      </div>

      {/* Personal note */}
      <div className="flex items-start gap-3 text-sm text-[#f5f0e8]/50 italic">
        <span className="text-lg shrink-0">💡</span>
        <span>Перед поездкой пришлю более подробный packing-лист специально под эти даты и маршрут.</span>
      </div>
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
    icon: "💴",
    title: "Деньги в Японии",
    ready: true,
    content: <MoneyContent />,
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
  {
    icon: "🎒",
    title: "Что взять с собой",
    ready: true,
    content: <PackingContent />,
  },
];

const vp = { once: true, margin: "-60px" } as const;

export default function Preparation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_50%,rgba(217,100,31,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-[#d9641f] text-sm font-semibold uppercase tracking-[0.3em] mb-4">До поездки</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Подготовка к <span className="gradient-text-japan">путешествию</span>
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
                initial={{ x: -12 }}
                animate={inView ? { x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`group shrink-0 lg:w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 border ${
                  openIndex === i
                    ? "bg-[#d9641f]/10 border-[#d9641f]/30 text-[#f5f0e8]"
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
                  <span className="ml-auto text-[#d9641f] text-lg shrink-0">›</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            {openIndex !== null && (
              <motion.div
                key={openIndex}
                initial={{ y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-7 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.07]">
                  <span className="text-3xl">{cards[openIndex].icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5f0e8]">{cards[openIndex].title}</h3>
                  </div>
                </div>
                {cards[openIndex].content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
