import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Product = {
  id: number;
  name: string;
};

interface Props {
  searchParams: { search?: string };
}

export default async function AllProductsPage({ searchParams }: Props) {
  const searchQuery = (searchParams.search || "").toLowerCase();
  const cookieHeader = cookies().toString();

  let products: Product[] = [];

  try {
    const res = await axios.get<Product[]>("http://localhost:3002/product", {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });
    products = res.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
    redirect("/sellerinfo/login"); 
  }

  const sortedProducts = searchQuery
    ? [
        ...products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery)
        ),
        ...products.filter((p) => !p.name.toLowerCase().includes(searchQuery)),
      ]
    : products;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">All Products</h1>

      <form method="get" className="mb-4">
        <input
          type="text"
          name="search"
          defaultValue={searchParams.search || ""}
          placeholder="Search products..."
          className="p-2 border rounded w-full text-black"
        />
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-black">Product Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((p) => (
                <tr key={p.id} className="cursor-pointer hover:bg-gray-100">
                  <td className="p-3 border text-black">
                   
                    <a
                      href={`/sellerinfo/allproducts/${encodeURIComponent(
                        p.name
                      )}`}
                      className="hover:underline"
                    >
                      {p.name}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center text-black">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
