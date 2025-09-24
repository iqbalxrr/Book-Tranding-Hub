import getDb from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET a single data fatch 
export async function GET(req, {params}) {
  try {
    const {id} = params
    console.log(id);
    const query = {_id: new ObjectId(id)}
    const db = await getDb();
    const book = await db.collection("books").findOne(query)
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}