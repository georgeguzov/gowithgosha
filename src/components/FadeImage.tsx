"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { blurData } from "@/lib/blurData";

export default function FadeImage({ className, onLoad, src, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const knownBlur = typeof src === "string" ? blurData[src] : undefined;

  if (knownBlur) {
    // Native blur-up placeholder renders instantly (inline base64, no network wait) and
    // Next.js cross-dissolves it into the real image once loaded — no manual fade needed.
    return <Image {...props} src={src} className={className} placeholder="blur" blurDataURL={knownBlur} />;
  }

  return (
    <Image
      {...props}
      src={src}
      className={`${className ?? ""} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
