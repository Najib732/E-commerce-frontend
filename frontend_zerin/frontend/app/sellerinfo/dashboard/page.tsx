"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  stocked: number;
  status: string;
};

type Seller = {
  id: number;
  name: string;
  phone: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerRes = await axios.get<Seller>(
          "http://localhost:3002/seller/me",
          { withCredentials: true }
        );
        setSeller(sellerRes.data);

        const productRes = await axios.get<Product[]>(
          `http://localhost:3002/seller/${sellerRes.data.id}/products`,
          { withCredentials: true }
        );
        setProducts(productRes.data);
      } catch (err) {
        console.error(err);
        setSeller(null);
        setProducts([]);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3002/seller/logout",
        {},
        { withCredentials: true }
      );
      router.push("./login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


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
              onClick={() => router.push("/sellerinfo/editprofile")}
              className="hover:text-blue-300 text-left text-black"
            >
              ✏️ Edit Profile
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
            <button
  onClick={() => router.push("/sellerinfo/allproducts")}
  className="hover:text-blue-300 text-left text-black"
>
  🛒 All Products
</button>

            <button
              onClick={handleLogout}
              className="hover:text-blue-300 text-left text-black"
            >
              🚪 Logout
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
                <h3 className="text-lg font-semibold text-black">
                  {seller.name}
                </h3>
                <p className="text-sm text-black">{seller.phone}</p>
              </div>
            </div>
          )}

         
          <h3 className="text-xl font-bold mb-4 text-black">My Products</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-black">Name</th>
                  <th className="p-3 border text-black">Price</th>
                  <th className="p-3 border text-black">Stock</th>
                  <th className="p-3 border text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 border text-black">{p.name}</td>
                      <td className="p-3 border text-black">${p.price}</td>
                      <td className="p-3 border text-black">{p.stocked}</td>
                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            p.status === "available"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {p.status === "available" ? "Available" : "Unavailable"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="p-3 border text-center text-black"
                      colSpan={4}
                    >
                      No products found
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
