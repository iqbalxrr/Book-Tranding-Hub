"use client";

import Link from "next/link";

export default function FailPage() {
  return (
<<<<<<< HEAD
    <div className="p-8 text-center min-h-[90vh] pt-46">
=======
    <div className="p-8 text-center pt-40">
>>>>>>> 48999ef (ssl commerz payment getway)
      <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="mt-4">
        Unfortunately your payment could not be completed. Please try again.
      </p>
      <Link href="/" className="btn mt-6">
        Go Home
      </Link>
    </div>
  );
}
