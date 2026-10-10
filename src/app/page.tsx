"use client";

import { motion, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeMoments from "@/components/HomeMoments";
import Globe from "@/components/Globe";
import { TelegramIcon, InstagramIcon } from "@/components/icons";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-flight-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-flight.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,16,46,0.16),transparent)]" />
    </div>
  );
}

const socials = [
  { href: "https://t.me/g_zov", label: "Telegram", icon: TelegramIcon },
  { href: "https://instagram.com/gowithgosha", label: "@gowithgosha", icon: InstagramIcon },
  { href: "https://instagram.com/g.zov", label: "@g.zov", icon: InstagramIcon },
];

type TripStatus = "open" | "closed" | "development" | "soon";

const trips: {
  slug: string;
  country: string;
  title: string;
  subtitle: string;
  dates: string;
  duration: string;
  price: string;
  image: string;
  tags: string[];
  status: TripStatus;
}[] = [
  {
    slug: "china",
    country: "Китай",
    title: "Панды и Киберпанк",
    subtitle: "Чэнду + Чунцин",
    dates: "16–24 октября 2026",
    duration: "9 дней",
    price: "$1 490",
    image: "/ченду-панда-1.jpg",
    tags: ["Панды", "Киберпанк", "Хот-пот", "Небольшая группа"],
    status: "closed",
  },
  {
    slug: "indonesia",
    country: "Индонезия",
    title: "Неизведанная Индонезия",
    subtitle: "Бали + Ява + Комодо",
    dates: "Зима 2026",
    duration: "—",
    price: "Уточняется",
    image: "/travel-indonesia-komodo-padar.jpg",
    tags: ["Острова", "Джунгли", "Снорклинг", "Комьюнити"],
    status: "development",
  },
  {
    slug: "australia",
    country: "Австралия",
    title: "Австралийское лето",
    subtitle: "Сидней + Мельбурн",
    dates: "Зима – весна 2027",
    duration: "—",
    price: "Уточняется",
    image: "/travel-australia-twelve-apostles-1.jpg",
    tags: ["Пляжи", "Мегаполисы", "Дикая природа", "Комьюнити"],
    status: "soon",
  },
];

const statusConfig = {
  open: { badge: "Набор открыт", pulse: true, cta: "Подробнее →", linkable: true },
  closed: { badge: "Набор закрыт", pulse: false, cta: "Мест нет", linkable: true },
  development: { badge: "В разработке", pulse: false, cta: "Скоро", linkable: false },
  soon: { badge: "Скоро", pulse: false, cta: "Скоро", linkable: false },
} as const;

const reviews = [
  {
    text: "Путешествовал с Гошей по Европе. Это тот человек, который всегда найдёт интересное место, классную локацию или необычный маршрут. С ним невозможно заскучать.",
    author: "Андрей",
    role: "путешественник, Москва",
  },
  {
    text: "Гоша помогал мне с маршрутом по Китаю. Благодаря его советам удалось избежать кучи ошибок и увидеть гораздо больше интересных мест.",
    author: "Максим",
    role: "разработчик, Минск",
  },
  {
    text: "Самое крутое в поездках с Гошей — это крутая атмосфера. Очень быстро начинаешь чувствовать себя частью компании, даже если никого не знаешь.",
    author: "Артём",
    role: "менеджер, Брест",
  },
];

const vp = { once: true, margin: "-60px" } as const;

