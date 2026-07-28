import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";

const VALID_STATUS = new Set(["new", "under_review", "approved", "rejected"]);

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.projectRequest.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/project-bank] GET error:", err);
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
    const updated = await prisma.projectRequest.update({
      where: { refId },
      data: { status: status as "new" | "under_review" | "approved" | "rejected" },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/project-bank] PUT error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
