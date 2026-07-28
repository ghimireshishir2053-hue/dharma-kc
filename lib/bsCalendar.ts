import NepaliDate from "nepali-date-converter";
import { dateConfigMap } from "nepali-date-converter";

export type BsYMD = { year: number; month: number; date: number };

const MONTH_KEYS = [
  "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];

export const WEEKDAYS_NE = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];
export const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function todayBs(): BsYMD {
  const d = new NepaliDate();
  return { year: d.getYear(), month: d.getMonth(), date: d.getDate() };
}

export function adToBs(iso: string): BsYMD {
  // Parse "YYYY-MM-DD" as local calendar fields — `new Date(iso)` would parse
  // it as UTC midnight, which shifts a day backward in timezones behind UTC.
  const [y, m, d] = iso.split("-").map(Number);
  const nd = new NepaliDate(new Date(y, m - 1, d));
  return { year: nd.getYear(), month: nd.getMonth(), date: nd.getDate() };
}

export function daysInBsMonth(year: number, month: number): number {
  const months = dateConfigMap[String(year)] as Record<string, number> | undefined;
  return months?.[MONTH_KEYS[month]] ?? 30;
}

/** Weekday (0=Sun..6=Sat) of the 1st of the given BS month. */
export function firstWeekdayOfBsMonth(year: number, month: number): number {
  return new NepaliDate(year, month, 1).getDay();
}

export function bsMonthLabel(year: number, month: number, lang: "ne" | "en"): string {
  const d = new NepaliDate(year, month, 1);
  return lang === "ne" ? d.format("MMMM YYYY", "np") : d.format("MMMM YYYY", "en");
}

export function bsDateLabel(y: BsYMD, lang: "ne" | "en"): string {
  const d = new NepaliDate(y.year, y.month, y.date);
  return lang === "ne" ? d.format("ddd DD MMMM, YYYY", "np") : d.format("ddd DD MMMM, YYYY", "en");
}

export function bsKey(y: BsYMD): string {
  return `${y.year}-${y.month}-${y.date}`;
}
