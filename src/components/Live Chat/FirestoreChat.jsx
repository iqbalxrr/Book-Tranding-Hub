"use client";

import { useEffect, useRef, useState } from "react";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    doc,
} from "firebase/firestore";
import { DB } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { VscSend } from "react-icons/vsc";


export default function FirestoreChat({ recipientEmail }) {

    const { user } = useAuth()

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const autoScrollToTop = useRef()

    if (!recipientEmail) return <p>Select a user to chat with</p>;
    if (!user) return <p className="text-2xl font-bold text-red-500">Login first</p>;

    // Generate conversation ID
    const conversationId = [user?.email, recipientEmail].sort().join("_");

    // Fetch messages in real time
    useEffect(() => {
        const messagesRef = collection(DB, "conversations", conversationId, "messages");
        const q = query(messagesRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [conversationId]);

    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messagesRef = collection(DB, "conversations", conversationId, "messages");
        await addDoc(messagesRef, {
            text: newMessage,
            sender: user?.email,
            receiverEmail: recipientEmail,
            createdAt: serverTimestamp(),
        });

        setNewMessage("");
    };

    useEffect(() => {
        autoScrollToTop.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <div className="w-full rounded-lg">

            <div className="bg-gray-50 py-3  h-80 overflow-y-auto mb-4">
                {messages?.map((msg, i) => {
                    const isSender = msg.sender === user.email;
                    return (
                        <div key={i} className={`flex pl-2 ${isSender ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow mb-2.5 ${isSender
                                        ? "bg-green-500 text-white rounded-br-none"
                                        : "bg-gray-200 text-black rounded-bl-none"
                                    }`}
                            >
                                <span className="font-bold">{isSender ? "Me: " : `${recipientEmail.split("@")[0]}: `}</span>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={autoScrollToTop}></div>
            </div>

    
                <form onSubmit={handleSend} className="flex border w-full bottom-0">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1  rounded-lg p-2 border-none outline-none focus:ring-0 focus:border-none"
                    />
                    <button type="submit" className="pr-2.5">
                        <VscSend size={20} />
                    </button>
                </form>
          
        </div>
    );
}
