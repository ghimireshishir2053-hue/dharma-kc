"use client";

import { STR, useLang, lt } from "@/lib/i18n";
import { PRIORITIES } from "@/content/priorities";
import SectionHead from "./SectionHead";

export default function Priorities() {
  const { lang, t } = useLang();

  return (
    <section
      id="priorities"
      className="section"
      style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-x">
        <SectionHead
          num="01"
          kicker={t(STR.prioritiesKicker)}
          title={t(STR.prioritiesTitle)}
          sub={t(STR.prioritiesSub)}
        />

        <div
          className="r-grid-2"
          style={{
            border: "1px solid var(--line)", borderRadius: 12,
            overflow: "hidden", background: "var(--surface)",
          }}
        >
          {PRIORITIES.map((p, i) => (
            <div
              key={p.id}
              style={{
                padding: 32,
                borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                borderBottom: i < 4 ? "1px solid var(--line)" : "none",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <span
                  className="mono"
                  style={{ fontSize: 36, color: "var(--ink-faint)", fontWeight: 300, lineHeight: 1 }}
                >
                  {lt(p, "num", lang)}
                </span>
                <span className="pill muted" style={{ fontSize: 12 }}>
                  {lt(p, "tag", lang)}
                </span>
              </div>
              <h3 style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 12, fontWeight: 600 }}>
                {lt(p, "title", lang)}
              </h3>
              <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.6, marginBottom: 20 }}>
                {lt(p, "desc", lang)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 3, background: "var(--line)", borderRadius: 2, position: "relative" }}>
                  <div
                    style={{
                      position: "absolute", inset: 0, width: p.progress + "%",
                      background: "var(--accent)", borderRadius: 2,
                    }}
                  />
                </div>
                <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                  {p.progress}%
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 13, color: "var(--ink-muted)", marginLeft: 8 }}
                >
                  {lt(p, "status", lang)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
