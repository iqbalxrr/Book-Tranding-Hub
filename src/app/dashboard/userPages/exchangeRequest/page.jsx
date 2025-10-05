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
   
      <div className="max-w-11/12 mx-auto mt-16 lg:mt-4 pb-4">
        <div className="text-gray-600 text-2xl font-semibold mb-6">Exchange Requests</div>
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b border-gray-300">
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
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
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

           {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {books?.map((book, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden"
          >
            <div className="flex flex-9 divide-x divide-gray-200">
              {/* Col 1: Image */}
              <div className="flex flex-2 items-center justify-center p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-24 object-cover rounded-md"
                />
              </div>

              {/* Col 2: Information */}
              <div className="p-4 space-y-1 flex-6 text-sm">
                {/* <p><span className="font-semibold">No:</span> {index + 1}</p> */}
                <p><span className="font-semibold">Book:</span> {book.title}</p>
                <p><span className="font-semibold">Exchanger Name:</span> {book.exchangerName}</p>
                <p><span className="font-semibold">Exchanger Email:</span> {book.exchangerEmail}</p>
              </div>

              {/* Col 3: Actions (vertical stack) */}
              <div className="flex flex-col items-center flex-1 justify-center gap-2 p-4">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
   
  )
}
