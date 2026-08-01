import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { desc, ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  let allOrders;
  if (q) {
    allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    const filtered = allOrders.filter(o => 
      o.customerName.toLowerCase().includes(q.toLowerCase()) ||
      o.fbProfile.toLowerCase().includes(q.toLowerCase()) ||
      o.id.toString().includes(q)
    );
    allOrders = filtered;
  } else {
    allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  // fetch items for each order
  const result = [];
  for (const o of allOrders) {
    const items = await db.select().from(orderItems).where((await import("drizzle-orm")).eq(orderItems.orderId, o.id));
    result.push({ ...o, items });
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerName, fbProfile, email, notes, totalAmount, receiptUrl, receiptFilename, cart } = body;
  if (!customerName || !fbProfile || !receiptUrl || !cart || cart.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const inserted = await db.insert(orders).values({
    customerName,
    fbProfile,
    email: email || null,
    notes: notes || null,
    totalAmount: Number(totalAmount),
    receiptUrl,
    receiptFilename,
    status: "pending",
  }).returning();
  const order = inserted[0];
  for (const item of cart) {
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.id,
      productName: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    });
  }
  return NextResponse.json({ ok: true, orderId: order.id });
}
