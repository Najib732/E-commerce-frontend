'use client';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToken } from '@/app/TokenContext';

type HeaderProps = {
  children?: ReactNode;
  clearCart?: () => void; // optional prop to clear frontend cart state
};

export default function MyHeader({ children, clearCart }: HeaderProps) {
  const { token } = useToken();
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/users/logout',
        {}, // empty body
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      alert(res.data.message || 'Logged out successfully');

      // Clear frontend cart if provided
      if (clearCart) clearCart();

      // Redirect to login page
      router.push('/users/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed');
    }
  };

  // Delete account function
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (!confirmed) return;

    try {
   
      const res = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const userId = res.data.user_id || res.data.user?.user_id;
      if (!userId) {
        alert('User ID not found');
        return;
      }

      // Step 2: Delete user
      const deleteRes = await axios.delete(`http://localhost:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      alert(deleteRes.data.message || 'User deleted successfully');

      // Clear frontend cart if provided
      if (clearCart) clearCart();

      // Redirect to login page
      router.push('/users/login');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Left: Logo / Navigation */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => router.push('/users/welcome')}
            className="text-2xl font-bold hover:text-gray-300 transition"
          >
            🏠 MyShop
          </button>

          <button
            onClick={handleLogout}
            className="hover:text-gray-300 transition"
          >
            Logout
          </button>

          <button
            onClick={handleDelete}
            className="hover:text-gray-300 transition"
          >
            Delete Account
          </button>

          <button
            onClick={() => router.push('/users/login')}
            className="hover:text-gray-300 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push('/users/registration')}
            className="hover:text-gray-300 transition"
          >
            Registration
          </button>
        </div>

        {/* Right: User & Cart */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => router.push('/users/account')}
            className="hover:text-gray-300 transition"
          >
            User
          </button>

          <button
            onClick={() => router.push('/users/product/cart')}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            🛒 Cart
          </button>
        </div>
      </nav>

      {/* Optional children */}
      {children && <div className="max-w-7xl mx-auto px-6 mt-2">{children}</div>}
    </header>
  );
}
