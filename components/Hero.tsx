"use client";

import Image from "next/image";
import Link from "next/link";
import { STR, useLang, lt } from "@/lib/i18n";
import { MP_DATA, SOCIALS } from "@/content/mp";
import { PROJECTS } from "@/content/projects";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";

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

            {/* Citizen action CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 620 }}>
              {/* Project Bank — primary */}
              <Link
                href="/project-bank"
                className="cta-card cta-card-primary"
                style={{
                  display: "flex", alignItems: "center", gap: 20,
                  border: "1px solid var(--accent)", borderRadius: 14,
                  background: "var(--accent)", color: "var(--accent-ink)",
                  padding: "26px 30px", textDecoration: "none",
                  boxShadow: "0 12px 30px -12px rgba(201,138,31,0.55)",
                  transition: "transform .15s, box-shadow .15s",
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="building" size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                      opacity: 0.85, marginBottom: 6,
                    }}
                  >
                    {lang === "en" ? "Lamjung citizens" : "लमजुङका नागरिक"}
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.pbButton)}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6, lineHeight: 1.4 }}>
                    {t(STR.pbButtonSub)}
                  </div>
                </div>
                <Icon name="arrow-right" size={22} />
              </Link>

              {/* File a grievance — secondary, same layout */}
              <button
                onClick={() =>
                  document.getElementById("grievance")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="cta-card cta-card-secondary"
                style={{
                  display: "flex", alignItems: "center", gap: 20, width: "100%", textAlign: "left",
                  border: "1px solid var(--line)", borderRadius: 14,
                  background: "var(--surface)", color: "var(--ink)",
                  padding: "26px 30px", cursor: "pointer",
                  transition: "transform .15s, box-shadow .15s, border-color .15s",
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: "rgba(201,138,31,0.12)", color: "var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="doc" size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--ink-muted)", marginBottom: 6,
                    }}
                  >
                    {t(STR.grKicker)}
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.heroCTA1)}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-dim)", marginTop: 6, lineHeight: 1.4 }}>
                    {t(STR.grSub)}
                  </div>
                  <div
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7, marginTop: 10,
                      fontSize: 12.5, color: "#5FBA89", fontWeight: 500, lineHeight: 1.35,
                    }}
                  >
                    <span style={{ flexShrink: 0, display: "flex" }}>
                      <Icon name="shield" size={15} />
                    </span>
                    {t(STR.grConfidential)}
                  </div>
                </div>
                <Icon name="arrow-right" size={22} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div
              className="hero-portrait"
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

            {/* social links */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span
                className="mono"
                style={{
                  fontSize: 12, color: "var(--ink-muted)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}
              >
                {lang === "en" ? "Find us on:" : "हामीलाई यहाँ भेट्नुहोस्:"}
              </span>
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="social-btn"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: "1px solid var(--line)", background: "var(--surface)",
                    color: "var(--ink-dim)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all .15s",
                  }}
                >
                  <SocialIcon name={s.id} size={18} />
                </a>
              ))}
            </div>

            {/* stats strip */}
            <div className="hero-stats" style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
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
