"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type State = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, comment }),
      });

      if (!res.ok) throw new Error();
      setState("success");
      if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq("track", "Lead");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(200,16,46,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Хочу в тур</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Оставьте <span className="gradient-text">заявку</span>
          </h2>
          <p className="text-[#f5f0e8]/50 leading-relaxed">
            Напишите свои контакты — я свяжусь с вами в течение дня и отвечу на все вопросы.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-red rounded-3xl p-10 text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-[#f5f0e8] mb-2">Заявка отправлена!</h3>
              <p className="text-[#f5f0e8]/60">Я свяжусь с вами в ближайшее время.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 space-y-5"
            >
              <div>
                <label className="block text-xs text-[#f5f0e8]/40 uppercase tracking-widest mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Алексей"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c8102e]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[#f5f0e8]/40 uppercase tracking-widest mb-2">
                  Телеграм или телефон *
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  required
                  placeholder="@username или +7 900 000-00-00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c8102e]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[#f5f0e8]/40 uppercase tracking-widest mb-2">
                  Комментарий <span className="normal-case text-[#f5f0e8]/20">(необязательно)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  placeholder="Есть вопросы? Напишите здесь..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c8102e]/50 transition-colors resize-none"
                />
              </div>

              {state === "error" && (
                <p className="text-sm text-[#c8102e]/80">
                  Что-то пошло не так. Попробуйте ещё раз или напишите напрямую в Telegram.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full glass-red py-4 rounded-xl font-semibold text-[#f5f0e8] hover:bg-[#c8102e]/20 transition-all duration-300 disabled:opacity-50"
              >
                {state === "loading" ? "Отправляем..." : "Отправить заявку →"}
              </button>

              <p className="text-center text-xs text-[#f5f0e8]/25">
                Или напишите напрямую{" "}
                <a href="https://t.me/idonthavenick" target="_blank" rel="noopener noreferrer" className="text-[#f5f0e8]/40 hover:text-[#f5f0e8]/60 transition-colors">
                  @idonthavenick
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}