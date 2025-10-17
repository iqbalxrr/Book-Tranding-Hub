import getDb from "@/lib/db"
import { NextResponse } from "next/server"

export const POST=async(req)=>{
    try{
        const donationData = await req?.json()
        const db = await getDb()
        const result = await db.collection("donationMoney").insertOne(donationData)

        return NextResponse.json(
              { message: "Book added successfully", insertedId: result.insertedId },
              { status: 201 }
            );
    }catch(error){
        console.error(error);
    return NextResponse.json({ error: "Failed to add donation data" }, { status: 500 });
    }
}