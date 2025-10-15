import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(req) {
  try {
    const db = await getDb();

    // Example: Replace with real user session/email
    const email = "abdulalim243457@gmail.com";

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
