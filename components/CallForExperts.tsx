"use client";

import { useLang } from "@/lib/i18n";
import { CALL_FOR_EXPERTS as C } from "@/content/callForExperts";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

export default function CallForExperts() {
  const { lang } = useLang();
  const E = (s: { ne: string; en: string }) => (lang === "en" ? s.en : s.ne);

  return (
    <section
      id="call-for-experts"
      className="section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <SectionHead
          kicker={
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--accent)",
                }}
              />
              {lang === "en" ? C.eyebrowEn : C.eyebrowNe}
            </span>
          }
          title={
            <>
              {lang === "en" ? C.titleEn : C.titleNe}
              <span
                style={{
                  display: "block",
                  marginTop: 10,
                  fontSize: "0.5em",
                  color: "var(--accent)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {lang === "en" ? C.subtitleEn : C.subtitleNe}
              </span>
            </>
          }
          sub={lang === "en" ? C.introEn : C.introNe}
        />

        {/* Objective banner */}
        <div
          className="card"
          style={{
            padding: "24px 28px",
            marginBottom: 24,
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {lang === "en" ? C.objectiveLabelEn : C.objectiveLabelNe}
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink)" }}>
            {lang === "en" ? C.objectiveEn : C.objectiveNe}
          </div>
        </div>

        <div className="r-grid-13">
          {/* LEFT: sectors */}
          <div className="card" style={{ padding: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              {lang === "en" ? C.sectorsLabelEn : C.sectorsLabelNe}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {C.sectors.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    background: "var(--bg-soft)",
                    border: "1px solid var(--line-soft)",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: "rgba(201,138,31,0.14)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={s.icon} size={15} />
                  </span>
                  <span>{E(s)}</span>
                </div>
              ))}
            </div>
            <div
              className="mono"
              style={{
                marginTop: 14,
                fontSize: 12,
                color: "var(--ink-muted)",
                letterSpacing: "0.04em",
              }}
            >
              · {lang === "en" ? C.sectorsNoteEn : C.sectorsNoteNe}
            </div>
          </div>

          {/* RIGHT: process steps */}
          <div className="card" style={{ padding: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              {lang === "en" ? C.processLabelEn : C.processLabelNe}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {C.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 14,
                    paddingBottom: i < C.steps.length - 1 ? 18 : 0,
                    borderBottom:
                      i < C.steps.length - 1 ? "1px solid var(--line-soft)" : "none",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "var(--ink)",
                        lineHeight: 1.35,
                      }}
                    >
                      {E(step)}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--ink-dim)",
                        lineHeight: 1.55,
                      }}
                    >
                      {E({ ne: step.descNe, en: step.descEn })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why participate + CTA */}
        <div
          className="r-grid-13"
          style={{ marginTop: 24 }}
        >
          <div className="card" style={{ padding: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {lang === "en" ? C.whyLabelEn : C.whyLabelNe}
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {C.whyPoints.map((p, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(95,186,137,0.18)",
                      color: "#2F7D6B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <Icon name="check" size={13} />
                  </span>
                  <span>{E(p)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="card"
            style={{
              padding: 28,
              background: "linear-gradient(160deg, rgba(201,138,31,0.08) 0%, var(--surface) 60%)",
              borderColor: "rgba(201,138,31,0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 10, color: "var(--accent)" }}>
                {lang === "en" ? C.deadlineLabelEn : C.deadlineLabelNe}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 14,
                  letterSpacing: "0.02em",
                }}
              >
                {C.deadlineValue}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.55 }}>
                {lang === "en" ? C.tagEn : C.tagNe}
              </p>
            </div>
            <a
              href={C.ctaHref}
              className="btn btn-primary"
              style={{ justifyContent: "center", fontSize: 15, padding: "14px 20px" }}
            >
              {lang === "en" ? C.ctaEn : C.ctaNe}
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
