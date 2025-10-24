// src/app/api/admin/deleteUser/route.js
import getDb from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    const db = await getDb();
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
