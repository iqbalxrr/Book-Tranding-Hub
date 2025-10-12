
"use client";

import { useRouter } from "next/navigation";

import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { DB } from "@/lib/firebase";

export default function LiveChatButton({ bookId, bookOwnerId, currentUserId, bookTitle }) {
  const router = useRouter();

  const startChat = async () => {

    const chatId = [currentUserId, bookOwnerId].sort().join("_");

    // Check if chat already exists
    const chatRef = collection(DB, "chats");
    const q = query(chatRef, where("chatId", "==", chatId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Create chat room
      await addDoc(chatRef, {
        chatId,
        participants: [currentUserId, bookOwnerId],
        createdAt: serverTimestamp(),
        lastMessage: "",
      });
    }

    // Add notification for owner
    if (currentUserId !== bookOwnerId) {
      await addDoc(collection(db, "notifications"), {
        receiverId: bookOwnerId,
        senderId: currentUserId,
        type: "chat",
        chatId,
        message: `${currentUserId} started a chat with you about "${bookTitle}"`,
        createdAt: serverTimestamp(),
        seen: false,
      });
    }

    // Redirect to chat page
    router.push(`/dashboard/chat/${chatId}`);
  };

  return (
    <button
      onClick={startChat}
      className="rounded-full font-bold py-3 px-8 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-500"
    >
      💬 Live Chat
    </button>
  );
}
