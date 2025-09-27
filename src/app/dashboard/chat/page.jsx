
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Example current user
const currentUser = "karim";

export default function ChatInbox() {
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userChats = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((chat) => chat.participants.includes(currentUser))
        .sort((a, b) => b.lastMessageAt?.toMillis() - a.lastMessageAt?.toMillis());
      setChats(userChats);
    });

    return () => unsubscribe();
  }, []);

  const goToChat = (chatId) => {
    router.push(`/dashboard/chat/${chatId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats.length === 0 && <p>No chats yet</p>}
      <ul className="space-y-3">
        {chats.map((chat) => {
          const otherUser = chat.participants.find((p) => p !== currentUser);
          return (
            <li
              key={chat.id}
              onClick={() => goToChat(chat.id)}
              className="cursor-pointer p-3 border rounded-lg hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{otherUser}</span>
              <span className="text-sm text-gray-500">
                {chat.lastMessage?.substring(0, 30) || "No messages yet"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
