import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { VIDEOS_SEED } from "@/content/videosSeed";

export async function GET() {
  try {
    const rows = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
    const videos = rows.map((r) => ({
      id: r.refId,
      titleNe: r.titleNe,
      titleEn: r.titleEn,
      platform: r.platform,
      url: r.url,
      youtubeId: r.youtubeId ?? undefined,
      dateNe: r.dateNe,
      dateEn: r.dateEn,
    }));
    return NextResponse.json(videos);
  } catch (err) {
    // Database not reachable yet (e.g. DATABASE_URL unset) — serve the real,
    // already-verified videos directly rather than showing an empty section.
    console.error("[videos] GET error, serving bundled fallback:", err);
    const videos = VIDEOS_SEED.map((v) => ({
      id: v.refId,
      titleNe: v.titleNe,
      titleEn: v.titleEn,
      platform: v.platform,
      url: v.url,
      youtubeId: v.youtubeId,
      dateNe: v.dateNe,
      dateEn: v.dateEn,
    }));
    return NextResponse.json(videos);
  }
}
