
import getDb from "@/lib/db";
import { NextResponse } from "next/server";


// POST => Save bookmark
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, book } = body;


    if (!email || !book) {
      return NextResponse.json({ message: "Email and book required" }, { status: 400 });
    }

    const db = await getDb();
    const collection =await db.collection("bookmarks");

    // Duplicate check
    const exist = await collection.findOne({ "book._id": book._id, email });
    if (exist) {
      return NextResponse.json({ message: "Already bookmarked" }, { status: 400 });
    }

    const result = await collection.insertOne({ email, book, createdAt: new Date(), seen: false});

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error saving bookmark:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET => Get bookmarks by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection("bookmarks");

    const bookmarks = await collection.find({ email }).sort({createdAt: -1}).toArray();

    return NextResponse.json({ success: true, data: bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
