
"use client";

import ChatWindow from "@/components/Live Chat/ChatWindow";
import { useParams } from "next/navigation";


// Example: replace with session user id
const currentUser = "karim";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId;

  return (
    <div className="p-6 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>

      <div className="flex-1">
        <ChatWindow chatId={chatId} currentUser={currentUser} />
      </div>
    </div>
  );
}
