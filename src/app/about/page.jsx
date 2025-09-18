
// app/about/page.tsx  (Next.js 13+ App Router ধরছি)
"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { usePathname } from "next/navigation";


export default function AboutPage() {

    const pathname = usePathname();

    const textRed = pathname == "/about"

    console.log(textRed)

  return (
    <div className="min-h-screen py-30">
     
      <section className="bg-[url('/ratting-bg.jpg')] py-22 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">About Us</h1>
          <div className="mt-2 text-gray-600">
            <a href="/">Home</a> /  <span className={`${textRed && "text-red-500" }`}><a href="/about">About Us</a></span>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side Image with Play Button */}
        <div className="relative">
          <Image
            src="/about.jpg" 
            alt="About us image"
            width={700}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white text-red-500 rounded-full p-4 shadow-lg">
              <Play size={32} fill="red" />
            </span>
          </button>
        </div>

        {/* Right Side Text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About The BookMate
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nullam convallis ullamcorper nulla. Nam accumsan ac leo quis posuere. 
            Nunc rutrum lorem justo, at blandit mauris ullamcorper tristique. 
            Suspendisse vel ante venenatis, porttitor ligula sed, iaculis metus. 
            Nullam non erat gravida, viverra leo ut, maximus tortor. 
            Pellentesque vitae nunc rhoncus, lacinia nulla sed, commodo lectus.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Morbi cursus enim in consequat suscipit. Quisque id dui ante. 
            Praesent auctor sed velit ac aliquet. Morbi consectetur sem nec ipsum malesuada, 
            ut gravida nisl molestie. Proin hendrerit ullamcorper dui, quis convallis mauris cursus nec.
          </p>
          <a
            href="#"
            className="text-red-500 font-medium hover:underline inline-flex items-center"
          >
            Overview
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
