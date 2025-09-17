"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

type FormData = {
  name: string;
  phone: string;
  password: string;
};

export default function Registration() {
  const router = useRouter();

 
  const {
    register,handleSubmit,formState: { errors },reset,setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/seller",
        { ...data, phone: Number(data.phone) },
        { withCredentials: true }
      );
      console.log("Registration Success:", res.data);

      reset(); 

      router.push("./login");
    } catch (err: any) {
      console.error("Axios Error:", err.response?.data || err.message);

     
      setError("phone", {
        type: "server",
        message: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-black"
      >
        <h1 className="text-xl font-bold mb-6 text-center text-black">
          Seller Registration
        </h1>

       
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Name:</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded text-black"
            {...register("name", { required: "Name must needed" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-2 rounded text-black"
            {...register("phone", {
              required: "Type your phone number",
              pattern: {
                 value: /^[0-9]{10}$/, 
                 message: "Phone must be exactly 10 digits",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

     
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded text-black"
            {...register("password", {
              required: "Type a password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
