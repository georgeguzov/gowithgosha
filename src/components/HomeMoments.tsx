"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const moments = [
  { src: "/travel-indonesia-komodo-padar.jpg",            label: "Остров Падар, Индонезия", span: "col-span-1 row-span-2" },
  { src: "/travel-iceland-skogafoss-rainbow.jpg",         label: "Скоугафосс, Исландия",    span: "col-span-1 row-span-1" },
  { src: "/travel-australia-twelve-apostles-1.jpg",       label: "Great Ocean Road, Австралия", span: "col-span-1 row-span-1" },
  { src: "/travel-china-chengdu-ifs-panda.jpg",           label: "Чэнду, Китай",            span: "col-span-1 row-span-1" },
  { src: "/travel-cyprus-sea-caves.jpg",                  label: "Пещеры Айя-Напы, Кипр",   span: "col-span-1 row-span-1" },
  { src: "/travel-iceland-fjadrargljufur-canyon.jpg",     label: "Фьядрарглйоуфюр, Исландия", span: "col-span-1 row-span-2" },
  { src: "/travel-australia-kangaroo-2.jpg",               label: "Австралия",               span: "col-span-1 row-span-1" },
  { src: "/travel-indonesia-komodo-swim.jpg",             label: "Комодо, Индонезия",       span: "col-span-1 row-span-1" },
  { src: "/travel-china-chengdu-street.jpg",              label: "Чэнду, Китай",            span: "col-span-1 row-span-1" },
  { src: "/travel-indonesia-bali-uluwatu.jpg",            label: "Улувату, Бали",           span: "col-span-1 row-span-1" },
  { src: "/travel-italy-lake-maggiore.jpg",                label: "Озеро Маджоре, Италия",   span: "col-span-1 row-span-1" },
  { src: "/travel-iceland-horses.jpg",                    label: "Исландские лошади",        span: "col-span-1 row-span-1" },
  { src: "/travel-australia-sydney-opera-1.jpg",           label: "Сидней, Австралия",       span: "col-span-1 row-span-1" },
  { src: "/travel-indonesia-komodo-sunset.jpg",            label: "Закат на Комодо",          span: "col-span-1 row-span-2" },
  { src: "/travel-china-chengdu-alley.jpg",                label: "Чэнду, Китай",            span: "col-span-1 row-span-1" },
  { src: "/travel-australia-twelve-apostles-3.jpg",         label: "Great Ocean Road, Австралия", span: "col-span-1 row-span-1" },
  { src: "/travel-indonesia-komodo-boat.jpg",               label: "Комодо, Индонезия",       span: "col-span-1 row-span-1" },
  { src: "/travel-iceland-fjadrargljufur-selfie.jpg",       label: "Фьядрарглйоуфюр, Исландия", span: "col-span-1 row-span-1" },
  { src: "/travel-australia-sydney-opera-3.jpg",            label: "Сидней, Австралия",       span: "col-span-1 row-span-1" },
  { src: "/travel-indonesia-komodo-padar-walk.jpg",         label: "Остров Падар, Индонезия", span: "col-span-1 row-span-1" },
  { src: "/travel-australia-kangaroo-1.jpg",                label: "Австралия",               span: "col-span-1 row-span-1" },
  { src: "/travel-iceland-skogafoss-rainbow-2.jpg",         label: "Скоугафосс, Исландия",    span: "col-span-1 row-span-1" },
];

function MomentCard({ src, label, span, index, inView }: {
  src: string; label: string; span: string; index: number; inView: boolean;
}) {
  return (
    <motion.div
      className={`${span} relative rounded-2xl overflow-hidden group cursor-default`}
      style={{ minHeight: "160px" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-3 left-4 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default function HomeMoments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative z-10 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Моменты</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Из <span className="gradient-text">моих поездок</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/50 max-w-lg mx-auto">
            Настоящие кадры из реальных туров — а не стоковые фотографии. Вот что по-настоящему ждёт вас в поездке.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[160px] md:auto-rows-[200px]">
          {moments.map((m, i) => (
            <MomentCard key={m.src} {...m} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
