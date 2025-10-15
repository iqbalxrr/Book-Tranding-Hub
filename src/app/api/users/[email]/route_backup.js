import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(req, context) {
  try {
    // ✅ Next.js 15 এ params async context থেকে নিতে হয়
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);
    console.log("📡 Fetching user for:", decodedEmail);

    const db = await getDb();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: decodedEmail });

    if (!user) {
      console.log("❌ User not found:", decodedEmail);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("✅ User found:", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
