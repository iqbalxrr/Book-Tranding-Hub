'use client'

import React, { useState } from 'react'
import BookDonationForm from './BookDonationForm'

export default function BookDonationButton() {
    const [bookDonate, setBookDonate] = useState(false)

    return (
        <div>
            <button
                onClick={() => setBookDonate(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-xl">
                Donate a Book
            </button>

            {
                bookDonate &&
                <BookDonationForm
                    onClose={() => setBookDonate(false)}
                />
            }

        </div>
    )
}
