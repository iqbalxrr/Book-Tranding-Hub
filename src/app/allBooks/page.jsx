import React from 'react'
import BookCard from '@/components/details/BookCard';
import baseUrl from '@/hooks/BaseUrl'


export default async function page() {

    // const axiosInstance = baseUrl()
    // const { data } = await axiosInstance.get('/api/books')
    // console.log(data);

    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
        { cache: "no-store" }
    );

    const {books} = await res.json()

// console.log(books);

    return (
        <div className='container mx-auto mt-35'>

            <div
                className='grid grid-cols-3 gap-x-6 gap-y-14'
            >
                {
                    books?.map(book => {
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