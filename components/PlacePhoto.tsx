"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function PlacePhoto({ src, alt, icon }: { src: string; alt: string; icon: string }) {
  const [err, setErr] = useState(false);
  return (
    <div
      style={{
        position: "relative", width: "100%", aspectRatio: "16 / 9",
        borderRadius: 10, overflow: "hidden",
        background: "linear-gradient(150deg,#EFE7D8 0%,#F2D9A0 100%)",
      }}
    >
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 8,
            color: "var(--accent)", padding: 16, textAlign: "center",
          }}
        >
          <Icon name={icon} size={28} />
          <span
            className="mono"
            style={{
              fontSize: 11, color: "var(--ink-muted)",
              letterSpacing: "0.06em", lineHeight: 1.3,
            }}
          >
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
