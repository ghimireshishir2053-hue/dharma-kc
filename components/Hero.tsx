"use client";

import Image from "next/image";
import Link from "next/link";
import { STR, useLang, lt } from "@/lib/i18n";
import { MP_DATA, SOCIALS } from "@/content/mp";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";

export default function Hero() {
  const { lang, t } = useLang();

  return (
    <section
      id="top"
      style={{ position: "relative", overflow: "hidden", paddingTop: 24, paddingBottom: 96 }}
    >
      <div className="container-x hero-inner" style={{ paddingTop: 56, paddingBottom: 40, position: "relative" }}>
        <div className="r-grid-hero">
          {/* LEFT */}
          <div>
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
                  boxShadow: "0 12px 30px -12px rgba(0,148,218,0.45)",
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
                  <div className="cta-title" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.pbButton)}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6, lineHeight: 1.4 }}>
                    {t(STR.pbButtonSub)}
                  </div>
                </div>
                <Icon name="arrow-right" size={22} />
              </Link>

              {/* File a grievance — secondary, same layout */}
              <Link
                href="/grievance"
                className="cta-card cta-card-secondary"
                style={{
                  display: "flex", alignItems: "center", gap: 20, width: "100%", textAlign: "left",
                  border: "1px solid var(--line)", borderRadius: 14,
                  background: "var(--surface)", color: "var(--ink)", textDecoration: "none",
                  padding: "26px 30px", cursor: "pointer",
                  transition: "transform .15s, box-shadow .15s, border-color .15s",
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: "rgba(0,148,218,0.12)", color: "var(--accent)",
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
                  <div className="cta-title" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.heroCTA1)}
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
              </Link>

              {/* Krishi Bank */}
              <Link
                href="/krishi-bank"
                className="cta-card cta-card-secondary"
                style={{
                  display: "flex", alignItems: "center", gap: 20, width: "100%", textAlign: "left",
                  border: "1px solid var(--line)", borderRadius: 14,
                  background: "var(--surface)", color: "var(--ink)", textDecoration: "none",
                  padding: "26px 30px", cursor: "pointer",
                  transition: "transform .15s, box-shadow .15s, border-color .15s",
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: "rgba(47,125,107,0.12)", color: "var(--evergreen)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="sprout" size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--ink-muted)", marginBottom: 6,
                    }}
                  >
                    {t(STR.kbKicker)}
                  </div>
                  <div className="cta-title" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.kbButton)}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-dim)", marginTop: 6, lineHeight: 1.4 }}>
                    {t(STR.kbButtonSub)}
                  </div>
                </div>
                <Icon name="arrow-right" size={22} />
              </Link>

              {/* Diaspora Lamjung */}
              <Link
                href="/diaspora"
                className="cta-card cta-card-secondary"
                style={{
                  display: "flex", alignItems: "center", gap: 20, width: "100%", textAlign: "left",
                  border: "1px solid var(--line)", borderRadius: 14,
                  background: "var(--surface)", color: "var(--ink)", textDecoration: "none",
                  padding: "26px 30px", cursor: "pointer",
                  transition: "transform .15s, box-shadow .15s, border-color .15s",
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: "rgba(62,125,184,0.12)", color: "var(--river)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="globe" size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--ink-muted)", marginBottom: 6,
                    }}
                  >
                    {t(STR.dlKicker)}
                  </div>
                  <div className="cta-title" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>
                    {t(STR.dlButton)}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-dim)", marginTop: 6, lineHeight: 1.4 }}>
                    {t(STR.dlButtonSub)}
                  </div>
                </div>
                <Icon name="arrow-right" size={22} />
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div
              className="hero-portrait"
              style={{
                position: "relative", aspectRatio: "4 / 5", borderRadius: 12, overflow: "hidden",
                border: "1px solid var(--line)",
                background: "linear-gradient(165deg,#E8F2FA 0%, #F7F9FB 60%, #CFE6F7 100%)",
              }}
            >
              {/* animated blue background (within the photo frame) */}
              <div className="photo-blue-bg" aria-hidden />
              <Image
                src="/portraits/dharma.jpg"
                alt="Hon. Dharma Raj K.C."
                fill
                priority
                sizes="(max-width: 1280px) 40vw, 500px"
                className="hero-photo"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              {/* moving blue light over the photo */}
              <div className="photo-blue-sheen" aria-hidden />
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
                className="hero-portrait-caption"
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: 24, background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)", zIndex: 1,
                }}
              >
                <div className="hero-district" style={{ fontSize: 20, color: "#fff", fontWeight: 500 }}>
                  {t(STR.heroKicker)}
                </div>
              </div>

              {/* social icons — mobile only, overlaid on the bottom of the photo */}
              <div className="hero-social-mobile" style={{ position: "absolute", bottom: 16, right: 16, gap: 8, zIndex: 2 }}>
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
                      width: 42, height: 42, borderRadius: 11,
                      background: "rgba(255,255,255,0.95)", color: "var(--ink)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <SocialIcon name={s.id} size={19} />
                  </a>
                ))}
              </div>
            </div>

            {/* social links — desktop row below the photo */}
            <div className="hero-social-row" style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
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
          </div>
        </div>
      </div>

    </section>
  );
}
