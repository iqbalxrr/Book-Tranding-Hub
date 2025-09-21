
import { NextResponse } from "next/server";
import getDb from "@/lib/db";

// GET → all reviews fetch or by user email
export async function GET(req) {
  try {
    const db = await getDb();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");   // ?email=someone@example.com

    const query = email ? { userEmail: email } : {};
    const reviews = await db.collection("reviews").find(query).toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST → add review
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.user || !body.userEmail || !body.bookId || !body.comment) {
      return NextResponse.json(
        { error: "User, UserEmail, BookId, and Comment are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("reviews").insertOne({
      user: body.user,
      userEmail: body.userEmail,  // email of the user
      bookId: body.bookId,
      comment: body.comment,
      rating: body.rating || null,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Review added", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}
