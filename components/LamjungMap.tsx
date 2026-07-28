"use client";

import { ReactNode, useEffect, useState } from "react";
import { STR, useLang } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import type { PalikaId, Project } from "@/lib/types";
import SectionHead from "./SectionHead";
import PlaceImage from "./PlaceImage";

type PlaceDetail = {
  placeNe: string; placeEn: string; descNe: string; descEn: string;
  typeNe: string; typeEn: string; infoLink: string; img: string;
};
type Place = {
  primaryNe: string; primaryEn: string; primaryDescNe: string; primaryDescEn: string;
  primaryImg: string; details: PlaceDetail[];
};
const EMPTY_PLACE: Place = { primaryNe: "", primaryEn: "", primaryDescNe: "", primaryDescEn: "", primaryImg: "", details: [] };

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
  const [PROJECTS, setProjects] = useState<Project[]>([]);
  const [places, setPlaces] = useState<Record<string, Place>>({});

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => setPlaces(data && typeof data === "object" ? data : {}))
      .catch(() => setPlaces({}));
  }, []);

  const muni = MUNICIPALITIES.find((m) => m.id === active)!;
  const muniProjects = PROJECTS.filter((p) => p.palika === active);
  const place = places[active] ?? EMPTY_PLACE;
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
                <div style={{ fontSize: 28, fontWeight: 500 }} className="mono">१,५५,८५२</div>
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
            <PlaceImage src={place.primaryImg} label={lang === "en" ? place.primaryEn : place.primaryNe} />
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
                {lang === "en" ? "Featured destination" : "मुख्य गन्तव्य"} · {shortName(muni)}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15, marginBottom: 8 }}>
                {lang === "en" ? place.primaryEn : place.primaryNe}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>
                {lang === "en" ? place.primaryDescEn : place.primaryDescNe}
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

            </div>

            {/* Tourist Places with Details & Links */}
            <div className="card" style={{ padding: 24, marginTop: 16 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12, color: "var(--ink-muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 16, paddingBottom: 12,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {lang === "en" ? "🎯 Top attractions & experiences" : "🎯 शीर्ष आकर्षण र अनुभव"}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {place.details.map((detail, idx) => (
                  <a
                    key={idx}
                    href={detail.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "grid", gap: 8, padding: "14px", borderRadius: 8,
                      background: "var(--bg-soft)", border: "1px solid var(--line)",
                      textDecoration: "none", color: "inherit", transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--surface-2)";
                      e.currentTarget.style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--bg-soft)";
                      e.currentTarget.style.borderColor = "var(--line)";
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "start", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                          {lang === "en" ? detail.placeEn : detail.placeNe}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5 }}>
                          {lang === "en" ? detail.descEn : detail.descNe}
                        </div>
                      </div>
                      <span
                        className="mono"
                        style={{
                          fontSize: 11, padding: "4px 8px", borderRadius: 4,
                          background: "var(--accent)18", color: "var(--accent)",
                          whiteSpace: "nowrap", flexShrink: 0,
                        }}
                      >
                        {lang === "en" ? detail.typeEn : detail.typeNe}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.6, display: "flex", gap: 4 }}>
                      <span>🔗</span>
                      <span>{lang === "en" ? "Learn more" : "थप जानुहोस्"}</span>
                    </div>
                  </a>
                ))}
              </div>
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
