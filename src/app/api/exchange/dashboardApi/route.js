
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getDb from "@/lib/db";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookOwner = searchParams.get("bookOwner");

    if (!bookOwner) {
      return NextResponse.json({ error: "bookOwner query missing" }, { status: 400 });
    }

    const db = await getDb();
    const books = await db
      .collection("books")
      .find({ bookOwner , status: { $in: ["pending", "exchanged"] } }) 
      .toArray();

    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { bookId, newStatus } = await req.json();

    if (!bookId || !newStatus) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();
    const booksCollection = db.collection("books");

    const result = await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { status: newStatus } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Book status updated" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
