'use client';

import { useState } from 'react';
import { createOrder } from '../../api/order';
import { Mail, Phone, Package, User, MapPin, Hash, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    product: '',
    quantity: 1,
    image: null as File | null,
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value as any);
      });

      await createOrder(formData);
      setMessage({ type: 'success', text: '✅ Order placed successfully!' });
      setForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        product: '',
        quantity: 1,
        image: null,
      });
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Failed to place order.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-700">Order Management System</h1>
          <nav>
            <a
              href="/admin/login"
              className="text-indigo-600 font-medium hover:text-indigo-800 transition"
            >
              Admin Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 text-center shadow-lg">
        <h2 className="text-4xl font-extrabold mb-4">Seamless Order Placement</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Submit your order in just a few clicks. Reliable, secure, and professional.
        </p>
      </section>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            Customer Order Form
          </h3>
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={form.name}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                value={form.phone}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* Address */}
            <div className="flex items-start border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-2" />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={form.address}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* Product */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Package className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="product"
                placeholder="Product Name"
                value={form.product}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Hash className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                min={1}
                max={100}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>

            {/* File Upload */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <ImageIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
            >
              Place Order
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>© {new Date().getFullYear()} Order Management System. All rights reserved.</p>
        <p className="text-sm mt-1">Made with ❤️ using Next.js & Tailwind</p>
      </footer>
    </div>
  );
}
