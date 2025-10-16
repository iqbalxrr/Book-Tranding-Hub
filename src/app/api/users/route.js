
import getDb from "@/lib/db";
import { NextResponse } from "next/server";

// GET → fetch user by email
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email"); // email query parameter

    const db = await getDb();
    let result;

    if (email) {
      // fetch specific user by email
      result = await db.collection("users").findOne({ email });
    } else {
      // fetch all users if email not provided
      result = await db.collection("users").find({}).toArray();
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

