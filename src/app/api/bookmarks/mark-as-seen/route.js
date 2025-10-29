
import getDb from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const db = await getDb()
        const collection =await db.collection('bookmarks'); 

        // Update all bookmarks belonging to the user where seen: false
        const result = await collection.updateMany(
            { email: email, seen: false }, // Filter: match user and unseen bookmarks
            { $set: { seen: true } }       // Update: set seen to true
        );

        return NextResponse.json(
            { 
                message: "Bookmarks marked as seen", 
                modifiedCount: result?.modifiedCount 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('Error marking bookmarks as seen:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}