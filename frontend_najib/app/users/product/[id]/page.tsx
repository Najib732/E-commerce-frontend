"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useToken } from "@/app/TokenContext";

type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity?: number;
  description?: string;
  category?: string;
  image?: string;
};

export default function ProductDetails() {
    const { token } = useToken(); 
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);


  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProductQuantity(Number(e.target.value));
};

  
  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:3000/sell/details", {
        name: product?.product_name,
        product_id: product?.product_id,
        quantity: productQuantity,
        price: product?.product_price
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true,}
      );
      if (res.status === 200) {
        console.log("Product added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/sell/id/${id}`,
          {
        headers:{
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true,}
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20 text-gray-600">Loading product details...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full">
        <div className="h-64 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
          {product.image ? (
            <img src="/logo.JPG" className="object-cover w-full h-full" />
          ) : (
            <span className="text-8xl">📦</span>
          )}
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.product_name}</h2>
            {product.category && <p className="text-gray-600 mb-2">Category: {product.category}</p>}
            {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
            <div className="text-gray-600 mb-2">
              Quantity:{" "}
              <input
                type="number"
                min={1}
                value={productQuantity}
                onChange={handleQuantity}
                className="border rounded px-2 py-1 w-20"
              />
            </div>

            <p className="text-green-600 font-bold text-xl mb-6">${product.product_price}</p>
          </div>
          <button onClick={handleClick} className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
