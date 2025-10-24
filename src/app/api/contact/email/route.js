import { NextResponse } from "next/server";
import getDb from "@/lib/db"; // 🔹 তুমি যেভাবে অন্য route এ use করো সেভাবেই
import { sendEmail } from "@/lib/email";

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

    // Send notification email (best-effort)
    try {
      const adminTo = process.env.CONTACT_NOTIFY_TO || process.env.SMTP_USER;
      if (adminTo) {
        await sendEmail({
          to: adminTo,
          subject: `New contact message: ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
          html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Subject:</strong> ${subject}</p><p>${message}</p>`,
        });
      }
    } catch (err) {
      console.warn("Contact email send failed (continuing):", err?.message || err);
    }

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
