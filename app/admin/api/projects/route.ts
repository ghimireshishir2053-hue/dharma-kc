import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";
import { CATEGORIES, STATUS } from "@/content/categories";
import { MUNICIPALITIES } from "@/content/municipalities";

const VALID_CATS = new Set<string>(CATEGORIES.map((c) => c.id));
const VALID_PALIKAS = new Set<string>(MUNICIPALITIES.map((m) => m.id));
const VALID_STATUSES = new Set<string>(Object.keys(STATUS));

function genRefId() {
  return "P-2082-" + String(Math.floor(50 + Math.random() * 949)).padStart(3, "0");
}

const REQUIRED_FIELDS = [
  "cat", "palika", "titleNe", "titleEn", "status",
  "budgetNe", "budgetEn", "startNe", "startEn", "etaNe", "etaEn",
  "updateNe", "updateEn",
];

function firstMissingField(body: Record<string, unknown>): string | null {
  for (const f of REQUIRED_FIELDS) {
    if (!body[f]) return f;
  }
  return null;
}

// Defense in depth: even though the admin UI only offers valid choices via
// dropdowns, a direct API call must not be able to insert a cat/palika/status
// value the public ProjectTracker doesn't recognize (it looks these up with
// non-null assertions and would throw at render time).
function invalidTaxonomyField(body: Record<string, unknown>): string | null {
  if (!VALID_CATS.has(body.cat as string)) return "cat";
  if (!VALID_PALIKAS.has(body.palika as string)) return "palika";
  if (!VALID_STATUSES.has(body.status as string)) return "status";
  return null;
}

function toProjectData(body: Record<string, any>) {
  const { progress, tagsNe, tagsEn, ...rest } = body;
  return {
    ...rest,
    progress: progress !== undefined && progress !== "" && progress !== null ? Number(progress) : null,
    tagsNe: Array.isArray(tagsNe) ? tagsNe : [],
    tagsEn: Array.isArray(tagsEn) ? tagsEn : [],
  };
}

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[admin/projects] GET error:", err);
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
  const invalid = invalidTaxonomyField(body);
  if (invalid) return NextResponse.json({ error: `invalid_value:${invalid}` }, { status: 400 });

  try {
    const created = await prisma.project.create({
      data: { ...toProjectData(body), refId: genRefId() } as Prisma.ProjectCreateInput,
    });
    return NextResponse.json(created);
  } catch (err) {
    console.error("[admin/projects] POST error:", err);
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
  const invalid = invalidTaxonomyField(fields);
  if (invalid) return NextResponse.json({ error: `invalid_value:${invalid}` }, { status: 400 });

  try {
    const updated = await prisma.project.update({
      where: { refId },
      data: toProjectData(fields) as Prisma.ProjectUpdateInput,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/projects] PUT error:", err);
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
    await prisma.project.delete({ where: { refId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/projects] DELETE error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
