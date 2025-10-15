'use client'

import { useAuth } from '@/context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

export default function UpdateForm({ book, onClose }) {
    const { user } = useAuth()
    const querryClient = useQueryClient()

    // console.log(book);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // set default values when book data is available
    useEffect(() => {
        if (book) {
            reset({
                bookName: book?.bookName || '',
                authorName: book?.authorName || '',
                bookImage: book?.bookImage || '',
                category: book?.category || '',
                location: book?.location || 'Dhaka, Bangladesh',
                tags: book?.tags || '',
                totalPages: book?.totalPages || '',
                publishYear: book?.publishYear || '',
                format: book?.format || '',
                language: book?.language || '',
                readFreeText: book?.readFreeText || '',
                description: book?.description || '',
            })
        }
    }, [book, reset])

    const updateBookMutation = useMutation({
        mutationKey: ["updateBooks"],
        mutationFn: async ({ id, updatedData }) => {
            const res = await fetch(`/api/books/myBooks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            })

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Failed to update book: ${err}`);
            }

            const data = await res.json()
            return data
        },
        onSuccess: () => {
            querryClient.invalidateQueries("myBooks")
            onClose()
        }
    })

    const handleUpdate = async (data) => {
        const bookData = {
            ...data,
            bookOwner: user?.email,
            status: book?.status || 'available'
        }

        updateBookMutation.mutate({ id: book?._id, updatedData: bookData })
    };

    console.log('');

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose} // clicking outside closes modal
        >
            {/* stop propagation so clicking inside modal doesn't close it */}
            <div
                className="bg-white p-6 rounded-xl w-11/12 max-w-3xl mx-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex justify-between items-center mb-3'>
                    <h2 className='text-xl md:text-2xl font-bold text-[#FF7B6B]'>Update Book's Data</h2>
                    <button
                        onClick={onClose}
                        className='rounded-full font-bold py-1 px-5 text-[#FF7B6B] bg-[#FFEFEF] border border-[#FF7B6B] hover:bg-[#FF7B6B] hover:text-[#FFEFEF] transition duration-700'>X</button>
                </div>
                <form
                    onSubmit={handleSubmit(handleUpdate)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Book Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Book Name</label>
                        <input
                            type="text"
                            {...register("bookName", { required: "Book name is required" })}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.bookName && (
                            <p className="text-red-500 text-xs mt-1">{errors.bookName.message}</p>
                        )}
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Author Name</label>
                        <input
                            type="text"
                            {...register("authorName", { required: "Author name is required" })}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.authorName && (
                            <p className="text-red-500 text-xs mt-1">{errors.authorName.message}</p>
                        )}
                    </div>

                    {/* image */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Image URL</label>
                        <input
                            type="text"
                            {...register("bookImage", { required: "image is required" })}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Kids Toys">Kids Toys</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Location</label>
                        <input
                            type="text"
                            {...register("location", { required: "Location is required" })}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                            placeholder="Dhaka, Bangladesh"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Tags</label>
                        <select
                            {...register("tags")}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Tag</option>
                            <option value="Design">Design</option>
                            <option value="Low Book">Low Book</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>

                    {/* Total Pages */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Total Pages</label>
                        <input
                            type="number"
                            {...register("totalPages")}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Publish Year */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Publish Year</label>
                        <input
                            type="number"
                            {...register("publishYear")}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Format */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Format</label>
                        <select
                            {...register("format")}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Format</option>
                            <option value="Hardcover">Hardcover</option>
                            <option value="Paperback">Paperback</option>
                            <option value="eBook">eBook</option>
                            <option value="Audiobook">Audiobook</option>
                        </select>
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Language</label>
                        <select
                            {...register("language")}
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>

                    {/* Read Free Text */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Read Free Text</label>
                        <textarea
                            {...register("readFreeText")}
                            rows="3"
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="4"
                            className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Submit / Close Buttons */}
                    <div className="md:col-span-2 flex justify-between items-center mt-4">
                        <button
                            type="button"
                            className="rounded-full font-bold py-2 px-8 text-[#FF7B6B] bg-[#FFEFEF] border border-[#FF7B6B] hover:bg-[#FF7B6B] hover:text-[#FFEFEF] transition duration-700"
                            onClick={onClose}
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            className="rounded-full font-bold py-2 px-8 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-500"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
