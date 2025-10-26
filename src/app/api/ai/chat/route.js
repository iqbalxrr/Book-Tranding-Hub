import getDb from "@/lib/db";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");
      return NextResponse.json(
        { reply: "⚠️ AI Service Unavailable: GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const { message, history = [] } = await req.json();
    const db = await getDb();

    const trimmedMessage = message.trim();

    // --- 1. Skip very short greetings ---
    const greetings = ["hi", "hello", "hey", "how are you", "thanks", "good morning", "good evening"];
    if (greetings.includes(trimmedMessage.toLowerCase()) || trimmedMessage.split(" ").length <= 2) {
      // AI response for greetings
      const model = genAI.getGenerativeModel({ model: "models/gemini-flash-lite-latest" });
      const formattedHistory = history
        .filter(msg => msg.content && msg.content.trim().length > 0)
        .map(msg => ({ role: msg.role === "user" ? "user" : "model", parts: [{ text: msg.content }] }));
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(message);
      return NextResponse.json({ reply: result.response.text() });
    }

    // --- 2. Extract potential book/author name from sentence ---
    let query = trimmedMessage.toLowerCase();

    // Remove common filler words
    const commonWords = ["is", "this", "that", "book", "available", "find", "please", "can", "you", "the"];
    commonWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      query = query.replace(regex, " ");
    });

    // Remove punctuation
    query = query.replace(/[.,!?;:]/g, " ");
    query = query.replace(/\s+/g, " ").trim();

    // --- 3. Search DB if cleaned query has content ---
    if (query) {
      const book = await db.collection("books").findOne({
        $or: [
          { bookName: { $regex: `^${query}$`, $options: "i" } },  // exact book name
          { authorName: { $regex: `^${query}$`, $options: "i" } } // exact author name
        ],
      });

      if (book) {
        return NextResponse.json({
          reply: `✅ The book **"${book.bookName}"** is available.\nAuthor: **${book.authorName}**`
        });
      }
    }

    // --- 4. Fallback AI response ---
    const model = genAI.getGenerativeModel({ model: "models/gemini-flash-lite-latest" });
    const formattedHistory = history
      .filter(msg => msg.content && msg.content.trim().length > 0)
      .map(msg => ({ role: msg.role === "user" ? "user" : "model", parts: [{ text: msg.content }] }));
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);

    return NextResponse.json({ reply: result.response.text() });

  } catch (err) {
    console.error("Gemini API Error details:", err);
    return NextResponse.json(
      { reply: "⚠️ Server Error (Check console for network issues)" },
      { status: 500 }
    );
  }
}
