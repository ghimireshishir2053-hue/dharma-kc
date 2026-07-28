import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { genRefId } from "@/lib/refId";
import { CATEGORIES } from "@/content/categories";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, phone, palika, ward, cat, title, msg, budget, benef, org, resp, attachment } = body as Record<string, string>;
  if (!name || !phone || !palika || !ward || !cat || !title || !msg) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!CATEGORIES.some((c) => c.id === cat)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }

  try {
    const refId = genRefId("PB");
    await prisma.projectRequest.create({
      data: {
        refId, name, phone, palika,
        ward: Number(ward),
        category: cat,
        title,
        message: msg,
        budget: budget || null,
        beneficiaries: benef ? Number(benef) : null,
        org: org || null,
        responsible: resp || null,
        attachment: attachment || null,
      },
    });
    return NextResponse.json({ id: refId });
  } catch (err) {
    console.error("[project-bank] POST error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
