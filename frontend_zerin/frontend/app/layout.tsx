// app/layout.tsx
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>

        {/* Header */}
        <header className="flex items-center justify-center bg-gray-100 shadow-md w-full h-14">
          <Image src="/photo.jpg" alt="Logo" width={70} height={70} />
        </header>

        {/* Main content */}
        <main className="w-full bg-gray-50 px-4 py-2 text-xs flex justify-center">
          <div className="w-full max-w-6xl">{children}</div>
        </main>

        {/* Footer right after main */}
        <footer className="bg-gray-200 text-gray-700 py-1 w-full shadow-inner text-center text-xs">
          <p>Contact Us: <a href="mailto:contact@internwave.com" className="hover:underline">Email</a></p>
          <p>&copy; {new Date().getFullYear()} InternWave</p>
        </footer>

      </body>
    </html>
  );
}
