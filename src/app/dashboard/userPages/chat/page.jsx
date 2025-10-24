"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { DB } from '@/lib/firebase';
import { MessageSquare, User, Clock, Loader2, Send } from 'lucide-react';
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';
import LoadingSpinner from "@/components/Loading/loadingSpinner";

// Helper function for date formatting
const formatTimestamp = (date) => {
  if (!date) return "";
  if (isToday(date)) return format(date, 'h:mm a');
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'dd/MM/yy');
};

export default function ChatListPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const otherUsers = data?.filter(u => u?.email !== user?.email) || [];
        setUsers(otherUsers);

        if (otherUsers.length === 0) {
          setLoading(false);
          return;
        }

        // --- Realtime listener for the last message of each conversation ---
        otherUsers.forEach((U) => {
          const conversationId = [user?.email, U?.email].sort().join("_");
          const messagesRef = collection(DB, "conversations", conversationId, "messages");
          const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));

          const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              const msg = snapshot?.docs[0].data();
              const timestamp = msg?.createdAt?.toDate() || null;

              setLastMessages((prev) => ({
                ...prev,
                [U?.email]: {
                  text: msg?.text,
                  createdAt: timestamp,
                },
              }));
            }
          });
          // Cleanup function for the listener
          return () => unsubscribe();
        });

      } catch (error) {
        console.error("Error fetching users or messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUsers();
    }
  }, [user?.email]);

  const goToPrivateChat = (email) => {
    router.push(`/dashboard/userPages/chat/${email}`);
  };

  return (
    <div className="flex min-h-[95vh] w-full bg-gray-100 border-t border-gray-200  ">
      {/* Left Pane: Users List (Always visible on mobile, takes 1/3 on desktop) */}
      <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col rounded-br-2xl bg-white ">
        <h2 className="text-2xl font-bold text-gray-800 p-5 border-b border-gray-100 flex items-center">
          <MessageSquare className="w-6 h-6 mr-3 text-indigo-500" /> Chats
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <LoadingSpinner />
          </div>
        ) : users.length === 0 ? (
          <div className="p-5 text-center text-gray-500">
            No other users available to chat with.
          </div>
        ) : (
          <div className="overflow-y-auto flex-grow p-2">
            {users?.map((U) => {
              const lastMsg = lastMessages[U?.email];
              const truncatedText =
                lastMsg?.text?.length > 30
                  ? lastMsg.text.slice(0, 30) + "..."
                  : lastMsg?.text || "Start a new conversation";

              const isNewMessage = lastMsg && lastMsg.text !== "Start a new conversation" && !lastMsg.readBy?.includes(user?.email); // Assuming a 'readBy' field exists

              return (
                <div
                  key={U?.email}
                  onClick={() => goToPrivateChat(U?.email)}
                  className={`flex items-center p-4 rounded-xl mb-2 cursor-pointer transition duration-200 
                  ${isNewMessage ? 'bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-gray-100 bg-white'}`}
                >
                  {/* User Avatar */}
                  {U?.image ? (
                    <img className='w-12 h-12 rounded-full object-cover border-2 border-indigo-200 flex-shrink-0' src={U?.image} alt="userPhoto" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}

                  {/* Message Info */}
                  <div className="ml-3 flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <p className={`font-semibold text-gray-800 truncate ${isNewMessage ? 'text-indigo-700' : ''}`}>{U?.name || U?.email}</p>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatTimestamp(lastMsg?.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm mt-0.5 truncate ${isNewMessage ? 'font-medium text-indigo-600' : 'text-gray-500'}`}>
                      {truncatedText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Pane: Empty Chat Box (Hidden on mobile) */}
      <div className="hidden md:flex md:w-2/3 items-center justify-center p-8 bg-gray-100">
        <div className="text-center text-gray-400">
          <Send className="w-16 h-16 mx-auto mb-4 transform -rotate-45 text-indigo-300" />
          <p className="text-xl lg:text-2xl font-semibold">
            Select a contact to view your messages
          </p>
          <p className="mt-2 text-sm">
            Messages will appear here once you start a conversation.
          </p>
        </div>
      </div>
    </div>
  );
}