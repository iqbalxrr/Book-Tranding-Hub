import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // এখানে আপনার email sending / OTP logic হবে
    console.log("📩 Password reset request for:", email);

    return NextResponse.json({ message: "Reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
