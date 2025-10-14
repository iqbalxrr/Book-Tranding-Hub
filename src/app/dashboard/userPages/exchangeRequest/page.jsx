"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

      console.log("Fetched exchange requests:", data);

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
        title: "Exchange Accepted!",
        text: "You have successfully accepted this book exchange.",
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
      title: "Are you sure?",
      text: "Do you really want to reject this exchange request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
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

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-11/12 mx-auto mt-16 lg:mt-4 pb-4">
      <div className="text-gray-600 text-2xl font-semibold mb-6">Exchange Requests</div>

      {books?.length === 0 ? (
        <p className="text-center text-gray-500">No pending exchange requests.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Book Name</th>
                  <th className="px-4 py-2">Author</th>
                  <th className="px-4 py-2">Requested User Name</th>
                  <th className="px-4 py-2">Requested User</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={book.bookImage}
                        alt={book.bookName}
                        className="w-10 h-12 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{book.bookName}</td>
                    <td className="px-4 py-2">{book.authorName}</td>
                    <td className="px-4 py-2">{book.requestedUserName || "—"}</td>
                    <td className="px-4 py-2">{book.requestedUser || "—"}</td>
                    <td className="px-4 py-2 flex justify-center gap-3">
                      {book.status === "exchanged" ? (
                        <span className="text-green-600 font-semibold">Accepted</span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccept(book._id)}
                            className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-green-500 group"
                          >
                            <span className="relative z-10">Accept</span>
                            <span className="absolute inset-0 bg-green-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                          </button>
                          <button
                            onClick={() => handleReject(book._id)}
                            className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-red-500 group"
                          >
                            <span className="relative z-10">Reject</span>
                            <span className="absolute inset-0 bg-red-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Layout */}
          <div className="grid gap-4 md:hidden">
            {books.map((book) => (
              <div key={book._id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                  <div className="flex-1 flex items-center justify-center p-4">
                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="w-20 h-24 object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-2 p-4 space-y-1 text-sm">
                    <p><span className="font-semibold">Book:</span> {book.bookName}</p>
                    <p><span className="font-semibold">Author:</span> {book.authorName}</p>
                    <p><span className="font-semibold">Requested User Name:</span> {book.requestedUserName || "—"}</p>
                    <p><span className="font-semibold">Requested User:</span> {book.requestedUser || "—"}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 p-4">
                    {book.status === "exchanged" ? (
                      <span className="text-green-600 font-semibold">Accepted</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(book._id)}
                          className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-green-500 group"
                        >
                          <span className="relative z-10">Accept</span>
                          <span className="absolute inset-0 bg-green-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                        </button>
                        <button
                          onClick={() => handleReject(book._id)}
                          className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-red-500 group"
                        >
                          <span className="relative z-10">Reject</span>
                          <span className="absolute inset-0 bg-red-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
