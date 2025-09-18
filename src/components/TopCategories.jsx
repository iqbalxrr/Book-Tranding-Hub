'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from "swiper/modules";

const TopCategories = () => {
    // 👉 Data ekta array te rakhlam
    const categories = [
        { id: 1, img: "/book1.png", title: "Novel", count: 25 },
        { id: 2, img: "/book2.png", title: "Story Book", count: 18 },
        { id: 3, img: "/book3.png", title: "Comics", count: 30 },
        { id: 4, img: "/book4.png", title: "Science", count: 22 },
        { id: 5, img: "/book1.png", title: "History", count: 15 },
        { id: 6, img: "/book1.png", title: "History", count: 15 },
        { id: 7, img: "/book1.png", title: "History", count: 15 },
        { id: 8, img: "/book1.png", title: "History", count: 15 },
    ];

    return (
        <div className="bg-[url('/bgTop.jpg')] w-full py-16 px-4  object-center bg-no-repeat md:space-y-16">
            {/* heading */}
            <div className="flex flex-col items-center justify-center gap-2">
                <div>
                    <img
                        className="text-[#FF7B6B]"
                        src="/bookIcon.svg"
                        alt="book"
                    />
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-semibold md:font-bold">
                    Top Categories Book
                </h2>
            </div>

            <div className="w-full mt-10 lg:px-4 container mx-auto">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1} 
                    spaceBetween={30}
                    autoplay={{ delay: 4000 }}
                    speed={2000}
                    loop={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        425: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1440: { slidesPerView: 5 },
                    }}
                >
                   
                    {categories.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                        <img
                                            className="h-42"
                                            src={cat.img}
                                            alt={cat.title}
                                        />
                                    </div>
                                    <div className="absolute left-1/2 -bottom-3 -translate-x-1/2">
                                        <span className="font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700">
                                            {cat.count} Books
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">
                                    {cat.title}
                                </h1>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopCategories;
