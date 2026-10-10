"use client";

import {
  motion,
  useMotionValueEvent,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

const TILT = 0.36;
const PING_DURATION = 950;

// Deterministic Fibonacci-sphere point cloud. Every 4th point is marked "visited" —
// roughly the same ~1-in-4 ratio as 49 of the world's ~195 countries.
const TOTAL = 220;
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

type Ping = { fromIdx: number; toIdx: number; start: number };
type Burst = { idx: number; start: number };

function InteractiveGlobe({ scrollRotation }: { scrollRotation: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0.6);
  const scrollRotationRef = useRef(0);
  const velocityRef = useRef(0.0018);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragMovedRef = useRef(0);
  const sizeRef = useRef(320);
  const screensRef = useRef<{ sx: number; sy: number; depth: number }[]>([]);
  const pingsRef = useRef<Ping[]>([]);
  const burstsRef = useRef<Burst[]>([]);

  useMotionValueEvent(scrollRotation, "change", (v) => {
    scrollRotationRef.current = v;
  });

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
        velocityRef.current += (0.0018 - velocityRef.current) * 0.02;
      }
      const angle = rotationRef.current + scrollRotationRef.current;
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

      // outer atmosphere rim
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 2, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,210,150,0.12)";
      ctx!.lineWidth = 3;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,255,255,0.08)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const screens: { sx: number; sy: number; depth: number }[] = [];
      for (const p of spherePoints) {
        const { sx, sy, depth } = project(p.x, p.y, p.z);
        const t = (depth + 1) / 2;

        if (p.visited) {
          const r = 1.9 + t * 2.3;
          ctx!.beginPath();
          ctx!.arc(sx, sy, r + 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212,168,67,${0.07 + t * 0.11})`;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(sx, sy, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212,168,67,${0.42 + t * 0.58})`;
          ctx!.shadowColor = "rgba(212,168,67,0.9)";
          ctx!.shadowBlur = 5 + t * 6;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        } else {
          const alpha = 0.05 + t * 0.17;
          const r = 0.8 + t * 1.2;
          ctx!.beginPath();
          ctx!.arc(sx, sy, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(245,240,232,${alpha})`;
          ctx!.fill();
        }
        screens.push({ sx, sy, depth });
      }
      screensRef.current = screens;

      const now = performance.now();

      burstsRef.current = burstsRef.current.filter((b) => now - b.start < 650);
      for (const b of burstsRef.current) {
        const p = screens[b.idx];
        if (!p) continue;
        const t = (now - b.start) / 650;
        ctx!.beginPath();
        ctx!.arc(p.sx, p.sy, 3 + t * 20, 0, Math.PI * 2);
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
        const ctrl = { x: mx + (dx / dist) * 34, y: my + (dy / dist) * 34 };

        ctx!.beginPath();
        const steps = 28;
        for (let s = 0; s <= steps; s++) {
          const tt = (s / steps) * t;
          const pt = quadPoint(from, to, ctrl, tt);
          if (s === 0) ctx!.moveTo(pt.x, pt.y);
          else ctx!.lineTo(pt.x, pt.y);
        }
        ctx!.strokeStyle = `rgba(212,168,67,${0.75 * (1 - t * 0.4)})`;
        ctx!.lineWidth = 1.4;
        ctx!.stroke();

        const head = quadPoint(from, to, ctrl, t);
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.8, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.95)";
        ctx!.shadowColor = "#d4a843";
        ctx!.shadowBlur = 11;
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
      canvas!.style.cursor = hitTest(mx, my, 11) >= 0 ? "pointer" : "grab";
    }
    function pointerUp(e: PointerEvent) {
      draggingRef.current = false;
      if (dragMovedRef.current < 6) {
        const rect = canvas!.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const hitIdx = hitTest(mx, my, 13);
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
    <div ref={wrapRef} className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px]">
      {/* outer atmosphere glow */}
      <div
        className="absolute -inset-10 rounded-full pointer-events-none blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.16), rgba(200,16,46,0.1) 45%, transparent 72%)" }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.2), rgba(200,16,46,0.2) 40%, rgba(8,8,13,0.95) 74%)",
          boxShadow: "0 0 120px rgba(200,16,46,0.28), inset -28px -28px 70px rgba(0,0,0,0.65), inset 14px 14px 40px rgba(255,255,255,0.04)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />
    </div>
  );
}

function Starfield() {
  const stars = [
    "12% 18%", "28% 8%", "42% 22%", "61% 10%", "77% 20%", "89% 14%",
    "8% 42%", "93% 46%", "18% 64%", "84% 60%", "35% 82%", "66% 88%",
    "50% 50%", "22% 34%", "72% 36%", "58% 70%", "4% 76%", "96% 80%",
  ];
  const image = stars
    .map((pos) => `radial-gradient(1.4px 1.4px at ${pos}, rgba(255,255,255,0.55), transparent)`)
    .join(", ");
  return <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundImage: image }} />;
}

type SceneProps = {
  progress: MotionValue<number>;
  fadeIn: [number, number];
  fadeOut: [number, number];
  countWindow?: [number, number];
  value?: number;
  suffix?: string;
  kicker?: string;
  label: string;
};

function Scene({ progress, fadeIn, fadeOut, countWindow, value, suffix, kicker, label }: SceneProps) {
  const opacity = useTransform(progress, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [fadeIn[0], fadeIn[1]], [26, 0]);
  const count = useTransform(progress, countWindow ?? [0, 1], [0, value ?? 0]);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      {kicker && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8102e] mb-4">{kicker}</p>}
      {value !== undefined ? (
        <div className="text-6xl md:text-8xl font-bold text-white tabular-nums [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]">
          <motion.span>{rounded}</motion.span>
          {suffix}
        </div>
      ) : null}
      <p className="mt-4 text-lg md:text-2xl text-white/70 max-w-sm md:max-w-md [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">{label}</p>
    </motion.div>
  );
}

export default function Globe() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const entryScale = useTransform(scrollYProgress, [0, 0.07], [1.18, 1]);
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2.2]);

  const bgOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 md:pt-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4"
        >
          Опыт
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Полмира <span className="gradient-text">позади</span>
        </motion.h2>
      </div>

      <section ref={sectionRef} className="relative h-[300vh] md:h-[360vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(200,16,46,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_85%_75%,rgba(212,168,67,0.07),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_20%,rgba(0,80,160,0.05),transparent)]" />
            <Starfield />
          </motion.div>

          <motion.div style={{ scale: entryScale }} className="relative z-10">
            <InteractiveGlobe scrollRotation={scrollRotation} />
          </motion.div>

          <div className="absolute inset-0 z-20">
            <Scene progress={scrollYProgress} fadeIn={[0, 0.08]} fadeOut={[0.25, 0.32]} countWindow={[0.02, 0.22]} value={49} suffix="+" kicker="Стран" label="я увидел своими глазами" />
            <Scene progress={scrollYProgress} fadeIn={[0.34, 0.41]} fadeOut={[0.58, 0.65]} countWindow={[0.36, 0.55]} value={5} suffix=" лет" kicker="В дороге" label="без остановок, без шаблонных туров" />
            <Scene progress={scrollYProgress} fadeIn={[0.67, 0.74]} fadeOut={[0.88, 0.94]} countWindow={[0.69, 0.87]} value={100} suffix="+" kicker="Перелётов" label="чтобы быть там, где стоит быть" />
            <Scene progress={scrollYProgress} fadeIn={[0.9, 0.96]} fadeOut={[1, 1]} label="Я знаю, куда стоит ехать — и с кем." />
          </div>

          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-xs text-white/25">
            Потяни глобус, чтобы покрутить, и нажми на точку
          </p>
        </div>
      </section>
    </>
  );
}
