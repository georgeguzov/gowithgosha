"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Для кого этот тур?",
    a: "Для тех, кто хочет увидеть две совершенно разные стороны Японии за одну поездку — золотую осень Киото и первый снег Хоккайдо — в компании единомышленников, без формата больших автобусных туров. Здесь важны атмосфера, фотогеничные локации и живое общение, а не гонка по достопримечательностям.",
  },
  {
    q: "Сколько человек в группе?",
    a: "До 10 человек. Небольшая группа — часть концепции тура: больше свободы передвижения, больше общения и ощущение поездки с друзьями, а не в потоке туристов.",
  },
  {
    q: "Нужна ли виза в Японию?",
    a: "В отличие от Китая, безвизового режима с Японией для граждан России и Беларуси нет — виза нужна. С визой я помогаю после заключения договора на тур: подскажу, что нужно подготовить, и буду на связи на всех этапах оформления.",
  },
  {
    q: "Что взять с собой — тут же и клёны, и снег?",
    a: "Маршрут специально устроен так, чтобы за одну поездку не пришлось выбирать. В Токио и Киото в конце ноября — начале декабря комфортная прохладная погода (от +5 до +15°C днём) — нужна куртка и слои. В Нисэко уже настоящая зима — тёплая непромокаемая одежда, перчатки, шапка. Лыжи и сноуборд брать не нужно — всё есть в аренде на месте. Перед поездкой пришлю подробный packing-лист под обе части маршрута.",
  },
  {
    q: "Безопасно ли в Японии? Что с языком?",
    a: "Япония — одна из самых безопасных и комфортных для путешественников стран в мире. С английским в туристических местах, отелях и по маршруту обычно не возникает проблем, а в отличие от Китая привычные сервисы — Google Maps, Google Translate, Instagram, WhatsApp — работают без ограничений, VPN не нужен.",
  },
  {
    q: "Можно ли присоединиться только на часть маршрута, например только на Нисэко?",
    a: "Тур задуман как единое путешествие «от клёнов к снегу», поэтому стандартно бронируется полностью. Если у вас нестандартная ситуация — напишите, обсудим варианты.",
  },
  {
    q: "Когда нужно оплатить?",
    a: "Для брони места нужна предоплата — $400. Оставшаяся сумма оплачивается за несколько недель до старта тура. Все детали и сроки фиксируем заранее, без скрытых условий.",
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
          initial={{ y: 40 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[#d9641f] text-sm font-semibold uppercase tracking-[0.3em] mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Частые <span className="gradient-text-japan">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ y: 20 }}
              animate={inView ? { y: 0 } : {}}
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
                  className="shrink-0 text-[#d9641f] text-2xl font-light leading-none mt-0.5"
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
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center glass rounded-2xl px-8 py-7"
        >
          <p className="text-[#f5f0e8]/80 text-sm leading-relaxed">
            Остались вопросы?{" "}
            <a
              href="https://t.me/g_zov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d9641f] hover:text-[#e87b2e] transition-colors duration-200 underline underline-offset-2"
            >
              Напишите в Telegram
            </a>{" "}
            или{" "}
            <a
              href="https://instagram.com/gowithgosha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d9641f] hover:text-[#e87b2e] transition-colors duration-200 underline underline-offset-2"
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
