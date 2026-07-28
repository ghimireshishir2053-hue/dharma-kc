import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { genRefId } from "@/lib/refId";
import { CATEGORIES } from "@/content/categories";

const STATUS_LABEL: Record<string, { ne: string; en: string; kind: "ok" | "pending" | "new" }> = {
  new: { ne: "पेश गरिएको", en: "Submitted", kind: "new" },
  in_progress: { ne: "कारबाहीमा", en: "In progress", kind: "pending" },
  resolved: { ne: "समाधान", en: "Resolved", kind: "ok" },
};

function daysAgo(date: Date): number {
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, phone, palika, ward, cat, msg, attachment } = body as Record<string, string>;
  if (!name || !phone || !palika || !ward || !cat || !msg) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!CATEGORIES.some((c) => c.id === cat)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }

  try {
    const refId = genRefId("LJ");
    await prisma.grievance.create({
      data: {
        refId, name, phone, palika,
        ward: Number(ward),
        category: cat,
        message: msg,
        attachment: attachment || null,
      },
    });
    return NextResponse.json({ id: refId });
  } catch (err) {
    console.error("[grievance] POST error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

// Public tracking lookup — a citizen checks their OWN submission with the
// reference ID they were given. Deliberately anonymized: never returns
// name/phone/ward, matching the confidentiality promise shown on the form.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  try {
    const row = await prisma.grievance.findUnique({ where: { refId: id } });
    if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const cat = CATEGORIES.find((c) => c.id === row.category);
    const status = STATUS_LABEL[row.status];
    return NextResponse.json({
      id: row.refId,
      kindNe: cat?.ne ?? row.category,
      kindEn: cat?.en ?? row.category,
      summaryNe: row.message,
      summaryEn: row.message,
      statusNe: status.ne,
      statusEn: status.en,
      kind: status.kind,
      days: daysAgo(row.createdAt),
    });
  } catch (err) {
    console.error("[grievance] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
