"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const floatingEmojis = [
  { emoji: "🐼", x: "10%", delay: 0, size: "text-4xl" },
  { emoji: "🏮", x: "85%", delay: 0.5, size: "text-3xl" },
  { emoji: "🌃", x: "70%", delay: 1, size: "text-2xl" },
  { emoji: "🍜", x: "20%", delay: 1.5, size: "text-3xl" },
  { emoji: "🏔️", x: "90%", delay: 0.8, size: "text-2xl" },
  { emoji: "🎭", x: "5%", delay: 1.2, size: "text-2xl" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <Image
        src="/чунцин-фон.jpg"
        alt="Chongqing"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/30 to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(200,16,46,0.2),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(0,100,200,0.1),transparent)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(200,16,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} select-none pointer-events-none`}
          style={{ left: item.x, top: `${15 + i * 12}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: [0, -14, 0] }}
          transition={{
            opacity: { delay: item.delay + 0.5, duration: 0.8 },
            y: { delay: item.delay, duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

{/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse" />
          <span className="text-[#f5f0e8]/80">Авторский тур · 3–11 октября 2025</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6"
        >
          <span className="block text-[#f5f0e8]">Панды</span>
          <span className="block gradient-text">и Киберпанк</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#f5f0e8]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Панды, киберпанк и настоящий сычуаньский хот-пот.
          <br />
          Чэнду&nbsp;+&nbsp;Чунцин — 9 дней с людьми, которые станут друзьями.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#booking"
            className="group relative px-8 py-4 bg-[#c8102e] rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10">Хочу в тур — $1&nbsp;890</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e] to-[#ff3355] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#program"
            className="px-8 py-4 glass rounded-full text-[#f5f0e8]/80 font-medium text-lg hover:text-white hover:border-white/20 transition-all duration-300"
          >
            Смотреть программу ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center gap-10 md:gap-16"
        >
          {[
            { value: "9", label: "дней" },
            { value: "2", label: "города" },
            { value: "45+", label: "стран\nГоши" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d4a843]">{stat.value}</div>
              <div className="text-sm text-[#f5f0e8]/50 whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[#c8102e]" />
        </div>
      </motion.div>
    </section>
  );
}