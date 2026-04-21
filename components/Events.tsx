"use client";

import { STR, useLang, lt } from "@/lib/i18n";
import { EVENTS } from "@/content/events";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

export default function Events() {
  const { lang, t } = useLang();

  return (
    <section id="events" className="section" style={{ background: "var(--bg)" }}>
      <div className="container-x">
        <SectionHead
          num="07"
          kicker={t(STR.eventsKicker)}
          title={t(STR.eventsTitle)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {EVENTS.map((e, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  padding: "16px 18px",
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: 36, fontWeight: 500, lineHeight: 1,
                    fontFamily: "var(--f-deva-serif)",
                  }}
                >
                  {lt(e, "day", lang)}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 13, color: "var(--ink-muted)",
                    letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4,
                  }}
                >
                  {lt(e, "mon", lang)} · {e.yr}
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    fontSize: 15, fontWeight: 500, lineHeight: 1.35,
                    marginBottom: 12, minHeight: 60,
                  }}
                >
                  {lt(e, "title", lang)}
                </div>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 12, color: "var(--ink-dim)", marginBottom: 6,
                  }}
                >
                  <Icon name="clock" size={12} /> {lt(e, "time", lang)}
                </div>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 12, color: "var(--ink-dim)", marginBottom: 12,
                  }}
                >
                  <Icon name="pin" size={12} /> {lt(e, "loc", lang)}
                </div>
                <span className="pill muted" style={{ fontSize: 12 }}>
                  {lt(e, "kind", lang)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
