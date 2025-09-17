"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {useToken} from "../../TokenContext.js";
import { Vidaloka } from "next/font/google";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setToken } = useToken();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
     const res=await axios.post(
        "http://localhost:3000/users/login",
        { userId: Number(userId), password },
        { withCredentials: true }
      );
      setToken(res.data.token);
      router.push("/users/welcome"); // Redirect after successful login
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey-100">
      <form onSubmit={handleLogin} className="bg-black shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required className="w-full mb-4 px-3 py-2 border rounded-md" />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-4 px-3 py-2 border rounded-md" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
