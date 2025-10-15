import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const PUT = async (req, { params }) => {
  try {
    const { id } = params
    const query = { _id: new ObjectId(id) }

    // Parse the incoming JSON body
    const bookData = await req.json()

    // Define the update document and options
    const updatedDoc = { $set: { ...bookData } }
    const options = { upsert: true }

    // Connect to database and perform update
    const db = await getDb()
    const updatedBook = await db
      .collection("books")
      .updateOne(query, updatedDoc, options)

    // Send successful response
    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    })
  } catch (error) {
    console.error("Update book error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
