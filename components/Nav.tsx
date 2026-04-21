"use client";

import { useEffect, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { MP_DATA } from "@/content/mp";
import Icon from "./Icon";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const items = [
    { id: "priorities", s: STR.navPriorities },
    { id: "lamjung",    s: STR.navLamjung },
    { id: "sectors",    s: STR.navSectors },
    { id: "parliament", s: STR.navParliament },
    { id: "news",       s: STR.navNews },
    { id: "grievance",  s: STR.navGrievance },
    { id: "events",     s: STR.navEvents },
  ];

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(245,239,229,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <div
        className="container-x"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--accent)", color: "var(--accent-ink)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--f-deva-serif)", fontWeight: 700, fontSize: 18,
            }}
          >
            ध
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{lt(MP_DATA, "name", lang)}</div>
            <div
              className="mono"
              style={{
                fontSize: 12, color: "var(--ink-muted)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}
            >
              {lang === "en" ? "MP · Lamjung 1" : "सांसद · लमजुङ १"}
            </div>
          </div>
        </a>

        <nav className="desktop-only" style={{ alignItems: "center", gap: 4, fontSize: 14 }}>
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              style={{ padding: "8px 12px", borderRadius: 6, color: "var(--ink-dim)", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
            >
              {t(it.s)}
            </button>
          ))}
        </nav>

        <div className="desktop-only" style={{ alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex", border: "1px solid var(--line)", borderRadius: 8,
              padding: 2, fontFamily: "var(--f-mono)", fontSize: 13,
            }}
          >
            <button
              onClick={() => setLang("ne")}
              style={{
                padding: "6px 10px", borderRadius: 6,
                background: lang === "ne" ? "var(--ink)" : "transparent",
                color: lang === "ne" ? "var(--bg)" : "var(--ink-dim)",
              }}
            >
              NE
            </button>
            <button
              onClick={() => setLang("en")}
              style={{
                padding: "6px 10px", borderRadius: 6,
                background: lang === "en" ? "var(--ink)" : "transparent",
                color: lang === "en" ? "var(--bg)" : "var(--ink-dim)",
              }}
            >
              EN
            </button>
          </div>
          <button onClick={() => go("grievance")} className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13 }}>
            {t(STR.heroCTA1)}
          </button>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="mobile-only" style={{ alignItems: "center", gap: 8 }}>
          <div
            style={{
              display: "flex", border: "1px solid var(--line)", borderRadius: 8,
              padding: 2, fontFamily: "var(--f-mono)", fontSize: 12,
            }}
          >
            <button
              onClick={() => setLang("ne")}
              style={{
                padding: "5px 8px", borderRadius: 6,
                background: lang === "ne" ? "var(--ink)" : "transparent",
                color: lang === "ne" ? "var(--bg)" : "var(--ink-dim)",
              }}
            >
              NE
            </button>
            <button
              onClick={() => setLang("en")}
              style={{
                padding: "5px 8px", borderRadius: 6,
                background: lang === "en" ? "var(--ink)" : "transparent",
                color: lang === "en" ? "var(--bg)" : "var(--ink-dim)",
              }}
            >
              EN
            </button>
          </div>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              width: 40, height: 40, borderRadius: 8,
              border: "1px solid var(--line)", color: "var(--ink)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {items.map((it) => (
          <button key={it.id} onClick={() => go(it.id)}>
            {t(it.s)}
          </button>
        ))}
        <button
          onClick={() => go("grievance")}
          className="btn btn-primary"
          style={{ marginTop: 8, justifyContent: "center" }}
        >
          {t(STR.heroCTA1)}
        </button>
      </div>
    </header>
  );
}
