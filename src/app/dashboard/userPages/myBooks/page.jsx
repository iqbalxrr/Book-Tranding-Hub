'use client'

import React, { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';


const books = [
  {
    image: "/book1.png",
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    reviewerImg: "/user1.png",
    reviewer: "Alice Johnson",

  },
  {
    image: "/book2.png",
    author: "George Orwell",
    title: "1984",
    reviewerImg: "/user2.png",
    reviewer: "David Smith",

  },
  {
    image: "/book3.png",
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer’s Stone",
    reviewerImg: "/user3.png",
    reviewer: "Sophia Brown",

  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    reviewerImg: "/user4.png",
    reviewer: "James Wilson",

  },
  {
    image: "/book-2.png",
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviewerImg: "/user5.png",
    reviewer: "Emily Davis",

  },
  {
    image: "/news-1.jpg",
    author: "Mark Twain",
    title: "Adventures of Huckleberry Finn",
    reviewerImg: "/user6.png",
    reviewer: "Michael Miller",

  },
  {
    image: "/news-2.jpg",
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings",
    reviewerImg: "/user7.png",
    reviewer: "Olivia Garcia",

  },
  {
    image: "/news-3.jpg",
    author: "Mary Shelley",
    title: "Frankenstein",
    reviewerImg: "/user8.png",
    reviewer: "Ethan Martinez",

  },
];


export default function page() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchMyBooks = async () => {
      const myBooks = await fetch(`/api/books/myBooks?email=${user?.email}`)
      const data =await myBooks.json()
      setBooks(data)
    }
    fetchMyBooks()
  }, [user?.email])

  console.log(books);

  return (

    <div className="max-w-11/12 mx-auto mt-16 lg:mt-4 pb-4">
      <div className="text-gray-600 text-2xl font-semibold mb-6">My Books</div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Author Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-4 py-2">{index + 1}.</td>
                <td className="px-4 py-2">
                  <img
                    src={book?.bookImage}
                    alt={book?.bookName}
                    className="w-10 h-12 object-cover rounded-md mx-auto border border-gray-200"
                  />
                </td>
                <td className="px-4 py-2">{book?.bookName}</td>
                <td className="px-4 py-2">{book?.authorName}</td>
                <td className="px-4 py-2">{book?.category}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition">
                    <Trash2 className="w-4 h-4" />
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
                  src={book?.bookImage}
                  alt={book?.bookName}
                  className="w-20 h-24 object-cover rounded-md"
                />
              </div>

              {/* Col 2: Information */}
              <div className="p-4 space-y-1 flex-6 text-sm">
                {/* <p><span className="font-semibold">No:</span> {index + 1}</p> */}
                <p><span className="font-semibold">Book:</span> {book?.bookName}</p>
                <p><span className="font-semibold">Author:</span> {book?.authorName}</p>
                <p><span className="font-semibold">Category:</span> {book?.category}</p>
              </div>

              {/* Col 3: Actions (vertical stack) */}
              <div className="flex flex-col items-center flex-1 justify-center gap-2 p-4">
                <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition w-10 h-10 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition w-10 h-10 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
