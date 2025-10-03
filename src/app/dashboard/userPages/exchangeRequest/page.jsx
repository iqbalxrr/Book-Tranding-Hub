"use client"

import React from 'react'

const books = [
  {
    image: "/book1.png",
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    exchangerName: "Alice Johnson",
    exchangerEmail: "alice.johnson@example.com",
  },
  {
    image: "/book2.png",
    author: "George Orwell",
    title: "1984",
    exchangerName: "David Smith",
    exchangerEmail: "david.smith@example.com",
  },
  {
    image: "/book3.png",
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer’s Stone",
    exchangerName: "Sophia Brown",
    exchangerEmail: "sophia.brown@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
]

export default function ExchangeRequests() {

  const handleAccept = (email) => {
    console.log("Accepted:", email)
  }

  const handleReject = (email) => {
    console.log("Rejected:", email)
  }

  return (
   
      <div className="max-w-11/12 mx-auto mt-16 lg:mt-4">
        <div className="text-gray-600 text-2xl font-semibold mb-6">Exchange Requests</div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Exchanger Name</th>
                <th className="px-4 py-2">Exchanger Email</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-10 h-12 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.exchangerName}</td>
                  <td className="px-4 py-2">{book.exchangerEmail}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    {/* Accept Button */}
                    <button
                      onClick={() => handleAccept(book.exchangerEmail)}
                      className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-green-500 group"
                    >
                      <span className="relative z-10">Accept</span>
                      <span className="absolute inset-0 bg-green-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleReject(book.exchangerEmail)}
                      className="relative overflow-hidden px-4 py-2 text-white rounded-sm bg-red-500 group"
                    >
                      <span className="relative z-10">Reject</span>
                      <span className="absolute inset-0 bg-red-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
  )
}
