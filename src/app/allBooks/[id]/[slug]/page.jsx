import Buttons from '@/components/details/Buttons';
import RelatedBooks from '@/components/details/RelatedBooks';
import Tabs from '@/components/details/Tabs';
import ReadMore from '@/components/modal/ReadMore';
import baseUrl from '@/hooks/BaseUrl';
import React from 'react';
import { RiPokerHeartsLine } from 'react-icons/ri';
import { TbArrowsCross } from 'react-icons/tb';



const DetailesPage =async ({params}) => {

  const {id} =await params
  const axiosInstance = baseUrl()

  const {data} = await axiosInstance.get(`/api/books/${id}`)
  const { authorName, bookImage, bookName, category, description, format, language, publishYear, readFreeText, sku, tags, totalPages} = data || {}

  const readMore =()=>{
     
  }

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
                      
                        <img
                            src={bookImage}
                            alt={bookName}
                            className='w-7/8 h-auto'
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
                        <h2 className="text-4xl font-bold mb-4">{bookName}</h2>
                        <h2 className="text-3xl font-semibold mb-4">{authorName}</h2>
                        <p className="text-gray-600 mb-6">
                            {description}
                        </p>
                        <div className="flex gap-4">
                          {/* read more modal */}
                            <ReadMore 
                            book={data}
                            />

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

                    {/* 8 information */}
                    <div className='border border-gray-200 rounded-2xl p-2'>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  bg-gray-50 p-6 rounded-2xl gap-3">
                            <div >
                                <h3 className="text-xl font-semibold mb-1">SKU:</h3>
                                <p className="text-gray-600">{sku}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Tage</h3>
                                <p className="text-gray-600">{tags}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Total Pages</h3>
                                <p className="text-gray-600">{totalPages}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Pulish Year</h3>
                                <p className="text-gray-600">{publishYear}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Category</h3>
                                <p className="text-gray-600">{category}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Format</h3>
                                <p className="text-gray-600">{format}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Language</h3>
                                <p className="text-gray-600">{language}</p>
                            </div>
                            <div >
                                <h3 className="text-xl font-semibold mb-1">Century</h3>
                                <p className="text-gray-600">United States</p>
                            </div>
                        </div>
                    </div>

                    {/* 4 information */}
                    <div className='border border-gray-200 rounded-2xl p-2 my-6'>
                        <div className="grid grid-cols-2  bg-gray-50 p-6 rounded-2xl gap-3">
                            <div className='flex gap-4 items-start'>
                                <p className='text-[#FF7B6B]'><TbArrowsCross /></p>
                                <p className="text-gray-600">Free shipping orders from $150</p>
                            </div>
                            <div className='flex gap-4 items-start'>
                                <p className='text-[#FF7B6B]'><TbArrowsCross /></p>
                                <p className="text-gray-600">Free shipping orders from $150</p>
                            </div>
                            <div className='flex gap-4 items-start'>
                                <p className='text-[#FF7B6B]'><TbArrowsCross /></p>
                                <p className="text-gray-600">Free shipping orders from $150</p>
                            </div>
                            <div className='flex gap-4 items-start'>
                                <p className='text-[#FF7B6B]'><TbArrowsCross /></p>
                                <p className="text-gray-600">Free shipping orders from $150</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* tabs */}
            <Tabs 
            book={data}
            />

            {/* Related Books */}
            <RelatedBooks />

        </div>
    );
};

export default DetailesPage;