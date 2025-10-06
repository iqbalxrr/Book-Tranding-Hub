import getDb from "@/lib/db";

export async function POST(req) {
  try {
    const { uid, name, email, provider } = await req.json();
    const db = await getDb();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ uid });
    if (existingUser) {
      await usersCollection.updateOne({ uid }, { $set: { name, email } });
      return new Response(JSON.stringify({ message: "User updated" }), { status: 200 });
    }

    const result = await usersCollection.insertOne({ uid, name, email, provider, createdAt: new Date() });
    return new Response(JSON.stringify({ message: "User added", result }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
