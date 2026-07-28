import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { genRefId } from "@/lib/refId";
import { COLLAB_INTERESTS } from "@/content/collabInterests";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, phone, sector, country, palika, interest, message, cv } = body as Record<string, string>;
  if (!name || !phone || !sector || !country || !palika || !interest) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!COLLAB_INTERESTS.some((c) => c.id === interest)) {
    return NextResponse.json({ error: "invalid_interest" }, { status: 400 });
  }

  try {
    const refId = genRefId("DL");
    await prisma.diasporaMember.create({
      data: {
        refId, name, phone, sector, country, palika, interest,
        message: message || null,
        cv: cv || null,
      },
    });
    return NextResponse.json({ id: refId });
  } catch (err) {
    console.error("[diaspora] POST error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
