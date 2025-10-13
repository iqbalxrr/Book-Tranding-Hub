import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, image } = await req.json(); // 🔹 image include করলাম
    const db = await getDb();

    // Check existing user
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      image:
        image ||
        "https://i.ibb.co/F5nVJjR/default-avatar.png", // ✅ default profile image
      provider: "email",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
