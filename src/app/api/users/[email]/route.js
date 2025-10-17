import { NextResponse } from "next/server";
import getDb from "@/lib/db"; 

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // DB connect
    const db = await getDb();

    // Save data
    const contact = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    };

    await db.collection("contacts").insertOne(contact);

    return NextResponse.json({
      success: true,
      message: "Message saved successfully!",
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save message", error: error.message },
      { status: 500 }
    );
  }
}
