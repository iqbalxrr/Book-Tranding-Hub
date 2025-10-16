import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function MoneyDonationOptions({amount,onClose}) {
 const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-600">Donate a Book</h2>
          <button
            onClick={onClose}
            className="rounded-full font-bold py-1 px-5 text-indigo-600 bg-indigo-50 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500"
          >
            X
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Fields Here */}
          <div>
            <label className="block text-sm font-semibold mb-1">Book Title</label>
            <input
            placeholder={amount}
              type="text"
              className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </form>
      </div>
    </div>,
    document.body // 👈 renders directly inside <body>, full width guaranteed
  )
}
