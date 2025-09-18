import React from 'react';
import { FaRegEye } from "react-icons/fa6";
import { TbArrowsCross } from "react-icons/tb";
import { RiPokerHeartsLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";

const Featured = () => {
    return (
        <div className='my-16 px-7 md:px-14 lg:px-20 mx-auto space-y-10'>
            {/* heading */}
            <div className='flex justify-between items-center'>
                <h1 className='text-5xl font-bold'>Featured Books</h1>
                <div >
                    <button className='flex items-center gap-3 rounded-full font-bold py-3 px-5 text-white bg-[#FF7B6B] transition duration-700'>
                        Explore More 
                         <FaArrowRightLong />
                        </button>
                   
                </div>
            </div>

        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>

            <div className='space-y-6 group relative'>
                {/* image */}
                <div className='flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md  '>
                    <img className='h-[213px] transition-transform duration-500 ease-in-out transform group-hover:scale-110'
                        src='/book1.png' alt="book" />
                </div>
                   {/* Icons (hidden by default, visible on hover) */}
                <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <RiPokerHeartsLine />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <TbArrowsCross />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                       <FaRegEye />
                    </button>
                </div>

                {/* image information */}
                <div className='space-y-2.5'>
                    <h4 className='text-gray-400 font-bold'>Author Name</h4>
                    <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                            <p>Reviewr Name</p>
                        </div>
                        <p>Rating</p>
                    </div>
                </div>
                {/* button */}
                <button
                    className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

              <div className='space-y-6 group relative'>
                {/* image */}
                <div className='flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md  '>
                    <img className='h-[213px] transition-transform duration-500 ease-in-out transform group-hover:scale-110'
                        src='/book2.png' alt="book" />
                </div>
                   {/* Icons (hidden by default, visible on hover) */}
                <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <RiPokerHeartsLine />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <TbArrowsCross />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                       <FaRegEye />
                    </button>
                </div>

                {/* image information */}
                <div className='space-y-2.5'>
                    <h4 className='text-gray-400 font-bold'>Author Name</h4>
                    <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                            <p>Reviewr Name</p>
                        </div>
                        <p>Rating</p>
                    </div>
                </div>
                {/* button */}
                <button
                    className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

             <div className='space-y-6 group relative'>
                {/* image */}
                <div className='flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md  '>
                    <img className='h-[213px] transition-transform duration-500 ease-in-out transform group-hover:scale-110'
                        src='/book3.png' alt="book" />
                </div>
                   {/* Icons (hidden by default, visible on hover) */}
                <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <RiPokerHeartsLine />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <TbArrowsCross />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                       <FaRegEye />
                    </button>
                </div>

                {/* image information */}
                <div className='space-y-2.5'>
                    <h4 className='text-gray-400 font-bold'>Author Name</h4>
                    <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                            <p>Reviewr Name</p>
                        </div>
                        <p>Rating</p>
                    </div>
                </div>
                {/* button */}
                <button
                    className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

            <div className='space-y-6 group relative'>
                {/* image */}
                <div className='flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md  '>
                    <img className='h-[213px] transition-transform duration-500 ease-in-out transform group-hover:scale-110'
                        src='/book4.png' alt="book" />
                </div>
                   {/* Icons (hidden by default, visible on hover) */}
                <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <RiPokerHeartsLine />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                        <TbArrowsCross />
                    </button>
                    <button className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border-1 border-gray-400 hover:bg-[#FF7B6B]">
                       <FaRegEye />
                    </button>
                </div>

                {/* image information */}
                <div className='space-y-2.5'>
                    <h4 className='text-gray-400 font-bold'>Author Name</h4>
                    <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                            <p>Reviewr Name</p>
                        </div>
                        <p>Rating</p>
                    </div>
                </div>
                {/* button */}
                <button
                    className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>



        </div>
        </div>
    );
};

export default Featured;