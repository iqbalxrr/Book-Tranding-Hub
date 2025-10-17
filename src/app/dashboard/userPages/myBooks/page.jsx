
"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MyBooksActions from '@/components/myBooks/MyBooksActions';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/Loading/loadingSpinner';
import { BookMarked, UserCircle2, Tag } from 'lucide-react';

export default function MyBooksPage() {
  const { user } = useAuth();

  const {
    data: books,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const myBooks = await fetch(`/api/books/myBooks?email=${user?.email}`);
      const data = await myBooks.json();
      return data;
    },
    enabled: !!user?.email, // Ensure query only runs when user email is available
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading your books. Please try again later.
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">No books found.</h2>
        <p className="mt-2 text-gray-500">
          It looks like you haven't added any books yet.
        </p>
        <p className="text-blue-500 mt-4 font-medium">Start adding your books to the collection! 📚</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <BookMarked className="w-7 h-7 mr-3 text-indigo-500" /> My Books
        <span className="ml-3 text-sm font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
          {books.length} Total
        </span>
      </h2>

      {/* Desktop Table (for md and up) */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
        <table className="min-w-full text-sm text-center text-gray-600 divide-y divide-gray-200">
          <thead className="bg-gray-50  uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Book Cover</th>
              <th className="px-6 py-3">Title & Author</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((book, index) => (
              <tr
                key={book._id || index}
                className="hover:bg-indigo-50/50 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 font-medium">{index + 1}.</td>
                <td className="px-6  py-4">
                  <img
                    src={book?.bookImage || 'https://via.placeholder.com/60x80?text=Book'}
                    alt={book?.bookName}
                    className="w-12 h-16 object-cover mx-auto rounded-md shadow-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-800 line-clamp-1">{book?.bookName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">By: {book?.authorName}</div>
                </td>
                <td className="px-6 py-4 capitalize">{book?.category}</td>
                <td className="px-6 py-4">
                  <MyBooksActions book={book} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout (for sm and below) */}
      <div className="grid gap-4 md:hidden">
        {books.map((book, index) => (
          <div
            key={book._id || index}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 transition hover:shadow-xl"
          >
            <div className="flex items-start mb-4">
              <img
                src={book?.bookImage || 'https://via.placeholder.com/60x80?text=Book'}
                alt={book?.bookName}
                className="w-16 h-20 object-cover rounded-lg shadow-md mr-4 flex-shrink-0"
              />
              <div className="flex-grow">
                <p className="font-bold text-lg text-gray-800 line-clamp-2">
                  {book?.bookName}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  <UserCircle2 className="inline w-3 h-3 mr-1" /> By: {book?.authorName}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 capitalize">
                  <Tag className="inline w-3 h-3 mr-1" /> Category: {book?.category}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <MyBooksActions book={book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}