"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";

export default function Testmonial() {
 const testimonials = [
  {
    name: "Ayesha Karim",
    role: "Book Lover",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    quote:
      "Free Local Book Exchange has been a wonderful discovery for me. I had so many books sitting on my shelf collecting dust, and now I can pass them on to someone who truly appreciates them. In return, I get to explore new titles and authors without spending extra money. It feels like being part of a friendly community that values sharing and reading.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    rating: 4,
  },
  {
    name: "Rahim Uddin",
    role: "Member since 2022",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    quote:
      "I joined this platform in 2022 and it has completely changed the way I read books. Instead of buying new books every month, I simply exchange the ones I’ve finished with other members. The process is easy, transparent, and most importantly, it connects me with people who love books as much as I do. I’ve also made a few good friends along the way.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    rating: 5,
  },
  {
    name: "Farida Naz",
    role: "Active Member",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    quote:
      "What I love most about Free Local Book Exchange is the sense of community it creates. Every time I exchange a book, I feel like I am sharing a story and receiving a new one in return. It’s not just about saving money or getting access to books; it’s about being part of something meaningful where knowledge and stories are continuously passed on.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    rating: 5,
  },
  {
    name: "Hasan Mahmud",
    role: "University Student",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    quote:
      "As a student, buying textbooks and reference materials can be very expensive. Thanks to this website, I was able to exchange my old course books with juniors and get new ones from seniors. It saved me money and also helped me stay connected with other students who share the same academic goals. I think every student should give this platform a try.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    rating: 4,
  },
  {
    name: "Nusrat Jahan",
    role: "New Member",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    quote:
      "I recently joined Free Local Book Exchange and was surprised by how welcoming the community is. Within just a few days, I managed to exchange several books and discovered genres I never thought I’d enjoy. The platform is simple, safe, and brings readers together in the best possible way. I am looking forward to being a long-term member.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    rating: 5,
  },
];



  return (
    <div className="my-20 px-6 md:px-12 lg:px-20 container mx-auto">
      {/* Heading */}
      <div className="text-center w-full md:w-3/5 mx-auto space-y-3 mb-12">
        <h1 className="text-3xl font-bold">Our Testmonials </h1>
        <p className="text-gray-600">
          Hear from our happy readers and clients who trust our books and
          services.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        speed={2000}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials?.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`card w-full h-72 bg-base-100 shadow-md border border-gray-200 `}
            >
              <div className="card-body p-6 flex flex-col justify-between h-full">
                {/* Quote */}
                <p className="text-gray-700 italic line-clamp-4">“{t.quote}”</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    {/* wrapper: relative so SVG and image can be positioned */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      {/* SVG geometric background (teal triangle + bottom slanted triangle) */}
                    
                    <img src="/shape.svg" alt=""  />

                      {/* circular photo placed overlapping the top-right area */}
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="absolute -right-1 -top-2 w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>

                    {/* text area */}
                    <div>
                      <h4 className="font-semibold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t?.role}</p>

                      {/* Rating */}
                      <div className="flex text-2xl text-orange-400 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < t.rating ? "text-orange-400" : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Company Logo */}
                  <img
                    src={t.logo}
                    alt="Company"
                    className="h-6 object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
