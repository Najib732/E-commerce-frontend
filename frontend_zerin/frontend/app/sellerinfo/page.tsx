"use client";

import { useRouter } from "next/navigation";

export default function SellerInfoLanding() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-900">
      <div className="text-center bg-gray-100 px-8 py-10 rounded-2xl shadow-lg space-y-6 w-80">
        
        
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          InternWave
        </h1>
        <p className="text-sm text-gray-600">
          Ecommerce Platform 
        </p>

      
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => router.push("sellerinfo/login")}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm font-semibold text-white"
          >
            Log In
          </button>

          <button
            onClick={() => router.push("sellerinfo/registration")}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 transition text-sm font-semibold text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
