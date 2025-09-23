"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/hero-bg-1.jpg')]   text-white pt-36">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
        {/* Left Content */}
        <div className="space-y-6 md:pb-10 ">
          <div className="flex gap-2 ">
            <span className="text-sm text-orange-300 font-semibold uppercase tracking-wide">
              Editor Choice Best Books
            </span>
            <span className=" bg-black text-white w-fit text-xs px-3 py-1 rounded-full">
              Up To 50% Off
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Your Next Favorite Book <br />
            Is Just A{" "}
            <span className="text-orange-400 relative">
              Click Away
              <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-orange-400 rounded-full"></span>
            </span>
          </h1>

          <p className="text-gray-200 max-w-lg">
            Sed ac arcu sed felis vulputate molestie. Nullam at urna in velit
            finibus vestibulum euismod A Urna. Sed quis aliquam leo. Duis
            iaculis lorem mauris, et convallis du
          </p>
         
          {/* Buttons */}
          <div className="flex  gap-2 relative">
            <button className="bg-white text-black w-fit px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
              Shop Now →
            </button>
            <button className="bg-orange-500 w-fit text-white px-6 py-3 rounded-full font-medium z-40 hover:bg-orange-600 transition">
              View All Books →
            </button>

             <div
           
          
            
            className="absolute w-[400px] top-11 left-10 2xl:left-0 2xl:top-10 2xl:right-12 2xl:w-[500px] hidden  xl:block "
          >
            <Image
              src="/book-shape.png" 
              alt="Book"
              width={900}
              height={600}
            />
          </div>
          </div>
           
          
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center relative"
        >
          <Image
            src="/hero-girl-1.png"
            alt="Book Reader"
            width={600}
            height={600}
            className="relative z-10"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 md:top-30 right-0  md:block"
          >
            <Image
              src="/book-2.png" // বই এর mockup ইমেজ path
              alt="Book"
              width={150}
              height={200}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
