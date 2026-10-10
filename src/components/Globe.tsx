"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 49, suffix: "+", label: "Стран посетил" },
  { value: 5, suffix: " лет", label: "Путешествий" },
  { value: 5, suffix: "", label: "Поездок в Китай" },
  { value: 3, suffix: "", label: "Страны, где жил" },
  { value: 100, suffix: "+", label: "Перелётов" },
];

const pins = [
  { top: "20%", left: "36%", label: "Исландия" },
  { top: "32%", left: "66%", label: "Италия" },
  { top: "47%", left: "24%", label: "Кипр" },
  { top: "53%", left: "74%", label: "Китай" },
  { top: "70%", left: "42%", label: "Индонезия" },
  { top: "76%", left: "64%", label: "Австралия" },
];

const vp = { once: true, margin: "-60px" } as const;

function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function GlobeOrb() {
  return (
    <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto shrink-0">
      {/* sphere body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.18), rgba(200,16,46,0.22) 42%, rgba(10,10,15,0.95) 76%)",
          boxShadow:
            "0 0 60px rgba(200,16,46,0.22), inset -24px -24px 60px rgba(0,0,0,0.65), inset 10px 10px 30px rgba(255,255,255,0.05)",
        }}
      />

      {/* slow light sweep */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden opacity-60"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(212,168,67,0.12) 8%, transparent 20%)" }}
        />
      </motion.div>

      {/* rotating meridians */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {[0.18, 0.52, 0.86].map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-white/[0.08]"
            style={{ transform: `scaleX(${s})` }}
          />
        ))}
      </motion.div>

      {/* static equator */}
      <div
        className="absolute inset-0 rounded-full border border-white/[0.1]"
        style={{ transform: "scaleY(0.14)", top: "50%", translate: "0 -50%" }}
      />

      {/* orbit ring */}
      <motion.div
        className="absolute -inset-5 rounded-full border border-dashed border-white/[0.08]"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4a843] shadow-[0_0_10px_#d4a843]" />
      </motion.div>

      {/* pins */}
      {pins.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          title={p.label}
          className="absolute w-2 h-2 rounded-full bg-[#c8102e] shadow-[0_0_8px_#c8102e] cursor-default"
          style={{ top: p.top, left: p.left, translate: "-50% -50%" }}
        >
          <span className="absolute inset-0 rounded-full bg-[#c8102e] animate-ping opacity-50" />
        </motion.div>
      ))}
    </div>
  );
}

export default function Globe() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Карта</p>
        <h2 className="text-3xl md:text-5xl font-bold">
          Полмира <span className="gradient-text">позади</span>
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlobeOrb />
        </motion.div>

        <div className="flex-1 w-full max-w-sm flex flex-col gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-baseline gap-4 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#d4a843] tabular-nums min-w-[3.5ch]">
                <CountUp value={s.value} />
                {s.suffix}
              </div>
              <div className="text-sm text-[#f5f0e8]/50">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
