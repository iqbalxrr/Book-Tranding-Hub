
import Link from 'next/link';
import React from 'react';
import Buttons from './component/Buttons';
import Image from 'next/image';
import { RiPokerHeartsLine } from 'react-icons/ri';
import { TbArrowsCross } from 'react-icons/tb';


const DetailesPage = () => {


    return (
        <div className='mt-30 space-y-24'>
            {/* header */}
            <div className='flex justify-center items-center w-full h-[250px] bg-[url(/detailsBG.jpg)]'>
                <div className='space-y-3'>
                    <h1 className='text-3xl lg:text-4xl font-bold'>Book Detailes</h1>
                    <Buttons />
                </div>
            </div>

            {/* description */}
            <div className='flex px-4 lg:px-16 gap-12 flex-col md:flex-row'>
                {/* left div  */}
                <div className='flex-4/9'>
                    {/* image div */}
                    <div className='flex justify-center bg-gray-50 w-full px-15 py-8 md:py-12 border border-gray-300 rounded-2xl'>
                        {/* <Image
                            src='/book2.png'
                            alt='book'
                            className='object-cover' // or "object-contain"
                            fill                // takes up parent width & height

                        /> */}
                        <img
                            src='/book2.png'
                            alt='book'
                            className='w-7/8 h-auto '
                        />
                    </div>

                    {/* similar books */}
                    <div className='grid grid-cols-3 gap-4 mt-8'>

                        <div className='flex   justify-center bg-gray-50   px-2 py-2 border border-gray-300 rounded-md'>
                            <img
                                src='/book4.png'
                                alt='book'
                                className='w-[72px] h-[102px]'
                            />
                        </div>
                        <div className='flex   justify-center bg-gray-50   px-2 py-2 border border-gray-300 rounded-md'>
                            <img
                                src='/book2.png'
                                alt='book'
                                className='w-[72px] h-[102px]'
                            />
                        </div>
                        <div className='flex   justify-center bg-gray-50   px-2 py-2 border border-gray-300 rounded-md'>
                            <img
                                src='/book4.png'
                                alt='book'
                                className='w-[72px] h-[102px]'
                            />
                        </div>
                        <div className='flex   justify-center bg-gray-50   px-2 py-2 border border-gray-300 rounded-md'>
                            <img
                                src='/book3.png'
                                alt='book'
                                className='w-[72px] h-[102px]'
                            />
                        </div>
                        <div className='flex   justify-center bg-gray-50   px-2 py-2 border border-gray-300 rounded-md'>
                            <img
                                src='/book1.png'
                                alt='book'
                                className='w-[72px] h-[102px]'
                            />
                        </div>

                    </div>
                </div>

                {/* right div  */}
                <div className='flex-5/9'>

                    <div className="py-6">
                        <h2 className="text-4xl font-bold mb-4">This is a Heading</h2>
                        <p className="text-gray-600 mb-6">
                            This is a paragraph with some description text. You can customize it as
                            needed for your project. This is a paragraph with some description text. You can customize it as
                            needed for your project. This is a paragraph with some description text. You can customize it as
                            needed for your project.
                        </p>
                        <div className="flex gap-4">
                            <button className="rounded-full font-bold py-3 px-8 text-[#FF7B6B] bg-[#FFEFEF] border border-[#FF7B6B] hover:bg-[#FF7B6B] hover:text-[#FFEFEF] transition duration-700">
                                Read A Little
                            </button>
                            <button className="rounded-full font-bold py-3 px-8 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-700">
                                Exchange
                            </button>
                        </div>
                    </div>
                    {/* buttons  */}
                    <div className='flex items-center gap-3'>
                        <button className="w-12 h-12 flex justify-center items-center text-white hover:text-[#FF7B6B] transition duration-700 p-2 rounded-full  bg-[#FF7B6B] hover:bg-[#FFEFEF] border hover:border-[#FF7B6B]">
                            <RiPokerHeartsLine />
                        </button>
                        <button className="w-12 h-12 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border border-gray-400 hover:bg-[#FF7B6B]">
                            <TbArrowsCross />
                        </button>
                    </div>

                    <hr className="my-6 border-t border-gray-200" />

                    <div className='border border-gray-200 rounded-2xl p-2'>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  bg-gray-50 p-6 rounded-2xl">
                            <div >
                                <h3 className="text-xl font-semibold mb-2">SKU:</h3>
                                <p className="text-gray-600">FTC1020B65D</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Tage</h3>
                                <p className="text-gray-600">Low Book</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Total Pages</h3>
                                <p className="text-gray-600">360</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Pulish Year</h3>
                                <p className="text-gray-600">2023</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Category</h3>
                                <p className="text-gray-600">Kids Toys</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Format</h3>
                                <p className="text-gray-600">Hardcover</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Language</h3>
                                <p className="text-gray-600">English</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-2">Century</h3>
                                <p className="text-gray-600">United States</p>
                            </div>


                        </div>
                    </div>

                </div>

            </div>


            {/* tabs */}
            <div></div>
        </div>
    );
};

export default DetailesPage;