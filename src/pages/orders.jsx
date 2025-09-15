'use client';
import { useEffect, useState } from "react";
import { getOrders } from "../api/order";
import { useRouter } from "next/navigation";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    getOrders()
      .then(res => setOrders(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 animate-fade-in">
        {loading ? (
          <p className="text-gray-600 text-center py-4">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {orders.map((o) => (
              <li key={o._id} className="py-3 flex justify-between items-center hover:bg-purple-50 transition px-4 rounded-lg">
                <span className="font-medium text-gray-800">{o.productName}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  o.status === 'Delivered'
                    ? 'bg-green-100 text-green-700'
                    : o.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {o.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
