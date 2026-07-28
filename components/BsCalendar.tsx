"use client";

import { useEffect, useMemo, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import { EVENT_KINDS } from "@/content/eventKinds";
import {
  WEEKDAYS_NE, WEEKDAYS_EN,
  todayBs, adToBs, daysInBsMonth, firstWeekdayOfBsMonth,
  bsMonthLabel, bsDateLabel, bsKey,
  type BsYMD,
} from "@/lib/bsCalendar";
import type { EventItem } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

export default function BsCalendar() {
  const { lang, t } = useLang();
  const today = useMemo(todayBs, []);
  const [view, setView] = useState<{ year: number; month: number }>({ year: today.year, month: today.month });
  const [selected, setSelected] = useState<BsYMD>(today);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]));
  }, []);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const ev of events) {
      const key = bsKey(adToBs(ev.date));
      const list = map.get(key) ?? [];
      list.push(ev);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const daysInMonth = daysInBsMonth(view.year, view.month);
  const leadingBlanks = firstWeekdayOfBsMonth(view.year, view.month);
  const weekdayLabels = lang === "ne" ? WEEKDAYS_NE : WEEKDAYS_EN;

  const goMonth = (delta: number) => {
    let { year, month } = view;
    month += delta;
    if (month < 0) { month = 11; year -= 1; }
    if (month > 11) { month = 0; year += 1; }
    setView({ year, month });
  };

  const selectedEvents = eventsByDay.get(bsKey(selected)) ?? [];
  const isToday = (y: BsYMD) => y.year === today.year && y.month === today.month && y.date === today.date;

  return (
    <section id="calendar" className="section">
      <div className="container-x">
        <SectionHead
          kicker={lang === "ne" ? "तालिका" : "Schedule"}
          title={t(STR.calTitle)}
          sub={t(STR.calSubtitle)}
        />

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="cal-split">
            <div className="cal-split-grid" style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <button
                  aria-label="Previous month"
                  onClick={() => goMonth(-1)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-dim)" }}
                >
                  <Icon name="chevron-left" size={16} />
                </button>
                <div
                  className={lang === "en" ? "en" : "ne"}
                  style={{ fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)", fontSize: 20, fontWeight: 600 }}
                >
                  {bsMonthLabel(view.year, view.month, lang)}
                </div>
                <button
                  aria-label="Next month"
                  onClick={() => goMonth(1)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-dim)" }}
                >
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                {weekdayLabels.map((w) => (
                  <div key={w} className="mono" style={{ textAlign: "center", fontSize: 11, color: "var(--ink-muted)", padding: "6px 0", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {w}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {Array.from({ length: leadingBlanks }).map((_, i) => (
                  <div key={`b${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = i + 1;
                  const cell: BsYMD = { year: view.year, month: view.month, date };
                  const selectedCell = cell.date === selected.date && cell.month === selected.month && cell.year === selected.year;
                  const hasEvents = eventsByDay.has(bsKey(cell));
                  return (
                    <button
                      key={date}
                      onClick={() => setSelected(cell)}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontFamily: "var(--f-mono)",
                        background: selectedCell ? "var(--ink)" : isToday(cell) ? "#0094da1f" : "transparent",
                        color: selectedCell ? "var(--bg)" : "var(--ink)",
                        border: isToday(cell) && !selectedCell ? "1px solid var(--accent)" : "1px solid transparent",
                        transition: "all .15s",
                      }}
                    >
                      {date}
                      {hasEvents && (
                        <span
                          style={{
                            position: "absolute", bottom: 6,
                            width: 4, height: 4, borderRadius: "50%",
                            background: selectedCell ? "var(--bg)" : "var(--accent)",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ padding: 28 }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {isToday(selected) ? t(STR.calToday) : t(STR.calEventsOn)}
              </div>
              <div
                className={lang === "en" ? "en" : "ne"}
                style={{ fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)", fontSize: 19, fontWeight: 600, marginBottom: 20 }}
              >
                {bsDateLabel(selected, lang)}
              </div>

              {selectedEvents.length === 0 ? (
                <div style={{ color: "var(--ink-muted)", fontSize: 14 }}>{t(STR.calNoEvents)}</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {selectedEvents.map((ev) => {
                    const kind = EVENT_KINDS.find((k) => k.id === ev.kind);
                    return (
                      <div key={ev.id} style={{ padding: 16, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span className="badge new">{kind ? (lang === "en" ? kind.en : kind.ne) : ev.kind}</span>
                          <span className="mono" style={{ fontSize: 12, color: "var(--ink-muted)" }}>{lt(ev, "time", lang)}</span>
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>{lt(ev, "title", lang)}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-dim)" }}>
                          <Icon name="pin" size={14} />
                          {lt(ev, "loc", lang)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
