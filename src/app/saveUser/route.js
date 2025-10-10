import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, image, provider } = await req.json();
    const db = await getDb();

    // Already user exists?
    const existing = await db.collection("users").findOne({ email });
    if (!existing) {
      await db.collection("users").insertOne({
        name,
        email,
        image,
        provider,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("❌ SaveUser API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
