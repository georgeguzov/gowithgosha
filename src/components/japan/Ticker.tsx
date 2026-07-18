"use client";

import { motion } from "framer-motion";

export default function Ticker() {
  return (
    <div className="relative py-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(217,100,31,0.07),transparent)] pointer-events-none" />

      <div className="relative flex items-center justify-center gap-0 px-8 max-w-2xl mx-auto">
        {/* Left decorative line */}
        <div className="flex items-center flex-1 gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d9641f]/50" />
          <motion.span
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="text-[#d9641f]/50 text-xs select-none"
          >❄</motion.span>
          <motion.span
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="text-[#4fa8e0]/40 text-[10px] select-none"
          >❄</motion.span>
        </div>

        {/* Maple leaf */}
        <motion.div
          animate={{
            y: [0, -7, 0],
            filter: [
              "drop-shadow(0 0 6px rgba(217,100,31,0.35))",
              "drop-shadow(0 0 22px rgba(217,100,31,0.75)) drop-shadow(0 0 40px rgba(212,168,67,0.2))",
              "drop-shadow(0 0 6px rgba(217,100,31,0.35))",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl md:text-6xl select-none shrink-0 mx-5"
        >
          🍁
        </motion.div>

        {/* Right decorative line */}
        <div className="flex items-center flex-1 gap-3">
          <motion.span
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="text-[#4fa8e0]/40 text-[10px] select-none"
          >❄</motion.span>
          <motion.span
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="text-[#d9641f]/50 text-xs select-none"
          >❄</motion.span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d9641f]/50" />
        </div>
      </div>
    </div>
  );
}
