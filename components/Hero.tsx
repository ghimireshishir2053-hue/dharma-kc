"use client";

import Image from "next/image";
import { STR, useLang, lt } from "@/lib/i18n";
import { MP_DATA } from "@/content/mp";
import { PRIORITIES } from "@/content/priorities";
import { PROJECTS } from "@/content/projects";
import Icon from "./Icon";

function StatTile({ num, label, accent = "var(--ink)" }: { num: number | string; label: string; accent?: string }) {
  return (
    <div style={{ padding: 16, border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)" }}>
      <div className="mono" style={{ fontSize: 32, fontWeight: 500, color: accent, lineHeight: 1 }}>
        {num}
      </div>
      <div
        style={{
          fontSize: 13, color: "var(--ink-muted)", marginTop: 8,
          textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--f-mono)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const ongoing = PROJECTS.filter((p) => p.status === "ongoing").length;
  const completed = PROJECTS.filter((p) => p.status === "completed").length;
  const total = PROJECTS.length;

  return (
    <section
      id="top"
      className="techgrid"
      style={{ position: "relative", overflow: "hidden", paddingTop: 24, paddingBottom: 96 }}
    >
      {/* top strip */}
      <div
        className="container-x hero-top-strip"
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 32px", borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: 14,
            fontSize: 12, color: "var(--ink-dim)", fontFamily: "var(--f-mono)",
          }}
        >
          <span className="pill live">{t(STR.liveBadge)}</span>
          <span>{t(STR.inSession)}</span>
        </div>
        <div
          style={{ fontSize: 12, color: "var(--ink-muted)", fontFamily: "var(--f-mono)", display: "flex", gap: 18 }}
        >
          <span>{lang === "en" ? "Session · 2082/83" : "अधिवेशन · २०८२/८३"}</span>
          <span>·</span>
          <span>{lang === "en" ? "Day 47" : "दिन ४७"}</span>
        </div>
      </div>

      <div className="container-x hero-inner" style={{ paddingTop: 80, paddingBottom: 40, position: "relative" }}>
        <div className="r-grid-hero">
          {/* LEFT */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <span className="dot" />
              {t(STR.heroKicker)}
            </div>

            <h1
              className="hero-name"
              style={{
                fontSize: lang === "en" ? 96 : 104, marginBottom: 16,
                fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)",
              }}
            >
              {lt(MP_DATA, "name", lang)}
            </h1>
            <div
              style={{
                fontSize: 20, color: "var(--ink-dim)", fontWeight: 400,
                marginBottom: 40, lineHeight: 1.35, maxWidth: 560,
              }}
            >
              {lang === "en"
                ? "A climate-finance & technology specialist now serving the people of Lamjung in the Federal Parliament of Nepal."
                : "जलवायु वित्त र प्रविधि विशेषज्ञ — अब लमजुङबासीको प्रतिनिधित्व गर्दै संघीय संसद्‌मा।"}
            </div>

            {/* priorities on floor */}
            <div
              style={{
                border: "1px solid var(--line)", borderRadius: 12,
                background: "var(--surface)", padding: 24, maxWidth: 620,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div className="eyebrow">{lang === "en" ? "On the floor now" : "अहिले सदनमा"}</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  {lang === "en" ? "Live" : "प्रत्यक्ष"}
                </div>
              </div>
              <div style={{ display: "grid", gap: 14 }}>
                {PRIORITIES.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center" }}
                  >
                    <span className="mono" style={{ color: "var(--ink-muted)", fontSize: 12 }}>
                      {lt(p, "num", lang)}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{lt(p, "title", lang)}</div>
                      <div
                        style={{
                          height: 2, background: "var(--line)", borderRadius: 2,
                          position: "relative", maxWidth: 280,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute", inset: 0, width: p.progress + "%",
                            background: "var(--accent)", borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                      {p.progress}%
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  document.getElementById("priorities")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                style={{
                  marginTop: 18, fontSize: 13, color: "var(--accent)",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                {lang === "en" ? "See all 6 priorities" : "सबै ६ प्राथमिकता"}{" "}
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div
              style={{
                position: "relative", aspectRatio: "4 / 5", borderRadius: 12, overflow: "hidden",
                border: "1px solid var(--line)",
                background: "linear-gradient(165deg,#EFE7D8 0%, #F5EFE5 60%, #F2D9A0 100%)",
              }}
            >
              <Image
                src="/portraits/dharma.jpg"
                alt="Hon. Dharma Raj K.C."
                fill
                priority
                sizes="(max-width: 1280px) 40vw, 500px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div
                style={{
                  position: "absolute", top: 16, left: 16, right: 16,
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1,
                }}
              >
                <div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12, color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                    }}
                  >
                    {lang === "en" ? "Sworn in" : "शपथ"}
                  </div>
                  <div className="mono" style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>
                    {lang === "en" ? MP_DATA.oathEn : MP_DATA.oath}
                  </div>
                </div>
                <span className="pill accent">{lang === "en" ? "Elected" : "निर्वाचित"}</span>
              </div>
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: 24, background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)", zIndex: 1,
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em",
                    textTransform: "uppercase", marginBottom: 6,
                  }}
                >
                  {lang === "en" ? "Constituency" : "निर्वाचन क्षेत्र"}
                </div>
                <div style={{ fontSize: 20, color: "#fff", fontWeight: 500 }}>
                  {lt(MP_DATA, "district", lang)}
                </div>
              </div>
            </div>

            {/* stats strip */}
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <StatTile num={total} label={lang === "en" ? "Projects tracked" : "अनुगमित परियोजना"} />
              <StatTile num={ongoing} label={lang === "en" ? "In progress" : "निर्माणाधीन"} accent="var(--accent)" />
              <StatTile num={completed} label={lang === "en" ? "Completed" : "सम्पन्न"} accent="#5FBA89" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
