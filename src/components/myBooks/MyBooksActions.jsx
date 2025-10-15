'use client'
import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import UpdateForm from '../modal/UpdateForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export default function MyBooksActions({ book }) {

    const [isUpdate, setIsUpdate] = useState(false)
    const querryClient = useQueryClient()

    const deleteBookMutation = useMutation({
        mutationKey: ['deletedBook', book?._id],
        mutationFn: async ({ id }) => {
            const res = await fetch(`/api/books/myBooks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res?.json()
            if(data?.success){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        },
        onSuccess: () => {
            querryClient.invalidateQueries("myBooks")
        }
    })



    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBookMutation.mutate({ id: book?._id })
            }
        });
    }



    return (
        <div>
            {/* table actions */}
            <div className='hidden md:block'>
                <div className='flex justify-center gap-2'>
                    <button
                        onClick={() => setIsUpdate(true)}
                        className="p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition">
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* card actions */}

            <div className="flex flex-col items-center flex-1 justify-center gap-2 p-4 md:hidden">
                <button
                    onClick={() => setIsUpdate(true)}
                    className="p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition flex items-center justify-center">
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition  flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {
                isUpdate &&
                <UpdateForm
                    book={book}
                    onClose={() => setIsUpdate(false)}
                />
            }

        </div>
    )
}
