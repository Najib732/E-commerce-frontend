"use client";

import { useState } from "react";
import axios from "axios";
import { useToken } from "@/app/TokenContext"; // TokenContext থেকে import

export default function OrderDetails() {
  const { token } = useToken();

  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSearch = async () => {
    if (!orderId.trim()) return;

    try {
      const res = await axios.get(`http://localhost:3000/sell/status/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setOrderStatus(res.data);
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">Check Order Status</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={handleChange}
          className="flex-1 border rounded px-4 py-2 text-black placeholder-black"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {orderStatus && (
        <div className="bg-gray-100 p-4 rounded text-black">
          <pre className="whitespace-pre-wrap">{JSON.stringify(orderStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
