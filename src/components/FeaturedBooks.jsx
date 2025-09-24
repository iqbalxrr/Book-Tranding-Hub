'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BookCard from "@/components/details/BookCard";
import { FaArrowRightLong } from "react-icons/fa6";
import 'swiper/css';


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
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
