import { PLACES } from "@/content/places";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ palika: string }> }) {
  const { palika } = await params;
  const place = PLACES[palika as keyof typeof PLACES];

  if (!place) {
    return Response.json({ error: "Place not found" }, { status: 404 });
  }

  return Response.json(place);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ palika: string }> }) {
  try {
    const { palika } = await params;
    const data = await req.json();

    // In a production app, save to a database
    // For now, this is a placeholder

    console.log(`Updated place for ${palika}:`, data);

    return Response.json({ message: "Place updated successfully", palika });
  } catch (error) {
    return Response.json({ error: "Failed to update place" }, { status: 500 });
  }
}
