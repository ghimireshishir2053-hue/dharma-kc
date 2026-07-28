import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";
import { genRefId } from "@/lib/refId";
import { EVENT_KINDS } from "@/content/eventKinds";

const VALID_KINDS = new Set(EVENT_KINDS.map((k) => k.id));

const REQUIRED_FIELDS = ["date", "titleNe", "titleEn", "timeNe", "timeEn", "locNe", "locEn", "kind"];

function firstMissingField(body: Record<string, unknown>): string | null {
  for (const f of REQUIRED_FIELDS) {
    if (!body[f]) return f;
  }
  return null;
}

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/events] GET error:", err);
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
  if (!VALID_KINDS.has(body.kind)) {
    return NextResponse.json({ error: "invalid_value:kind" }, { status: 400 });
  }

  try {
    const { date, titleNe, titleEn, timeNe, timeEn, locNe, locEn, kind } = body;
    const created = await prisma.event.create({
      data: { refId: genRefId("EV"), date, titleNe, titleEn, timeNe, timeEn, locNe, locEn, kind },
    });
    return NextResponse.json(created);
  } catch (err) {
    console.error("[admin/events] POST error:", err);
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
  if (!VALID_KINDS.has(fields.kind)) {
    return NextResponse.json({ error: "invalid_value:kind" }, { status: 400 });
  }

  try {
    const { date, titleNe, titleEn, timeNe, timeEn, locNe, locEn, kind } = fields;
    const updated = await prisma.event.update({
      where: { refId },
      data: { date, titleNe, titleEn, timeNe, timeEn, locNe, locEn, kind },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/events] PUT error:", err);
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
    await prisma.event.delete({ where: { refId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/events] DELETE error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
