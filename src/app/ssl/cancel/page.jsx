"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="p-8 text-center pt-40">
      <h1 className="text-2xl font-bold text-yellow-600">Payment Cancelled ⚠️</h1>
      <p className="mt-4">
        You have cancelled the payment process. If this was a mistake, please try again.
      </p>
      <Link href="/" className="btn mt-6">
        Go Home
      </Link>
    </div>
  );
}
