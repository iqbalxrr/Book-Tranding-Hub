"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/admin/getContacts");
        const data = await res.json();
        if (data.success) {
          setMessages(data.contacts);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📩 All Messages
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-900">
                  {msg.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {msg.email}
              </p>
              <p className="text-gray-700 mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
