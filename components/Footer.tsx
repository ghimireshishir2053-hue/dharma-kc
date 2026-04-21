"use client";

import { STR, useLang, lt, BiString } from "@/lib/i18n";
import { MP_DATA, CV } from "@/content/mp";
import Icon from "./Icon";

function FooterCol({ title, items }: { title: string; items: [BiString, string][] }) {
  const { t } = useLang();
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 16 }}>
        {title}
      </div>
      <ul
        style={{
          listStyle: "none", fontSize: 13, color: "var(--ink-dim)",
          display: "flex", flexDirection: "column", gap: 10,
        }}
      >
        {items.map(([s, id], i) => (
          <li key={i}>
            <a
              href={"#" + id}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
              }}
              style={{ transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
            >
              {t(s)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { lang, t } = useLang();
  return (
    <footer
      style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", padding: "64px 0 32px" }}
    >
      <div className="container-x">
        <div className="r-grid-footer">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: "var(--accent)", color: "var(--accent-ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--f-deva-serif)", fontWeight: 700, fontSize: 22,
                }}
              >
                ध
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{lt(MP_DATA, "name", lang)}</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  {lang === "en" ? "MP · Lamjung 1" : "सांसद · लमजुङ १"}
                </div>
              </div>
            </div>
            <p
              style={{
                color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.6,
                marginBottom: 20, maxWidth: 360,
              }}
            >
              {lang === "en"
                ? "Official portal for Hon. Dharma Raj K.C., Member of Parliament, House of Representatives, representing Lamjung in Nepal's Federal Parliament."
                : "माननीय धर्मराज के.सी. — सांसद, प्रतिनिधि सभा, संघीय संसद नेपाल, लमजुङ प्रतिनिधित्व गर्ने आधिकारिक पोर्टल।"}
            </p>
            <div
              style={{
                fontSize: 13, color: "var(--ink-dim)",
                display: "flex", flexDirection: "column", gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="pin" size={14} /> {t(STR.footerAddress)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="mail" size={14} /> {MP_DATA.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="phone" size={14} /> {MP_DATA.phone}
              </div>
            </div>
          </div>

          <FooterCol
            title={lang === "en" ? "Work" : "कार्य"}
            items={[
              [STR.navPriorities, "priorities"],
              [STR.navSectors, "sectors"],
              [STR.navParliament, "parliament"],
              [STR.navLamjung, "lamjung"],
            ]}
          />

          <FooterCol
            title={lang === "en" ? "Citizen" : "नागरिक"}
            items={[
              [STR.navGrievance, "grievance"],
              [STR.navEvents, "events"],
              [STR.navNews, "news"],
            ]}
          />

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {lang === "en" ? "About the MP" : "सांसदबारे"}
            </div>
            <ul
              style={{
                listStyle: "none", fontSize: 13, color: "var(--ink-dim)",
                display: "flex", flexDirection: "column", gap: 8,
              }}
            >
              {(lang === "en" ? CV.accoladesEn : CV.accoladesNe).slice(0, 4).map((a, i) => (
                <li key={i} style={{ display: "flex", gap: 8, lineHeight: 1.5 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)", paddingTop: 28,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 13, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <span>{t(STR.footerDisclaimer)}</span>
          <span>© 2082 · {lt(MP_DATA, "name", lang)}</span>
        </div>
      </div>
    </footer>
  );
}
