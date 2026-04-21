"use client";

import { useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { PARLIAMENT } from "@/content/parliament";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

export default function Parliament() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all",       s: STR.parlAll },
    { id: "bill",      s: STR.parlBills },
    { id: "question",  s: STR.parlQuestions },
    { id: "committee", s: STR.parlCommittee },
    { id: "speech",    s: STR.parlSpeeches },
  ];

  const items = filter === "all" ? PARLIAMENT : PARLIAMENT.filter((p) => p.type === filter);
  const iconName = (type: string) =>
    ({ bill: "doc", question: "mic", committee: "users", speech: "mic" } as Record<string, string>)[type];

  return (
    <section
      id="parliament"
      className="section"
      style={{
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <SectionHead
          num="04"
          kicker={t(STR.parlKicker)}
          title={t(STR.parlTitle)}
          right={
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`chip ${filter === f.id ? "on" : ""}`}
                >
                  {t(f.s)}
                </button>
              ))}
            </div>
          }
        />

        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 12, overflow: "hidden",
            background: "var(--surface)",
          }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                gap: 20,
                alignItems: "center",
                padding: "22px 28px",
                borderBottom: i < items.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "var(--surface-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}
              >
                <Icon name={iconName(p.type)} size={16} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, lineHeight: 1.4 }}>
                  {lt(p, "title", lang)}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 13, color: "var(--ink-muted)", letterSpacing: "0.06em" }}
                >
                  {lt(p, "role", lang)} · {lt(p, "date", lang)}
                </div>
              </div>
              <span className={`badge ${p.statusKind}`}>{lt(p, "status", lang)}</span>
              <button style={{ color: "var(--ink-muted)" }}>
                <Icon name="arrow-up-right" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
