"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductForm = {
  name: string;
  price: number;
  stocked: number;
  status: string;
};

export default function AddProduct() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    defaultValues: {
      status: "available",
    },
  });

  const onSubmit = async (data: ProductForm) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3002/product",
        {
          name: data.name,
          price: Number(data.price),
          stocked: Number(data.stocked),
          status: data.status,
        },
        { withCredentials: true }
      );

      console.log("Product added:", res.data);

     
      reset();

      setApiError("");
      router.push("/sellerinfo/dashboard");
    } catch (err: any) {
      console.error(err);
      setApiError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Add Product
        </h1>

        {apiError && <p className="text-red-500 mb-4">{apiError}</p>}

       
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">
            Product Name:
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
            className="w-full border p-2 rounded text-black placeholder-black"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Price:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter price"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            className="w-full border p-2 rounded text-black placeholder-black"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">
            Stock Quantity:
          </label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            {...register("stocked", {
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock must be at least 1" },
            })}
            className="w-full border p-2 rounded text-black placeholder-black"
          />
          {errors.stocked && (
            <p className="text-red-500 text-sm">{errors.stocked.message}</p>
          )}
        </div>

   
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Status:</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border p-2 rounded text-black"
          >
            <option value="available" className="text-black">
              Available
            </option>
            <option value="unavailable" className="text-black">
              Unavailable
            </option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
