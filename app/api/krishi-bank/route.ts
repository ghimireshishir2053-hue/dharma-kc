import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendSms } from "@/lib/sms";
import type { ProduceId as PrismaProduceId } from "@prisma/client";

function genId() {
  return "KB-2082-" + String(Math.floor(600 + Math.random() * 399)).padStart(4, "0");
}

const PRODUCE_IDS = ["coffee", "orange", "ginger", "vegetable", "dairy", "honey", "cardamom", "potato", "maize", "other"];

function farmerMessage(qty: string, produce: string, palika: string, ward: string, price: string, phone: string) {
  return `[कृषि बैंक] ${qty} ${produce} लमजुङमा उपलब्ध (${palika}-${ward})। मूल्य: ${price || "मोलमोलाइ योग्य"}। किसानलाई सम्पर्क: ${phone}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { role, phone, produce } = body as Record<string, string>;

  if (!phone || !produce || !PRODUCE_IDS.includes(produce)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  try {
    if (role === "farmer") {
      const { name, palika, ward, qty, price, otherProduce } = body as Record<string, string>;
      if (!name || !palika || !ward || !qty) {
        return NextResponse.json({ error: "missing_fields" }, { status: 400 });
      }

      const refId = genId();
      const listing = await prisma.farmerListing.create({
        data: {
          refId, name, phone, palika,
          ward: Number(ward),
          produce: produce as PrismaProduceId,
          otherProduce: otherProduce || null,
          qty, price: price || null,
        },
      });

      // Notify every buyer registered with matching produce interest.
      const matches = await prisma.buyerRegistration.findMany({
        where: { produce: produce as PrismaProduceId },
      });

      for (const buyer of matches) {
        const text = farmerMessage(qty, otherProduce || produce, palika, ward, price ?? "", phone);
        const result = await sendSms(buyer.phone, text);
        await prisma.notification.create({
          data: {
            farmerListingId: listing.id,
            buyerId: buyer.id,
            status: result.ok ? "sent" : "failed",
            detail: result.detail,
          },
        });
      }

      return NextResponse.json({ id: refId, notified: matches.length });
    }

    if (role === "buyer") {
      const { business, city, qty, otherProduce } = body as Record<string, string>;
      if (!business || !city || !qty) {
        return NextResponse.json({ error: "missing_fields" }, { status: 400 });
      }

      const refId = genId();
      await prisma.buyerRegistration.create({
        data: {
          refId, business, phone, city,
          produce: produce as PrismaProduceId,
          otherProduce: otherProduce || null,
          qty,
        },
      });

      return NextResponse.json({ id: refId });
    }

    return NextResponse.json({ error: "invalid_role" }, { status: 400 });
  } catch (err) {
    console.error("[krishi-bank] error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
