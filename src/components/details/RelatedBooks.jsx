'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BookCard from "./BookCard";
import 'swiper/css';


export default function RelatedBooks({relatedBooks}) {



    return (
        <div className="my-20 px-7 md:px-14 lg:px-20 mx-auto container space-y-12">
            {/* heading */}
            <div className="text-center w-full md:w-3/5 mx-auto space-y-3">
                <h1 className="text-3xl font-bold">Related Books</h1>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    Donec at nulla nulla. Duis posuere ex lacus</p>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 4000 }}
                speed={2000}
               loop={relatedBooks?.length > 3}  // enable only if enough slides
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 }, // md
                    1024: { slidesPerView: 3 }, // lg
                }}
            >
                {relatedBooks?.map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

