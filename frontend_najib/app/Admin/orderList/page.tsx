"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Order = {
  order_id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  order_date: string;
  status?: { id: number; name: string };
};

const statuses = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Completed" },
  { id: 3, name: "Cancelled" },
];

export default function OrderDetailStatusChange() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sell/allOrderStatus", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (orderId: number, statusId: number) => {
    try {
      await axios.patch(
        `http://localhost:3000/sell/orderStatusChange/${orderId}`,
        { statusId },
        { withCredentials: true }
      );
      fetchDetails(); // refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-black rounded-xl shadow-md text-white">
      <h1 className="text-2xl font-bold mb-4">All Orders Status</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-600 px-4 py-2">Order ID</th>
              <th className="border border-gray-600 px-4 py-2">User ID</th>
              <th className="border border-gray-600 px-4 py-2">User Name</th>
              <th className="border border-gray-600 px-4 py-2">Email</th>
              <th className="border border-gray-600 px-4 py-2">Date</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
              <th className="border border-gray-600 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="border border-gray-600 px-4 py-2">{order.order_id}</td>
                <td className="border border-gray-600 px-4 py-2">{order.user_id}</td>
                <td className="border border-gray-600 px-4 py-2">{order.user_name}</td>
                <td className="border border-gray-600 px-4 py-2">{order.user_email}</td>
                <td className="border border-gray-600 px-4 py-2">{order.order_date}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {order.status?.name || "Pending"}
                </td>
                <td className="border border-red-600 px-4 py-2">
                  <select
                    className="text-white rounded px-2 py-1"
                    value={order.status?.id || 1}
                    onChange={(e) =>
                      updateStatus(order.order_id, Number(e.target.value))
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
