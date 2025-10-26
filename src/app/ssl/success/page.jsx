"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-8 text-center min-h-[90vh] pt-40">
      <h1 className="text-2xl font-bold text-green-600">
        SSLCommerz Payment
      </h1>

      <p className="mt-4 text-green-500">
        ✅ Payment Successful! Thank you for your donation.
      </p>

      <Link href="/" className="btn mt-6">
        Go Home
      </Link>
    </div>
  );
}
