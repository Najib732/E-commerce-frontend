"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  address: string;
  userPhoneNumber: string;
   product: {
    id: number;
    name: string;
  };
};

type Seller = {
  id: number;
  name: string;
  phone: string;
};

export default function OrderList() {
  const router = useRouter();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
   
        const sellerRes = await axios.get<Seller>(
          "http://localhost:3002/seller/me",
          { withCredentials: true }
        );
        setSeller(sellerRes.data);

       
        const orderRes = await axios.get<Order[]>(
          `http://localhost:3002/order/seller/${sellerRes.data.id}`,
          { withCredentials: true }
        );
        setOrders(orderRes.data);
      } catch (err) {
        console.error(err);
        router.push("./login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading)
    return <p className="text-center mt-10 text-black">Loading...</p>;

  return (
    <div className="flex items-start justify-center bg-gray-50 p-4 min-h-[calc(100vh-50px)]">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">

      
        <aside className="w-56 bg-blue-900 text-white flex flex-col p-6 space-y-6">
          <h2 className="text-xl font-bold">Seller Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => router.push("/sellerinfo/dashboard")}
              className="hover:text-blue-300 text-left text-black"
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => router.push("/sellerinfo/addproduct")}
              className="hover:text-blue-300 text-left text-black"
            >
              ➕ Add Product
            </button>
            <button
              onClick={() => router.push("/sellerinfo/deleteproduct")}
              className="hover:text-blue-300 text-left text-black"
            >
              🗑️ Delete Product
            </button>
            <button
              onClick={() => router.push("/sellerinfo/orderlist")}
              className="hover:text-blue-300 text-left text-black"
            >
              📦 Order List
            </button>
          </nav>
        </aside>


        <main className="flex-1 p-6 overflow-auto">
          {seller && (
            <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex items-center space-x-6 border border-gray-200">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">{seller.name}</h3>
                <p className="text-sm text-black">{seller.phone}</p>
              </div>
            </div>
          )}

          <h3 className="text-xl font-bold mb-4 text-black">My Orders</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-black">Order ID</th>
                  <th className="p-3 border text-black">Product Name</th>
                  <th className="p-3 border text-black">Address</th>
                  <th className="p-3 border text-black">User Phone</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <tr key={o.id}>
                      <td className="p-3 border text-black">{o.id}</td>
                      <td className="p-3 border text-black">{o.product?.name}</td>
                      <td className="p-3 border text-black">{o.address}</td>
                      <td className="p-3 border text-black">{o.userPhoneNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 border text-center text-black" colSpan={4}>
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
