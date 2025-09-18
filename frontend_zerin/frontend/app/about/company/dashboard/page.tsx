'use client';

import { useSearchParams } from "next/navigation";


type Props = {
  params: { phone: string };
};

export default function DashboardPage({ params }: Props) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
     
        <h1>Dashboard</h1>
        <p>Welcome {name ? name : "User"}!</p>
        <p>Your phone: {params.phone}</p>
    
    </>
  );
}
