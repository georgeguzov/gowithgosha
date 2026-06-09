"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const chengdu = [
  { src: "/ченду-панда-1.jpg", label: "Chengdu, China", span: "col-span-1 row-span-2" },
  { src: "/ченду-1.jpg",       label: "Chengdu, China",      span: "col-span-1 md:col-span-2 row-span-1" },
  { src: "/ченду-мост.jpg",    label: "Chengdu, China",       span: "col-span-1 md:col-span-2 row-span-1" },
];

const chongqing = [
  { src: "/чунцин-старый-город.jpg",        label: "Chongqing, China",    span: "col-span-1 row-span-1" },
  { src: "/чунцин-поезд-через-здание.jpg",  label: "Chongqing, China", span: "col-span-1 row-span-2" },
  { src: "/чунцин-старый-город-4.jpg",      label: "Chongqing, China",   span: "col-span-1 row-span-1" },
  { src: "/чунцин-ночной-3.jpg",            label: "Chongqing, China",   span: "col-span-1 row-span-1" },
  { src: "/чунцин-киберпанк.jpg",           label: "Chongqing, China",       span: "col-span-1 row-span-1" },
];

function PhotoCard({ src, label, span, index, inView }: {
  src: string; label: string; span: string; index: number; inView: boolean;
}) {
  return (
    <motion.div
      className={`${span} relative rounded-2xl overflow-hidden group cursor-pointer`}
      style={{ minHeight: "160px" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-3 left-4 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Chengdu */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-baseline gap-4 mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">Чэнду</h3>
            <span className="text-[#f5f0e8]/30 text-lg">— дни 1–4</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c8102e]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[130px] md:auto-rows-[180px]">
            {chengdu.map((photo, i) => (
              <PhotoCard key={photo.src} {...photo} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Chongqing */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-baseline gap-4 mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">Чунцин</h3>
            <span className="text-[#f5f0e8]/30 text-lg">— дни 5–9</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c8102e]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[130px] md:auto-rows-[180px]">
            {chongqing.map((photo, i) => (
              <PhotoCard key={photo.src} {...photo} index={i} inView={inView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}