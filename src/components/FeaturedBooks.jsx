"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedBooks = () => {
  const books = [
    {
      id: 1,
      title: "The Hidden Mystery Behind",
      author: "Hawkins",
      price: 29.0,
      image: "/book1.png",
      reviewer: "Hawkins",
      rating: "⭐⭐⭐⭐☆",
    },
    {
      id: 2,
      title: "Qple GPad With Retina Sisplay",
      author: "Albert",
      price: 19.0,
      image: "/book2.png",
      reviewer: "Albert",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      id: 3,
      title: "Flovely And Unicorn Erna",
      author: "Alexander",
      price: 30.0,
      image: "/book3.png",
      reviewer: "Alexander",
      rating: "⭐⭐⭐⭐☆",
    },
    {
      id: 4,
      title: "Simple Things You To Save BOOK",
      author: "Wilson",
      price: 30.0,
      oldPrice: 39.99,
      image: "/book4.png",
      reviewer: "Wilson",
      rating: "⭐⭐⭐⭐☆",
    },
    {
      id: 5,
      title: "How Deal With Very Bad BOOK",
      author: "Esther",
      price: 39.0,
      image: "/book3.png",
      reviewer: "Esther",
      rating: "⭐⭐⭐⭐☆",
    },
    {
      id: 6,
      title: "How Deal With Very Bad BOOK",
      author: "Esther",
      price: 39.0,
      image: "/book1.png",
      reviewer: "Esther",
      rating: "⭐⭐⭐⭐☆",
    },
  ];

  return (
    <div className=" container mx-auto my-16 px-4">
      {/* Title and Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Books</h2>
        <button className="bg-[#FF7B6B] text-white px-6 py-2 rounded-full hover:bg-[#ff6450] transition">
          View All
        </button>
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
        autoplay={{ delay: 3000,
            disableOnInteraction: false,
         }}
         speed={1200}
        loop={true}
         modules={[Autoplay, Pagination, Navigation]}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="space-y-6 bg-[#FFEFEF] p-6 rounded-xl shadow-sm hover:shadow-md transition">
              {/* Book Image */}
              <div className="flex justify-center items-center py-4 rounded-md">
                <img src={book.image} alt={book.title} className="h-40 object-contain" />
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <h4 className="text-gray-400 font-semibold">{book.author}</h4>
                <h2 className="text-xl font-bold hover:text-[#FF7B6B] transition overflow-hidden line-clamp-1 duration-700">
                  {book.title}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={book.image}
                      alt={book.reviewer}
                    />
                    <p>{book.reviewer}</p>
                  </div>
                  <p>{book.rating}</p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full text-[#FF7B6B] bg-white border-2 border-[#FF7B6B] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700">
                Exchange
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;