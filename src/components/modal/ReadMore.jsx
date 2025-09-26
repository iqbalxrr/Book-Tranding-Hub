// components/BookModal.tsx (client component)
"use client";
import { useState } from "react";

export default function BookModal({ book }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Open Modal</button> */}
            <button
                onClick={() => setOpen(true)}
                className="rounded-full font-bold py-3 px-8 text-[#FF7B6B] bg-[#FFEFEF] border border-[#FF7B6B] hover:bg-[#FF7B6B] hover:text-[#FFEFEF] transition duration-700">
                Read A Little
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-9/12 lg:max-w-xl mx-auto ">
                        <h2 className="mt-5"><span className="font-bold">Book Name:</span> {book.bookName}</h2>
                        <p className="mt-3.5"><span className="font-bold">Read For Free:</span> {book?.readFreeText}</p>
                        <div className="mt-3 flex justify-end">
                            <button
                        className="btn btn-sm rounded-sm"
                        onClick={() => setOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

