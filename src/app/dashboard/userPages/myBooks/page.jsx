'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import MyBooksActions from '@/components/myBooks/MyBooksActions';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/Loading/loadingSpinner';


export default function page() {
  const { user } = useAuth()
  // const [books, setBooks] = useState([])

  // useEffect(() => {
  //   const fetchMyBooks = async () => {
  //     const myBooks = await fetch(`/api/books/myBooks?email=${user?.email}`)
  //     const data =await myBooks.json()
  //     setBooks(data)
  //   }
  //   fetchMyBooks()
  // }, [user?.email])

  const {
    data: books,
    isPending
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async ()=> {
      const myBooks = await fetch(`/api/books/myBooks?email=${user?.email}`)
      const data =await myBooks.json()
      return data
    }
  })

  // console.log(books);

  if(isPending) return <LoadingSpinner />

  return (

    <div className="max-w-11/12 mx-auto mt-16 lg:mt-4 pb-4">
      <div className="text-gray-600 text-2xl font-semibold mb-6">My Books</div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Author Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-4 py-2">{index + 1}.</td>
                <td className="px-4 py-2">
                  <img
                    src={book?.bookImage}
                    alt={book?.bookName}
                    className="w-10 h-12 object-cover rounded-md mx-auto border border-gray-200"
                  />
                </td>
                <td className="px-4 py-2">{book?.bookName}</td>
                <td className="px-4 py-2">{book?.authorName}</td>
                <td className="px-4 py-2">{book?.category}</td>
                <td className="px-4 py-2 ">
                  <MyBooksActions 
                  book={book}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {books?.map((book, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden"
          >
            <div className="flex flex-9 divide-x divide-gray-200">
              {/* Col 1: Image */}
              <div className="flex flex-2 items-center justify-center p-4">
                <img
                  src={book?.bookImage}
                  alt={book?.bookName}
                  className="w-20 h-24 object-cover rounded-md"
                />
              </div>

              {/* Col 2: Information */}
              <div className="p-4 space-y-1 flex-6 text-sm">
                {/* <p><span className="font-semibold">No:</span> {index + 1}</p> */}
                <p><span className="font-semibold">Book:</span> {book?.bookName}</p>
                <p><span className="font-semibold">Author:</span> {book?.authorName}</p>
                <p><span className="font-semibold">Category:</span> {book?.category}</p>
              </div>

              {/* Col 3: Actions (vertical stack) */}
              <MyBooksActions 
               book={book}
              />
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
