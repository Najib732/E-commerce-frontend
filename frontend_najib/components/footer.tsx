// components/footer.tsx
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-4">
          <p className="text-sm mb-3">&copy; 2025 Najib's Fake Info. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
