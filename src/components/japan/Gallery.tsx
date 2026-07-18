"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const tokyo = [
  { src: "/токио-вечер-1.jpg",  label: "Tokyo, Japan", span: "col-span-1 row-span-1" },
  { src: "/токио-сад-2.jpg",    label: "Tokyo, Japan", span: "col-span-1 row-span-1" },
  { src: "/токио-асакуса-3.jpg", label: "Tokyo, Japan", span: "col-span-1 row-span-1" },
  { src: "/токио-гинкго-4.jpg", label: "Tokyo, Japan", span: "col-span-1 row-span-1" },
];

const kyoto = [
  { src: "/киото-фушими-1.jpg",    label: "Kyoto, Japan", span: "col-span-1 row-span-1" },
  { src: "/киото-арашияма-2.jpg",  label: "Kyoto, Japan", span: "col-span-1 row-span-2" },
  { src: "/киото-клены-3.jpg",     label: "Kyoto, Japan", span: "col-span-1 row-span-1" },
  { src: "/киото-гион-4.jpg",      label: "Kyoto, Japan", span: "col-span-1 row-span-1" },
  { src: "/киото-подсветка-5.jpg", label: "Kyoto, Japan", span: "col-span-1 row-span-1" },
];

const niseko = [
  { src: "/нисэко-склон-1.jpg",   label: "Niseko, Hokkaido", span: "col-span-1 row-span-1" },
  { src: "/нисэко-йотей-2.jpg",   label: "Niseko, Hokkaido", span: "col-span-1 row-span-1" },
  { src: "/нисэко-онсэн-3.jpg",   label: "Niseko, Hokkaido", span: "col-span-1 row-span-1" },
  { src: "/нисэко-деревня-4.jpg", label: "Niseko, Hokkaido", span: "col-span-1 row-span-1" },
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

        {/* Tokyo */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">Токио</h3>
            <span className="text-[#f5f0e8]/30 text-lg">— дни 1–3</span>
            <div className="sm:flex-1 h-px w-full sm:w-auto bg-gradient-to-r from-[#d9641f]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[240px]">
            {tokyo.map((photo, i) => (
              <PhotoCard key={photo.src} {...photo} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Kyoto */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">Киото / Нара / Осака</h3>
            <span className="text-[#f5f0e8]/30 text-lg">— дни 4–7</span>
            <div className="sm:flex-1 h-px w-full sm:w-auto bg-gradient-to-r from-[#d9641f]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[240px]">
            {kyoto.map((photo, i) => (
              <PhotoCard key={photo.src} {...photo} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Niseko */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">Нисэко, Хоккайдо</h3>
            <span className="text-[#f5f0e8]/30 text-lg">— дни 8–11</span>
            <div className="sm:flex-1 h-px w-full sm:w-auto bg-gradient-to-r from-[#4fa8e0]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[240px]">
            {niseko.map((photo, i) => (
              <PhotoCard key={photo.src} {...photo} index={i} inView={inView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
