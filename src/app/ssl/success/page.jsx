"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";  // fallback
  const tran_id = searchParams.get("tran_id") || "Not found";

  return (
    <div className="p-8 text-center pt-40">
      <h1 className="text-2xl font-bold text-green-600">
        SSLCommerz Payment
      </h1>

      {status === "success" ? (
        <p className="mt-4 text-green-500">
          ✅ Payment Successful! Thank you for your donation.
        </p>
      ) : (
        <p className="mt-4 text-red-500">
          ❌ Payment verification failed
        </p>
      )}

      <p className="mt-2">Transaction ID: {tran_id}</p>

      <Link href="/" className="btn mt-6">
        Go Home
      </Link>
    </div>
  );
}
