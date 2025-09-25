
import React from 'react'
import BookCard from '@/components/details/BookCard';
import baseUrl from '@/hooks/BaseUrl'


export default async function page() {

    const axiosInstance = baseUrl()

    const { data } = await axiosInstance.get('/api/books')

    // console.log(data);


    return (
        <div className='container mx-auto mt-35'>

            <div
                className='grid grid-cols-3 gap-x-6 gap-y-14'
            >
                {
                    data.map(book => {
                        return (
                           <BookCard
                           key={book?._id}
                           book={book}
                           />
                        )
                    })
                }
            </div>
        </div>
    )
}
