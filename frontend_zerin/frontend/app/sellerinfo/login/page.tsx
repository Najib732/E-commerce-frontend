"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tempErrors = { phone: "", password: "" };
    let hasError = false;

    if (!phone) {
      tempErrors.phone = "Phone is required";
      hasError = true;
    } else if (!/^[0-9]+$/.test(phone)) {
      tempErrors.phone = "Phone must be numeric";
      hasError = true;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(tempErrors);
    if (hasError) return;

    try {
      const res = await axios.post<any>(
        "http://localhost:3002/seller/login",
        { phone: Number(phone), password },
        { withCredentials: true }
      );

      if (res.data.message) {
        console.log("Login Successful");
        console.log(res.data.seller);
      }

      setPhone("");
      setPassword("");
      setErrors({ phone: "", password: "" });
      setApiError("");
      router.push("./dashboard");
    } catch (err: any) {
      setApiError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Seller Login
        </h1>

        {apiError && <p className="text-red-500 mb-4">{apiError}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded text-black"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
