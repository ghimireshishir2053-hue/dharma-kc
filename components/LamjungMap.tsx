"use client";

import { ReactNode, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { PROJECTS } from "@/content/projects";
import { CATEGORIES, STATUS } from "@/content/categories";
import type { PalikaId } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

function MuniStat({
  label, value, accent = "var(--ink)",
}: { label: ReactNode; value: ReactNode; accent?: string }) {
  return (
    <div style={{ padding: "12px 14px", background: "var(--bg-soft)", borderRadius: 8 }}>
      <div
        className="mono"
        style={{
          fontSize: 10, color: "var(--ink-muted)",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div className="num" style={{ fontSize: 20, color: accent, fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}

export default function LamjungMap() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<PalikaId>("besisahar");
  const muni = MUNICIPALITIES.find((m) => m.id === active)!;
  const muniProjects = PROJECTS.filter((p) => p.palika === active);
  const projectCount = (id: PalikaId) => PROJECTS.filter((p) => p.palika === id).length;

  return (
    <section
      id="lamjung"
      className="section"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-x">
        <SectionHead
          num="03"
          kicker={t(STR.mapKicker)}
          title={t(STR.mapTitle)}
          sub={t(STR.mapSub)}
          right={
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500 }} className="mono">{PROJECTS.length}</div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10, color: "var(--ink-muted)",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}
                >
                  {lang === "en" ? "Projects" : "परियोजना"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500 }} className="mono">8</div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10, color: "var(--ink-muted)",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}
                >
                  {lang === "en" ? "Palikas" : "पालिका"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500 }} className="mono">१,८६,९६९</div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10, color: "var(--ink-muted)",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}
                >
                  {lang === "en" ? "Population" : "जनसंख्या"}
                </div>
              </div>
            </div>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }}>
          <div
            className="card"
            style={{
              padding: 0, overflow: "hidden", position: "relative",
              minHeight: 560, background: "linear-gradient(165deg,#0F151D 0%,#141B25 100%)",
            }}
          >
            <svg viewBox="0 0 600 500" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="600" height="500" fill="url(#grid)" />

              <g stroke="rgba(62,125,184,0.4)" strokeWidth="2" fill="none">
                <path d="M 460 60 Q 430 120 400 200 Q 380 270 350 320 Q 310 360 240 400 Q 160 420 80 440" />
                <path d="M 420 280 Q 360 300 310 320" />
                <path d="M 140 260 Q 170 320 200 380" />
              </g>

              <path
                d="M 80 440 Q 60 360 90 280 Q 110 210 140 170 Q 180 130 240 110 Q 310 80 370 70 Q 430 60 470 100 Q 500 150 495 220 Q 490 300 470 360 Q 440 420 380 450 Q 300 470 220 465 Q 140 455 80 440 Z"
                fill="rgba(232,177,74,0.04)"
                stroke="rgba(232,177,74,0.35)"
                strokeWidth="1.5"
              />

              {MUNICIPALITIES.map((m) => {
                const count = projectCount(m.id);
                const isActive = active === m.id;
                return (
                  <g key={m.id} className="muni" onClick={() => setActive(m.id)}>
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r={isActive ? 36 : 28}
                      fill={isActive ? "rgba(232,177,74,0.18)" : "rgba(232,177,74,0.04)"}
                      stroke={isActive ? "var(--accent)" : "rgba(232,177,74,0.25)"}
                      strokeWidth={isActive ? 2 : 1}
                      style={{ filter: isActive ? "url(#glow)" : "none" }}
                    />
                    <circle cx={m.x} cy={m.y} r="4" fill={isActive ? "var(--accent)" : "rgba(232,177,74,0.6)"} />
                    <text
                      x={m.x}
                      y={m.y - (isActive ? 46 : 38)}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isActive ? "#fff" : "rgba(255,255,255,0.7)"}
                      style={{
                        fontFamily: lang === "en" ? "Space Grotesk" : "Noto Sans Devanagari",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {lang === "en"
                        ? m.en.replace(/ (Municipality|Rural Municipality)/, "")
                        : m.ne.replace(/ (नगरपालिका|गाउँपालिका)/, "")}
                    </text>
                    <text
                      x={m.x}
                      y={m.y + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fill="rgba(0,0,0,0.7)"
                      fontWeight="600"
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      {count}
                    </text>
                    {m.hq && (
                      <polygon
                        points={`${m.x - 5},${m.y + 16} ${m.x + 5},${m.y + 16} ${m.x},${m.y + 12}`}
                        fill="var(--accent)"
                      />
                    )}
                  </g>
                );
              })}

              <g transform="translate(540, 40)">
                <circle r="18" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" />
                <path d="M 0 -10 L 3 0 L 0 8 L -3 0 Z" fill="var(--accent)" />
                <text y="-22" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" style={{ fontFamily: "JetBrains Mono" }}>
                  N
                </text>
              </g>

              <g transform="translate(30, 470)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(255,255,255,0.4)" />
                <line x1="30" y1="-3" x2="30" y2="3" stroke="rgba(255,255,255,0.4)" />
                <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(255,255,255,0.4)" />
                <text y="-8" fontSize="9" fill="rgba(255,255,255,0.5)" style={{ fontFamily: "JetBrains Mono" }}>
                  0 — 10 km
                </text>
              </g>

              <text
                x="30"
                y="40"
                fontSize="11"
                fill="rgba(255,255,255,0.4)"
                style={{ fontFamily: "JetBrains Mono", letterSpacing: "0.1em" }}
              >
                LAMJUNG · 28.21°N 84.40°E
              </text>
            </svg>

            <div
              style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(11,15,20,0.85)", border: "1px solid var(--line)",
                borderRadius: 8, padding: "10px 14px", fontSize: 11,
                fontFamily: "var(--f-mono)", color: "var(--ink-dim)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                {lang === "en" ? "Active projects" : "सक्रिय परियोजना"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 0, height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderBottom: "6px solid var(--accent)",
                  }}
                />
                {lang === "en" ? "District HQ" : "सदरमुकाम"}
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span className="eyebrow">
                  {lang === "en" ? (muni.hq ? "District HQ" : muni.typeEn) : muni.hq ? "सदरमुकाम" : muni.type}
                </span>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-muted)" }}>
                  {active.toUpperCase()}
                </span>
              </div>
              <h3 style={{ fontSize: 26, marginBottom: 20, marginTop: 4 }}>
                {lang === "en" ? muni.en : muni.ne}
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <MuniStat label={t(STR.mapPop)} value={muni.pop} />
                <MuniStat label={t(STR.mapArea)} value={muni.area} />
                <MuniStat label={t(STR.mapWards)} value={muni.wards} />
                <MuniStat label={t(STR.mapProjects)} value={muniProjects.length} accent="var(--accent)" />
              </div>

              <div style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 8, marginBottom: 16 }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 10, color: "var(--ink-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6,
                  }}
                >
                  {lang === "en" ? "Key issues" : "मुख्य विषय"}
                </div>
                <div style={{ fontSize: 14 }}>{lt(muni, "issue", lang)}</div>
              </div>

              <div
                className="mono"
                style={{
                  fontSize: 10, color: "var(--ink-muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                }}
              >
                {lang === "en"
                  ? `Projects in ${muni.en.split(" ")[0]}`
                  : `${muni.ne.split(" ")[0]}का परियोजना`}{" "}
                · {muniProjects.length}
              </div>
              {muniProjects.length === 0 ? (
                <div
                  style={{
                    padding: 20, textAlign: "center", color: "var(--ink-muted)",
                    fontSize: 13, border: "1px dashed var(--line)", borderRadius: 8,
                  }}
                >
                  {lang === "en"
                    ? "No tracked projects in this palika yet."
                    : "यस पालिकामा अहिले ट्र्याक गरिएका परियोजना छैनन्।"}
                </div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {muniProjects.slice(0, 4).map((p) => {
                    const cat = CATEGORIES.find((c) => c.id === p.cat)!;
                    const st = STATUS[p.status];
                    return (
                      <div
                        key={p.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: 12, alignItems: "center",
                          padding: "10px 12px", background: "var(--surface-2)",
                          borderRadius: 6, fontSize: 13,
                        }}
                      >
                        <span
                          style={{
                            width: 24, height: 24, borderRadius: 4,
                            background: `${cat.hue}18`, color: cat.hue,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Icon name={cat.icon} size={12} />
                        </span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {lt(p, "title", lang)}
                        </span>
                        <span
                          className="mono"
                          style={{
                            fontSize: 10, color: st.color,
                            padding: "3px 8px", borderRadius: 3,
                            background: `${st.color}18`,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                          }}
                        >
                          {lang === "en" ? st.en : st.ne}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card" style={{ padding: 16, marginTop: 16 }}>
              <div
                className="mono"
                style={{
                  fontSize: 10, color: "var(--ink-muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 10, padding: "0 8px",
                }}
              >
                {lang === "en" ? "All 8 local levels" : "सबै ८ स्थानीय तह"}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                {MUNICIPALITIES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActive(m.id)}
                    style={{
                      textAlign: "left", padding: "8px 10px", borderRadius: 6, fontSize: 13,
                      background: active === m.id ? "var(--surface-2)" : "transparent",
                      color: active === m.id ? "var(--ink)" : "var(--ink-dim)",
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 8,
                    }}
                  >
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {lang === "en"
                        ? m.en.replace(/ (Rural Municipality|Municipality)/, "")
                        : m.ne.replace(/ (गाउँपालिका|नगरपालिका)/, "")}
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: active === m.id ? "var(--accent)" : "var(--ink-muted)",
                      }}
                    >
                      {projectCount(m.id)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
