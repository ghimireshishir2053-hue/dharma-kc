import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";

const VALID_STATUS = new Set(["new", "contacted", "archived"]);

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.diasporaMember.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/diaspora] GET error:", err);
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
    const updated = await prisma.diasporaMember.update({
      where: { refId },
      data: { status: status as "new" | "contacted" | "archived" },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/diaspora] PUT error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
