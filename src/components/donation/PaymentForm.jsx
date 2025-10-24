'use client'

import React, { useState } from 'react'
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'
import Swal from 'sweetalert2'

export default function PaymentForm({ onClose, setAmount, name, email, phone}) {
   

    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)

    // Donor info state
    


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
                Swal.fire({
                    title: "Processing...",
                    text: "Please wait while we finalize your donation.",
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });

                //  save donation to backend
                const donarData = {
                    name,
                    email,
                    phone,
                    amount: paymentIntent?.amount / 100,
                    transactionId: paymentIntent?.id,
                    method: 'stripe',
                    date: new Date().toLocaleDateString(),
                };

                const res = await fetch("/api/moneyDonation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(donarData),
                });

                const savedDonation = await res.json();

                if (savedDonation?.insertedId) {
                    // generate receipt
                    const receiptRes = await fetch("/api/generateReceipt", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(donarData),
                    });

                    if (receiptRes?.ok) {
                        const blob = await receiptRes.blob();
                        const url = URL.createObjectURL(blob);

                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `receipt-${donarData.transactionId}.pdf`;
                        link.click();
                    } else {
                        console.error("Failed to generate receipt");
                    }
                }

                Swal.fire({
                    icon: "success",
                    title: "🎉 Thank you!",
                    text: "Your donation was successful and the receipt has been downloaded.",
                    confirmButtonText: "Close",
                });

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

            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || loading || !elements}
                className="btn btn-primary w-full mt-4 rounded-xl"
            >
                {loading ? "Processing..." : "Confirm"}
            </button>
        </form>
    )
}
