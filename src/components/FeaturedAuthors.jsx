"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const authors = [
  {
    name: "Shikhon Islam",
    books: "07 Published Books",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Kawser Ahmed",
    books: "04 Published Books",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Brooklyn Simmons",
    books: "15 Published Books",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Leslie Alexander",
    books: "05 Published Books",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Guy Hawkins",
    books: "12 Published Books",
    img: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Esther Howard",
    books: "10 Published Books",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];

export default function FeaturedAuthors() {
  return (
    <section className="py-16 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Featured Author</h2>
        <p className="text-gray-500 mt-2">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          <br /> Donec at nulla nulla. Duis posuere ex lacus
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="relative container mx-auto px-4">
        <Swiper
          spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 2500,
            disableOnInteraction: false,
         }}
         speed={1200}
        loop={true}
         modules={[Autoplay, Pagination, Navigation]}
        >
          {authors.map((author, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl  p-6 text-center hover:shadow-xl transition border border-gray-100">
                {/* Golden Laurel Circle */}
                <div className="relative w-34 h-34 mx-auto mb-4">
                  <img
                    src="/shape-img.png"
                    alt="laurel"
                    className="absolute inset-0 w-full h-full mt-1 object-contain"
                  />
                  <img
                    src={author.img}
                    alt={author.name}
                    className="w-23 rounded-full object-cover absolute inset-0 m-auto"
                  />
                </div>

                {/* Author Info */}
                <div className="border border-dashed border-red-400 rounded-lg py-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {author.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{author.books}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 bg-red-400 text-white p-4 rounded-full  hover:bg-red-500 z-10">
          ←
        </button>
        <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 bg-red-400 text-white p-4 rounded-full  hover:bg-red-500 z-10">
          →
        </button>
      </div>
    </section>
  );
}
