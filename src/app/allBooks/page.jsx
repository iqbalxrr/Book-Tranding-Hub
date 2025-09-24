

import BookCard from '@/components/details/BookCard';
import HoverButtons from '@/components/details/HoverButtons';
import baseUrl from '@/hooks/BaseUrl'
import React from 'react'


export default async function page() {

    const axiosInstance = baseUrl()

    const { data } = await axiosInstance.get('/api/books')

    // console.log(data);


    return (
        <div className='container mx-auto mt-35'>

            <div
                className='grid grid-cols-3 gap-6 '
            >
                {
                    data.map(book => {
                        return (
                            <div
                                key={book?._id}
                                className="space-y-6 group relative">
                                {/* Image */}
                                <div className="flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md">
                                    <img
                                        className="h-[213px]  transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                                        src={book?.bookImage}
                                        alt={book?.bookName}
                                    />
                                </div>

                                {/* Hover actions */}
                                <HoverButtons 
                                book={book}
                                />

                                {/* Details */}
                                <div className="space-y-2.5">
                                    <h4 className="text-gray-400 font-bold">{book?.authorName}</h4>
                                    <h2 className="text-2xl font-bold hover:text-[#FF7B6B] transition duration-700">
                                        {book?.bookName}
                                    </h2>
                                    {/* <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 rounded-full"
              src={book?.reviewerImg}
              alt={book?.reviewer}
            />
            <p>{book?.reviewer}</p>
          </div>
          <p>{book?.rating}</p>
        </div> */}
                                </div>

                                {/* Action */}
                                <button className="w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700">
                                    Exchange Book
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
