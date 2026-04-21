"use client";

import { CSSProperties, ReactNode, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { CATEGORIES } from "@/content/categories";
import { GRIEVANCES_SAMPLE } from "@/content/grievances";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import type { Grievance as GrievanceEntry } from "@/lib/types";

function Field({ label, children, style }: { label: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <label style={{ display: "block", ...style }}>
      <div
        className="mono"
        style={{
          fontSize: 13, color: "var(--ink-muted)",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </label>
  );
}

type TrackResult = GrievanceEntry | { notFound: true } | null;

export default function Grievance() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", palika: "", ward: "", cat: "", msg: "" });
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<TrackResult>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data: { id: string } = await res.json();
        setSubmitted(data.id);
        setForm({ name: "", phone: "", palika: "", ward: "", cat: "", msg: "" });
        setTimeout(() => setSubmitted(null), 8000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const track = () => {
    const found = GRIEVANCES_SAMPLE.find(
      (g) => g.id.toLowerCase() === trackId.toLowerCase().trim()
    );
    setTrackResult(found ?? { notFound: true });
  };

  return (
    <section
      id="grievance"
      className="section"
      style={{
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <SectionHead
          num="06"
          kicker={t(STR.grKicker)}
          title={t(STR.grTitle)}
          sub={t(STR.grSub)}
        />

        <div className="r-grid-13">
          <div className="card" style={{ padding: 32, position: "relative" }}>
            {submitted ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(95,186,137,0.15)", color: "#5FBA89",
                    display: "inline-flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 20,
                  }}
                >
                  <Icon name="check" size={26} />
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{t(STR.grSuccessTitle)}</h3>
                <div style={{ color: "var(--ink-dim)", marginBottom: 8 }}>{t(STR.grSuccessSub)}</div>
                <div
                  className="mono"
                  style={{ fontSize: 22, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.04em" }}
                >
                  {submitted}
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: 13 }}>{t(STR.grSuccessNote)}</div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="r-grid-fields-2">
                  <Field label={t(STR.grName)}>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </Field>
                  <Field label={t(STR.grPhone)}>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+977"
                    />
                  </Field>
                  <Field label={t(STR.grPalika)}>
                    <select
                      required
                      value={form.palika}
                      onChange={(e) => setForm({ ...form, palika: e.target.value })}
                    >
                      <option value="">{lang === "en" ? "Select palika" : "पालिका छान्नुहोस्"}</option>
                      {MUNICIPALITIES.map((m) => (
                        <option key={m.id} value={m.id}>
                          {lang === "en" ? m.en : m.ne}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t(STR.grWard)}>
                    <input
                      required
                      type="number"
                      min="1"
                      max="13"
                      value={form.ward}
                      onChange={(e) => setForm({ ...form, ward: e.target.value })}
                    />
                  </Field>
                </div>
                <Field label={t(STR.grCategory)} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {CATEGORIES.map((c) => {
                      const active = form.cat === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setForm({ ...form, cat: c.id })}
                          className={`chip ${active ? "on" : ""}`}
                          style={{
                            background: active ? c.hue : "var(--surface-2)",
                            borderColor: active ? c.hue : "var(--line)",
                            color: active ? "#0B0F14" : "var(--ink-dim)",
                          }}
                        >
                          <Icon name={c.icon} size={13} />
                          {lang === "en" ? c.en : c.ne}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label={t(STR.grMessage)} style={{ marginBottom: 20 }}>
                  <textarea
                    required
                    rows={4}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    placeholder={
                      lang === "en"
                        ? "Describe your issue, location, urgency..."
                        : "तपाईंको समस्या, स्थान र प्राथमिकता लेख्नुहोस्..."
                    }
                  />
                </Field>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {t(STR.grSubmit)} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                {t(STR.grTrack)}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder={t(STR.grTrackPlaceholder)}
                  style={{ fontFamily: "var(--f-mono)" }}
                />
                <button onClick={track} className="btn btn-primary" style={{ flexShrink: 0 }}>
                  <Icon name="search" size={14} />
                </button>
              </div>
              {trackResult && (
                <div
                  style={{
                    marginTop: 14, padding: 14, background: "var(--bg-soft)",
                    borderRadius: 8, fontSize: 13,
                  }}
                >
                  {"notFound" in trackResult ? (
                    <span style={{ color: "var(--ink-muted)" }}>
                      {lang === "en"
                        ? "No record found. Try LJ-2082-0418."
                        : "रेकर्ड फेला परेन। LJ-2082-0418 प्रयास गर्नुहोस्।"}
                    </span>
                  ) : (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span className="mono" style={{ color: "var(--accent)" }}>
                          {trackResult.id}
                        </span>
                        <span className={`badge ${trackResult.kind}`}>
                          {lt(trackResult, "status", lang)}
                        </span>
                      </div>
                      <div>{lt(trackResult, "summary", lang)}</div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="card" style={{ padding: 20, flex: 1 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                {t(STR.grRecent)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {GRIEVANCES_SAMPLE.map((g) => (
                  <div
                    key={g.id}
                    style={{
                      padding: "10px 12px", background: "var(--surface-2)",
                      borderRadius: 6, fontSize: 13,
                    }}
                  >
                    <div
                      style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 4,
                      }}
                    >
                      <span className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                        {g.id}
                      </span>
                      <span className={`badge ${g.kind}`}>{lt(g, "status", lang)}</span>
                    </div>
                    <div style={{ color: "var(--ink)" }}>{lt(g, "summary", lang)}</div>
                    <div
                      className="mono"
                      style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}
                    >
                      {lt(g, "kind", lang)} · {g.days} {lang === "en" ? "days ago" : "दिन अघि"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
