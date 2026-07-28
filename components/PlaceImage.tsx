"use client";

import { useEffect, useState } from "react";

// Full-bleed background photo with a branded fallback when the file is missing.
export default function PlaceImage({ src, label }: { src: string; label: string }) {
  const [err, setErr] = useState(false);
  // Reset error state when the source changes (switching municipalities).
  useEffect(() => setErr(false), [src]);

  if (err || !src) {
    return (
      <div
        className="ph"
        data-label={label}
        style={{ position: "absolute", inset: 0 }}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      onError={() => setErr(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
