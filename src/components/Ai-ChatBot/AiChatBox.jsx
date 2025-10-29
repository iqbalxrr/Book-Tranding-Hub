"use client";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true); // Tooltip visible initially

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: newChat }),
      });

      const data = await res.json();
      setChat([...newChat, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setChat([...newChat, { role: "assistant", content: "Oops! Something went wrong." }]);
    }
  };

  const handleButtonClick = () => {
    setOpen(!open);
    setShowTooltip(false); // Hide tooltip when button clicked
  };

  return (
    <>
      {/* Floating Button with Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        {/* Tooltip */}
        {showTooltip && (
          <div className="mb-2 px-3 py-1 rounded-2xl bg-[#f59191] text-white text-sm shadow-lg">
            Help with AI
          </div>
        )}
        {showTooltip && (
          <div className="mb-2 px-3 py-1 rounded-2xl bg-[#f59191] text-white text-sm shadow-lg">
            Find book recommendations!
          </div>
        )}
        {showTooltip && (
          <div className="mb-2 px-3 py-1 rounded-2xl bg-[#f59191] text-white text-sm shadow-lg">
            Ask me anything!
          </div>
        )}

        <button
          onClick={handleButtonClick}
          className="bg-[#eb6565] hover:bg-[#d64b4b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105"
        >
          <FaRobot className="w-7 h-7" />
        </button>
      </div>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 z-50 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#ee9292] text-white p-3 font-semibold flex justify-between items-center">
            <span>BookMate AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white text-lg">×</button>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-3 bg-[#FFEFEF] flex flex-col">
            {chat.map((msg, i) => (
              <p
                key={i}
                className={`my-1 p-2 rounded ${
                  msg.role === "user"
                    ? "self-end bg-gray-100 text-blue-600"
                    : "self-start bg-[#f7f7f7] text-green-700"
                }`}
              >
                {msg.content}
              </p>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-[#FFEFEF] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="border p-2 flex-1 bg-gray-50 rounded "
            />
            <button
              onClick={sendMessage}
              className="bg-[#ee7979] text-white px-4 rounded hover:bg-[#d66c6c] transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
