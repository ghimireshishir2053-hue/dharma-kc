import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";

const VALID_STATUS = new Set(["new", "in_progress", "resolved"]);

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.grievance.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/grievances] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { refId, status } = body as Record<string, string>;
  if (!refId || !VALID_STATUS.has(status)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  try {
    const updated = await prisma.grievance.update({
      where: { refId },
      data: { status: status as "new" | "in_progress" | "resolved" },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/grievances] PUT error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
