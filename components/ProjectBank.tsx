"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { CATEGORIES } from "@/content/categories";
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

const emptyForm = { name: "", phone: "", palika: "", ward: "", cat: "", title: "", budget: "", benef: "", org: "", resp: "", msg: "" };

export default function ProjectBank() {
  const { lang, t } = useLang();
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/project-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Attachment is optional; we pass its filename for now (file upload is a future step).
        body: JSON.stringify({ ...form, attachment: file?.name ?? "" }),
      });
      if (res.ok) {
        const data: { id: string } = await res.json();
        setSubmitted(data.id);
        setForm(emptyForm);
        setFile(null);
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
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "var(--ink-muted)", fontSize: 13, marginBottom: 24,
          }}
        >
          ← {lang === "en" ? "Back to site" : "साइटमा फर्कनुहोस्"}
        </Link>

        <SectionHead
          kicker={t(STR.pbKicker)}
          title={t(STR.pbTitle)}
          sub={t(STR.pbSub)}
        />

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* FORM */}
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
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{t(STR.pbSuccessTitle)}</h3>
                <div style={{ color: "var(--ink-dim)", marginBottom: 8 }}>{t(STR.pbSuccessSub)}</div>
                <div
                  className="mono"
                  style={{ fontSize: 22, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.04em" }}
                >
                  {submitted}
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: 13, maxWidth: 420, margin: "0 auto" }}>
                  {t(STR.pbSuccessNote)}
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <Field label={t(STR.pbProjTitle)} style={{ marginBottom: 16 }}>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder={t(STR.pbProjTitlePh)}
                  />
                </Field>
                <div className="r-grid-fields-2" style={{ marginBottom: 16 }}>
                  <Field label={t(STR.pbOrg)} optional>
                    <input
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                    />
                  </Field>
                  <Field label={t(STR.pbResp)} optional>
                    <input
                      value={form.resp}
                      onChange={(e) => setForm({ ...form, resp: e.target.value })}
                      placeholder={t(STR.pbRespPh)}
                    />
                  </Field>
                </div>
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
                  <Field label={t(STR.pbBudget)} optional>
                    <input
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      placeholder={t(STR.pbBudgetPh)}
                    />
                  </Field>
                  <Field label={t(STR.pbBenef)} optional>
                    <input
                      type="number"
                      min="0"
                      value={form.benef}
                      onChange={(e) => setForm({ ...form, benef: e.target.value })}
                    />
                  </Field>
                </div>
                <Field label={t(STR.grCategory)} style={{ marginTop: 16, marginBottom: 16 }}>
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
                <Field label={t(STR.pbDesc)} style={{ marginBottom: 20 }}>
                  <textarea
                    required
                    rows={5}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    placeholder={t(STR.pbDescPh)}
                  />
                </Field>
                <Field label={t(STR.grAttach)} optional style={{ marginBottom: 20 }}>
                  {file ? (
                    <div
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", background: "var(--surface-2)",
                        border: "1px solid var(--line)", borderRadius: 8,
                      }}
                    >
                      <Icon name="check" size={15} />
                      <span style={{ flex: 1, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
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
                      accept="image/*,application/pdf"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      style={{ fontSize: 14 }}
                    />
                  )}
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 6, textTransform: "none", letterSpacing: 0 }}>
                    {t(STR.grAttachHint)}
                  </div>
                </Field>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {t(STR.pbSubmit)} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
