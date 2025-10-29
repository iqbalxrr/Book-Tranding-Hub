import getDb from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET → Fetch books (newest first) with pagination, search & category filter
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

    // 🔍 Build dynamic filter
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

    // 📊 Count total matching books
    const totalBooks = await db.collection("books").countDocuments(filter);

    // 📚 Fetch books (sorted newest first)
    const books = await db
      .collection("books")
      .find(filter)
      .sort({ _id: -1 }) // ✅ newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      currentPage: page,
    });
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

/**
 * POST → Add a new book (auto add timestamp)
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDb();

    // ✅ Add timestamp
    const newBook = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection("books").insertOne(newBook);

    return NextResponse.json(
      {
        message: "✅ Book added successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding book:", error);
    return NextResponse.json(
      { error: "Failed to add book" },
      { status: 500 }
    );
  }
}
