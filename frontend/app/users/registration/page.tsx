"use client";
import React, { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    mobile_no: "",
    email: "",
    address: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({} as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};
    if (formData.user_name.length < 3) newErrors.user_name = "Username min 3 chars";
    if (formData.password.length < 6) newErrors.password = "Password min 6 chars";
    if (!/^[0-9]{10,15}$/.test(formData.mobile_no)) newErrors.mobile_no = "Mobile must be 10–15 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.address.length < 5) newErrors.address = "Address min 5 chars";
    if (!formData.category) newErrors.category = "Category required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3000/users", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setMessage(`Success! User ID: ${res.data.user_id}`);
      setFormData({ user_name: "", password: "", mobile_no: "", email: "", address: "", category: "" });
    } catch (err: any) {
      setMessage("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const fields = [
    { name: "user_name", label: "Name" },
    { name: "password", label: "Password", type: "password" },
    { name: "mobile_no", label: "Mobile No" },
    { name: "email", label: "Email" },
    { name: "address", label: "Address" },
    { name: "category", label: "Category (buyer/seller)" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block mb-1 font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              id={field.name}
              placeholder={`Enter your ${field.label}`}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />

            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Register
        </button>

        {message && <p className="text-center mt-4 text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
