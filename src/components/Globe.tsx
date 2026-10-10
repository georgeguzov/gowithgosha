"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 49, suffix: "+", label: "Стран посетил" },
  { value: 5, suffix: " лет", label: "Путешествий" },
  { value: 5, suffix: "", label: "Поездок в Китай" },
  { value: 3, suffix: "", label: "Страны, где жил" },
  { value: 100, suffix: "+", label: "Перелётов" },
];

// Real-ish coordinates for a handful of visited places, used to anchor the glowing pins on the globe.
const pins = [
  { lat: 64.1, lng: -21.9, label: "Исландия" },
  { lat: 45.9, lng: 8.6, label: "Италия" },
  { lat: 34.9, lng: 33.0, label: "Кипр" },
  { lat: 30.6, lng: 104.0, label: "Китай" },
  { lat: -8.5, lng: 119.5, label: "Индонезия" },
  { lat: -37.8, lng: 144.9, label: "Австралия" },
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

function latLngToXYZ(lat: number, lng: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    z: Math.sin(phi) * Math.sin(theta),
    y: Math.cos(phi),
  };
}

// Deterministic Fibonacci-sphere point cloud — the ambient "dot matrix" texture of the globe.
const AMBIENT_COUNT = 170;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const ambientPoints = Array.from({ length: AMBIENT_COUNT }, (_, i) => {
  const y = 1 - (i / (AMBIENT_COUNT - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = GOLDEN_ANGLE * i;
  return { x: Math.cos(theta) * radiusAtY, y, z: Math.sin(theta) * radiusAtY };
});

const pinPoints = pins.map((p) => ({ ...p, ...latLngToXYZ(p.lat, p.lng) }));

const TILT = 0.36;

function InteractiveGlobe({ onInteract }: { onInteract: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0.6);
  const velocityRef = useRef(0.0022);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef(320);
  const [hoveredPin, setHoveredPin] = useState<{ label: string; x: number; y: number } | null>(null);

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

    let pinScreens: { label: string; sx: number; sy: number; depth: number }[] = [];

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

      // faint sphere edge
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,255,255,0.06)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      for (const p of ambientPoints) {
        const { sx, sy, depth } = project(p.x, p.y, p.z);
        const t = (depth + 1) / 2;
        const alpha = 0.08 + t * 0.3;
        const r = 0.9 + t * 1.3;
        ctx!.beginPath();
        ctx!.arc(sx, sy, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(245,240,232,${alpha})`;
        ctx!.fill();
      }

      pinScreens = [];
      for (const p of pinPoints) {
        const { sx, sy, depth } = project(p.x, p.y, p.z);
        const t = (depth + 1) / 2;
        const r = 2.2 + t * 2.4;
        ctx!.beginPath();
        ctx!.arc(sx, sy, r + 4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200,16,46,${0.08 + t * 0.12})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(sx, sy, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200,16,46,${0.35 + t * 0.65})`;
        ctx!.shadowColor = "rgba(200,16,46,0.9)";
        ctx!.shadowBlur = 6 + t * 6;
        ctx!.fill();
        ctx!.shadowBlur = 0;
        pinScreens.push({ label: p.label, sx, sy, depth });
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    function pointerDown(e: PointerEvent) {
      draggingRef.current = true;
      lastXRef.current = e.clientX;
      canvas!.setPointerCapture(e.pointerId);
      onInteract();
    }
    function pointerMove(e: PointerEvent) {
      if (draggingRef.current) {
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        const delta = dx * 0.012;
        rotationRef.current += delta;
        velocityRef.current = delta;
        setHoveredPin(null);
        return;
      }
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let closest: { label: string; sx: number; sy: number; depth: number } | null = null;
      let bestDist = 16;
      for (const p of pinScreens) {
        if (p.depth < -0.15) continue;
        const d = Math.hypot(p.sx - mx, p.sy - my);
        if (d < bestDist) {
          bestDist = d;
          closest = p;
        }
      }
      setHoveredPin(closest ? { label: closest.label, x: closest.sx, y: closest.sy } : null);
    }
    function pointerUp() {
      draggingRef.current = false;
    }
    function pointerLeave() {
      draggingRef.current = false;
      setHoveredPin(null);
    }

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointerleave", pointerLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointerleave", pointerLeave);
    };
  }, [onInteract]);

  return (
    <div ref={wrapRef} className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.14), rgba(200,16,46,0.16) 42%, rgba(10,10,15,0.9) 76%)",
          boxShadow: "0 0 70px rgba(200,16,46,0.2), inset -24px -24px 60px rgba(0,0,0,0.6)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />
      <AnimatePresence>
        {hoveredPin && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none glass-red text-xs font-medium px-2.5 py-1 rounded-full text-white whitespace-nowrap"
            style={{ left: hoveredPin.x, top: hoveredPin.y - 18, translate: "-50% -100%" }}
          >
            {hoveredPin.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Globe() {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActive(true), 2400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Карта</p>
        <h2 className="text-3xl md:text-5xl font-bold">
          Полмира <span className="gradient-text">позади</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={vp}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setActive(true)}
        className="flex flex-col items-center"
      >
        <InteractiveGlobe onInteract={() => setActive(true)} />

        <div className="mt-8 h-24 w-full max-w-xl relative">
          <AnimatePresence mode="wait">
            {!active ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-sm text-[#f5f0e8]/35"
              >
                Потяни глобус, чтобы посмотреть на карту ↔
              </motion.p>
            ) : (
              <motion.div
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-[#d4a843] tabular-nums">
                      <CountUp value={s.value} />
                      {s.suffix}
                    </div>
                    <div className="text-xs text-[#f5f0e8]/45 mt-0.5">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
