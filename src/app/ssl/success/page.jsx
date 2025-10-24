'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('success');
  const [tranId, setTranId] = useState('Not found');

  useEffect(() => {
    setStatus(searchParams.get('status') || 'success');
    setTranId(searchParams.get('tran_id') || 'Not found');
  }, [searchParams]);

  return (
    <div className="p-8 text-center min-h-[90vh] pt-46">
      <h1 className="text-2xl font-bold text-green-600">
        SSLCommerz Payment
      </h1>

      {status === 'success' ? (
        <p className="mt-4 text-green-500">
          ✅ Payment Successful! Thank you for your donation.
        </p>
      ) : (
        <p className="mt-4 text-red-500">
          ❌ Payment verification failed
        </p>
      )}

      <p className="mt-2">Transaction ID: {tranId}</p>

      <Link href="/" className="btn mt-6">
        Go Home
      </Link>
    </div>
  );
}
