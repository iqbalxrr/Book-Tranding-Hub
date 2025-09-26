import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

export default function CtaSection() {
    return (
        <div className="relative container mx-auto h-[400px] bg-[url('/cta-banner.jpg')] space-y-12 rounded-2xl lg:flex justify-center items-center bg-cover bg-center bg-fixed">

            <img className='absolute top-0 left-4 hidden md:block' src="/cta-book-2.png" alt="" />

            <div className='w-full lg:w-auto h-full lg:h-auto flex flex-col justify-center items-center text-center space-y-5'>
                <h1 className='text-3xl font-bold text-white'>Give a Book, Get a Book <br />Join the Book Exchange Buzz </h1>
                <Link href='/allBooks'>
                    <button
                        className='px-7 py-3 rounded-full bg-white font-bold flex items-center gap-3 hover:bg-black hover:text-white hover:border-1 hover:border-white transition duration-700'
                    >Exchange Book  <FaArrowRightLong />
                    </button>
                </Link>
            </div>


            <img className='absolute bottom-0 right-4 hidden md:block' src="/cta-book-1.png" alt="" />

        </div>
    )
}
