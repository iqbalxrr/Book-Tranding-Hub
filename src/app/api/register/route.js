import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import bcrypt from "bcryptjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "@/lib/firebase";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const db = await getDb();

    // Already user exists?
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
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
