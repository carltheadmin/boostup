import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const updated = await db.update(products).set({
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: body.category,
    badge: body.badge || null,
    platform: body.platform,
    active: body.active,
  }).where(eq(products.id, Number(id))).returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(products).where(eq(products.id, Number(id)));
  return NextResponse.json({ ok: true });
}
