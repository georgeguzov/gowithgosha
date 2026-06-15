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
    dates: "3–11 октября 2026",
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
    dates: "Осень-Зима 2026",
    duration: "—",
    price: "Скоро",
    image: "/индонезия.jpg",
    tags: ["Острова", "Джунгли", "Океан", "Маленькая группа"],
    status: "soon" as const,
  },
];

const countries = [
  "🇯🇵", "🇹🇭", "🇻🇳", "🇮🇩", "🇮🇳", "🇲🇦", "🇹🇷", "🇮🇹",
  "🇫🇷", "🇪🇸", "🇵🇹", "🇩🇪", "🇬🇧", "🇺🇸", "🇲🇽", "🇧🇷",
  "🇦🇺", "🇳🇿", "🇿🇦", "🇰🇪", "🇨🇳", "🇸🇬", "🇰🇷", "🇺🇦",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f5f0e8]">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,16,46,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(212,168,67,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">

        {/* — Hero / About — */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-24"
        >
          {/* Avatar */}
          <div className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-[#c8102e]/40">
            <Image src="/я.jpg" alt="Гоша Гузов" fill className="object-cover object-top" sizes="160px" />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <p className="text-[#c8102e] text-xs font-semibold uppercase tracking-[0.3em] mb-2">Авторские туры</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Гоша <span className="gradient-text">Гузов</span>
            </h1>
            <p className="text-[#f5f0e8]/60 leading-relaxed max-w-xl mb-6">
              Путешествую по миру уже 5+ лет, побывал в&nbsp;
              <span className="text-[#d4a843] font-semibold">45+ странах</span>. Создаю небольшие авторские туры,
              где всё уже организовано, а каждый день — новая история. Без скучных экскурсий и туристического конвейера.
            </p>

            {/* Country flags */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mb-6">
              {countries.map((flag, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.02, type: "spring", stiffness: 200 }}
                  className="text-xl"
                >
                  {flag}
                </motion.span>
              ))}
              <span className="text-xs text-[#f5f0e8]/30 self-center ml-1">и ещё 20+</span>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="https://t.me/idonthavenick"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white transition-all duration-300"
              >
                Telegram 💬
              </a>
              <a
                href="https://instagram.com/gowithgosha"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white transition-all duration-300"
              >
                Instagram 📸
              </a>
            </div>
          </div>
        </motion.div>

        {/* — Trips — */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Туры</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c8102e]/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <Link
                  href={trip.status === "open" ? `/${trip.slug}` : "#"}
                  className={`group block glass rounded-3xl overflow-hidden transition-all duration-300 ${trip.status === "open" ? "hover:border-[#c8102e]/30 hover:-translate-y-1 cursor-pointer" : "cursor-default opacity-80"}`}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />

                    {/* Status badge */}
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

                    {/* Country */}
                    <div className="absolute bottom-3 left-4">
                      <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest">{trip.country}</p>
                    </div>
                  </div>

                  {/* Info */}
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
        </motion.div>

      </div>
    </main>
  );
}