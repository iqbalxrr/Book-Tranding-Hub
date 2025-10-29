
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import getDb from '@/lib/db';

export async function DELETE(request, { params }) {
    try {
        const { id } = params; // Get the bookmark ID from the URL parameter

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid bookmark ID" }, { status: 400 });
        }

        const db = await getDb()
        const collection = await db.collection('bookmarks')

        // Find and delete the bookmark using its unique MongoDB _id
        const result = await collection.deleteOne({ 
            _id: new ObjectId(id) 
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Bookmark not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Bookmark deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error('Error deleting bookmark:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
