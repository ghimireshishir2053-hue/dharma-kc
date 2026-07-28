import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";
import { MUNICIPALITIES } from "@/content/municipalities";

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const [
      projects, events, videos, places,
      grievances, grievancesNew,
      projectRequests, projectRequestsNew,
      diasporaMembers, diasporaNew,
      farmerListings, buyerRegistrations,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.event.count(),
      prisma.video.count(),
      prisma.palikaProfile.count(),
      prisma.grievance.count(),
      prisma.grievance.count({ where: { status: "new" } }),
      prisma.projectRequest.count(),
      prisma.projectRequest.count({ where: { status: "new" } }),
      prisma.diasporaMember.count(),
      prisma.diasporaMember.count({ where: { status: "new" } }),
      prisma.farmerListing.count(),
      prisma.buyerRegistration.count(),
    ]);

    return NextResponse.json({
      projects, events, videos,
      places: { entered: places, total: MUNICIPALITIES.length },
      grievances: { total: grievances, new: grievancesNew },
      projectRequests: { total: projectRequests, new: projectRequestsNew },
      diasporaMembers: { total: diasporaMembers, new: diasporaNew },
      krishiBank: { total: farmerListings + buyerRegistrations },
    });
  } catch (err) {
    console.error("[admin/stats] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
