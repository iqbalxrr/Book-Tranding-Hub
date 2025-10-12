
"use client";

import { useRouter } from "next/navigation";

export default function LiveChatButton({ bookOwner }) {
  const router = useRouter();

  const startChat =()=>{
    //  Redirect to bookOwner chat page
    router.push(`/dashboard/userPages/chat/${bookOwner}`);
  }

  return (
    <button
      onClick={startChat}
      className="rounded-full font-bold py-3 px-8 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-500"
    >
      💬 Live Chat
    </button>
  );
}
