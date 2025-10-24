'use client'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements
} from '@stripe/react-stripe-js'
import { createPortal } from 'react-dom'
import PaymentForm from './PaymentForm'
import { useAuth } from '@/context/AuthContext'
import SslCommerz from './SslCommerz'



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function DonationModal({ isOpen, onClose, amount, setAmount }) {

  const { user } = useAuth()
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('stripe')

  const [name, setName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!amount || !isOpen) return

    const createPaymentIntent = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })
        const data = await res.json()
        // console.log(data);
        setClientSecret(data?.clientSecret)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [amount, isOpen])

  if (!isOpen) return null
  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        onClick={onClose}
        className="absolute inset-0"
      />
      <div
        className="relative bg-white/95 rounded-2xl shadow-2xl w-11/12 max-w-lg max-h-[90vh] overflow-y-auto p-8 animate-fadeIn border border-indigo-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 btn btn-circle btn-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-500 border-none"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2
            className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            💝 Donate {amount}
          </h2>
          <p className="text-gray-500 mt-2">
            Secure payment powered by Stripe.
          </p>
        </div>


        {/* Donor Info Fields */}
        <div className="space-y-3 mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded-xl"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full rounded-xl"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
        {/* radio button */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="stripe"
              checked={method === "stripe"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Stripe
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="ssl"
              checked={method === "ssl"}
              onChange={(e) => setMethod(e.target.value)}
            />
            SSLCommerz
          </label>
        </div>


        {method === "stripe" ? (
          loading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : clientSecret ? (
            <Elements
              key={clientSecret}
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <PaymentForm
                setAmount={setAmount}
                onClose={onClose}
                name={name}
                email={email}
                phone={phone}
              />
            </Elements>
          ) : (
            <p className="text-center text-gray-500">Preparing payment...</p>
          )
        ) : method === "ssl" ? (
          <SslCommerz
            name={name}
            email={email}
            phone={phone}
            amount={amount}
          />
        ) : null}

      </div>
    </div>,
    document.body
  )
}


