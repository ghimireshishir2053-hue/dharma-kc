import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Validate minimally — DB persistence is a future step.
  const { name, phone, palika, ward, cat, title, msg } = body as Record<string, string>;
  if (!name || !phone || !palika || !ward || !cat || !title || !msg) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  const id =
    "PB-2082-" +
    String(Math.floor(300 + Math.random() * 699)).padStart(4, "0");
  return NextResponse.json({ id });
}
