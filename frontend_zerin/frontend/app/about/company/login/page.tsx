"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {e.preventDefault();

    if (!phone) {
      setError("Phone is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    console.log({ phone, password });
    setPhone("");
    setPassword("");
    setError("");

    router.push(`./dashboard/${phone}`);
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
