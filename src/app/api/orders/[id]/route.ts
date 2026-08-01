import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;
  if (!status) return NextResponse.json({ error: "status required" }, { status: 400 });
  const updated = await db.update(orders).set({ status }).where(eq(orders.id, Number(id))).returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(orders).where(eq(orders.id, Number(id)));
  return NextResponse.json({ ok: true });
}
