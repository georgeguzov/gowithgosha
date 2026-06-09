"use client";

const items = [
  "🐼 Центр панд",
  "🌶️ Сычуаньский хот-пот",
  "🏙️ Киберпанк Чунцин",
  "🎭 Шоу смены лиц",
  "🚄 Скоростной поезд",
  "🏮 Hongyadong",
  "🌊 Бирюзовая вода",
  "🎪 3D-экраны",
  "🌃 Ночные улицы",
  "🧋 Чайные парки",
  "🎬 Природные мосты",
  "👘 Китайские костюмы",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-5 overflow-hidden border-y border-white/10 bg-[#c8102e]/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-6 text-sm font-medium text-[#f5f0e8]/70 uppercase tracking-widest"
          >
            {item}
            <span className="text-[#c8102e] mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}