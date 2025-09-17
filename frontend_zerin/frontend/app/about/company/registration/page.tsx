"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "", password: "" });
   
  const error1: { name: string; phone: string; password: string } = {
      name: "",
      phone: "",
      password: "",
    };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  

   
    if (!name) error1.name = "Name is required";

    if (!phone) error1.phone = "Phone is required";
    else if (!/^[0-9]{3,}$/.test(phone))
      error1.phone = "Phone must be at least 3 digits";

    if (!password) error1.password = "Password is required";
    else if (password.length < 3)
      error1.password = "Password must be at least 3 characters";

    setErrors(error1);

    if (!error1.name && !error1.phone && !error1.password) {

      setName("");
      setPhone("");
      setPassword("");
      setErrors({ name: "", phone: "", password: "" });
      router.push("./login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration</h1>

      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
