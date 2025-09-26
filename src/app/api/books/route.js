// /app/api/books/route.js
import getDb from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET → Fetch books with pagination, search, and category filter
 */
export async function GET(request) {
  try {
    const db = await getDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    // Build filter object
    const filter = {};
    if (search) {
      filter.$or = [
        { bookName: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      filter.category = category;
    }

    // Total filtered books count
    const totalBooks = await db.collection("books").countDocuments(filter);

    // Fetch books with pagination
    const books = await db
      .collection("books")
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

/**
 * POST → Add new book
 */
export async function POST(req) {
  try {
    const body = await req.json(); // expect body to have full book data
    const db = await getDb();

    const result = await db.collection("books").insertOne(body);

    return NextResponse.json(
      { message: "Book added successfully", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}
