"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Для кого этот тур?",
    a: "Для тех, кто хочет увидеть Китай не через призму стандартных экскурсий, а через атмосферу городов, еду, вечерние прогулки, красивые локации и живое общение. Здесь нет «автобуса с флажком» и скучных лекций — только насыщенное путешествие в небольшой компании людей, которым близок такой же вайб: открытость, любопытство и любовь к приключениям.",
  },
  {
    q: "Сколько человек в группе?",
    a: "До 8–10 человек. Маленькая группа — это не случайность, а часть концепции тура: больше свободы, больше общения и ощущение поездки с друзьями, а не в составе большого туристического потока.",
  },
  {
    q: "Нужна ли виза в Китай?",
    a: "Для граждан России и Беларуси на данный момент виза не требуется. Перед поездкой мы дополнительно проверим актуальные правила въезда и подскажем, если что-то изменится.",
  },
  {
    q: "Как добраться до Чэнду?",
    a: "Есть прямые рейсы из Москвы, а также удобные варианты с пересадкой через другие азиатские города — иногда это даже выгоднее. После записи поможем подобрать оптимальный маршрут по цене и времени.",
  },
  {
    q: "Безопасно ли в Китае? Что с языком?",
    a: "Китай — одна из самых безопасных стран для путешествий. В туристических местах всё организовано очень комфортно, а местные жители обычно охотно помогают иностранцам. С языком тоже не останетесь один на один: мы подскажем полезные приложения, а часть бытовых вопросов возьмём на себя.",
  },
  {
    q: "Можно ли присоединиться только на часть маршрута?",
    a: "Тур задуман как цельное путешествие, поэтому стандартно бронируется полностью. Но если у вас нестандартная ситуация — напишите нам, попробуем найти решение.",
  },
  {
    q: "Когда нужно оплатить?",
    a: "Для брони места в группе нужна предоплата. Оставшаяся сумма оплачивается за несколько недель до старта тура. Все детали и сроки мы фиксируем заранее, без скрытых условий.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors duration-200"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-[#f5f0e8] text-base leading-snug">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-[#c8102e] text-2xl font-light leading-none mt-0.5"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-[#f5f0e8]/60 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center glass rounded-2xl px-8 py-7"
        >
          <p className="text-[#f5f0e8]/80 text-sm leading-relaxed">
            Остались вопросы?{" "}
            <a
              href="https://t.me/idonthavenick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8102e] hover:text-[#e8102e] transition-colors duration-200 underline underline-offset-2"
            >
              Напишите в Telegram
            </a>{" "}
            или{" "}
            <a
              href="https://instagram.com/gowithgosha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8102e] hover:text-[#e8102e] transition-colors duration-200 underline underline-offset-2"
            >
              Instagram
            </a>{" "}
            — ответим лично и поможем понять, подойдёт ли вам этот трип.
          </p>
        </motion.div>
      </div>
    </section>
  );
}