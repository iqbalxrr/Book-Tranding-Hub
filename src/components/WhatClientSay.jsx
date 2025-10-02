'use client'

import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import './swiper.css'

export default function WhatClientSay() {


    const testimonials = [
        {
            name: "Ayesha Karim",
            role: "Book Lover",
            photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illo magni cupiditate dolor similique eius explicabo quo eos? Maiores dolor, dicta enim molestias est nostrum perferendis unde optio doloremque atque voluptatem quisquam laborum ipsa iste eum, consequuntur possimus nihil voluptas. Quo illo molestias iste aliquam officia libero eius ipsa dolores velit, neque mollitia est itaque ea! Minus veniam quam, ullam suscipit ducimus magnam mollitia explicabo architecto distinctio animi, unde facilis! Vitae a excepturi optio praesentium earum ducimus voluptate doloremque illum adipisci harum nemo animi numquam odio laborum quo dicta inventore commodi incidunt possimus, amet cum eius saepe eveniet. Tenetur quod corrupti minus consectetur commodi ab voluptas eius repellendus obcaecati sapiente voluptatem ",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        },
        {
            name: "Rahim Uddin",
            role: "Member since 2022",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illo magni cupiditate dolor similique eius explicabo quo eos? Maiores dolor, dicta enim molestias est nostrum perferendis unde optio doloremque atque voluptatem quisquam laborum ipsa iste eum, consequuntur possimus nihil voluptas. Quo illo molestias iste aliquam officia libero eius ipsa dolores velit, neque mollitia est itaque ea! Minus veniam quam, ullam suscipit ducimus magnam mollitia explicabo architecto distinctio animi, unde facilis! Vitae a excepturi optio praesentium earum ducimus voluptate doloremque illum adipisci harum nemo animi numquam odio laborum quo dicta inventore commodi incidunt possimus, amet cum eius saepe eveniet. Tenetur quod corrupti minus consectetur commodi ab voluptas eius repellendus obcaecati sapiente voluptatem necessitatibus pariatur ea repellat error impedit est qui ut, aspernatur consequuntur eum, ratione ",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
        },
        {
            name: "Farida Naz",
            role: "Member",
            photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illo magni cupiditate dolor similique eius explicabo quo eos? Maiores dolor, dicta enim molestias est nostrum perferendis unde optio doloremque atque voluptatem quisquam laborum ipsa iste eum, consequuntur possimus nihil voluptas. Quo illo molestias iste aliquam officia libero eius ipsa dolores velit, neque mollitia est itaque ea! Minus veniam quam, ullam suscipit ducimus magnam mollitia explicabo architecto distinctio animi, unde facilis! Vitae a excepturi optio praesentium earum ducimus voluptate doloremque illum adipisci harum nemo animi numquam odio laborum quo dicta inventore commodi incidunt possimus, amet cum eius saepe eveniet. Tenetur quod corrupti minus consectetur commodi ab voluptas eius repellendus obcaecati sapiente voluptatem necessitatibus pariatur ea repellat error impedit est qui ut, aspernatur consequuntur eum, ratione ",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
        },
    ];



    return (
        <div className="my-20 px-6 md:px-12 lg:px-20 container mx-auto">
            {/* Heading */}
            <div className="text-center w-full md:w-3/5 mx-auto space-y-3 mb-12">
                <h1 className="text-3xl font-bold">What Our Clients Say</h1>
                <p className="text-gray-600">
                    Hear from our happy readers and clients who trust our books and services.
                </p>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{ delay: 4000 }}
                speed={2000}
                loop={true}
                pagination={{ clickable: true }}
            // breakpoints={{
            //   768: { slidesPerView: 2 }, // md
            //   1024: { slidesPerView: 2 }, // lg → two cards side by side
            // }}
            >
                {testimonials?.map((t, idx) => (
                    <SwiperSlide key={idx}>
                        <div className={`card w-full h-72 bg-base-100 shadow-md border border-gray-200 `}>
                            <div className="card-body p-6 flex flex-col justify-between h-full">
                                {/* Quote */}
                                <p className="text-gray-700 italic line-clamp-4">
                                    “{t.quote}”
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-6">
                                    {/* Profile */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={t.photo}
                                            alt={t.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{t.name}</h4>
                                            <p className="text-sm text-gray-500">{t?.role}</p>
                                            {/* Rating */}
                                            <div className="flex text-orange-400">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={i < t.rating ? "text-orange-400" : "text-gray-300"}
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

    )
}
