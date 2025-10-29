"use client";

import Image from "next/image";
import { Heart, X, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopRated() {
  const [topRatedBooks, setTopRatedBooks] = useState([]);

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const res = await fetch("/api/books?limit=6"); // fetch 6 books
        const data = await res.json();

        // Keep _id from DB
        const mappedBooks = data.books.map((book) => ({
          _id: book._id,
          category: book.category || "General",
          title: book.bookName,
          price: book.price || 0,
          author: book.authorName,
          image: book.bookImage,
          rating: book.rating || 4, // default to 4 if not in DB
        }));

        setTopRatedBooks(mappedBooks);
      } catch (err) {
        console.error("Failed to fetch top rated books:", err);
      }
    };

    fetchTopRatedBooks();
  }, []);

  return (
    <section className="py-16 bg-[url('/ratting-bg.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Top Rating Books
          </h2>
          <Link href="/books">
            <button className="bg-[#FF7B6B] hover:bg-[#ff6650] text-white px-5 py-2 rounded-full transition text-sm md:text-base">
              View More Books →
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {topRatedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                {/* Book Image */}
                <div className="w-28 h-36 flex-shrink-0 mb-4 sm:mb-0">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={112}
                    height={144}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 sm:ml-4 flex flex-col justify-between h-full w-full">
                  <div>
                    <p className="text-xs md:text-sm text-gray-400">{book.category}</p>
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 leading-snug">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs md:text-sm text-gray-600">{book.author}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-2 text-yellow-500 text-sm">
                      {"★".repeat(book.rating)}
                      {"☆".repeat(5 - book.rating)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="flex gap-2 justify-center sm:justify-start">
                  <button className="p-2 border rounded-full hover:bg-gray-100">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-gray-100">
                    <X size={16} />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-gray-100">
                    <Eye size={16} />
                  </button>
                </div>

                <Link href={`/books/${book._id}`}> 
                  <button className="custom-btn px-4 py-2 rounded-lg text-sm">
                    Exchange
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