function TripCard({
  trip,
  index,
}: {
  trip: (typeof trips)[number];
  index: number;
}) {
  const cfg = statusConfig[trip.status];
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const cardClassName = `group h-full flex flex-col glass rounded-3xl overflow-hidden transition-[border-color] duration-300 ${cfg.linkable ? "hover:border-[#c8102e]/30 cursor-pointer" : "cursor-default opacity-80"}`;

  const cardContent = (
    <>
      <div className="relative h-56 md:h-64 shrink-0 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
        </div>

        <div className="absolute top-3 left-3">
          {trip.status === "open" ? (
            <span className="glass-red text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse" />
              {cfg.badge}
            </span>
          ) : trip.status === "closed" ? (
            <span className="glass text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 text-[#f5f0e8]/60">
              <span className="text-[10px]">🔒</span>
              {cfg.badge}
            </span>
          ) : (
            <span className="glass text-xs font-semibold px-3 py-1 rounded-full text-[#f5f0e8]/50">
              {cfg.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-4">
          <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest">{trip.country}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#f5f0e8] mb-1">{trip.title}</h3>
        <p className="text-sm text-[#f5f0e8]/50 mb-4">{trip.subtitle} · {trip.dates}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {trip.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#c8102e]/10 text-[#f5f0e8]/60 border border-[#c8102e]/15">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-widest">Стоимость</p>
            <p className="text-xl font-bold text-[#d4a843]">{trip.price}</p>
          </div>
          {trip.status === "open" ? (
            <div className="glass-red px-4 py-2 rounded-full text-sm font-medium text-[#f5f0e8] group-hover:bg-[#c8102e]/20 transition-colors duration-300">
              {cfg.cta}
            </div>
          ) : (
            <div className="glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/40">
              {cfg.cta}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={vp}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {cfg.linkable ? (
        <Link href={`/${trip.slug}`} className={cardClassName}>
          {cardContent}
        </Link>
      ) : (
        <div className={cardClassName}>{cardContent}</div>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-[#f5f0e8]">

      {/* Background gradients — sized to one viewport and anchored at the top, not viewport-fixed (avoids iOS Safari repainting a `position: fixed` layer on every toolbar show/hide) */}
      <div className="absolute inset-x-0 top-0 h-screen pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,16,46,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(212,168,67,0.05),transparent)]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 overflow-hidden min-h-[640px] md:min-h-[760px] flex items-center">
        <HeroBackground />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center md:items-start gap-10"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-[#c8102e]/40 shadow-[0_0_40px_rgba(200,16,46,0.25)]"
            >
              <Image src="/avatar-gosha.jpg" alt="Гоша Гузов" fill className="object-cover" sizes="160px" />
            </motion.div>

            {/* Text */}
            <div className="text-center md:text-left max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-xs font-semibold uppercase tracking-[0.3em] mb-3 text-white"
              >
                Go With Gosha
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white"
              >
                Я показываю мир таким, какой он есть —{" "}
                <span className="gradient-text">без туристического автобуса за окном.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/70 text-lg leading-relaxed mb-8"
              >
                Маленькие группы. Настоящие маршруты. Люди, с которыми захочется вернуться в путь.
              </motion.p>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass pl-3.5 pr-5 py-2.5 rounded-full text-sm text-white/75 hover:text-white hover:border-[#c8102e]/30 transition-colors duration-300 flex items-center gap-2.5"
                  >
                    <s.icon className="w-4 h-4 text-white/55 group-hover:text-[#ff5a73] transition-colors duration-300" />
                    {s.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Карта и статистика ── */}
      <Globe />

      {/* ── Туры ── */}
      <section id="tours" className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="flex items-baseline gap-4 mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Туры</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c8102e]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, i) => (
              <TripCard key={trip.slug} trip={trip} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Моменты ── */}
      <HomeMoments />

      {/* ── Это больше, чем тур ── */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_0%_50%,rgba(200,16,46,0.07),transparent)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Философия</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Это больше, чем <span className="gradient-text">тур</span>
            </h2>
          </motion.div>

          {/* Big quote, over a real travel photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden min-h-[280px] md:min-h-[360px] flex flex-col justify-end"
          >
            <Image
              src="/travel-iceland-glacier-lagoon.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 max-w-2xl">
              <div className="text-5xl text-[#c8102e]/40 font-serif leading-none mb-3 select-none">"</div>
              <p className="text-xl md:text-2xl text-white leading-snug font-medium">
                Большинство туров заканчиваются в аэропорту.
              </p>
            </div>
          </motion.div>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 md:mt-12 max-w-2xl mx-auto text-center text-lg text-[#f5f0e8]/65 leading-relaxed"
          >
            Я собираю открытых и лёгких на подъём людей, которые любят приключения и новые знакомства —
            чтобы домой вы увезли не только фотки, но и друзей, с которыми захочется путешествовать снова.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-7"
          >
            {["Небольшие группы", "Атмосфера", "Комьюнити", "Новые знакомства", "Авторские маршруты"].map((tag, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#c8102e]/10 text-[#f5f0e8]/60 border border-[#c8102e]/15">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Отзывы ── */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(200,16,46,0.06),transparent)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-3xl p-7 flex flex-col gap-5 hover:border-[#c8102e]/20 transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden px-8 py-14 md:px-14 text-center"
          >
            <Image
              src="/travel-indonesia-komodo-padar-sunset.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-[#0a0a0f]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(200,16,46,0.2),transparent)]" />

            <div className="relative z-10">
            <p className="text-[#ff5a73] text-sm font-semibold uppercase tracking-[0.3em] mb-5">Присоединяйся</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Готов к следующему <span className="gradient-text">приключению?</span>
            </h2>
            <p className="text-[#f5f0e8]/60 leading-relaxed max-w-xl mx-auto mb-10">
              Если тебе близок формат небольших авторских путешествий и хочется исследовать мир
              в компании классных людей — буду рад познакомиться.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/g_zov"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-[#c8102e] rounded-full text-white font-semibold text-base overflow-hidden transition-transform duration-300 hover:scale-105 animate-pulse-glow"
              >
                <span className="relative z-10">Связаться со мной 💬</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e] to-[#ff3355] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#tours"
                onClick={(e) => { e.preventDefault(); document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 glass rounded-full text-[#f5f0e8]/75 font-medium text-base hover:text-white hover:border-white/20 transition-colors duration-300"
              >
                Посмотреть туры ↑
              </a>
            </div>
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
            <a href="https://t.me/g_zov" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f0e8]/60 transition-colors">Telegram</a>
            <a href="https://instagram.com/gowithgosha" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f0e8]/60 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
