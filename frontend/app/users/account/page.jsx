// app/users/buttons/page.tsx
'use client'; // client component for button clicks

import { useRouter } from 'next/navigation';

export default function ButtonPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8  text-black">Choose an Action</h1>

      <div className="flex flex-col space-y-4">
        <button
          onClick={() => router.push('/users/details')}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          View User Details
        </button>

        <button
          onClick={() => router.push('/users/account/orderDetails')}
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition"
        >
          orderDetails
        </button>

        <button
          onClick={() => router.push('/users/account/vouchar')}
          className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Voucher
        </button>
      </div>
    </div>
  );
}
