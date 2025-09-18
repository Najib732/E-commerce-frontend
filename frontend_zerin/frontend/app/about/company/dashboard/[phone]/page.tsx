"use client";
import { useParams } from "next/navigation";

export default function Dashboard() {
  const params = useParams();
  const phone = params.phone;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, user with phone: {phone}</p>
    </div>
  );
}
