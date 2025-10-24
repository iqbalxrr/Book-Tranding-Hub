'use client'
import Link from 'next/link';
import React, { useState } from 'react'

export default function SslCommerz({ name, email, phone, amount }) {
  const [loading, setLoading] = useState(false);

  const [methods, setMethods] = useState(null)
  const [showModal, setShowModal] = useState(false)

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

      const { data } = await res.json();

      const paymentMethods = (data?.desc)
      setMethods(paymentMethods)
      setShowModal(true)
      // const m = dd?.map(d => console.log(d?.logo))

      // console.log(m);

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

  // console.log(methods);

  return (
    <div>
      <button
        onClick={startPayment}
        className={`btn btn-primary w-full mt-4 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : 'Pay with SSLCommerz'}
      </button>

      {/* Modal of modals*/}
      {showModal && methods && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">

            <div className='flex justify-between items-center mb-4'>
              <h2 className="text-xl font-semibold">Select Payment Method</h2>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm"
              >
                X
              </button>
            </div>


            <div className="grid grid-cols-5 gap-2">
              {methods?.map((method, idx) =>
                method?.redirectGatewayURL ? (
                  <Link
                    href={method?.redirectGatewayURL}
                    key={idx}
                    className="flex justify-center items-center hover:scale-110 transition duration-300 cursor-pointer"
                  >
                    {method?.logo && (
                      <img
                        src={method?.logo}
                        alt={method?.name || "Payment Method"}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
