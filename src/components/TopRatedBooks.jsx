"use client";

import Image from "next/image";
import { useState } from "react";

const books = [
  {
    id: 1,
    authorImg: "/authors/author1.jpg",
    title: "The Great Adventure",
    description: "An exciting journey through unknown lands.",
    rating: 4.5,
  },
  {
    id: 2,
    authorImg: "/authors/author2.jpg",
    title: "Learning React",
    description: "A practical guide to mastering React.js.",
    rating: 4.8,
  },
  {
    id: 3,
    authorImg: "/authors/author3.jpg",
    title: "Mystery of the Night",
    description: "A thrilling mystery novel you can't put down.",
    rating: 4.2,
  },
];

export default function TopRatedBooks() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-teal-500 mb-6">Top Rated Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <Image
              src={book.authorImg}
              alt={book.title}
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 text-center mb-2">{book.description}</p>
            <p className="text-yellow-500 mb-4">⭐ {book.rating}</p>
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
              Exchange
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
