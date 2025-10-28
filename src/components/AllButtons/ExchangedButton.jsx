"use client";

import { useAuth } from "@/context/AuthContext";
import { addNotification } from "@/lib/addNotification";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ExchangedButton = ({ bookId, status: initialStatus, bookOwner }) => {
  const { user } = useAuth();
  const requestedUser = user?.email;
  const requestedUserName = user?.displayName;

  const [status, setStatus] = useState(initialStatus || "available");
  const [loading, setLoading] = useState(false);

  const handleExchange = async () => {
    if (!requestedUser) {
      Swal.fire({
        icon: "warning",
        title: "Please login!",
        text: "You need to login to request an exchange.",
        confirmButtonColor: "#FF7B6B",
      });
      return;
    }


    setLoading(true);

    try {
      const res = await fetch("/api/exchange", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, requestedUser, requestedUserName }),
      });

      const data = await res.json();

      if (data?.success) {
        setStatus("pending");
        Swal.fire({
          icon: "success",
          title: "Exchange Request Sent!",
          text: "Your exchange request has been sent successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        // notification function
        await addNotification(bookOwner, {
          type: "trade_request",
          text: `${requestedUserName || requestedUser} wants to exchange a book with you.`,
          url: `/dashboard/userPages/exchangeRequest`,
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.error || "Something went wrong.",
          confirmButtonColor: "#FF7B6B",
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Something went wrong with the server.",
        confirmButtonColor: "#FF7B6B",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExchange}
      disabled={status === "pending" || status === "exchanged"}
      className={`relative overflow-hidden rounded-full font-bold py-3 px-8 text-white transition duration-500 ease-in-out group
        ${status === "pending"
          ? "bg-gray-400 cursor-not-allowed"
          : status === "exchanged"
            ? "bg-green-500 cursor-not-allowed"
            : "bg-[#FF7B6B] hover:bg-[#ff5a4a]"
        }
      `}
    >
      <span className="relative z-10">
        {loading
          ? "Processing..."
          : status === "pending"
            ? "Pending"
            : status === "exchanged"
              ? "Exchanged"
              : "Exchange"}
      </span>

      {status === "available" && (
        <span className="absolute inset-0 group-hover:text-white bg-[#ff5a4a] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-full"></span>
      )}
    </button>
  );
};

export default ExchangedButton;
