import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";
import { MUNICIPALITIES } from "@/content/municipalities";

const VALID_PALIKAS = new Set<string>(MUNICIPALITIES.map((m) => m.id));

export async function GET(req: NextRequest, { params }: { params: Promise<{ palika: string }> }) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { palika } = await params;
  try {
    const profile = await prisma.palikaProfile.findUnique({
      where: { palika },
      include: { attractions: { orderBy: { createdAt: "asc" } } },
    });
    if (!profile) {
      return NextResponse.json({
        primaryNe: "", primaryEn: "", primaryDescNe: "", primaryDescEn: "", primaryImg: "", details: [],
      });
    }
    return NextResponse.json({
      primaryNe: profile.primaryNe,
      primaryEn: profile.primaryEn,
      primaryDescNe: profile.primaryDescNe,
      primaryDescEn: profile.primaryDescEn,
      primaryImg: profile.primaryImg ?? "",
      details: profile.attractions.map((a) => ({
        placeNe: a.placeNe, placeEn: a.placeEn, descNe: a.descNe, descEn: a.descEn,
        typeNe: a.typeNe, typeEn: a.typeEn, infoLink: a.infoLink, img: a.img ?? "",
      })),
    });
  } catch (err) {
    console.error("[admin/places] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ palika: string }> }) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { palika } = await params;
  if (!VALID_PALIKAS.has(palika)) {
    return NextResponse.json({ error: "invalid_palika" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const { primaryNe, primaryEn, primaryDescNe, primaryDescEn, primaryImg, details } = body;
  if (!primaryNe || !primaryEn || !primaryDescNe || !primaryDescEn) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  try {
    const profile = await prisma.palikaProfile.upsert({
      where: { palika },
      create: { palika, primaryNe, primaryEn, primaryDescNe, primaryDescEn, primaryImg: primaryImg || null },
      update: { primaryNe, primaryEn, primaryDescNe, primaryDescEn, primaryImg: primaryImg || null },
    });

    // Attractions are small in number and low-frequency-edited — replace the
    // whole set on each save rather than tracking per-row diffs.
    await prisma.attraction.deleteMany({ where: { palikaProfileId: profile.id } });
    if (Array.isArray(details)) {
      for (const d of details) {
        if (!d.placeNe || !d.placeEn) continue;
        await prisma.attraction.create({
          data: {
            palikaProfileId: profile.id,
            placeNe: d.placeNe, placeEn: d.placeEn,
            descNe: d.descNe || "", descEn: d.descEn || "",
            typeNe: d.typeNe || "", typeEn: d.typeEn || "",
            infoLink: d.infoLink || "",
            img: d.img || null,
          },
        });
      }
    }

    return NextResponse.json({ success: true, palika });
  } catch (err) {
    console.error("[admin/places] PUT error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
