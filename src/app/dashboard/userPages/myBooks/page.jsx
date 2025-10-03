
import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';


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

  return (
  
      <div className="max-w-11/12 mx-auto mt-16 lg:mt-4">
        <div className="text-gray-600 text-2xl font-semibold mb-6">My Books</div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Author Name Author Name</th>
                <th className="px-4 py-2">Reviewer</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}.</td>
                  <td className="px-4 py-2">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-10 h-12 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.reviewer}</td>
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
      </div>


  )
}
