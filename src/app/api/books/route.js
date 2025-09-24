
import getDb from "@/lib/db";
import { NextResponse } from "next/server";


// GET → all data fatch 
export async function GET() {
  try {
    const db = await getDb();
    const books = await db.collection("books").find({}).toArray();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}



// POST → add data
export async function POST(req) {
  try {
    const body = await req.json();
    // console.log(body);
    const db = await getDb();
    const result = await db.collection("books").insertOne(body);

    return NextResponse.json(
      { message: "Book added", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}



