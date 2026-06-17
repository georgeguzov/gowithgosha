"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const trips = [
  {
    slug: "china",
    country: "Китай",
    title: "Панды и Киберпанк",
    subtitle: "Чэнду + Чунцин",
    dates: "10–18 октября 2026",
    duration: "9 дней",
    price: "$1 390",
    image: "/ченду-панда-1.jpg",
    tags: ["Панды", "Киберпанк", "Хот-пот", "Маленькая группа"],
    status: "open" as const,
  },
  {
    slug: "indonesia",
    country: "Индонезия",
    title: "Неизведанная Индонезия",
    subtitle: "Бали + Ява + Комодо",
    dates: "Зима 2026",
    duration: "—",
    price: "Скоро",
    image: "/индонезия.jpg",
    tags: ["Острова", "Джунгли", "Океан", "Маленькая группа"],
    status: "soon" as const,
  },
];

const stats = [
  { value: "45+", label: "Стран посетил" },
  { value: "5 лет", label: "Путешествий" },
  { value: "5", label: "Поездок в Китай" },
  { value: "3", label: "Страны, где жил" },
  { value: "100+", label: "Перелётов" },
];

const reviews = [
  {
    text: "Путешествовал с Гошей по Европе. Это тот человек, который всегда найдёт интересное место, классную локацию или необычный маршрут. С ним невозможно заскучать.",
    author: "Андрей",
    role: "путешественник",
  },
  {
    text: "Гоша помогал мне с маршрутом по Китаю. Благодаря его советам удалось избежать кучи ошибок и увидеть гораздо больше интересных мест.",
    author: "Максим",
    role: "",
  },
  {
    text: "Самое крутое в поездках с Гошей — атмосфера. Очень быстро начинаешь чувствовать себя частью компании, даже если никого не знаешь.",
    author: "Артём",
    role: "",
  },
];

