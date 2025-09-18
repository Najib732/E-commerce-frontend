import Image from "next/image";

export default function MyHeader() {
  return (
    <header className="flex items-center justify-center py-3 bg-gray-100 shadow-md rounded-b-lg">
      <Image src="/photo.jpg" alt="Logo" width={60} height={60} />
    </header>
  );
}
