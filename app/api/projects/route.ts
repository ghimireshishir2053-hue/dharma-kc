import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { relativeTimeNe, relativeTimeEn } from "@/lib/relativeTime";

// Public read of admin-entered projects only — no fallback to placeholder
// content. If the database is unreachable, fail open to an empty list
// (logged server-side) rather than breaking the homepage section.
export async function GET() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    const projects = rows.map((r) => ({
      id: r.refId,
      cat: r.cat,
      palika: r.palika,
      titleNe: r.titleNe,
      titleEn: r.titleEn,
      status: r.status,
      progress: r.progress ?? undefined,
      budgetNe: r.budgetNe,
      budgetEn: r.budgetEn,
      startNe: r.startNe,
      startEn: r.startEn,
      etaNe: r.etaNe,
      etaEn: r.etaEn,
      updateNe: r.updateNe,
      updateEn: r.updateEn,
      updatedNe: relativeTimeNe(r.updatedAt),
      updatedEn: relativeTimeEn(r.updatedAt),
      tagsNe: r.tagsNe,
      tagsEn: r.tagsEn,
    }));
    return NextResponse.json(projects);
  } catch (err) {
    console.error("[projects] GET error:", err);
    return NextResponse.json([]);
  }
}