const vp = { once: true, margin: "-60px" } as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f5f0e8]">

      {/* Fixed background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,16,46,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(212,168,67,0.05),transparent)]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10"
        >
          {/* Avatar */}
          <div className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-[#c8102e]/40 shadow-[0_0_40px_rgba(200,16,46,0.15)]">
            <Image src="/я.jpg" alt="Гоша Гузов" fill className="object-cover object-top" sizes="160px" />
          </div>

          {/* Text */}
          <div className="text-center md:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            >
              <span className="text-[#f5f0e8]">Go With Gosha</span>
              <span className="text-[#c8102e]"> · Авторские путешествия</span>
            </motion.p>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Авторские путешествия для тех, кто хочет увидеть мир{" "}
              <span className="gradient-text">не через окно туристического автобуса.</span>
            </h1>

            <p className="text-[#f5f0e8]/55 text-lg leading-relaxed mb-8">
              Новые страны. Новые впечатления. Новые люди, которые становятся друзьями и с которыми хочется увидеть ещё полмира.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="https://t.me/idonthavenick"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white transition-all duration-300"
              >
                Telegram 💬
              </a>
              <a
                href="https://instagram.com/gowithgosha"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white transition-all duration-300"
              >
                Instagram 📸
              </a>
              <a
                href="https://instagram.com/g.zov"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white transition-all duration-300"
              >
                @g.zov 📷
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 + i * 0.07 }}
              className="glass rounded-2xl px-5 py-5 text-center group hover:border-[#c8102e]/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#d4a843] mb-1">{s.value}</div>
              <div className="text-xs text-[#f5f0e8]/45 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Это больше, чем тур ── */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_0%_50%,rgba(200,16,46,0.07),transparent)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Философия</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Это больше, чем <span className="gradient-text">тур</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Big quote */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55 }}
              className="glass-red rounded-3xl p-8 md:p-10 flex flex-col justify-center"
            >
              <div className="text-5xl text-[#c8102e]/25 font-serif leading-none mb-4 select-none">"</div>
              <p className="text-lg md:text-xl text-[#f5f0e8]/85 leading-relaxed">
                Большинство туров заканчиваются в аэропорту.
              </p>
              <p className="mt-4 text-[#f5f0e8]/60 leading-relaxed">
                Я создаю путешествия, в которых важны не только страны и маршруты, но и люди рядом.
              </p>
            </motion.div>

            {/* Details */}
            <div className="space-y-4">
              {[
                {
                  icon: "🌍",
                  text: "Моя цель — собирать открытых, любознательных и лёгких на подъём ребят, которые любят приключения, новые знакомства и яркие впечатления.",
                },
                {
                  icon: "🤝",
                  text: "Чтобы после поездки вы увезли домой не только фотографии, но и друзей, с которыми захотите путешествовать снова.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 16 }}
                  whileInView={{ y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 flex gap-4 items-start"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <p className="text-[#f5f0e8]/65 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}

              {/* Tags */}
              <motion.div
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex flex-wrap gap-2">
                  {["Небольшие группы", "Атмосфера", "Комьюнити", "Новые знакомства", "Авторский маршрут", "Без конвейера"].map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#c8102e]/10 text-[#f5f0e8]/60 border border-[#c8102e]/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Туры ── */}
      <section id="tours" className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="flex items-baseline gap-4 mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Туры</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c8102e]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link
                  href={trip.status === "open" ? `/${trip.slug}` : "#"}
                  className={`group block glass rounded-3xl overflow-hidden transition-all duration-300 ${trip.status === "open" ? "hover:border-[#c8102e]/30 hover:-translate-y-1 cursor-pointer" : "cursor-default opacity-80"}`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      {trip.status === "open" ? (
                        <span className="glass-red text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse" />
                          Набор открыт
                        </span>
                      ) : (
                        <span className="glass text-xs font-semibold px-3 py-1 rounded-full text-[#f5f0e8]/50">
                          Скоро
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest">{trip.country}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#f5f0e8] mb-1">{trip.title}</h3>
                    <p className="text-sm text-[#f5f0e8]/50 mb-4">{trip.subtitle} · {trip.dates}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {trip.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#c8102e]/10 text-[#f5f0e8]/60 border border-[#c8102e]/15">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-widest">Стоимость</p>
                        <p className="text-xl font-bold text-[#d4a843]">{trip.price}</p>
                      </div>
                      {trip.status === "open" ? (
                        <div className="glass-red px-4 py-2 rounded-full text-sm font-medium text-[#f5f0e8] group-hover:bg-[#c8102e]/20 transition-colors duration-300">
                          Подробнее →
                        </div>
                      ) : (
                        <div className="glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/40">
                          Скоро
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Отзывы ── */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(200,16,46,0.06),transparent)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Отзывы</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Что говорят <span className="gradient-text">обо мне</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-3xl p-7 flex flex-col gap-5 hover:border-[#c8102e]/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-3xl text-[#c8102e]/20 font-serif leading-none select-none">"</div>
                <p className="text-[#f5f0e8]/70 leading-relaxed text-sm flex-1">{r.text}</p>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="font-semibold text-[#f5f0e8] text-sm">— {r.author}</p>
                  {r.role && <p className="text-xs text-[#f5f0e8]/35 mt-0.5">{r.role}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
            className="glass-red rounded-3xl px-8 py-14 md:px-14 text-center"
          >
            <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-5">Присоединяйся</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Готов к следующему <span className="gradient-text">приключению?</span>
            </h2>
            <p className="text-[#f5f0e8]/60 leading-relaxed max-w-xl mx-auto mb-10">
              Если тебе близок формат небольших авторских путешествий и хочется исследовать мир
              в компании классных людей — буду рад познакомиться.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/idonthavenick"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-[#c8102e] rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                <span className="relative z-10">Связаться со мной 💬</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e] to-[#ff3355] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#tours"
                onClick={(e) => { e.preventDefault(); document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 glass rounded-full text-[#f5f0e8]/75 font-medium text-base hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Посмотреть туры ↑
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#f5f0e8]/30">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#f5f0e8]/50">Go With Gosha</span>
            <span>· Авторские путешествия</span>
          </div>
          <div className="flex gap-5">
            <a href="https://t.me/idonthavenick" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f0e8]/60 transition-colors">Telegram</a>
            <a href="https://instagram.com/gowithgosha" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f0e8]/60 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

    </main>
  );
}