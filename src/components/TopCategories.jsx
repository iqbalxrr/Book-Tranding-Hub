'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from "swiper/modules";

const TopCategories = () => {
    return (
        <div className="bg-[url('/bgTop.jpg')] w-full p-14 lg:p-20 object-center bg-no-repeat md:space-y-16">
            {/* heading */}
            <div className='flex flex-col items-center justify-center gap-2'>
                <div>
                    <img
                        className='text-[#FF7B6B] '
                        src="/bookIcon.svg" alt="book" />
                </div>
                <h2 className='text-white text-3xl md:text-4xl font-semibold md:font-bold'>Top Categories Book</h2>
            </div>

            <div className="w-full mt-10">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1} // mobile default
                    spaceBetween={30}
                    autoplay={{ delay: 4000 }}
                    speed={2000}
                    loop={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        //  0: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },   // md
                        1024: { slidesPerView: 4 },  // lg
                    }}
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="space-y-6   ">
                            <div className='relative group'>
                                <div className=" flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                    <img
                                        className="h-[144px]"
                                        src="/book1.png"
                                        alt="book"
                                    />
                                </div>
                                <div className='absolute left-1/2 -bottom-3  -translate-x-1/2'>
                                    <span className='font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700'>25 Books</span>
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">Book Nmae</h1>
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="space-y-6   ">
                            <div className='relative group'>
                                <div className=" flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                    <img
                                        className="h-[144px]"
                                        src="/book2.png"
                                        alt="book"
                                    />
                                </div>
                                <div className='absolute left-1/2 -bottom-3  -translate-x-1/2'>
                                    <span className='font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700'>25 Books</span>
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">Book Nmae</h1>
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="space-y-6   ">
                            <div className='relative group'>
                                <div className=" flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                    <img
                                        className="h-[144px]"
                                        src="/book3.png"
                                        alt="book"
                                    />
                                </div>
                                <div className='absolute left-1/2 -bottom-3  -translate-x-1/2'>
                                    <span className='font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700'>25 Books</span>
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">Book Nmae</h1>
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="space-y-6   ">
                            <div className='relative group'>
                                <div className=" flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                    <img
                                        className="h-[144px]"
                                        src="/book4.png"
                                        alt="book"
                                    />
                                </div>
                                <div className='absolute left-1/2 -bottom-3  -translate-x-1/2'>
                                    <span className='font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700'>25 Books</span>
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">Book Nmae</h1>
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="space-y-6   ">
                            <div className='relative group'>
                                <div className=" flex justify-center items-center bg-white pt-8 pb-12 rounded-md relative group-hover:bg-[#FF7B6B] transition duration-700">
                                    <img
                                        className="h-[144px]"
                                        src="/book1.png"
                                        alt="book"
                                    />
                                </div>
                                <div className='absolute left-1/2 -bottom-3  -translate-x-1/2'>
                                    <span className='font-semibold text-white bg-[#FF7B6B] p-1.5 px-3 rounded-sm group-hover:bg-white group-hover:text-[#FF7B6B] transition duration-700'>25 Books</span>
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-white hover:text-[#FF7B6B] transition duration-700">Book Nmae</h1>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>


        </div>

    );
};

export default TopCategories;