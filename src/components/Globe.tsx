"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useScroll,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 49, suffix: "+", label: "Стран посетил" },
  { value: 5, suffix: " лет", label: "Путешествий" },
  { value: 5, suffix: "", label: "Поездок в Китай" },
  { value: 3, suffix: "", label: "Страны, где жил" },
  { value: 100, suffix: "+", label: "Перелётов" },
];

// Floating label anchors — kept clear of the globe's zoomed bounding box (roughly 20%–80%).
const floatLayout: { top: string; left?: string; right?: string }[] = [
  { top: "1%", left: "6%" },
  { top: "20%", right: "4%" },
  { top: "48%", left: "0%" },
  { top: "74%", right: "2%" },
  { top: "92%", left: "14%" },
];

const vp = { once: true, margin: "-60px" } as const;

function CountUp({ value, duration = 1.3 }: { value: number; duration?: number }) {
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

function FloatingStat({
  stat,
  style,
  delay,
}: {
  stat: (typeof stats)[number];
  style: { top: string; left?: string; right?: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay }}
      className="absolute w-28 text-center pointer-events-none"
      style={style}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-2xl font-bold text-[#d4a843] tabular-nums [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          <CountUp value={stat.value} />
          {stat.suffix}
        </div>
        <div className="text-[11px] text-[#f5f0e8]/55 mt-0.5 leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CompactStat({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-[#d4a843] tabular-nums">
        <CountUp value={stat.value} />
        {stat.suffix}
      </div>
      <div className="text-[11px] text-[#f5f0e8]/45 mt-0.5">{stat.label}</div>
    </div>
  );
}

// Deterministic Fibonacci-sphere point cloud. Every 4th point is marked "visited" —
// roughly the same ~1-in-4 ratio as 49 of the world's ~195 countries.
const TOTAL = 200;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const spherePoints = Array.from({ length: TOTAL }, (_, i) => {
  const y = 1 - (i / (TOTAL - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = GOLDEN_ANGLE * i;
  return {
    x: Math.cos(theta) * radiusAtY,
    y,
    z: Math.sin(theta) * radiusAtY,
    visited: i % 4 === 1,
  };
});
const visitedIndexes = spherePoints.map((p, i) => (p.visited ? i : -1)).filter((i) => i >= 0);

const TILT = 0.36;
const PING_DURATION = 950;

type Ping = { fromIdx: number; toIdx: number; start: number };
type Burst = { idx: number; start: number };

function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0.6);
  const velocityRef = useRef(0.0022);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragMovedRef = useRef(0);
  const sizeRef = useRef(320);
  const screensRef = useRef<{ sx: number; sy: number; depth: number }[]>([]);
  const pingsRef = useRef<Ping[]>([]);
  const burstsRef = useRef<Burst[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !wrap) return;
      const size = wrap.clientWidth;
      sizeRef.current = size;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf: number;

    function quadPoint(
      p0: { sx: number; sy: number },
      p1: { sx: number; sy: number },
      ctrl: { x: number; y: number },
      t: number
    ) {
      const x = (1 - t) * (1 - t) * p0.sx + 2 * (1 - t) * t * ctrl.x + t * t * p1.sx;
      const y = (1 - t) * (1 - t) * p0.sy + 2 * (1 - t) * t * ctrl.y + t * t * p1.sy;
      return { x, y };
    }

    function draw() {
      const size = sizeRef.current;
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.42;

      if (!draggingRef.current) {
        rotationRef.current += velocityRef.current;
        velocityRef.current += (0.0022 - velocityRef.current) * 0.02;
      }
      const angle = rotationRef.current;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      ctx!.clearRect(0, 0, size, size);

      function project(x: number, y: number, z: number) {
        const rx = x * cosA + z * sinA;
        const rz = -x * sinA + z * cosA;
        const ry2 = y * cosT - rz * sinT;
        const rz2 = y * sinT + rz * cosT;
        return { sx: cx + rx * R, sy: cy + ry2 * R, depth: rz2 };
      }

      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,255,255,0.06)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const screens: { sx: number; sy: number; depth: number }[] = [];
      for (const p of spherePoints) {
        const { sx, sy, depth } = project(p.x, p.y, p.z);
        const t = (depth + 1) / 2;

        if (p.visited) {
          const r = 1.8 + t * 2.1;
          ctx!.beginPath();
          ctx!.arc(sx, sy, r + 3.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212,168,67,${0.06 + t * 0.1})`;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(sx, sy, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212,168,67,${0.4 + t * 0.6})`;
          ctx!.shadowColor = "rgba(212,168,67,0.85)";
          ctx!.shadowBlur = 4 + t * 5;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        } else {
          const alpha = 0.05 + t * 0.16;
          const r = 0.8 + t * 1.1;
          ctx!.beginPath();
          ctx!.arc(sx, sy, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(245,240,232,${alpha})`;
          ctx!.fill();
        }
        screens.push({ sx, sy, depth });
      }
      screensRef.current = screens;

      const now = performance.now();

      burstsRef.current = burstsRef.current.filter((b) => now - b.start < 600);
      for (const b of burstsRef.current) {
        const p = screens[b.idx];
        if (!p) continue;
        const t = (now - b.start) / 600;
        ctx!.beginPath();
        ctx!.arc(p.sx, p.sy, 3 + t * 16, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(200,16,46,${0.7 * (1 - t)})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      pingsRef.current = pingsRef.current.filter((p) => now - p.start < PING_DURATION);
      for (const ping of pingsRef.current) {
        const from = screens[ping.fromIdx];
        const to = screens[ping.toIdx];
        if (!from || !to) continue;
        const t = Math.min((now - ping.start) / PING_DURATION, 1);
        const mx = (from.sx + to.sx) / 2;
        const my = (from.sy + to.sy) / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const ctrl = { x: mx + (dx / dist) * 30, y: my + (dy / dist) * 30 };

        ctx!.beginPath();
        const steps = 28;
        for (let s = 0; s <= steps; s++) {
          const tt = (s / steps) * t;
          const pt = quadPoint(from, to, ctrl, tt);
          if (s === 0) ctx!.moveTo(pt.x, pt.y);
          else ctx!.lineTo(pt.x, pt.y);
        }
        ctx!.strokeStyle = `rgba(212,168,67,${0.75 * (1 - t * 0.4)})`;
        ctx!.lineWidth = 1.3;
        ctx!.stroke();

        const head = quadPoint(from, to, ctrl, t);
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.95)";
        ctx!.shadowColor = "#d4a843";
        ctx!.shadowBlur = 10;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    function hitTest(mx: number, my: number, radius: number) {
      let bestIdx = -1;
      let bestDist = radius;
      for (const idx of visitedIndexes) {
        const p = screensRef.current[idx];
        if (!p || p.depth < -0.1) continue;
        const d = Math.hypot(p.sx - mx, p.sy - my);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      }
      return bestIdx;
    }

    function pointerDown(e: PointerEvent) {
      draggingRef.current = true;
      dragMovedRef.current = 0;
      lastXRef.current = e.clientX;
      canvas!.setPointerCapture(e.pointerId);
    }
    function pointerMove(e: PointerEvent) {
      if (draggingRef.current) {
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        dragMovedRef.current += Math.abs(dx);
        const delta = dx * 0.012;
        rotationRef.current += delta;
        velocityRef.current = delta;
        return;
      }
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      canvas!.style.cursor = hitTest(mx, my, 10) >= 0 ? "pointer" : "grab";
    }
    function pointerUp(e: PointerEvent) {
      draggingRef.current = false;
      if (dragMovedRef.current < 6) {
        const rect = canvas!.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const hitIdx = hitTest(mx, my, 12);
        if (hitIdx >= 0) {
          let targetIdx = visitedIndexes[Math.floor(Math.random() * visitedIndexes.length)];
          if (targetIdx === hitIdx) {
            targetIdx = visitedIndexes[(visitedIndexes.indexOf(hitIdx) + 7) % visitedIndexes.length];
          }
          pingsRef.current.push({ fromIdx: hitIdx, toIdx: targetIdx, start: performance.now() });
          burstsRef.current.push({ idx: hitIdx, start: performance.now() });
        }
      }
    }
    function pointerLeave() {
      draggingRef.current = false;
    }

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointerleave", pointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-64 h-64 md:w-80 md:h-80">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.16), rgba(200,16,46,0.18) 42%, rgba(10,10,15,0.92) 76%)",
          boxShadow: "0 0 90px rgba(200,16,46,0.22), inset -24px -24px 60px rgba(0,0,0,0.6)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />
    </div>
  );
}

export default function Globe() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1, 1]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Опыт</p>
        <h2 className="text-3xl md:text-5xl font-bold">
          Полмира <span className="gradient-text">позади</span>
        </h2>
        <p className="mt-4 text-[#f5f0e8]/45 max-w-md mx-auto">
          5 лет в дороге и 49+ стран — я знаю, куда стоит ехать.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto h-[420px] md:h-[520px] flex items-center justify-center mt-8">
        <motion.div style={{ scale, opacity: globeOpacity, filter }}>
          <InteractiveGlobe />
        </motion.div>

        <div className="hidden md:block">
          {stats.map((s, i) => (
            <FloatingStat key={s.label} stat={s} style={floatLayout[i]} delay={0.5 + i * 0.1} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[#f5f0e8]/25 mt-2 md:hidden">Потяни глобус — и нажми на точку</p>
      <p className="hidden md:block text-center text-xs text-[#f5f0e8]/25 mt-2">
        Потяни глобус, чтобы покрутить, и нажми на точку
      </p>

      <div className="md:hidden mt-10 flex flex-wrap justify-center gap-x-7 gap-y-4">
        {stats.map((s) => (
          <CompactStat key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}
