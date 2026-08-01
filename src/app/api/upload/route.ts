import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
  // also allow webp for flexibility but spec says jpg png pdf - we allow jpg png pdf + jpeg
  if (!allowed.includes(file.type) && !file.type.includes("pdf") && !file.type.includes("jpeg") && !file.type.includes("png") && !file.type.includes("jpg")) {
    return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, PDF" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large max 8MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", "receipts");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  const url = `/uploads/receipts/${filename}`;
  return NextResponse.json({ url, filename: file.name, storedFilename: filename });
}
