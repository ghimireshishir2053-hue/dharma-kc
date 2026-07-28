import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public read of admin-entered calendar events only — no placeholder fallback.
export async function GET() {
  try {
    const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
    const events = rows.map((r) => ({
      id: r.refId,
      date: r.date,
      titleNe: r.titleNe,
      titleEn: r.titleEn,
      timeNe: r.timeNe,
      timeEn: r.timeEn,
      locNe: r.locNe,
      locEn: r.locEn,
      kind: r.kind,
    }));
    return NextResponse.json(events);
  } catch (err) {
    console.error("[events] GET error:", err);
    return NextResponse.json([]);
  }
}
