"use client";

import { useLang, lt } from "@/lib/i18n";
import { PROJECTS } from "@/content/projects";
import { STATUS } from "@/content/categories";

export default function Marquee() {
  const { lang } = useLang();

  return (
    <div className="marquee">
      <div className="marquee-track">
        {Array.from({ length: 2 }).flatMap((_, j) =>
          PROJECTS.slice(0, 8).map((p, i) => (
            <span
              key={j + "-" + i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "0 24px",
                fontSize: 13,
                color: "var(--ink-dim)",
                fontFamily: lang === "en" ? "var(--f-mono)" : "var(--f-deva)",
              }}
            >
              <span style={{ color: STATUS[p.status].color, fontSize: 12 }}>●</span>
              <span className="mono" style={{ color: "var(--ink-muted)", fontSize: 13 }}>
                {p.id}
              </span>
              <span>{lt(p, "title", lang)}</span>
              <span style={{ color: "var(--ink-faint)" }}>·</span>
              <span style={{ color: "var(--ink-muted)", fontSize: 12 }}>
                {lt(p, "updated", lang)}
              </span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
