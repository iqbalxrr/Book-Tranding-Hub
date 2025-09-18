// src/components/TopRated.jsx

"use client";
import Image from "next/image";
import { Heart, X, Eye } from "lucide-react";

const topRatedBooks = [
  {
    id: 1,
    category: "Design Low Book",
    title: "Simple Things You To Save BOOK",
    price: 30.0,
    author: "Wilson",
    image: "/book1.png",
    rating: 4,
  },
  {
    id: 2,
    category: "Design Low Book",
    title: "How Deal With Very Bad BOOK",
    price: 39.0,
    author: "Wilson",
    image: "/book2.png",
    rating: 4,
  },
  {
    id: 3,
    category: "Design Low Book",
    title: "Qple GPad With Retina Sispalay",
    price: 30.0,
    author: "Wilson",
    image: "/book3.png",
    rating: 4,
  },
  {
    id: 4,
    category: "Design Low Book",
    title: "Flovely And Unicorn Erna",
    price: 19.0,
    author: "Wilson",
    image: "/book4.png",
    rating: 4,
  },
  {
    id: 5,
    category: "Design Low Book",
    title: "Castle In The Sky",
    price: 16.0,
    author: "Wilson",
    image: "/book5.png",
    rating: 4,
  },
  {
    id: 6,
    category: "Design Low Book",
    title: "The Hidden Mystery Behind",
    price: 30.0,
    author: "Wilson",
    image: "/book6.png",
    rating: 4,
  },
];

export default function TopRated() {
  return (
    <section className="py-16 bg-[url('/ratting-bg.jpg')] bg-no-repeat">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Top Rating Books</h2>
          <button className="bg-[#FF7B6B] hover:bg-[#ff6650] text-white px-6 py-2 rounded-full transition">
            View More Books →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1   lg:grid-cols-2 xl:grid-cols-3  gap-8">
          {topRatedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-center p-4"
            >
              {/* Book Image */}
              <div className="w-28 h-36 flex-shrink-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={112}
                  height={144}
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>

              {/* Book Details */}
              <div className="flex-1 ml-4 flex flex-col justify-between h-full">
                <div>
                  <p className="text-sm text-gray-400">{book.category}</p>
                  <h3 className="text-base font-semibold text-gray-800">
                    {book.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src="/author.png"
                      alt={book.author}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">{book.author}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2 text-yellow-500">
                    {"★".repeat(book.rating)}
                    {"☆".repeat(5 - book.rating)}
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
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

                  <button className="bg-[#FF7B6B] hover:bg-[#ff6650] text-white px-4 py-2 rounded-lg transition">
                    Enchange
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
