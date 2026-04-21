"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { FORM, FieldDef, SectionDef } from "@/content/applicationForm";
import Icon from "./Icon";

type Values = Record<string, string | string[] | boolean>;

function initialValues(): Values {
  const v: Values = {};
  FORM.forEach((s) => {
    s.fields.forEach((f) => {
      if (f.type === "checkboxes") v[f.id] = [];
      else if (f.type === "consent") v[f.id] = false;
      else v[f.id] = "";
    });
  });
  return v;
}

function labelOf(f: FieldDef, lang: "ne" | "en") {
  return lang === "en" ? f.labelEn : f.labelNe;
}
function helperOf(f: FieldDef, lang: "ne" | "en") {
  return lang === "en" ? f.helperEn : f.helperNe;
}
function placeholderOf(f: FieldDef, lang: "ne" | "en") {
  return lang === "en" ? f.placeholderEn : f.placeholderNe;
}
function titleOf(s: SectionDef, lang: "ne" | "en") {
  return lang === "en" ? s.titleEn : s.titleNe;
}
function descOf(s: SectionDef, lang: "ne" | "en") {
  return lang === "en" ? s.descEn : s.descNe;
}

function validate(values: Values): string[] {
  const missing: string[] = [];
  FORM.forEach((s) => {
    s.fields.forEach((f) => {
      if (!f.required) return;
      const v = values[f.id];
      if (f.type === "checkboxes") {
        if (!Array.isArray(v) || v.length === 0) missing.push(f.id);
      } else if (f.type === "consent") {
        if (v !== true) missing.push(f.id);
      } else if (typeof v !== "string" || v.trim() === "") {
        missing.push(f.id);
      }
    });
  });
  return missing;
}

