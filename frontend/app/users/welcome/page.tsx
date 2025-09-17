"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useToken } from "../../TokenContext";
import NotificationsPage from "@/components/ NotificationBar";


type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
};

export default function ProductsPage() {
  const { token } = useToken(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sell", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const data = res.data;
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    if (!products.length) fetchProducts();
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      fetchProducts();
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/sell/id/${value}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const data = res.data;
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      console.error("Axios error response:", err.response);
      console.error("Axios error message:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4 md:mb-0">
          🛍️ Dashboard
        </h1>
        {/* Notifications Card */}
        <div className="w-full md:w-auto">
          <div className="relative inline-block">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg mb-2 flex items-center">
                🔔 Notifications
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  New
                </span>
              </h2>
              <NotificationsPage />
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="border rounded px-4 py-2 w-full max-w-md mx-auto mb-10 block text-black shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
          >
            <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
              📦
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition truncate">
                  {product.product_name}
                </h2>
                <p className="mt-2 text-gray-600">
                  Price:{" "}
                  <span className="text-green-600 font-bold">
                    ${product.product_price}
                  </span>
                </p>
              </div>
              <Link
                href={`/users/product/${product.product_id}`}
                className="mt-6 inline-block w-full text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl hover:opacity-90 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
