"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <Image
        src="/клены-фудзи-обложка.jpg"
        alt="Клёны на фоне горы Фудзи"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/30 to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,100,31,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_85%,rgba(79,168,224,0.16),transparent)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(217,100,31,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,100,31,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 md:pt-0"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-2 text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#d9641f] animate-pulse" />
          <span className="text-[#f5f0e8]/80">Авторский тур · 22 ноября – 2 декабря 2026</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6"
        >
          <span className="block text-[#f5f0e8]">От Огня</span>
          <span className="block gradient-text-japan">к Снегу</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#f5f0e8]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Красные клёны Киото, гора Фудзи и первый снег Хоккайдо — за одну поездку.
          <br />
          11 дней, два лица Японии, которые обычно показывают порознь.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-[#d9641f] rounded-full text-white font-semibold text-lg overflow-hidden transition-transform duration-300 hover:scale-105 animate-pulse-glow-amber"
          >
            <span className="relative z-10">Хочу в тур</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#d9641f] to-[#f0983f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#program"
            className="px-8 py-4 glass rounded-full text-[#f5f0e8]/80 font-medium text-lg hover:text-white hover:border-white/20 transition-colors duration-300"
          >
            Смотреть программу ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 pb-10 sm:pb-0 flex justify-center gap-10 md:gap-16"
        >
          {[
            { value: "11", label: "дней", detail: null },
            { value: "3", label: "региона", detail: "Токио · Киото · Хоккайдо" },
            { value: "2", label: "сезона Японии", detail: "за одну поездку" },
          ].map((stat, i) => (
            <div key={i} className="text-center max-w-[9rem]">
              <div className="text-3xl md:text-4xl font-bold text-[#d4a843]">{stat.value}</div>
              <div className="text-sm text-[#f5f0e8]/50">{stat.label}</div>
              {stat.detail && (
                <div className="hidden sm:block text-sm text-[#f5f0e8]/50">{stat.detail}</div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[#d9641f]" />
        </div>
      </motion.div>
    </section>
  );
}
