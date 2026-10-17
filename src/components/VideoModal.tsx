"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

export default function VideoModal({
  src,
  poster,
  vertical = false,
  onClose,
}: {
  src: string | null;
  poster?: string;
  vertical?: boolean;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [src, onClose]);

  // Portal to <body>: a transformed or backdrop-filtered ancestor would otherwise trap `position: fixed`.
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.video
            key={src}
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl shadow-2xl bg-black ${vertical ? "h-[85vh] max-w-full aspect-[9/16]" : "w-full max-w-5xl aspect-video"}`}
          />
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-5 right-5 glass w-11 h-11 rounded-full text-white/70 hover:text-white text-xl"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
