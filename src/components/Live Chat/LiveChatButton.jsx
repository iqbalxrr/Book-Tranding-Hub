
"use client";

import { useRouter } from "next/navigation";

export default function LiveChatButton({  bookData }) {
  console.log(bookData);

  const {bookOwner, _id, bookImage, bookName} = bookData || {}

  const router = useRouter();

  const startChat =()=>{
    //  Redirect to bookOwner chat page
    const bookInfo = {
      path: `/books/${_id}`,
      image: bookImage,
      name: bookName
    }
    // const bookPath = `/books/${_id}`
    localStorage.setItem(`chatWith_${bookOwner}`, JSON.stringify(bookInfo))
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
