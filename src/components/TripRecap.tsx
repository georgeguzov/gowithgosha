"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FadeImage from "@/components/FadeImage";
import TripReviews from "@/components/TripReviews";
import VideoModal from "@/components/VideoModal";
import { DoneStamp } from "@/components/PastTrips";
import { getPastTrip } from "@/lib/pastTrips";

const vp = { once: true, margin: "0px 0px 150px 0px" } as const;

// «Как это было» — шапка прошедшего тура: штамп, фильм и живые отзывы.
export default function TripRecap({ slug }: { slug: string }) {
  const trip = getPastTrip(slug);
  const [filmOpen, setFilmOpen] = useState(false);
  if (!trip) return null;
  const { film, reviews } = trip;

  return (
    <section id="recap" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(212,168,67,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 text-center md:text-left"
        >
          <DoneStamp date={trip.finished} className="shrink-0 md:mx-6 lg:scale-110" />
          <div>
            <p className="text-[#d4a843] text-sm font-semibold uppercase tracking-[0.3em] mb-3">Как это было</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Этот тур уже <span className="gradient-text">состоялся</span>
            </h2>
            <p className="text-[#f5f0e8]/55 leading-relaxed max-w-xl">
              {trip.dates} мы прошли этот маршрут вместе. Ниже — программа такой, какой она была.
              Хотите в следующую поездку — оставьте заявку, напишу первым.
            </p>
          </div>
        </motion.div>

        {film ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
            onClick={() => setFilmOpen(true)}
            className="group relative block w-full aspect-video rounded-3xl overflow-hidden glass"
          >
            <FadeImage src={film.poster} alt="Фильм о поездке" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 1024px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#c8102e] flex items-center justify-center text-white text-2xl animate-pulse-glow group-hover:scale-110 transition-transform">
              ▶
            </span>
            <span className="absolute bottom-5 left-6 text-left">
              <span className="block text-lg md:text-2xl font-bold text-white">Фильм о поездке</span>
              {film.duration && <span className="block text-sm text-white/60">{film.duration}</span>}
            </span>
          </motion.button>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 px-6 py-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <span className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-2xl shrink-0">🎬</span>
            <div className="flex-1">
              <p className="font-semibold text-[#f5f0e8]/80">Монтируем фильм о поездке</p>
              <p className="text-sm text-[#f5f0e8]/40">Скоро здесь появится короткометражка и живые отзывы участников.</p>
            </div>
            <a href="#contact" className="glass-red px-5 py-2.5 rounded-full text-sm font-medium text-[#f5f0e8] hover:bg-[#c8102e]/20 transition-colors whitespace-nowrap">
              Хочу в следующий →
            </a>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5f0e8]/40 mb-5">Голоса группы</p>
            <TripReviews reviews={reviews} />
          </div>
        )}
      </div>

      {film && <VideoModal src={filmOpen ? film.src : null} poster={film.poster} onClose={() => setFilmOpen(false)} />}
    </section>
  );
}
