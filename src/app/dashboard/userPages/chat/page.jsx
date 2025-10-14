'use client'

import { useRouter } from 'next/navigation'
import { FaCircleUser } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { DB } from '@/lib/firebase';
import FirestoreChat from '@/components/Live Chat/FirestoreChat';

export default function page() {

  const { user } = useAuth()
  const router = useRouter()

  // console.log(user);
  const [users, setUsers] = useState()
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);

        // ✅ Fetch each user's last message
        data?.forEach((U) => {
          if (U?.email === user?.email) return;

          const conversationId = [user?.email, U?.email].sort().join("_");
          const messagesRef = collection(DB, "conversations", conversationId, "messages");
          const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));

          onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              const msg = snapshot?.docs[0].data();
              setLastMessages((prev) => ({
                ...prev,
                [U?.email]: {
                  text: msg?.text,
                  createdAt: msg?.createdAt?.toDate()
                    ? msg.createdAt.toDate()
                    : null,
                },
              }));
            }
          });
        });

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user?.email]);

  // console.log(lastMessages);

  const goToPrivateChat = (email) => {
    router.push(`/dashboard/userPages/chat/${email}`)
  }

  return (
    <div className="flex h-screen">
      {/* Left: users list */}
      <div className="w-full md:w-2/5 border-r p-2 overflow-y-auto">
        <h2 className="text-xl font-bold mb-3"></h2>
        {users?.map((U) => {

          const lastMsg = lastMessages[U?.email];
          const truncatedText =
            lastMsg?.text?.length > 35
              ? lastMsg.text.slice(0, 35) + "..."
              : lastMsg?.text || "No messages yet";

          const formattedDate = lastMsg?.createdAt
            ? lastMsg.createdAt.toLocaleDateString("en-GB") 
            : "";

          return (

            <div
              key={U?.email}
              onClick={() => goToPrivateChat(U?.email)}
              className={`p-2 rounded-md mb-1 cursor-pointer bg-white `}
            >
              <div className='flex items-center relative gap-2 '>
                {U?.image ?
                  <img className='w-8 h-8 rounded-full border-1' src={U?.image} alt="userPhoto" />
                  :
                  <FaCircleUser size={33} />
                }
                <div className=''>
                  <p className="font-medium">{U?.name || U?.email}</p>
                  <p className='text-sm'>{truncatedText}</p>
                </div>

                <p className='absolute top-1 right-0 text-sm'>{formattedDate}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right: chat box */}
      <div className="md:w-3/5 hidden md:block">
      <div className='w-full h-full flex justify-center items-center'>
        <p className="text-gray-500 md:text-2xl lg:text-3xl">Select a user to start chatting</p>
      </div>
      </div>
    </div>
  )
}
