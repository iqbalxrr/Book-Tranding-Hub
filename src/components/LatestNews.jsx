"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

export default function LatestNews() {
  const newsItems = [
    {
      date: "Feb 10, 2024",
      title: "Montes Suspendisse Massa Curae Malesuada",
      imgSrc: "news-1.jpg", // replace with your image path
      category: "Activities",
    },
    {
      date: "Mar 20, 2024",
      title: "Playful Picks Paradise: Kids’ Essentials With Dash.",
      imgSrc: "news-2.jpg",
      category: "Activities",
    },
    {
      date: "Jun 14, 2024",
      title: "Tiny Emporium: Playful Picks For Kids’ Delightful Days.",
      imgSrc: "news-3.jpg",
      category: "Activities",
    },
    {
      date: "Mar 12, 2024",
      title: "Eu Parturient Dictumst Fames Quam Tempor",
      imgSrc: "news-4.jpg",
      category: "Activities",
    },
  ];

  return (
    <section className="bg-[#F9F3F3] py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-[#0D1A2B] mb-4">
            Our Latest News
          </h2>
          <p className="text-gray-600">
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
            at nulla nulla. Duis posuere ex lacus.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#FF6F61] text-white text-xs font-medium py-1 px-3 rounded">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[#FF6F61]" /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser className="text-[#FF6F61]" /> Admin
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#171717] hover:text-[#FF6F61] transition duration-200 mb-4">
                  {item.title}
                </h3>

                {/* Read More */}
                <a
                  href="#"
                  className="inline-flex items-center text-[#FF6F61] font-medium hover:text-[#FF4A32] transition duration-200"
                >
                  Read More <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
