"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Seller = {
  id: number;
  name: string;
  phone: string;
  password: string;
};


export default function EditProfile() {
  const router = useRouter();
  const [seller, setSeller] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await axios.get<Seller>("http://localhost:3002/seller/me", {
          withCredentials: true,
        });
        setSeller(res.data);
        setName(res.data.name);
        setPhone(res.data.phone);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };
    fetchSeller();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      setError("Name and phone are required!");
      return;
    }

    setUpdating(true);
    setError("");

    try {
      await axios.put(
        "http://localhost:3002/seller",
        { id: seller.id, name, phone, password },
        { withCredentials: true }
      );

      router.push("/sellerinfo/dashboard");
    } catch (err: any) {
     
      setError(err.response?.data?.message || "Update failed");
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-50px)] bg-gray-50 p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Edit Profile
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-black font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded text-black placeholder-black"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-black font-medium">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded text-black placeholder-black"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-black font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded text-black placeholder-black"
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
        Update Profile
        </button>
      </form>
    </div>
  );
}
