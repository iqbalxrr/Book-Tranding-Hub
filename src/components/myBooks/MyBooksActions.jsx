'use client'
import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import UpdateForm from '../modal/UpdateForm';

export default function MyBooksActions({book}) {

    const [isUpdate, setIsUpdate] = useState(false)

    

    const handleDelete =()=>{
        console.log("object Delete",book);
    }



    return (
        <div>
            {/* table actions */}
            <div className='hidden md:block'>
                <div className='flex justify-center gap-2'>
                    <button 
                    onClick={()=> setIsUpdate(true)}
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
                onClick={()=> setIsUpdate(true)}
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
                onClose={()=>setIsUpdate(false)}
            />
        }

        </div>
    )
}
