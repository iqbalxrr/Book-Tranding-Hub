"use client";

import { useEffect, useRef, useState } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    Timestamp,
} from "firebase/firestore";
import { DB } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Send, Clock } from "lucide-react";
import ChatNavbar from "./ChatNavbar"; // Assuming this handles the recipient info
import { format } from "date-fns";


// Helper function to format timestamp
const formatMessageTime = (timestamp) => {
    if (timestamp instanceof Timestamp) {
        return format(timestamp.toDate(), 'h:mm a');
    }
    return '';
};


export default function ChatWindow({ recipientEmail }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [recipient, setRecipient] = useState({});
    const messagesEndRef = useRef(null);

    // Generate conversation ID
    const conversationId = [user?.email, recipientEmail].sort().join("_");

    // Fetch messages in real time
    useEffect(() => {
        const messagesRef = collection(DB, "conversations", conversationId, "messages");
        const q = query(messagesRef, orderBy("createdAt"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ 
                id: doc.id, 
                ...doc.data() 
            })));
        }, (error) => {
            console.error("Error listening to messages:", error);
            // Optionally, show a user-friendly error message here
        });

        return () => unsubscribe();
    }, [conversationId]);

    // Fetch the recipient data for header
    useEffect(() => {
        const fetchRecipient = async () => {
            try {
                const res = await fetch(`/api/users/${recipientEmail}`);
                const data = await res.json();
                setRecipient(data);
            } catch (error) {
                console.error("Error fetching recipient data:", error);
            }
        };
        fetchRecipient();
    }, [recipientEmail]);


    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        const textToSend = newMessage.trim();
        if (!textToSend) return;

        const messagesRef = collection(DB, "conversations", conversationId, "messages");
        try {
            await addDoc(messagesRef, {
                text: textToSend,
                sender: user?.email,
                receiverEmail: recipientEmail,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setNewMessage("");
    };

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="flex flex-col min-h-[88vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Chat Header (Assuming ChatNavbar is a styled component) */}
            <ChatNavbar recipientData={recipient} />

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-gray-50 border-t border-gray-200">
                {messages?.map((msg) => {
                    const isSender = msg?.sender === user?.email;
                    const timeString = formatMessageTime(msg.createdAt);
                    
                    return (
                        <div 
                            key={msg.id} 
                            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex flex-col max-w-xs md:max-w-md lg:max-w-lg`}>
                                {/* Message Bubble */}
                                <div
                                    className={`px-4 py-2.5 rounded-xl text-base shadow-md break-words ${
                                        isSender
                                            ? "bg-indigo-600 text-white rounded-br-sm ml-auto"
                                            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100 mr-auto"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                
                                {/* Timestamp */}
                                <div className={`mt-1 text-xs text-gray-400 flex items-center ${isSender ? "justify-end" : "justify-start"}`}>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {timeString}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Scroll Anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white flex items-center space-x-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
                    disabled={!user}
                />
                <button 
                    type="submit" 
                    disabled={!newMessage.trim() || !user}
                    className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
