import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type Product = {
  id: number;
  name: string;
  price: number;
  stocked: number;
  status: string;
};

interface Props {
  params: { name: string };
}

export default async function ProductDetailsPage({ params }: Props) {
  const productName = decodeURIComponent(params.name);
  const cookieHeader = cookies().toString();

  let product: Product | null = null;

  try {
    const res = await axios.get<Product>(
      `http://localhost:3002/product/name/${encodeURIComponent(productName)}`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
      }
    );
    product = res.data;
  } catch (err) {
    console.error("Failed to fetch product details", err);
    redirect("/allproducts"); 
  }

  if (!product)
    return <p className="text-center mt-10 text-black">Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Product Details: {product.name}
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <p className="text-black"><strong>Price:</strong> ${product.price}</p>
        <p className="text-black"><strong>Stock:</strong> {product.stocked}</p>
        <p className="text-black">
          <strong>Status:</strong> {product.status === "available" ? "Active ✅" : "Inactive ❌"}
        </p>
      </div>
    </div>
  );
}
