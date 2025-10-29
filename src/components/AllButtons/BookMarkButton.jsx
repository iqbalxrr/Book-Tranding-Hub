"use client";

import React, { useState } from "react";
import { RiPokerHeartsLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const BookMarkButton = ({ book }) => {
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const email = user?.email;

  const handleBookmark = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to bookmark this book.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, book }),
      });

      const data = await res.json();

      if (data.success) {
        setAdded(true);

        // ✅ Sweet success alert
        Swal.fire({
          title: "Bookmarked!",
          text: "This book has been added to your bookmarks. 📚",
          icon: "success",
          confirmButtonText: "Great!",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        setAdded(true);
        // ⚠️ Sweet error alert
        Swal.fire({
          title: "Already Bookmarked",
          text: data.message || "This book is already in your bookmarks!",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error bookmarking:", error);
      // ❌ Sweet error alert
      Swal.fire({
        title: "Server Error",
        text: "Something went wrong! Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleBookmark}
        className={`w-12 h-12 flex justify-center items-center hover:text-[#FF7B6B] transition duration-500 rounded-full hover:bg-[#FFEFEF] border hover:border-[#FF7B6B] ${
          added ? "bg-[#FF7B6B] text-white" : "bg-white text-black"
        }`}
      >
        <RiPokerHeartsLine />
      </button>
    </div>
  );
};

export default BookMarkButton;
