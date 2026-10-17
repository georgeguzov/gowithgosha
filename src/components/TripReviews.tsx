"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { TripReview } from "@/lib/pastTrips";
import VideoModal from "@/components/VideoModal";

const vp = { once: true, margin: "0px 0px 150px 0px" } as const;

// Живые отзывы участников: видео-«кружочки» 9:16 и текстовые цитаты в одной ленте.
export default function TripReviews({ reviews }: { reviews: TripReview[] }) {
  const [open, setOpen] = useState<TripReview | null>(null);
  if (reviews.length === 0) return null;

  return (
    <>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 pb-2">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="snap-start shrink-0"
          >
            {r.video ? (
              <button
                onClick={() => setOpen(r)}
                className="group relative block w-44 md:w-52 aspect-[9/16] rounded-3xl overflow-hidden glass text-left"
              >
                <video
                  src={r.video}
                  poster={r.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white text-xs group-hover:bg-[#c8102e] transition-colors">
                  ▶
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-semibold text-white">{r.author}</p>
                  {r.role && <p className="text-xs text-white/50">{r.role}</p>}
                </div>
              </button>
            ) : (
              <div className="w-72 md:w-80 h-full glass rounded-3xl p-6 flex flex-col gap-4">
                <div className="text-3xl text-[#c8102e]/30 font-serif leading-none select-none">&ldquo;</div>
                <p className="text-sm text-[#f5f0e8]/70 leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c8102e] to-[#d4a843] flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {r.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f5f0e8]">{r.author}</p>
                    {r.role && <p className="text-xs text-[#f5f0e8]/35">{r.role}</p>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <VideoModal src={open?.video ?? null} poster={open?.poster} vertical onClose={() => setOpen(null)} />
    </>
  );
}
