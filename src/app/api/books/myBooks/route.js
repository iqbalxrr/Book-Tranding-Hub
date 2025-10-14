import getDb from "@/lib/db"
import { NextResponse } from "next/server"

export const GET =async(req,res)=>{

    const {searchParams} = new URL(req?.url)

    const bookOwner = searchParams?.get("email")
    
    const db = await getDb()
    const myBooks = await db.collection("books").find({bookOwner}).toArray()

    return NextResponse.json(myBooks)
}