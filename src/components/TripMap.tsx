"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stops = [
  { name: "Чэнду", lat: 30.5728, lng: 104.0668, day: "Дни 1–4", desc: "Панды, хот-пот, шоу смены лиц" },
  { name: "Дуцзянъянь", lat: 31.0037, lng: 103.6419, day: "День 4", desc: "Горные пейзажи, бирюзовая вода" },
  { name: "Чунцин", lat: 29.5630, lng: 106.5516, day: "Дни 5–9", desc: "Киберпанк, Hongyadong, ночная жизнь" },
  { name: "Three Natural Bridges", lat: 29.3256, lng: 107.7553, day: "День 7", desc: "Природные арки, каньоны, водопады" },
];

const route = [
  [30.5728, 104.0668],
  [31.0037, 103.6419],
  [30.5728, 104.0668],
  [29.5630, 106.5516],
  [29.3256, 107.7553],
  [29.5630, 106.5516],
] as [number, number][];

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
        center: [30.1, 105.8],
        zoom: 7,
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

      // Route polyline
      L.polyline(route, {
        color: "#c8102e",
        weight: 2.5,
        opacity: 0.8,
        dashArray: "6 8",
      }).addTo(map);

      // Custom marker icon
      const makeIcon = (active = false) =>
        L.divIcon({
          className: "",
          html: `<div style="
            width:${active ? 14 : 10}px;
            height:${active ? 14 : 10}px;
            background:${active ? "#c8102e" : "#d4a843"};
            border-radius:50%;
            border:2px solid rgba(255,255,255,0.6);
            box-shadow:0 0 ${active ? 10 : 6}px ${active ? "#c8102e" : "#d4a843"};
          "></div>`,
          iconSize: [active ? 14 : 10, active ? 14 : 10],
          iconAnchor: [active ? 7 : 5, active ? 7 : 5],
        });

      stops.forEach((stop, i) => {
        const isMain = i === 0 || i === 2;
        L.marker([stop.lat, stop.lng], { icon: makeIcon(isMain) })
          .addTo(map)
          .bindTooltip(
            `<div style="background:#1a1a24;border:1px solid rgba(200,16,46,0.3);border-radius:8px;padding:8px 12px;color:#f5f0e8;font-size:12px;line-height:1.5;min-width:140px">
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

      // Train label on route midpoint
      const trainLabel = L.divIcon({
        className: "",
        html: `<div style="background:rgba(26,26,36,0.85);border:1px solid rgba(212,168,67,0.4);border-radius:20px;padding:3px 10px;color:#d4a843;font-size:11px;white-space:nowrap">🚄 скоростной поезд</div>`,
        iconAnchor: [65, 10],
      });
      L.marker([30.07, 105.28], { icon: trainLabel, interactive: false }).addTo(map);
    })();

    return () => { cancelled = true; };
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,100,200,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Маршрут</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Куда мы <span className="gradient-text">едем</span>
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
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#f5f0e8]/60">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === 0 || i === 2 ? "bg-[#c8102e] shadow-[0_0_6px_#c8102e]" : "bg-[#d4a843] shadow-[0_0_6px_#d4a843]"}`} />
              <span className="text-[#f5f0e8]/80 font-medium">{stop.name}</span>
              <span className="text-[#f5f0e8]/35">{stop.day}</span>
            </div>
          ))}
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