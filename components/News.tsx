"use client";

import { STR, useLang, lt } from "@/lib/i18n";
import { NEWS } from "@/content/news";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

export default function News() {
  const { lang, t } = useLang();

  return (
    <section id="news" className="section" style={{ background: "var(--bg)" }}>
      <div className="container-x">
        <SectionHead
          num="05"
          kicker={t(STR.newsKicker)}
          title={t(STR.newsTitle)}
          right={
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>
              {t(STR.newsAll)} <Icon name="arrow-right" size={14} />
            </button>
          }
        />

        <div className="r-grid-news">
          <a
            className="card"
            style={{
              padding: 0, overflow: "hidden",
              display: "flex", flexDirection: "column", gridRow: "span 2",
            }}
          >
            <div className="ph" data-label={NEWS[0].imgLabel} style={{ aspectRatio: "4/3", flexShrink: 0 }} />
            <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                <span className="pill accent">{lt(NEWS[0], "kind", lang)}</span>
                <span className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  {lt(NEWS[0], "outlet", lang)}
                </span>
                <span className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  · {lt(NEWS[0], "date", lang)}
                </span>
              </div>
              <h3 style={{ fontSize: 26, lineHeight: 1.25, fontWeight: 600 }}>
                {lt(NEWS[0], "title", lang)}
              </h3>
            </div>
          </a>
          {NEWS.slice(1, 5).map((n, i) => (
            <a key={i} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className="pill muted" style={{ fontSize: 12 }}>
                  {lt(n, "kind", lang)}
                </span>
                <span className="mono" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  {lt(n, "date", lang)}
                </span>
              </div>
              <h4 style={{ fontSize: 16, lineHeight: 1.35, fontWeight: 500, flex: 1 }}>
                {lt(n, "title", lang)}
              </h4>
              <div
                className="mono"
                style={{ fontSize: 13, color: "var(--ink-muted)", letterSpacing: "0.06em" }}
              >
                {lt(n, "outlet", lang)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
