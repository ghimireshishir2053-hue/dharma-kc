"use client";

import { ReactNode, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { PROJECTS } from "@/content/projects";
import { CATEGORIES, STATUS } from "@/content/categories";
import { PLACES } from "@/content/places";
import type { PalikaId } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import PlaceImage from "./PlaceImage";

function MuniStat({
  label, value, accent = "var(--ink)",
}: { label: ReactNode; value: ReactNode; accent?: string }) {
  return (
    <div style={{ padding: "12px 14px", background: "var(--bg-soft)", borderRadius: 8 }}>
      <div
        className="mono"
        style={{
          fontSize: 12, color: "var(--ink-muted)",
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
  const place = PLACES[active];
  const projectCount = (id: PalikaId) => PROJECTS.filter((p) => p.palika === id).length;
  const shortName = (m: typeof MUNICIPALITIES[number]) =>
    lang === "en"
      ? m.en.replace(/ (Municipality|Rural Municipality)/, "")
      : m.ne.replace(/ (नगरपालिका|गाउँपालिका)/, "");

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
                    fontSize: 12, color: "var(--ink-muted)",
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
                    fontSize: 12, color: "var(--ink-muted)",
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
                    fontSize: 12, color: "var(--ink-muted)",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}
                >
                  {lang === "en" ? "Population" : "जनसंख्या"}
                </div>
              </div>
            </div>
          }
        />

        <div className="r-grid-13">
          <div
            className="card"
            style={{
              padding: 0, overflow: "hidden", position: "relative",
              minHeight: 560, background: "#1A1A1A",
            }}
          >
            {/* popular-place photo of the selected municipality */}
            <PlaceImage src={place.img} label={lt(place, "place", lang)} />
            <div
              style={{
                position: "absolute", inset: 0,
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0.30) 100%)",
              }}
            />

            <div
              className="mono"
              style={{
                position: "absolute", top: 16, left: 20, zIndex: 2,
                fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.72)",
              }}
            >
              LAMJUNG · 28.21°N 84.40°E
            </div>

            {/* clickable municipality names */}
            <div
              style={{
                position: "absolute", top: 50, left: 16, bottom: 112, zIndex: 2,
                display: "flex", flexDirection: "column", gap: 4, justifyContent: "center",
              }}
            >
              {MUNICIPALITIES.map((m) => {
                const isActive = active === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActive(m.id)}
                    className="muni-pin-btn"
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 14px", borderRadius: 999, width: "fit-content",
                      background: isActive ? "var(--accent)" : "rgba(0,0,0,0.38)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.88)",
                      border: `1px solid ${isActive ? "var(--accent)" : "rgba(255,255,255,0.28)"}`,
                      fontSize: 14, fontWeight: isActive ? 600 : 400,
                      backdropFilter: "blur(2px)", cursor: "pointer", transition: "all .15s",
                    }}
                  >
                    {shortName(m)}
                    <span className="mono" style={{ fontSize: 11, opacity: 0.85 }}>
                      {projectCount(m.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* place caption */}
            <div className="muni-place-caption" style={{ position: "absolute", left: 24, right: 24, bottom: 24, zIndex: 2, color: "#fff" }}>
              <div
                className="mono"
                style={{
                  fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)", marginBottom: 6,
                }}
              >
                {lang === "en" ? "Popular place" : "लोकप्रिय स्थल"} · {shortName(muni)}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15 }}>
                {lt(place, "place", lang)}
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span className="eyebrow">
                  {lang === "en" ? (muni.hq ? "District HQ" : muni.typeEn) : muni.hq ? "सदरमुकाम" : muni.type}
                </span>
                <span className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  {active.toUpperCase()}
                </span>
              </div>
              <h3 style={{ fontSize: 26, marginBottom: 20, marginTop: 4 }}>
                {lang === "en" ? muni.en : muni.ne}
              </h3>

              <div className="r-grid-muni-stats">
                <MuniStat label={t(STR.mapPop)} value={muni.pop} />
                <MuniStat label={t(STR.mapArea)} value={muni.area} />
                <MuniStat label={t(STR.mapWards)} value={muni.wards} />
                <MuniStat label={t(STR.mapProjects)} value={muniProjects.length} accent="var(--accent)" />
              </div>

              <div style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 8, marginBottom: 16 }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 12, color: "var(--ink-muted)",
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
                  fontSize: 12, color: "var(--ink-muted)",
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
                            fontSize: 12, color: st.color,
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
                  fontSize: 12, color: "var(--ink-muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 10, padding: "0 8px",
                }}
              >
                {lang === "en" ? "All 8 local levels" : "सबै ८ स्थानीय तह"}
              </div>
              <div className="r-grid-palika-list">
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
                        fontSize: 13,
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
