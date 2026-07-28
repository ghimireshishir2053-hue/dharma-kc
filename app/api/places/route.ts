import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PLACES_SEED } from "@/content/placesSeed";

function fallbackPlaces(): Record<string, unknown> {
  const places: Record<string, unknown> = {};
  for (const [palika, p] of Object.entries(PLACES_SEED)) {
    places[palika] = {
      primaryNe: p.primaryNe,
      primaryEn: p.primaryEn,
      primaryDescNe: p.primaryDescNe,
      primaryDescEn: p.primaryDescEn,
      primaryImg: p.primaryImg,
      details: p.attractions,
    };
  }
  return places;
}

export async function GET() {
  try {
    const profiles = await prisma.palikaProfile.findMany({
      include: { attractions: { orderBy: { createdAt: "asc" } } },
    });

    const places: Record<string, unknown> = {};
    for (const p of profiles) {
      places[p.palika] = {
        primaryNe: p.primaryNe,
        primaryEn: p.primaryEn,
        primaryDescNe: p.primaryDescNe,
        primaryDescEn: p.primaryDescEn,
        primaryImg: p.primaryImg ?? "",
        details: p.attractions.map((a) => ({
          placeNe: a.placeNe, placeEn: a.placeEn,
          descNe: a.descNe, descEn: a.descEn,
          typeNe: a.typeNe, typeEn: a.typeEn,
          infoLink: a.infoLink,
          img: a.img ?? "",
        })),
      };
    }
    return NextResponse.json(places);
  } catch (err) {
    // Database not reachable yet (e.g. DATABASE_URL unset) — serve the real,
    // already-verified places directly rather than showing an empty section.
    console.error("[places] GET error, serving bundled fallback:", err);
    return NextResponse.json(fallbackPlaces());
  }
}
