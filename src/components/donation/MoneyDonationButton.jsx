"use client"

import React, { useState } from 'react'
import MoneyDonationOptions from './MoneyDonationOptions'

export default function MoneyDonationButton() {
const [amount, setAmount] = useState('')
const [donate, setDonate] = useState(false)

  const handleDonate = (e) => {
    e.preventDefault()
    // You can connect this to your Stripe or PayPal donation route
    // alert(`Thanks for donating $${amount}! ❤️`)
    setDonate(true)
  }


  return (
    <div>
        <form onSubmit={handleDonate} className="flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-xl"
            >
              Donate Now
            </button>
          </form>

    {
        donate && 
        <MoneyDonationOptions
        amount={amount} 
        onClose={()=>setDonate(false)}
        />
    }
    </div>
  )
}
