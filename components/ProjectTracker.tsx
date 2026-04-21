"use client";

import { useMemo, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { PROJECTS } from "@/content/projects";
import { CATEGORIES, STATUS } from "@/content/categories";
import { MUNICIPALITIES } from "@/content/municipalities";
import type { Project, StatusId } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

function CatChip({
  active, onClick, label, count, hue, icon,
}: {
  active: boolean; onClick: () => void; label: string; count: number;
  hue?: string; icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="chip"
      style={{
        background: active ? (hue || "var(--ink)") : "var(--surface-2)",
        color: active ? "#0B0F14" : "var(--ink-dim)",
        border: active ? "1px solid " + (hue || "var(--ink)") : "1px solid var(--line)",
        fontWeight: active ? 600 : 400,
      }}
    >
      {icon && <Icon name={icon} size={13} />}
      {label}
      <span className="mono" style={{ fontSize: 10, opacity: 0.7, marginLeft: 2 }}>
        {count}
      </span>
    </button>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.08em",
          textTransform: "uppercase", marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const { lang } = useLang();
  const cat = CATEGORIES.find((c) => c.id === p.cat)!;
  const st = STATUS[p.status];
  const muni = MUNICIPALITIES.find((m) => m.id === p.palika)!;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "14px 20px", borderBottom: "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--surface-2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: `${cat.hue}18`, color: cat.hue,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name={cat.icon} size={16} />
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11, color: "var(--ink-dim)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}
          >
            {lang === "en" ? cat.en : cat.ne}
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-muted)" }}>
          {p.id}
        </div>
      </div>

      <div style={{ padding: "20px 20px 16px" }}>
        <h3 style={{ fontSize: 18, lineHeight: 1.3, marginBottom: 12, fontWeight: 600 }}>
          {lt(p, "title", lang)}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 4,
              background: `${st.color}18`, color: st.color,
              fontSize: 11, fontFamily: "var(--f-mono)",
              letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.color }} />
            {lang === "en" ? st.en : st.ne}
          </span>
          {p.progress !== undefined && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 3, background: "var(--line)", borderRadius: 2, position: "relative" }}>
                <div
                  style={{
                    position: "absolute", inset: 0, width: p.progress + "%",
                    background: st.color, borderRadius: 2,
                  }}
                />
              </div>
              <span
                className="mono"
                style={{ fontSize: 12, color: st.color, minWidth: 40, textAlign: "right" }}
              >
                {p.progress}%
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 6,
            color: "var(--ink-dim)", fontSize: 13, marginBottom: 16,
          }}
        >
          <Icon name="pin" size={14} />
          <span>{lang === "en" ? muni.en : muni.ne}</span>
        </div>

        <div
          style={{
            padding: 14, background: "var(--bg-soft)", borderRadius: 8,
            borderLeft: `2px solid ${cat.hue}`, marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span
              className="mono"
              style={{
                fontSize: 10, color: "var(--ink-muted)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}
            >
              {lang === "en" ? "Latest update" : "पछिल्लो अद्यावधिक"}
            </span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-muted)" }}>
              {lt(p, "updated", lang)}
            </span>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink)" }}>
            {lt(p, "update", lang)}
          </div>
        </div>

        <div
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,
            marginBottom: 14, paddingTop: 14, borderTop: "1px solid var(--line-soft)",
          }}
        >
          <Meta label={lang === "en" ? "Budget" : "बजेट"} value={lt(p, "budget", lang)} />
          <Meta label={lang === "en" ? "Start" : "सुरु"} value={lt(p, "start", lang)} />
          <Meta label={lang === "en" ? "ETA" : "लक्ष्य"} value={lt(p, "eta", lang)} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(lang === "en" ? p.tagsEn : p.tagsNe).map((t, i) => (
            <span
              key={i}
              style={{
                padding: "3px 10px", borderRadius: 999, fontSize: 11,
                background: "var(--surface-2)", color: "var(--ink-dim)",
                border: "1px solid var(--line)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectTracker() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [palika, setPalika] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (cat !== "all" && p.cat !== cat) return false;
      if (status !== "all" && p.status !== status) return false;
      if (palika !== "all" && p.palika !== palika) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = (
          lt(p, "title", lang) + " " +
          lt(p, "update", lang) + " " + p.id
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cat, status, palika, query, lang]);

  const countsByCat = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach((p) => { m[p.cat] = (m[p.cat] || 0) + 1; });
    return m;
  }, []);

  const byStatus = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach((p) => { m[p.status] = (m[p.status] || 0) + 1; });
    return m;
  }, []);

  return (
    <section id="sectors" className="section" style={{ background: "var(--bg)" }}>
      <div className="container-x">
        <SectionHead
          num="02"
          kicker={t(STR.sectorsKicker)}
          title={lang === "en" ? "Project tracker — every initiative, live" : "परियोजना ट्र्याकर — हरेक पहल, प्रत्यक्ष"}
          sub={
            lang === "en"
              ? "Every active, planned and completed project across Lamjung's 8 local levels — by category, by palika, by status."
              : "लमजुङका ८ स्थानीय तहमा चलिरहेका, योजनामा रहेका र सम्पन्न सबै परियोजना — वर्ग, पालिका र स्थिति अनुसार।"
          }
          right={
            <div style={{ display: "flex", gap: 12, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-muted)" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, color: "var(--ink)", fontWeight: 500 }}>{PROJECTS.length}</div>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {lang === "en" ? "tracked" : "अनुगमित"}
                </div>
              </div>
            </div>
          }
        />

        {/* filter bar */}
        <div
          style={{
            padding: "20px 24px", background: "var(--surface)",
            border: "1px solid var(--line)", borderRadius: 12, marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <span
              style={{
                fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
                letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 6,
              }}
            >
              {lang === "en" ? "Category" : "वर्ग"}
            </span>
            <CatChip
              active={cat === "all"}
              onClick={() => setCat("all")}
              label={lang === "en" ? "All" : "सबै"}
              count={PROJECTS.length}
            />
            {CATEGORIES.map((c) => (
              <CatChip
                key={c.id}
                active={cat === c.id}
                onClick={() => setCat(c.id)}
                label={lang === "en" ? c.en : c.ne}
                count={countsByCat[c.id] || 0}
                hue={c.hue}
                icon={c.icon}
              />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}
              >
                {lang === "en" ? "Status" : "स्थिति"}
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: "auto", minWidth: 160, padding: "8px 12px" }}
              >
                <option value="all">{lang === "en" ? "All" : "सबै"}</option>
                {(Object.entries(STATUS) as [StatusId, typeof STATUS[StatusId]][]).map(([k, v]) => (
                  <option key={k} value={k}>{lang === "en" ? v.en : v.ne}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}
              >
                {lang === "en" ? "Palika" : "पालिका"}
              </span>
              <select
                value={palika}
                onChange={(e) => setPalika(e.target.value)}
                style={{ width: "auto", minWidth: 200, padding: "8px 12px" }}
              >
                <option value="all">{lang === "en" ? "All 8 palikas" : "सबै ८ पालिका"}</option>
                {MUNICIPALITIES.map((m) => (
                  <option key={m.id} value={m.id}>{lang === "en" ? m.en : m.ne}</option>
                ))}
              </select>
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute", left: 14, top: "50%",
                  transform: "translateY(-50%)", color: "var(--ink-muted)",
                }}
              >
                <Icon name="search" size={16} />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Search projects, IDs, updates..."
                    : "परियोजना, ID, अद्यावधिक खोज्नुहोस्..."
                }
                style={{ paddingLeft: 40 }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 18, display: "flex", gap: 4,
              height: 4, borderRadius: 2, overflow: "hidden",
            }}
          >
            {(Object.entries(STATUS) as [StatusId, typeof STATUS[StatusId]][]).map(([k, v]) => {
              const w = ((byStatus[k] || 0) / PROJECTS.length) * 100;
              return w > 0 ? (
                <div
                  key={k}
                  style={{ background: v.color, width: w + "%" }}
                  title={`${lang === "en" ? v.en : v.ne} — ${byStatus[k]}`}
                />
              ) : null;
            })}
          </div>
          <div
            style={{
              marginTop: 10, display: "flex", gap: 18, flexWrap: "wrap",
              fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
            }}
          >
            {(Object.entries(STATUS) as [StatusId, typeof STATUS[StatusId]][]).map(([k, v]) =>
              byStatus[k] ? (
                <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color }} />
                  {lang === "en" ? v.en : v.ne} · {byStatus[k]}
                </span>
              ) : null
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 16, fontSize: 13, color: "var(--ink-muted)", fontFamily: "var(--f-mono)",
          }}
        >
          <span>
            {filtered.length} / {PROJECTS.length} {lang === "en" ? "projects" : "परियोजना"}
          </span>
          <span style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 11 }}>
            {lang === "en" ? "sorted by last update" : "पछिल्लो अद्यावधिक अनुसार"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: 80, textAlign: "center", border: "1px dashed var(--line)",
              borderRadius: 12, color: "var(--ink-muted)",
            }}
          >
            {lang === "en" ? "No projects match your filters." : "कुनै परियोजना फेला परेन।"}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {filtered.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