export default function ApplyForm() {
  const { lang } = useLang();
  const [values, setValues] = useState<Values>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState<Set<string>>(new Set());

  const totalRequired = useMemo(
    () =>
      FORM.reduce(
        (sum, s) => sum + s.fields.filter((f) => f.required).length,
        0,
      ),
    [],
  );
  const filledRequired = useMemo(() => {
    return FORM.reduce((sum, s) => {
      return (
        sum +
        s.fields.filter((f) => {
          if (!f.required) return false;
          const v = values[f.id];
          if (f.type === "checkboxes") return Array.isArray(v) && v.length > 0;
          if (f.type === "consent") return v === true;
          return typeof v === "string" && v.trim() !== "";
        }).length
      );
    }, 0);
  }, [values]);

  const set = (id: string, v: string | string[] | boolean) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    if (missing.has(id)) {
      setMissing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const miss = validate(values);
    if (miss.length > 0) {
      setMissing(new Set(miss));
      const firstEl = document.querySelector(`[data-field-id="${miss[0]}"]`);
      if (firstEl) firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, lang }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "submit_failed");
      }
      const data: { id: string } = await res.json();
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "unknown_error";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container-x" style={{ maxWidth: 720 }}>
          <div className="card" style={{ padding: "48px 40px", textAlign: "center" }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(95,186,137,0.15)", color: "#2F7D6B",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Icon name="check" size={30} />
            </div>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>
              {lang === "en" ? "Application received" : "आवेदन प्राप्त भयो"}
            </h2>
            <p style={{ color: "var(--ink-dim)", marginBottom: 20, fontSize: 15, lineHeight: 1.6 }}>
              {lang === "en"
                ? "Thank you. Your reference ID is shown below. The selection committee will review your application and reach out by email."
                : "धन्यवाद। तलको सन्दर्भ नम्बर राख्नुहोस्। छनोट समितिले आवेदनको समीक्षा गरेर इमेल मार्फत सम्पर्क गर्नेछ।"}
            </p>
            <div
              className="mono"
              style={{
                fontSize: 24, color: "var(--accent)", fontWeight: 600,
                letterSpacing: "0.04em", marginBottom: 32,
              }}
            >
              {result.id}
            </div>
            <Link href="/" className="btn btn-ghost" style={{ fontSize: 14 }}>
              <Icon name="arrow-right" size={14} />{" "}
              {lang === "en" ? "Back to home" : "गृह पृष्ठमा फर्कनुहोस्"}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ background: "var(--bg)", paddingTop: 48 }}>
      <div className="container-x" style={{ maxWidth: 860 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "var(--ink-muted)", fontSize: 13, marginBottom: 20,
          }}
        >
          ← {lang === "en" ? "Back to site" : "साइटमा फर्कनुहोस्"}
        </Link>

        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {lang === "en" ? "Lamjung Development Initiative" : "लमजुङ विकास पहल"}
        </div>
        <h1
          style={{
            fontSize: 36, fontWeight: 600, lineHeight: 1.15,
            letterSpacing: "-0.02em", marginBottom: 16,
            fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)",
          }}
        >
          {lang === "en"
            ? "Expert & Stakeholder Application"
            : "विज्ञ तथा सरोकारवाला आवेदन"}
        </h1>
        <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
          {lang === "en"
            ? "Complete all required fields. Estimated time: 15–20 minutes. Shortlisted applicants will be invited to a virtual consultation, followed by a workshop in Besisahar."
            : "सबै आवश्यक विवरण भर्नुहोस्। अनुमानित समय: १५–२० मिनेट। छनोट भएका आवेदकहरूलाई भर्चुअल परामर्शपछि बेसीशहरको कार्यशालामा आमन्त्रण गरिनेछ।"}
        </p>

        {/* Progress bar */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", background: "var(--surface)",
            border: "1px solid var(--line)", borderRadius: 10, marginBottom: 32,
          }}
        >
          <div
            className="mono"
            style={{ fontSize: 12, color: "var(--ink-muted)", whiteSpace: "nowrap" }}
          >
            {filledRequired} / {totalRequired} {lang === "en" ? "required" : "आवश्यक"}
          </div>
          <div style={{ flex: 1, height: 4, background: "var(--line)", borderRadius: 2, position: "relative" }}>
            <div
              style={{
                position: "absolute", inset: 0,
                width: `${(filledRequired / totalRequired) * 100}%`,
                background: "var(--accent)", borderRadius: 2,
                transition: "width .2s",
              }}
            />
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate>
          {FORM.map((section, si) => (
            <div
              key={section.id}
              className="card"
              style={{ padding: "28px 28px", marginBottom: 20 }}
            >
              <div
                className="eyebrow"
                style={{ marginBottom: 4, color: "var(--accent)" }}
              >
                {String(si + 1).padStart(2, "0")} · {titleOf(section, lang)}
              </div>
              {descOf(section, lang) && (
                <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 22, marginTop: 10 }}>
                  {descOf(section, lang)}
                </p>
              )}
              {!descOf(section, lang) && <div style={{ height: 14 }} />}

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {section.fields.map((f) => (
                  <Field
                    key={f.id}
                    f={f}
                    lang={lang}
                    value={values[f.id]}
                    onChange={(v) => set(f.id, v)}
                    missing={missing.has(f.id)}
                  />
                ))}
              </div>
            </div>
          ))}

          {error && (
            <div
              style={{
                padding: 14, background: "rgba(217,74,74,0.1)",
                border: "1px solid rgba(217,74,74,0.3)", borderRadius: 8,
                color: "#C1464C", fontSize: 14, marginBottom: 16,
              }}
            >
              {lang === "en"
                ? "Something went wrong. Please check your connection and try again."
                : "केही समस्या आयो। आफ्नो इन्टरनेट जाँच गरेर पुनः प्रयास गर्नुहोस्।"}
            </div>
          )}

          {missing.size > 0 && (
            <div
              style={{
                padding: 14, background: "rgba(217,74,74,0.1)",
                border: "1px solid rgba(217,74,74,0.3)", borderRadius: 8,
                color: "#C1464C", fontSize: 14, marginBottom: 16,
              }}
            >
              {lang === "en"
                ? `Please complete ${missing.size} required field${missing.size > 1 ? "s" : ""}.`
                : `${missing.size} वटा आवश्यक विवरण भर्नुहोस्।`}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{
              fontSize: 16, padding: "16px 28px",
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting
              ? lang === "en" ? "Submitting…" : "पठाउँदै…"
              : lang === "en" ? "Submit application" : "आवेदन दर्ता गर्नुहोस्"}
            {!submitting && <Icon name="arrow-right" size={16} />}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  f, lang, value, onChange, missing,
}: {
  f: FieldDef;
  lang: "ne" | "en";
  value: string | string[] | boolean;
  onChange: (v: string | string[] | boolean) => void;
  missing: boolean;
}) {
  const border = missing ? "1px solid rgba(217,74,74,0.6)" : undefined;
  const label = labelOf(f, lang);
  const helper = helperOf(f, lang);
  const placeholder = placeholderOf(f, lang);

  const showTopLabel = f.type !== "consent";

  return (
    <div data-field-id={f.id}>
      {showTopLabel && (
        <div
          style={{
            display: "flex", alignItems: "baseline", gap: 6,
            fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6,
          }}
        >
          <span>{label}</span>
          {f.required && (
            <span style={{ color: "var(--accent)", fontSize: 12 }}>*</span>
          )}
        </div>
      )}
      {showTopLabel && helper && (
        <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 8 }}>
          {helper}
        </div>
      )}

      {(() => {
        switch (f.type) {
          case "text":
          case "email":
          case "tel":
          case "url":
            return (
              <input
                type={f.type}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={f.maxLength}
                style={{ border }}
              />
            );
          case "textarea":
            return (
              <textarea
                rows={f.rows || 3}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={f.maxLength}
                style={{ border, resize: "vertical" }}
              />
            );
          case "select":
            return (
              <select
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                style={{ border }}
              >
                <option value="">
                  {lang === "en" ? "Select…" : "छान्नुहोस्…"}
                </option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {lang === "en" ? o.en : o.ne}
                  </option>
                ))}
              </select>
            );
          case "radio":
            return (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {f.options?.map((o) => {
                  const selected = value === o.value;
                  return (
                    <button
                      type="button"
                      key={o.value}
                      onClick={() => onChange(o.value)}
                      className={`chip ${selected ? "on" : ""}`}
                      style={{
                        borderColor: missing && !selected ? "rgba(217,74,74,0.4)" : undefined,
                      }}
                    >
                      {lang === "en" ? o.en : o.ne}
                    </button>
                  );
                })}
              </div>
            );
          case "checkboxes": {
            const arr = Array.isArray(value) ? value : [];
            return (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {f.options?.map((o) => {
                  const selected = arr.includes(o.value);
                  return (
                    <button
                      type="button"
                      key={o.value}
                      onClick={() => {
                        const next = selected
                          ? arr.filter((v) => v !== o.value)
                          : [...arr, o.value];
                        onChange(next);
                      }}
                      className={`chip ${selected ? "on" : ""}`}
                    >
                      {lang === "en" ? o.en : o.ne}
                    </button>
                  );
                })}
              </div>
            );
          }
          case "consent":
            return (
              <label
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "12px 14px",
                  background: "var(--surface-2)",
                  border: missing ? "1px solid rgba(217,74,74,0.6)" : "1px solid var(--line)",
                  borderRadius: 8, cursor: "pointer",
                  fontSize: 14, color: "var(--ink)", lineHeight: 1.5,
                }}
              >
                <input
                  type="checkbox"
                  checked={value === true}
                  onChange={(e) => onChange(e.target.checked)}
                  style={{
                    width: 18, height: 18, margin: 0, padding: 0,
                    accentColor: "var(--accent)", flexShrink: 0, marginTop: 2,
                  }}
                />
                <span>{label}</span>
              </label>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
