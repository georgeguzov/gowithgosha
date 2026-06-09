"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const countries = [
  "🇯🇵", "🇹🇭", "🇻🇳", "🇮🇩", "🇮🇳", "🇲🇦", "🇹🇷", "🇮🇹",
  "🇫🇷", "🇪🇸", "🇵🇹", "🇩🇪", "🇬🇧", "🇺🇸", "🇲🇽", "🇧🇷",
  "🇦🇺", "🇳🇿", "🇿🇦", "🇰🇪", "🇨🇳", "🇸🇬", "🇰🇷", "🇺🇦",
];

export default function Guide() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(200,16,46,0.06),transparent)]" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Avatar & flags */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Avatar placeholder */}
            <div className="relative mx-auto lg:mx-0 w-72 h-72 md:w-80 md:h-80">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#c8102e]/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed border-[#d4a843]/20"
              />

              {/* Avatar photo */}
              <div className="absolute inset-8 rounded-full overflow-hidden neon-border">
                <Image src="/я.jpg" alt="Гоша Гузов" fill className="object-cover object-top" sizes="240px" />
              </div>

              {/* Floating country count badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 glass-red rounded-2xl px-4 py-2 text-center"
              >
                <div className="text-2xl font-bold text-[#d4a843]">45+</div>
                <div className="text-xs text-[#f5f0e8]/60">стран</div>
              </motion.div>
            </div>

            {/* Country flags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {countries.map((flag, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.03, type: "spring", stiffness: 200 }}
                  className="text-2xl"
                >
                  {flag}
                </motion.span>
              ))}
              <span className="text-sm text-[#f5f0e8]/30 self-center ml-1">и ещё 20+</span>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Ваш гид</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Гоша <span className="gradient-text">Гузов</span>
            </h2>

            <div className="space-y-4 text-[#f5f0e8]/70 leading-relaxed">
              <p>
                Последние пять лет я путешествую по миру и уже успел побывать более чем в&nbsp;
                <span className="text-[#d4a843] font-semibold">45 странах</span>. Жил в Европе и Индонезии,
                постоянно исследую новые культуры.
              </p>
              <p>
                Убеждён, что лучшие путешествия — это не про галочки возле достопримечательностей,
                а&nbsp;про <span className="text-[#f5f0e8] font-medium">эмоции и людей</span>.
              </p>
              <p>
                Я создаю такие поездки, в которых хочется прожить каждый день на максимум: красивые места,
                необычные локации, атмосферные кафе, местная кухня и компания людей, которые становятся
                друзьями.
              </p>
              <p className="text-[#f5f0e8]/50 italic">
                «Со мной не будет скучных экскурсий и бесконечных лекций. Будет настоящее приключение,
                где всё уже организовано — вам остаётся только получать удовольствие.»
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["5 лет в путешествиях", "Авторские туры", "45+ стран", "Маленькие группы"].map((tag, i) => (
                <span key={i} className="glass px-4 py-2 rounded-full text-sm text-[#f5f0e8]/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}