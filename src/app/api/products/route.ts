import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ensureSeed } from "@/lib/seed";

export async function GET() {
  await ensureSeed();
  const all = await db.select().from(products).orderBy(desc(products.id));
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, price, category, badge, platform } = body;
  if (!name || !description || !price) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const inserted = await db.insert(products).values({
    name, description, price: Number(price), category: category || "Followers", badge: badge || null, platform: platform || "facebook"
  }).returning();
  return NextResponse.json(inserted[0]);
}
