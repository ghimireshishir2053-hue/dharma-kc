"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";
import { STR, useLang } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { COLLAB_INTERESTS } from "@/content/collabInterests";
import type { CollabInterestId } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

function Field({ label, children, style, optional }: { label: ReactNode; children: ReactNode; style?: CSSProperties; optional?: boolean }) {
  const { t } = useLang();
  return (
    <label style={{ display: "block", ...style }}>
      <div
        className="mono"
        style={{
          fontSize: 13, color: "var(--ink-muted)",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6,
          display: "flex", alignItems: "baseline", gap: 8,
        }}
      >
        <span>{label}</span>
        {optional && (
          <span
            style={{
              textTransform: "none", letterSpacing: 0, fontSize: 11,
              fontStyle: "italic", fontWeight: 400, color: "var(--ink-faint)",
            }}
          >
            {t(STR.optional)}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

const emptyForm = { name: "", phone: "", sector: "", country: "", palika: "", interest: "" as CollabInterestId | "", message: "" };

export default function DiasporaLamjung() {
  const { lang, t } = useLang();
  const [form, setForm] = useState(emptyForm);
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/diaspora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CV upload is a future step; we pass its filename for now.
        body: JSON.stringify({ ...form, cv: cv?.name ?? "" }),
      });
      if (res.ok) {
        const data: { id: string } = await res.json();
        setSubmitted(data.id);
        setForm(emptyForm);
        setCv(null);
        setTimeout(() => setSubmitted(null), 9000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" style={{ background: "var(--bg)", paddingTop: 40 }}>
      <div className="container-x">
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-muted)", fontSize: 13, marginBottom: 24 }}
        >
          ← {lang === "en" ? "Back to site" : "साइटमा फर्कनुहोस्"}
        </Link>

        <SectionHead kicker={t(STR.dlKicker)} title={t(STR.dlTitle)} sub={t(STR.dlSub)} />

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* JOIN FORM */}
          <div className="card" style={{ padding: 32, position: "relative" }}>
            {submitted ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(62,125,184,0.15)", color: "var(--river)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}
                >
                  <Icon name="check" size={26} />
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{t(STR.dlSuccessTitle)}</h3>
                <div style={{ color: "var(--ink-dim)", marginBottom: 8 }}>{t(STR.dlSuccessSub)}</div>
                <div className="mono" style={{ fontSize: 22, color: "var(--river)", marginBottom: 16, letterSpacing: "0.04em" }}>
                  {submitted}
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: 13, maxWidth: 420, margin: "0 auto" }}>
                  {t(STR.dlSuccessNote)}
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>{t(STR.dlJoinTitle)}</div>
                <div className="r-grid-fields-2">
                  <Field label={t(STR.grName)}>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </Field>
                  <Field label={t(STR.grPhone)}>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+977" />
                  </Field>
                  <Field label={t(STR.dlSector)}>
                    <input required value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} placeholder={t(STR.dlSectorPh)} />
                  </Field>
                  <Field label={t(STR.dlCountry)}>
                    <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder={t(STR.dlCountryPh)} />
                  </Field>
                  <Field label={t(STR.dlOrigin)} style={{ gridColumn: "1 / -1" }}>
                    <select required value={form.palika} onChange={(e) => setForm({ ...form, palika: e.target.value })}>
                      <option value="">{lang === "en" ? "Select palika" : "पालिका छान्नुहोस्"}</option>
                      {MUNICIPALITIES.map((m) => (
                        <option key={m.id} value={m.id}>{lang === "en" ? m.en : m.ne}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label={t(STR.dlInterest)} style={{ marginTop: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {COLLAB_INTERESTS.map((c) => {
                      const active = form.interest === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setForm({ ...form, interest: c.id })}
                          className={`chip ${active ? "on" : ""}`}
                        >
                          <Icon name={c.icon} size={13} />
                          {lang === "en" ? c.en : c.ne}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label={t(STR.dlMessage)} optional style={{ marginBottom: 20 }}>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t(STR.dlMessagePh)}
                  />
                </Field>
                <Field label={t(STR.dlCv)} optional style={{ marginBottom: 20 }}>
                  {cv ? (
                    <div
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", background: "var(--surface-2)",
                        border: "1px solid var(--line)", borderRadius: 8,
                      }}
                    >
                      <Icon name="check" size={15} />
                      <span style={{ flex: 1, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {cv.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCv(null)}
                        className="mono"
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "var(--ink-muted)", fontSize: 12,
                          letterSpacing: "0.06em", textTransform: "uppercase",
                        }}
                      >
                        {t(STR.grAttachRemove)}
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                      style={{ fontSize: 14 }}
                    />
                  )}
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 6, textTransform: "none", letterSpacing: 0 }}>
                    {t(STR.dlCvHint)}
                  </div>
                </Field>
                <button type="submit" disabled={submitting || !form.interest} className="btn btn-primary">
                  {t(STR.dlSubmit)} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
