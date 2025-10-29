"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/variables.css";
import Link from "next/link";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch 6 featured books from your API
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data.books);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto my-16 px-4">
      {/* Title and Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Books</h2>
        <Link href="/books">
          <button className="bg-[#FF7B6B] text-white px-6 py-2 rounded-full hover:bg-[#ff6450] transition">
            View All
          </button>
        </Link>
      </div>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 5 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1200}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="space-y-6 bg-[#FFEFEF] p-6 rounded-xl shadow-sm hover:shadow-md transition">
              {/* Book Image */}
              <div className="flex justify-center items-center py-4 rounded-md">
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="h-40 object-contain"
                />
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <h4 className="text-gray-400 font-semibold">{book.authorName}</h4>
                <h2 className="text-xl font-bold hover:text-[#FF7B6B] transition overflow-hidden line-clamp-1 duration-700">
                  {book.bookName}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={book.bookImage}
                      alt={book.authorName}
                    />
                    <p className="line-clamp-1">{book.authorName}</p>
                  </div>
                  <p>{"⭐⭐⭐⭐☆"}</p> {/* Default rating, replace if DB has */}
                </div>
              </div>

              {/* Button */}
              <Link href={`/books/${book._id}`}>
              <button className="w-full custom-btn rounded-full font-bold py-3">
                Exchange
              </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;
