// /app/api/categories/route.js
import getDb from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET → Fetch all distinct book categories (aggregation version)
 */
export async function GET() {
  try {
    const db = await getDb();

    // Aggregation দিয়ে distinct categories
    const result = await db.collection("books").aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } },
    ]).toArray();

    // শুধু category names array
    const categories = result.map((r) => r.category);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
