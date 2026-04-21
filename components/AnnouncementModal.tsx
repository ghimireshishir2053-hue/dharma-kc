"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import Icon from "./Icon";

const KEY = "lamjung-notice-v1";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function AnnouncementModal() {
  const { lang } = useLang();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw && parseInt(raw, 10) > Date.now()) return;
    const t = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, String(Date.now() + DISMISS_DURATION_MS));
    } catch {}
    setVisible(false);
    setTimeout(() => setMounted(false), 280);
  };

  const goToApply = () => {
    try {
      localStorage.setItem(KEY, String(Date.now() + DISMISS_DURATION_MS));
    } catch {}
    router.push("/apply");
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-title"
      onClick={dismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(26,26,26,0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity .28s ease",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          goToApply();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToApply();
          }
        }}
        aria-label={
          lang === "en"
            ? "Open application form"
            : "आवेदन फारम खोल्नुहोस्"
        }
        style={{
          background: "var(--surface)",
          borderRadius: 16,
          maxWidth: 540, width: "100%",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          border: "1px solid var(--line)",
          transform: visible ? "translateY(0)" : "translateY(12px) scale(0.98)",
          transition: "transform .28s ease",
          cursor: "pointer",
        }}
      >
        {/* accent stripe */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #E8B14A 0%, #C98A1F 50%, #E8B14A 100%)",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />

        {/* close */}
        <button
          aria-label={lang === "en" ? "Close" : "बन्द गर्नुहोस्"}
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 34, height: 34, borderRadius: 8,
            color: "var(--ink-muted)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--line)",
            background: "var(--bg-soft)",
            cursor: "pointer",
          }}
        >
          <Icon name="x" size={16} />
        </button>

        <div style={{ padding: "32px 32px 0" }}>
          <div
            className="eyebrow"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginBottom: 14, color: "var(--accent)",
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: 999, background: "var(--accent)",
              }}
            />
            {lang === "en" ? "Announcement" : "आह्वान"}
          </div>

          <h2
            id="notice-title"
            style={{
              fontSize: 26, fontWeight: 600, lineHeight: 1.2,
              marginBottom: 8, letterSpacing: "-0.01em",
              fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)",
            }}
          >
            {lang === "en"
              ? "Call for Experts & Stakeholders"
              : "विज्ञ तथा सरोकारवालाहरूलाई आह्वान"}
          </h2>

          <div
            style={{
              fontSize: 15, fontWeight: 500,
              color: "var(--accent)", marginBottom: 14,
            }}
          >
            {lang === "en" ? "Lamjung Development Initiative" : "लमजुङ विकास पहल"}
          </div>

          <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            {lang === "en"
              ? "The Office of Hon. Dharma Raj K.C., MP (Lamjung-1), invites experts and stakeholders across sectors — education, health, tourism, hydropower, water, roads, agriculture, finance, and more — to co-create practical solutions for Lamjung's sustainable development."
              : "माननीय धर्मराज के.सी., सांसद (लमजुङ-१) को कार्यालयले शिक्षा, स्वास्थ्य, पर्यटन, जलविद्युत्, खानेपानी, सडक, कृषि र वित्त जस्ता क्षेत्रका विज्ञ तथा सरोकारवालाहरूलाई लमजुङको दिगो विकासका लागि व्यावहारिक समाधान सहसिर्जना गर्न आह्वान गर्दछ।"}
          </p>

          <div
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
              marginBottom: 24,
            }}
          >
            {[
              { num: "01", ne: "भर्चुअल परामर्श", en: "Virtual consultation" },
              { num: "02", ne: "बेसीशहर कार्यशाला", en: "Besisahar workshop" },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  padding: "12px 14px", background: "var(--bg-soft)",
                  borderRadius: 8, fontSize: 13, color: "var(--ink)",
                  lineHeight: 1.35, fontWeight: 500,
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 11, color: "var(--ink-muted)", marginBottom: 4,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}
                >
                  {s.num}
                </div>
                {lang === "en" ? s.en : s.ne}
              </div>
            ))}
          </div>

          <div
            className="mono"
            style={{
              fontSize: 12, color: "var(--ink-muted)",
              textAlign: "center", letterSpacing: "0.02em",
              marginBottom: 20,
            }}
          >
            {lang === "en"
              ? "— Hon. Dharma Raj K.C., MP (Lamjung-1)"
              : "— माननीय धर्मराज के.सी., सांसद लमजुङ–१"}
          </div>
        </div>

        {/* click-to-apply footer bar */}
        <div
          style={{
            background: "var(--accent)",
            color: "var(--accent-ink)",
            padding: "16px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: 15, fontWeight: 600,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <span>
            {lang === "en" ? "Click to apply now" : "आवेदन दिन यहाँ क्लिक गर्नुहोस्"}
          </span>
          <Icon name="arrow-right" size={18} />
        </div>
      </div>
    </div>
  );
}
