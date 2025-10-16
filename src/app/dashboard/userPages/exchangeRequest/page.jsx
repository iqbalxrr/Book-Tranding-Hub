"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loader2, BookOpenCheck, RotateCcw, User, Mail, Book } from "lucide-react"; // Import new icons

// Helper function for status badge styling
const getStatusBadge = (status) => {
  const baseStyle = "px-3 py-1 text-xs font-medium rounded-full";
  switch (status) {
    case "exchanged":
      return (
        <span className={`${baseStyle} bg-green-100 text-green-700`}>
          <BookOpenCheck className="inline w-3 h-3 mr-1" /> Accepted
        </span>
      );
    case "requested":
    default:
      return (
        <span className={`${baseStyle} bg-blue-100 text-blue-700`}>
          <RotateCcw className="inline w-3 h-3 mr-1" /> Pending
        </span>
      );
  }
};

export default function ExchangeRequests() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load books from API
  const fetchBooks = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/exchange/dashboardApi?bookOwner=${user?.email}`);
      const data = await res.json();
      if (data?.success) {
        setBooks(data?.data || []);
      } else {
        console.error("Error:", data?.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user?.email]);

  // Update status
  const updateStatus = async (bookId, newStatus) => {
    try {
      const res = await fetch("/api/exchange/dashboardApi", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, newStatus }),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error occurred!", "error");
    }
  };

  // Accept Handler
  const handleAccept = async (bookId) => {
    const result = await updateStatus(bookId, "exchanged");

    if (result?.success) {
      // Update UI instantly
      setBooks((prev) =>
        prev.map((book) =>
          book._id === bookId ? { ...book, status: "exchanged" } : book
        )
      );

      Swal.fire({
        icon: "success",
        title: "Exchange Accepted! 🎉",
        text: "The exchange is now marked as completed.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Failed!", result?.error || "Something went wrong.", "error");
    }
  };

  // Reject Handler
  const handleReject = async (bookId) => {
    const confirm = await Swal.fire({
      title: "Confirm Rejection?",
      text: "This will set the book back to 'available' and remove the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Red 500
      cancelButtonColor: "#3B82F6", // Blue 500
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      const result = await updateStatus(bookId, "available");

      if (result?.success) {
        // Remove rejected book from UI
        setBooks((prev) => prev.filter((book) => book._id !== bookId));

        Swal.fire("Rejected!", "The request has been rejected.", "success");
      } else {
        Swal.fire("Failed!", result?.error || "Something went wrong.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-600">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <BookOpenCheck className="w-7 h-7 mr-3 text-indigo-500" /> Exchange Requests
        <span className="ml-3 text-sm font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
          {books.length} Total
        </span>
      </h2>

      {books?.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 text-center">
          <p className="text-xl text-gray-500 font-medium">
            No exchange requests are currently pending for your books.
          </p>
          <p className="text-gray-400 mt-2">Time to share some book love! 📚</p>
        </div>
      ) : (
        <>
          {/* Desktop Table (for md and up) */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
            <table className="min-w-full text-sm text-center text-gray-600 divide-y divide-gray-200">
              <thead className="bg-gray-50 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-3">Book Details</th>
                  <th className="px-6 py-3">Requested By</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-indigo-50/50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 mx-auto flex items-center">
                      <img
                        src={book.bookImage || "https://via.placeholder.com/60x80?text=Book"}
                        alt={book.bookName}
                        className="w-12 h-16 object-cover rounded-md shadow-sm mr-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 line-clamp-1">{book.bookName}</div>
                        <div className="text-xs text-gray-500">By: {book.authorName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-indigo-400" />
                        <span className="font-medium text-gray-700">{book.requestedUserName || "User"}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Mail className="w-3 h-3 mr-2" />
                        <span>{book.requestedUser || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(book.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {book.status === "exchanged" ? (
                        <span className="text-green-600 font-medium flex items-center justify-center">
                          <BookOpenCheck className="w-5 h-5 mr-1" /> Completed
                        </span>
                      ) : (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleAccept(book._id)}
                            className="text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-all duration-300 font-medium rounded-full text-sm px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(book._id)}
                            className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 font-medium rounded-full text-sm px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout (for sm and below) */}
          <div className="grid gap-4 md:hidden">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 transition hover:shadow-xl"
              >
                <div className="flex items-start mb-4">
                  <img
                    src={book.bookImage || "https://via.placeholder.com/60x80?text=Book"}
                    alt={book.bookName}
                    className="w-16 h-20 object-cover rounded-lg shadow-md mr-4 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-lg text-gray-800 line-clamp-2">
                      {book.bookName}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      <Book className="inline w-3 h-3 mr-1" /> By: {book.authorName}
                    </p>
                    <div className="mt-2">{getStatusBadge(book.status)}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm font-semibold text-gray-700">Requested By:</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <User className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>{book.requestedUserName || "User"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{book.requestedUser || "N/A"}</span>
                  </div>
                </div>

                <div className="flex justify-around gap-2 mt-4 pt-4 border-t border-gray-100">
                  {book.status === "exchanged" ? (
                    <span className="text-green-600 font-medium w-full text-center">
                      <BookOpenCheck className="inline w-5 h-5 mr-1" /> Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleAccept(book._id)}
                        className="w-1/2 text-white bg-green-500 hover:bg-green-600 py-2 rounded-lg text-sm font-medium transition duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(book._id)}
                        className="w-1/2 text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg text-sm font-medium transition duration-200"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}