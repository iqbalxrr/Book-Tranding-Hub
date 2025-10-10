import getDb from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET — Get all reviews for a book
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json({ message: "Book ID required" }, { status: 400 });
    }

    // ✅ Database connect
    const db = await getDb();
    const reviews = await db
      .collection("reviews")
      .find({ bookId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ POST — Add a new review
export async function POST(req) {
  try {
    const body = await req.json();
    const { bookId, user, reviewText, rating } = body;

    if (!bookId || !reviewText) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // ✅ Database connect
    const db = await getDb();

    const review = {
      bookId,
      user,
      reviewText,
      rating: parseInt(rating),
      createdAt: new Date(),
    };

    const result = await db.collection("reviews").insertOne(review);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
