"use client";

import { useToken } from "@/app/TokenContext";
import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  name: string;
  price: number;
  quantity: number;
};

export default function CartView() {
  const { token } = useToken();
  const [cart, setCart] = useState<Record<number, Product>>({}); // key numeric



  useEffect(() => {
  //eif (!token) return; // token না থাকলে request না করা
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sell/cart", {
       // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCart(res.data || {});
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  fetchCart();
}, []); // token change হলে fetchCart পুনরায় run হবে


  // Handle quantity change
  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;

    setCart(prevCart => ({
      ...prevCart,
      [productId]: {
        ...prevCart[productId],
        quantity: newQuantity,
      },
    }));

    try {
      await axios.post(
        "http://localhost:3000/sell/details",
        {
          product_id: productId,
          name: cart[productId].name,
          price: cart[productId].price,
          quantity: newQuantity,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true
        }
      );
    } catch (error) {
      console.error("Error updating cart in backend:", error);
    }
  };

  // Total price
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Submit sale
  const handleSubmit = async () => {
    try {
      const items = Object.entries(cart).map(([id, item]) => ({
        productId: Number(id),
        quantity: item.quantity,
      }));

      console.log(items);

      const res = await axios.post("http://localhost:3000/sell",
        { items },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true
        }
      );

      console.log("Sale created:", res.data);
      alert(`Sale successful! Voucher: ${res.data.voucher_no}`);
    }
    catch (error) {
      console.error("Error creating sale:", error);
      alert("Failed to create sale");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {Object.entries(cart).map(([id, item]) => (
              <div
                key={id}
                className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(id), Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-20 mt-1"
                  />
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Sale
            </button>
          </div>
        </>
      )}
    </div>
  );
}
