"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stops = [
  { name: "Токио", lat: 35.6762, lng: 139.6503, day: "Дни 1–3", desc: "Шоппинг, Фудзи неподалёку, знакомство с группой" },
  { name: "Кавагутико", lat: 35.5019, lng: 138.7585, day: "День 3", desc: "Гора Фудзи, клёны у озера" },
  { name: "Киото", lat: 35.0116, lng: 135.7681, day: "Дни 4–5", desc: "Тысяча тории, бамбук, пик момидзи" },
  { name: "Нара", lat: 34.6851, lng: 135.8048, day: "День 6", desc: "Олени, храм Tōdai-ji" },
  { name: "Осака", lat: 34.6937, lng: 135.5023, day: "Дни 6–7", desc: "Dōtonbori, вечерний город" },
  { name: "Нисэко", lat: 42.8048, lng: 140.6874, day: "Дни 7–10", desc: "Снег, катание, большой дом" },
  { name: "Саппоро", lat: 43.0618, lng: 141.3545, day: "День 11", desc: "Рынок морепродуктов, вылет домой" },
];

const routeAmber: [number, number][] = [
  [35.6762, 139.6503], // Токио
  [35.5019, 138.7585], // Кавагутико
  [35.6762, 139.6503], // Токио
  [35.0116, 135.7681], // Киото
  [34.6851, 135.8048], // Нара
  [34.6937, 135.5023], // Осака
];

const routeIce: [number, number][] = [
  [34.6937, 135.5023], // Осака
  [42.8048, 140.6874], // Нисэко
  [43.0618, 141.3545], // Саппоро
];

export default function TripMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const mapInstance = useRef<unknown>(null);

  useEffect(() => {
    if (!inView || !mapRef.current || mapInstance.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [38.7, 138.3],
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstance.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Route polylines — amber for the maple leg, ice-blue for the snow leg
      L.polyline(routeAmber, {
        color: "#d9641f",
        weight: 2.5,
        opacity: 0.8,
        dashArray: "6 8",
      }).addTo(map);

      L.polyline(routeIce, {
        color: "#4fa8e0",
        weight: 2.5,
        opacity: 0.8,
        dashArray: "6 8",
      }).addTo(map);

      // Custom marker icon
      const makeIcon = (active = false, snow = false) => {
        const color = snow ? "#4fa8e0" : "#d9641f";
        return L.divIcon({
          className: "",
          html: `<div style="
            width:${active ? 14 : 10}px;
            height:${active ? 14 : 10}px;
            background:${active ? color : "#d4a843"};
            border-radius:50%;
            border:2px solid rgba(255,255,255,0.6);
            box-shadow:0 0 ${active ? 10 : 6}px ${active ? color : "#d4a843"};
          "></div>`,
          iconSize: [active ? 14 : 10, active ? 14 : 10],
          iconAnchor: [active ? 7 : 5, active ? 7 : 5],
        });
      };

      stops.forEach((stop, i) => {
        const isMain = i === 0 || i === 2 || i === 5;
        const isSnow = i >= 5;
        L.marker([stop.lat, stop.lng], { icon: makeIcon(isMain, isSnow) })
          .addTo(map)
          .bindTooltip(
            `<div style="background:#1a1a24;border:1px solid rgba(217,100,31,0.3);border-radius:8px;padding:8px 12px;color:#f5f0e8;font-size:12px;line-height:1.5;min-width:140px">
              <div style="font-weight:700;margin-bottom:2px">${stop.name}</div>
              <div style="color:#d4a843;font-size:11px;margin-bottom:2px">${stop.day}</div>
              <div style="color:rgba(245,240,232,0.5);font-size:11px">${stop.desc}</div>
            </div>`,
            {
              permanent: false,
              direction: i % 2 === 0 ? "right" : "left",
              opacity: 1,
              className: "leaflet-custom-tooltip",
            }
          );
      });

      // Shinkansen label between Tokyo and Kyoto
      const trainLabel = L.divIcon({
        className: "",
        html: `<div style="background:rgba(26,26,36,0.85);border:1px solid rgba(212,168,67,0.4);border-radius:20px;padding:3px 10px;color:#d4a843;font-size:11px;white-space:nowrap">🚄 синкансэн</div>`,
        iconAnchor: [55, 10],
      });
      L.marker([35.34, 137.71], { icon: trainLabel, interactive: false }).addTo(map);

      // Flight label between Osaka and Niseko
      const flightLabel = L.divIcon({
        className: "",
        html: `<div style="background:rgba(26,26,36,0.85);border:1px solid rgba(79,168,224,0.4);border-radius:20px;padding:3px 10px;color:#4fa8e0;font-size:11px;white-space:nowrap">✈️ перелёт</div>`,
        iconAnchor: [45, 10],
      });
      L.marker([38.7, 138.0], { icon: flightLabel, interactive: false }).addTo(map);
    })();

    return () => { cancelled = true; };
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(79,168,224,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#d9641f] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Маршрут</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Куда мы <span className="gradient-text-japan">едем</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/50">Нажмите на точку, чтобы узнать подробности</p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ y: 10 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {stops.map((stop, i) => {
            const isMain = i === 0 || i === 2 || i === 5;
            const isSnow = i >= 5;
            const dotColor = isMain ? (isSnow ? "bg-[#4fa8e0] shadow-[0_0_6px_#4fa8e0]" : "bg-[#d9641f] shadow-[0_0_6px_#d9641f]") : "bg-[#d4a843] shadow-[0_0_6px_#d4a843]";
            return (
              <div key={i} className="flex items-center gap-2 text-sm text-[#f5f0e8]/60">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                <span className="text-[#f5f0e8]/80 font-medium">{stop.name}</span>
                <span className="text-[#f5f0e8]/35">{stop.day}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ y: 12 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl overflow-hidden"
          style={{ height: 420 }}
        >
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </motion.div>

        <p className="mt-4 text-center text-xs text-[#f5f0e8]/25">© CartoDB · OpenStreetMap contributors</p>
      </div>
    </section>
  );
}
