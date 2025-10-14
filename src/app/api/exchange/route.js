
import getDb from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req) {
  try {
    const { bookId, requestedUser , requestedUserName } = await req.json();

    if (!bookId || !requestedUser) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const booksCollection = db.collection("books"); 

    const { ObjectId } = require("mongodb");
    const filter = { _id: new ObjectId(bookId) };

    const updateDoc = {
      $set: {
        status: "pending",
        requestedUser: requestedUser,
        requestedUserName: requestedUserName,
      },
    };

    const result = await booksCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Exchange request sent successfully",
    });
  } catch (error) {
    console.error("Exchange API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
