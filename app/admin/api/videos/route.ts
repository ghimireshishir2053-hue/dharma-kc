import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";
import { genRefId } from "@/lib/refId";

const REQUIRED_FIELDS = ["titleNe", "titleEn", "platform", "dateNe", "dateEn"];

function firstMissingField(body: Record<string, unknown>): string | null {
  for (const f of REQUIRED_FIELDS) {
    if (!body[f]) return f;
  }
  return null;
}

function toVideoData(body: Record<string, any>) {
  const { titleNe, titleEn, platform, url, youtubeId, dateNe, dateEn } = body;
  return { titleNe, titleEn, platform, url: url || "", youtubeId: youtubeId || null, dateNe, dateEn };
}

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/videos] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const missing = firstMissingField(body);
  if (missing) return NextResponse.json({ error: `missing_field:${missing}` }, { status: 400 });
  if (!body.url && !body.youtubeId) {
    return NextResponse.json({ error: "missing_field:url_or_youtubeId" }, { status: 400 });
  }

  try {
    const created = await prisma.video.create({
      data: { refId: genRefId("VD"), ...toVideoData(body) },
    });
    return NextResponse.json(created);
  } catch (err) {
    console.error("[admin/videos] POST error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { refId, ...fields } = body;
  if (!refId) return NextResponse.json({ error: "missing_refId" }, { status: 400 });
  const missing = firstMissingField(fields);
  if (missing) return NextResponse.json({ error: `missing_field:${missing}` }, { status: 400 });

  try {
    const updated = await prisma.video.update({
      where: { refId },
      data: toVideoData(fields),
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/videos] PUT error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const refId = new URL(req.url).searchParams.get("refId");
  if (!refId) return NextResponse.json({ error: "missing_refId" }, { status: 400 });

  try {
    await prisma.video.delete({ where: { refId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/videos] DELETE error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
