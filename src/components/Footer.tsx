export default function Footer({ route, dates }: { route: string; dates: string }) {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-[#f5f0e8]/30">Авторские туры для живых людей</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-[#f5f0e8]/40 text-center">
            <span>{route}</span>
            <span className="hidden sm:inline">·</span>
            <span>{dates}</span>
            <span className="hidden sm:inline">·</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://t.me/g_zov"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white hover:border-[#c8102e]/30 transition-colors duration-300"
            >
              Telegram 💬
            </a>
            <a
              href="https://instagram.com/gowithgosha"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-2.5 rounded-full text-sm text-[#f5f0e8]/70 hover:text-white hover:border-[#c8102e]/30 transition-colors duration-300"
            >
              Instagram 📸
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-xs text-[#f5f0e8]/20">
          © 2026 Гоша Гузов · Все права защищены
        </div>
      </div>
    </footer>
  );
}