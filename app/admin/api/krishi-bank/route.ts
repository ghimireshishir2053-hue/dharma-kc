import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin/auth";

export async function GET(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const [farmers, buyers] = await Promise.all([
      prisma.farmerListing.findMany({
        orderBy: { createdAt: "desc" },
        include: { notifications: true },
      }),
      prisma.buyerRegistration.findMany({
        orderBy: { createdAt: "desc" },
        include: { notifications: true },
      }),
    ]);

    return NextResponse.json({
      farmers: farmers.map((f) => ({
        id: f.id, refId: f.refId, name: f.name, phone: f.phone, palika: f.palika, ward: f.ward,
        produce: f.produce, otherProduce: f.otherProduce, qty: f.qty, price: f.price, createdAt: f.createdAt,
        notifiedCount: f.notifications.length,
        notifiedSent: f.notifications.filter((n) => n.status === "sent").length,
      })),
      buyers: buyers.map((b) => ({
        id: b.id, refId: b.refId, business: b.business, phone: b.phone, city: b.city,
        produce: b.produce, otherProduce: b.otherProduce, qty: b.qty, createdAt: b.createdAt,
        notifiedCount: b.notifications.length,
        notifiedSent: b.notifications.filter((n) => n.status === "sent").length,
      })),
    });
  } catch (err) {
    console.error("[admin/krishi-bank] GET error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminFromRequest(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const refId = searchParams.get("refId");
  if (!refId || (type !== "farmer" && type !== "buyer")) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    if (type === "farmer") {
      const row = await prisma.farmerListing.findUnique({ where: { refId } });
      if (row) {
        await prisma.notification.deleteMany({ where: { farmerListingId: row.id } });
        await prisma.farmerListing.delete({ where: { refId } });
      }
    } else {
      const row = await prisma.buyerRegistration.findUnique({ where: { refId } });
      if (row) {
        await prisma.notification.deleteMany({ where: { buyerId: row.id } });
        await prisma.buyerRegistration.delete({ where: { refId } });
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/krishi-bank] DELETE error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
