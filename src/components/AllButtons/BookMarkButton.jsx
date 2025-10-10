"use client";

import React, { useState } from "react";
import { RiPokerHeartsLine } from "react-icons/ri";
import toast from "react-hot-toast";

const BookMarkButton = ({ book }) => {

    const [added, setAdded] = useState(false);

    const email = "iamekbal75@gmail.com"

  const handleBookmark = async () => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, book }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Bookmarked successfully! 📚");
        setAdded(true);
      } else {
        toast.error(data.message || "Something went wrong!");
        setAdded(true);
      }
    } catch (error) {
      console.error("Error bookmarking:", error);
      toast.error("Server error! Try again later.");
    }
  };

  return (
    <div>
      <button
        onClick={handleBookmark}
        className={`w-12 h-12 flex justify-center items-center  hover:text-[#FF7B6B] transition duration-500 rounded-full  hover:bg-[#FFEFEF] border hover:border-[#FF7B6B] ${ added ? 'bg-[#FF7B6B] text-white': 'bg-white text-black' }`}
      >
        <RiPokerHeartsLine />
      </button>
    </div>
  );
};

export default BookMarkButton;
