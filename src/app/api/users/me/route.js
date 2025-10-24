import { NextResponse } from "next/server";
import getDb from "@/lib/db"; // your DB helper

export async function GET(req) {
  try {
    // Example: get user ID from query, JWT, or session
    const userId = "admin123"; // replace with real session/auth

    const user = await getDb()
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive info before sending
    const { password, ...userData } = user;

    return NextResponse.json(userData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
