import React from 'react'
import Paginationn from '@/components/pagination/pagination';
import { Star, Trash2 } from 'lucide-react';


const books = [
    {
        image: "/book1.png",
        author: "Harper Lee",
        title: "To Kill a Mockingbird",
        publishYear: 1960,
        genre: "Classic Fiction",
        rating: 4.9,
        isbn: "9780061120084",
    },
    {
        image: "/book2.png",
        author: "George Orwell",
        title: "1984",
        publishYear: 1949,
        genre: "Dystopian Fiction",
        rating: 4.8,
        isbn: "9780451524935",
    },
    {
        image: "/book3.png",
        author: "J.K. Rowling",
        title: "Harry Potter and the Sorcerer’s Stone",
        publishYear: 1997,
        genre: "Fantasy",
        rating: 4.9,
        isbn: "9780439708180",
    },
    {
        image: "/book4.png",
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        publishYear: 1925,
        genre: "Classic Literature",
        rating: 4.7,
        isbn: "9780743273565",
    },
    {
        image: "/book-2.png",
        author: "Jane Austen",
        title: "Pride and Prejudice",
        publishYear: 1813,
        genre: "Romance",
        rating: 4.8,
        isbn: "9780141439518",
    },
    {
        image: "/news-1.jpg",
        author: "Mark Twain",
        title: "Adventures of Huckleberry Finn",
        publishYear: 1884,
        genre: "Adventure",
        rating: 4.6,
        isbn: "9780486280615",
    },
    {
        image: "/news-2.jpg",
        author: "J.R.R. Tolkien",
        title: "The Lord of the Rings",
        publishYear: 1954,
        genre: "Fantasy",
        rating: 5.0,
        isbn: "9780618640157",
    },
    {
        image: "/book4.png",
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        publishYear: 1925,
        genre: "Classic Literature",
        rating: 4.7,
        isbn: "9780743273565",
    },
    {
        image: "/news-3.jpg",
        author: "Mary Shelley",
        title: "Frankenstein",
        publishYear: 1818,
        genre: "Gothic Horror",
        rating: 4.5,
        isbn: "9780486282114",
    },
    {
        image: "/book-2.png",
        author: "Jane Austen",
        title: "Pride and Prejudice",
        publishYear: 1813,
        genre: "Romance",
        rating: 4.8,
        isbn: "9780141439518",
    },
];


export default function page() {

    return (
       <div className="max-w-11/12 mx-auto space-y-6 p-4  mt-16 lg:mt-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 text-2xl font-semibold">All Books</h2>
        <div className="flex justify-end w-full max-w-md ">
          <input
            type="text"
            placeholder="Search books..."
            className="w-2/3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Author Name</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Publish Year</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{index + 1}.</td>
                <td className="px-4 py-2">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-10 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.publishYear}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    title="Mark as featured"
                    className="p-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    title="Delete"
                    className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  >
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
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-24 object-cover rounded-md"
                />
              </div>

              {/* Col 2: Information */}
              <div className="p-4 space-y-1 flex-6 text-sm">
                {/* <p><span className="font-semibold">No:</span> {index + 1}</p> */}
                <p><span className="font-semibold">Book:</span> {book.title}</p>
                <p><span className="font-semibold">Author:</span> {book.author}</p>
                <p><span className="font-semibold">Genre:</span> {book.genre}</p>
                <p><span className="font-semibold">Published at:</span> {book.publishYear}</p>
                <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              </div>

              {/* Col 3: Actions (vertical stack) */}
              <div className="flex flex-col items-center flex-1 justify-center gap-2 p-4">
                <button
                    title="Mark as featured"
                    className="p-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    title="Delete"
                    className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>


     <Paginationn />
    </div>

    )
}
