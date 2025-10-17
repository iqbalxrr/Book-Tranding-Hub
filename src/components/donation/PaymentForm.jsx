'use client'

import React, { useState } from 'react'
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/AuthContext'

export default function PaymentForm({ onClose, setAmount }) {
    const { user } = useAuth()

    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)

    // Donor info state
    const [name, setName] = useState(user?.displayName || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setLoading(true)

        try {
            const result = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            })

            //   console.log("Stripe confirmPayment result:", result)

            const { error, paymentIntent } = result

            if (error) {
                // console.log(" Payment error:", error)
                Swal.fire(`Payment failed: ${error?.message}`)
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                // console.log("✅ Payment successful:", paymentIntent)
                Swal.fire("🎉 Thank you! Your donation was successful!")

                //  save donation to backend
                const donarData = {
                    name,
                    email,
                    phone,
                    amount: paymentIntent.amount / 100,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleDateString(),
                }

                // console.log(donarData);
                await fetch("/api/moneyDonation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(donarData),
                })

                // Reset state and close modal
                setAmount("")
                setName("")
                setEmail("")
                setPhone("")
                onClose()

            } else {
                console.log("Payment status:", paymentIntent?.status)
            }

        } catch (err) {
            console.log("Stripe confirmation failed:", err)
        } finally {
            setLoading(false)
        }
    }

    

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Info Fields */}
            <div className="space-y-3">
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

            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="btn btn-primary w-full mt-4 rounded-xl"
            >
                {loading ? "Processing..." : "Confirm"}
            </button>
        </form>
    )
}
