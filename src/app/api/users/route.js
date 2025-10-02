
import getDb from "@/lib/db";
import { NextResponse } from "next/server";


// GET → all users fetch
export async function GET() {
  try {
    const db = await getDb();
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST → add user
export async function POST(req) {
  try {
    const body = await req.json();

    // simple validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("users").insertOne(body);

    return NextResponse.json(
      { message: "User created", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
