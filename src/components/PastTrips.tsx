"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import FadeImage from "@/components/FadeImage";
import TripReviews from "@/components/TripReviews";
import VideoModal from "@/components/VideoModal";
import { pastTrips, type PastTrip } from "@/lib/pastTrips";

const vp = { once: true, margin: "0px 0px 150px 0px" } as const;

// Desaturated "memory" look that comes back to life on hover.
const faded =
  "grayscale-[85%] sepia-[20%] brightness-[0.7] group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 transition-[filter] duration-1000 ease-out";

export function DoneStamp({ date, className = "" }: { date: string; className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none -rotate-12 rounded-xl border-2 border-[#d4a843]/80 p-1 text-[#d4a843] shadow-[0_0_30px_rgba(212,168,67,0.15)] ${className}`}
    >
      <div className="rounded-lg border border-dashed border-[#d4a843]/60 px-4 py-2 text-center bg-[#0a0a0f]/40 backdrop-blur-[2px]">
        <p className="text-[10px] uppercase tracking-[0.35em] opacity-80">Go With Gosha</p>
        <p className="text-lg md:text-xl font-black uppercase tracking-[0.12em] leading-tight">Тур пройден</p>
        <p className="text-[11px] font-semibold tracking-[0.3em]">✓ {date}</p>
      </div>
    </div>
  );
}

function FilmStrip({ frames }: { frames: string[] }) {
  const holes =
    "h-2 bg-[repeating-linear-gradient(90deg,transparent_0_6px,rgba(245,240,232,0.18)_6px_12px)] [background-size:18px_100%]";
  return (
    <div className="bg-black/80 px-2 py-1.5">
      <div className={holes} />
      <div className="grid grid-cols-4 gap-1.5 my-1.5">
        {frames.map((src, i) => (
          <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
            <FadeImage
              src={src}
              alt=""
              fill
              sizes="120px"
              className={`object-cover ${faded}`}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            />
          </div>
        ))}
      </div>
      <div className={holes} />
    </div>
  );
}

function PastTripCard({ trip }: { trip: PastTrip }) {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-[#d4a843]/25 transition-colors duration-500"
    >
      {/* Whole card is the link; inner buttons sit above it */}
      <Link href={`/${trip.slug}`} aria-label={`${trip.title} — программа прошедшего тура`} className="absolute inset-0 z-10" />

      {/* Visual */}
      <div className="relative lg:col-span-7 flex flex-col">
        <div className="noise relative h-64 md:h-80 lg:h-auto lg:min-h-[340px] lg:flex-1 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.04]">
            <FadeImage
              src={trip.image}
              alt={trip.title}
              fill
              className={`object-cover object-[50%_35%] ${faded}`}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/70 via-transparent to-[#0a0a0f]/20" />

          <motion.div
            initial={{ scale: 1.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.45, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-5 right-4 md:top-7 md:right-7 origin-top-right scale-[0.85] sm:scale-100"
          >
            <DoneStamp date={trip.finished} />
          </motion.div>

          <p className="absolute bottom-4 left-5 text-xs text-[#f5f0e8]/60 uppercase tracking-[0.3em]">
            {trip.country} · {trip.subtitle}
          </p>
        </div>
        <FilmStrip frames={trip.frames} />
      </div>

      {/* Info */}
      <div className="relative lg:col-span-5 p-6 md:p-8 flex flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full border border-[#d4a843]/30 text-[#d4a843]/90 bg-[#d4a843]/[0.06] flex items-center gap-1.5 whitespace-nowrap">
            ✓ Тур пройден
          </span>
          <span className="text-xs text-[#f5f0e8]/35">{trip.dates}</span>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold text-[#f5f0e8]/90 leading-tight mb-2">{trip.title}</h3>
        <p className="text-sm text-[#f5f0e8]/45 mb-7">
          Маршрут уже пройден — но программу можно посмотреть целиком, день за днём.
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-7">
          {trip.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-1 sm:px-3 py-3 text-center min-w-0">
              <p className="text-2xl font-bold text-[#d4a843]/80">{s.value}</p>
              <p className="text-[10px] sm:text-[11px] text-[#f5f0e8]/40 whitespace-pre-line leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {trip.film ? (
          <button
            onClick={() => setFilmOpen(true)}
            className="relative z-20 mb-4 flex items-center gap-4 rounded-2xl glass-red px-4 py-3 text-left hover:bg-[#c8102e]/15 transition-colors"
          >
            <span className="w-11 h-11 rounded-full bg-[#c8102e] flex items-center justify-center text-white shrink-0 animate-pulse-glow">▶</span>
            <span>
              <span className="block text-sm font-semibold text-[#f5f0e8]">Фильм о поездке</span>
              <span className="block text-xs text-[#f5f0e8]/50">Как это было{trip.film.duration && ` · ${trip.film.duration}`}</span>
            </span>
          </button>
        ) : (
          <div className="mb-4 flex items-center gap-4 rounded-2xl border border-dashed border-white/10 px-4 py-3">
            <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-lg shrink-0">🎬</span>
            <span>
              <span className="block text-sm font-medium text-[#f5f0e8]/70">Фильм о поездке</span>
              <span className="block text-xs text-[#f5f0e8]/35">Монтируем — скоро здесь</span>
            </span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-4">
          <span className="hidden sm:inline text-xs text-[#f5f0e8]/35">
            {trip.reviews.length > 0 ? `💬 ${trip.reviews.length} отзывов участников` : "Архив путешествий"}
          </span>
          <span className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 group-hover:text-white group-hover:border-[#d4a843]/30 transition-colors duration-300 whitespace-nowrap">
            Смотреть программу →
          </span>
        </div>
      </div>

      {trip.film && (
        <VideoModal src={filmOpen ? trip.film.src : null} poster={trip.film.poster} onClose={() => setFilmOpen(false)} />
      )}
    </motion.article>
  );
}

export default function PastTrips() {
  if (pastTrips.length === 0) return null;
  const reviews = pastTrips.flatMap((t) => t.reviews);

  return (
    <section id="past-tours" className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-4 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8]/80">Прошедшие туры</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#d4a843]/25 to-transparent" />
          <span className="hidden sm:inline text-xs uppercase tracking-[0.3em] text-[#f5f0e8]/30">Как это было</span>
        </motion.div>

        <div className="space-y-6">
          {pastTrips.map((trip) => (
            <PastTripCard key={trip.slug} trip={trip} />
          ))}
        </div>

        {reviews.length > 0 && (
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5f0e8]/40 mb-5">Голоса группы</p>
            <TripReviews reviews={reviews} />
          </div>
        )}
      </div>
    </section>
  );
}
