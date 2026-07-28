"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";
import { STR, useLang } from "@/lib/i18n";
import { MUNICIPALITIES } from "@/content/municipalities";
import { PRODUCE_TYPES } from "@/content/produceTypes";
import type { ProduceId } from "@/lib/types";
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

// Big pictorial tiles — an emoji + label is far easier for a low-literacy
// user to scan than a small text-only chip.
function ProduceTiles({ value, onChange }: { value: ProduceId | ""; onChange: (v: ProduceId) => void }) {
  const { lang } = useLang();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))", gap: 8 }}>
      {PRODUCE_TYPES.map((p) => {
        const active = value === p.id;
        return (
          <button
            type="button"
            key={p.id}
            onClick={() => onChange(p.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              padding: "14px 6px", borderRadius: 12,
              border: `2px solid ${active ? p.hue : "var(--line)"}`,
              background: active ? `${p.hue}26` : "var(--surface-2)",
              transition: "all .15s",
            }}
          >
            <span style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 600, textAlign: "center", color: "var(--ink-dim)", lineHeight: 1.2 }}>
              {lang === "en" ? p.en : p.ne}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Pictorial 3-step walkthrough — one track for farmers, one for buyers.
function HowItWorks() {
  const { t } = useLang();
  const farmerSteps = [t(STR.kbHowFarmer1), t(STR.kbHowFarmer2), t(STR.kbHowFarmer3)];
  const buyerSteps = [t(STR.kbHowBuyer1), t(STR.kbHowBuyer2), t(STR.kbHowBuyer3)];

  const Track = ({ emoji, label, steps, color }: { emoji: string; label: string; steps: string[]; color: string }) => (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 84 }}>
              <div
                className="mono"
                style={{
                  width: 34, height: 34, borderRadius: "50%", background: color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 12.5, textAlign: "center", color: "var(--ink-dim)", lineHeight: 1.35 }}>{s}</div>
            </div>
            {i < steps.length - 1 && (
              <span style={{ color: "var(--ink-faint)", fontSize: 18, marginTop: 6, flexShrink: 0 }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ marginBottom: 28 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>{t(STR.kbHowTitle)}</div>
      <div className="r-grid-2">
        <Track emoji="🧑‍🌾" label={t(STR.kbHowFarmer)} steps={farmerSteps} color="var(--evergreen)" />
        <Track emoji="🏪" label={t(STR.kbHowBuyer)} steps={buyerSteps} color="var(--river)" />
      </div>
    </div>
  );
}

const emptyFarmer = { name: "", phone: "", palika: "", ward: "", produce: "" as ProduceId | "", otherProduce: "", qty: "", price: "" };
const emptyBuyer = { business: "", phone: "", city: "", produce: "" as ProduceId | "", otherProduce: "", qty: "" };

export default function KrishiBank() {
  const { lang, t } = useLang();
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");
  const [farmerForm, setFarmerForm] = useState(emptyFarmer);
  const [buyerForm, setBuyerForm] = useState(emptyBuyer);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [notifiedCount, setNotifiedCount] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = role === "farmer" ? { role, ...farmerForm } : { role, ...buyerForm };
      const res = await fetch("/api/krishi-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data: { id: string; notified?: number } = await res.json();
        setSubmitted(data.id);
        setNotifiedCount(role === "farmer" ? data.notified ?? 0 : null);
        setFarmerForm(emptyFarmer);
        setBuyerForm(emptyBuyer);
        setTimeout(() => { setSubmitted(null); setNotifiedCount(null); }, 9000);
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

        <SectionHead kicker={t(STR.kbKicker)} title={t(STR.kbTitle)} sub={t(STR.kbSub)} />

        <HowItWorks />

        {/* Role toggle */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setRole("farmer")}
            className="btn"
            style={{
              flex: 1, justifyContent: "center", padding: "18px 20px", fontSize: 16, fontWeight: 600,
              borderRadius: 12, border: `2px solid ${role === "farmer" ? "var(--evergreen)" : "var(--line)"}`,
              background: role === "farmer" ? "var(--evergreen)" : "var(--surface)",
              color: role === "farmer" ? "#fff" : "var(--ink)",
            }}
          >
            <span style={{ fontSize: 22 }}>🧑‍🌾</span>
            {t(STR.kbToggleFarmer)}
          </button>
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className="btn"
            style={{
              flex: 1, justifyContent: "center", padding: "18px 20px", fontSize: 16, fontWeight: 600,
              borderRadius: 12, border: `2px solid ${role === "buyer" ? "var(--river)" : "var(--line)"}`,
              background: role === "buyer" ? "var(--river)" : "var(--surface)",
              color: role === "buyer" ? "#fff" : "var(--ink)",
            }}
          >
            <span style={{ fontSize: 22 }}>🏪</span>
            {t(STR.kbToggleBuyer)}
          </button>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* FORM */}
          <div className="card" style={{ padding: 32, position: "relative" }}>
            {submitted ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(95,186,137,0.15)", color: "#5FBA89",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}
                >
                  <Icon name="check" size={26} />
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{t(STR.kbSuccessTitle)}</h3>
                <div style={{ color: "var(--ink-dim)", marginBottom: 8 }}>{t(STR.kbSuccessSub)}</div>
                <div className="mono" style={{ fontSize: 22, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.04em" }}>
                  {submitted}
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: 13, maxWidth: 420, margin: "0 auto" }}>
                  {role === "farmer" ? t(STR.kbSuccessNoteFarmer) : t(STR.kbSuccessNoteBuyer)}
                </div>
                {role === "farmer" && notifiedCount !== null && (
                  <div
                    className="mono"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14,
                      fontSize: 13, fontWeight: 600, color: "var(--evergreen)",
                      background: "rgba(47,125,107,0.12)", padding: "6px 14px", borderRadius: 999,
                    }}
                  >
                    📩 {notifiedCount} {t(STR.kbNotifiedCount)}
                  </div>
                )}
              </div>
            ) : role === "farmer" ? (
              <form onSubmit={submit}>
                <div className="r-grid-fields-2">
                  <Field label={t(STR.grName)}>
                    <input required value={farmerForm.name} onChange={(e) => setFarmerForm({ ...farmerForm, name: e.target.value })} />
                  </Field>
                  <Field label={t(STR.grPhone)}>
                    <input required type="tel" value={farmerForm.phone} onChange={(e) => setFarmerForm({ ...farmerForm, phone: e.target.value })} placeholder="+977" />
                  </Field>
                  <Field label={t(STR.grPalika)}>
                    <select required value={farmerForm.palika} onChange={(e) => setFarmerForm({ ...farmerForm, palika: e.target.value })}>
                      <option value="">{lang === "en" ? "Select palika" : "पालिका छान्नुहोस्"}</option>
                      {MUNICIPALITIES.map((m) => (
                        <option key={m.id} value={m.id}>{lang === "en" ? m.en : m.ne}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t(STR.grWard)}>
                    <input required type="number" min="1" max="13" value={farmerForm.ward} onChange={(e) => setFarmerForm({ ...farmerForm, ward: e.target.value })} />
                  </Field>
                </div>
                <Field label={t(STR.kbProduce)} style={{ marginTop: 16, marginBottom: 16 }}>
                  <ProduceTiles value={farmerForm.produce} onChange={(v) => setFarmerForm({ ...farmerForm, produce: v })} />
                </Field>
                {farmerForm.produce === "other" && (
                  <Field label={t(STR.kbOtherProduce)} style={{ marginBottom: 16 }}>
                    <input
                      required
                      value={farmerForm.otherProduce}
                      onChange={(e) => setFarmerForm({ ...farmerForm, otherProduce: e.target.value })}
                      placeholder={t(STR.kbOtherProducePh)}
                    />
                  </Field>
                )}
                <div className="r-grid-fields-2">
                  <Field label={t(STR.kbQty)}>
                    <input required value={farmerForm.qty} onChange={(e) => setFarmerForm({ ...farmerForm, qty: e.target.value })} placeholder={t(STR.kbQtyPh)} />
                  </Field>
                  <Field label={t(STR.kbPrice)} optional>
                    <input value={farmerForm.price} onChange={(e) => setFarmerForm({ ...farmerForm, price: e.target.value })} placeholder={t(STR.kbPricePh)} />
                  </Field>
                </div>
                <button type="submit" disabled={submitting || !farmerForm.produce} className="btn btn-primary" style={{ marginTop: 20 }}>
                  {t(STR.kbSubmitFarmer)} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            ) : (
              <form onSubmit={submit}>
                <div className="r-grid-fields-2">
                  <Field label={t(STR.kbBusiness)}>
                    <input required value={buyerForm.business} onChange={(e) => setBuyerForm({ ...buyerForm, business: e.target.value })} placeholder={t(STR.kbBusinessPh)} />
                  </Field>
                  <Field label={t(STR.grPhone)}>
                    <input required type="tel" value={buyerForm.phone} onChange={(e) => setBuyerForm({ ...buyerForm, phone: e.target.value })} placeholder="+977" />
                  </Field>
                  <Field label={t(STR.kbCity)}>
                    <input required value={buyerForm.city} onChange={(e) => setBuyerForm({ ...buyerForm, city: e.target.value })} placeholder={t(STR.kbCityPh)} />
                  </Field>
                  <Field label={t(STR.kbQty)}>
                    <input required value={buyerForm.qty} onChange={(e) => setBuyerForm({ ...buyerForm, qty: e.target.value })} placeholder={t(STR.kbQtyPh)} />
                  </Field>
                </div>
                <Field label={t(STR.kbProduce)} style={{ marginTop: 16, marginBottom: 16 }}>
                  <ProduceTiles value={buyerForm.produce} onChange={(v) => setBuyerForm({ ...buyerForm, produce: v })} />
                </Field>
                {buyerForm.produce === "other" && (
                  <Field label={t(STR.kbOtherProduce)} style={{ marginBottom: 16 }}>
                    <input
                      required
                      value={buyerForm.otherProduce}
                      onChange={(e) => setBuyerForm({ ...buyerForm, otherProduce: e.target.value })}
                      placeholder={t(STR.kbOtherProducePh)}
                    />
                  </Field>
                )}
                <button type="submit" disabled={submitting || !buyerForm.produce} className="btn btn-primary" style={{ marginTop: 4 }}>
                  {t(STR.kbSubmitBuyer)} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
