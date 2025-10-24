'use client'
import React, { useState } from 'react'

export default function SslCommerz({ name, email, phone, amount }) {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);

    const donationData = { 
      amount: parseInt(amount),
      name: name || "unknown",
      email: email || "unknown@gmail.com", 
      phone: phone || '01945454535', 
      paymentMethod: "ssl commerz" 
    }

    try {
      const res = await fetch('/api/ssl/init-sslcommerz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData)
      });

      const{ data }= await res.json();

      // console.log(data);

      // if (data?.url) {
      //   window.location.replace(data?.url); // redirect
      // } else {
      //   console.error(data);
      //   alert("Failed to start payment");
      // }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>  
      <h1>ফিচারটি আপডেটের কাজ চলছে. আগামীকাল থেকে আবার ব্যবহার করতে পারবেন।</h1>   
    <button
      onClick={startPayment}
      disabled={true}
      className={`btn btn-primary w-full mt-4 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Processing...' : 'Pay with SSLCommerz'}
    </button>
    </div>
  )
}
