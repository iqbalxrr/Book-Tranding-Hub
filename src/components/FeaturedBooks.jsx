'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/variables.css";

const books = [
  {
    image: "/book1.png",
    author: "Author One",
    title: "Book One",
    reviewerImg: "/book1.png",
    reviewer: "Reviewer One",
    rating: "⭐⭐⭐⭐",
  },
  {
    image: "/book2.png",
    author: "Author Two",
    title: "Book Two",
    reviewerImg: "/book1.png",
    reviewer: "Reviewer Two",
    rating: "⭐⭐⭐",
  },
  {
    image: "/book3.png",
    author: "Author Three",
    title: "Book Three",
    reviewerImg: "/book1.png",
    reviewer: "Reviewer Three",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    image: "/book4.png",
    author: "Author Four",
    title: "Book Four",
    reviewerImg: "/book1.png",
    reviewer: "Reviewer Four",
    rating: "⭐⭐⭐",
  },
];

export default function FeaturedBooks() {
  return (
    <div className="my-20 px-7 md:px-14 lg:px-20 mx-auto container space-y-12">
      {/* heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">Featured Books</h1>
        <button className="flex items-center gap-3 rounded-full font-bold py-2.5 px-5 text-white bg-[#FF7B6B] transition duration-700">
          Explore More
            <FaArrowRightLong />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 4000 }}
        speed={2000}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 }, // md
          1024: { slidesPerView: 3 }, // lg
        }}
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
              <button className="w-full btn rounded-full font-bold py-3  ">
                Exchange
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
