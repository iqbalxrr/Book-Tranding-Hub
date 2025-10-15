import getDb from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Parse the query parameter
    const { searchParams } = new URL(req.url);
    const bookOwner = searchParams.get("email");

    if (!bookOwner) {
      return NextResponse.json(
        { message: "Email query parameter is required." },
        { status: 400 }
      );
    }

    // Connect to DB
    const db = await getDb();

    // Fetch user's books
    const myBooks = await db
      .collection("books")
      .find({ bookOwner })
      .toArray();

    // Return results
    return NextResponse.json(myBooks, { status: 200 });
  } catch (error) {
    // console.error("Error fetching user books:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
