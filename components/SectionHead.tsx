"use client";

import { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

export default function SectionHead({
  num,
  kicker,
  title,
  sub,
  right,
}: {
  num?: string;
  kicker: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
}) {
  const { lang } = useLang();
  return (
    <div className="section-head">
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          {num && <span className="sect-num">/ {num}</span>}
          <span className="eyebrow">{kicker}</span>
        </div>
        <h2
          className={lang === "en" ? "en" : "ne"}
          style={{
            fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)",
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              marginTop: 16,
              color: "var(--ink-dim)",
              maxWidth: 640,
              fontSize: 17,
              lineHeight: 1.5,
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}
