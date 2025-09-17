"use client";

import { useState } from "react";
import axios from "axios";
import { useToken } from "@/app/TokenContext";

export default function VoucherDetails() {
    const { token } = useToken();
  const [voucherNo, setVoucherNo] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setVoucherNo(e.target.value);
  };

  const handleSearch = async () => {
    if (!voucherNo.trim()) return;

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      
      const res = await axios.get(`http://localhost:3000/sell/voucher/${voucherNo}`,{
        headers: { Authorization: `Bearer ${token}` }, 
         withCredentials: true,
      }
      );
      setOrderData(res.data);
    } catch (err) {
      console.error("Error fetching voucher:", err);
      setError("Voucher not found or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Check Order by Voucher</h1>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter Voucher Number"
            value={voucherNo}
            onChange={handleChange}
            className="flex-1 border rounded px-4 py-2 text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {orderData && (
          <div className="space-y-6">
            {/* Voucher & Total */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <p className="text-gray-700 font-semibold">
                Voucher No: <span className="text-gray-900">{orderData.voucher_no}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Total Price: <span className="text-green-600">${orderData.total_price}</span>
              </p>
            </div>

            {/* Orders */}
            {orderData.orders.map((order, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{order.product_name}</h2>
                <p className="text-gray-600 mb-1">
                  Quantity: <span className="text-gray-800">{order.quantity}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Price: <span className="text-green-600">${order.product_price}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Order ID: <span className="text-gray-800">{order.order_id}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Order Date: <span className="text-gray-800">{new Date(order.order_date).toLocaleString()}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Customer Name: <span className="text-gray-800">{order.user_name}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Phone: <span className="text-gray-800">{order.user_phone}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Email: <span className="text-gray-800">{order.user_email}</span>
                </p>
                <p className="text-gray-600 font-semibold mt-2">
                  Status: <span className={`font-bold ${order.order_status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
                    {order.order_status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
