import getDb from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (req, { params }) => {

    try {
        const { email } =await params

        const db = await getDb()
        const user = await db.collection("users").findOne({ email })

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user)

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
    
}