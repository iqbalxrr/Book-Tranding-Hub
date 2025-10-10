"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/variables.css";
import Link from "next/link";

export default function RelatedBooks({ category }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?category=${category}&limit=10`);
        const data = await res.json();
        setBooks(data?.books);
      } catch (error) {
        console.error("Failed to fetch related books:", error);
      }
    };

    if (category) {
      fetchBooks();
    }
  }, [category]);

  if (!books?.length) {
    return (
      <div className="text-center my-10 text-gray-500">
        No related books found in this category.
      </div>
    );
  }

  return (
    <div className="my-20 px-7 md:px-14 lg:px-20 mx-auto container space-y-12">
      {/* heading */}
      <div className="text-center w-full md:w-3/5 mx-auto space-y-3">
        <h1 className="text-3xl font-bold">Related Books</h1>
        <p>
          Showing books from <span className="font-semibold text-red-600 text-2xl ">{category}</span>{" "}
          category
        </p>
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {books?.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="space-y-6 bg-[#FFEFEF] p-6 rounded-xl shadow-sm hover:shadow-md transition">
              {/* Book Image */}
              <div className="flex justify-center items-center py-4 rounded-md">
                <img
                  src={book?.bookImage || "/book-2.png"}
                  alt={book?.bookImage}
                  className="h-40 object-contain"
                />
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <h4 className="text-gray-400 font-semibold">
                  {book?.authorName}
                </h4>
                <h2 className="text-xl font-bold hover:text-[#FF7B6B] transition overflow-hidden line-clamp-1 duration-700">
                  {book?.bookName}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={book?.reviewerImg || "/avatar.png"}
                      alt={book?.reviewer || "Reviewer"}
                    />
                    <p className="line-clamp-1">{book?.authorName || "Unknown"}</p>
                  </div>
                  <p  >{book?.rating || "⭐⭐⭐⭐"}</p>
                </div>
              </div>

              {/* Button */}
              <Link href={`/books/${book?._id}`} >
              <button  className="w-full custom-btn rounded-full font-bold py-3">
                Exchange 
             </button>
              </Link>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
