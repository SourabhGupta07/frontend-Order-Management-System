'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface OrderModalProps {
  order: any;
  onClose: () => void;
  onUpdate: (orderId: string, quantity: number) => void;
}

export default function OrderModal({ order, onClose, onUpdate }: OrderModalProps) {
  const [quantity, setQuantity] = useState(order.quantity);

  const handleSubmit = () => {
    if (quantity > 0) {
      onUpdate(order._id, quantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Edit Order</h2>

        {/* Order Info */}
        <div className="space-y-3 mb-6">
          <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
          <p><span className="font-semibold">Product:</span> {order.productName}</p>
          <p><span className="font-semibold">Status:</span> {order.status}</p>
        </div>

        {/* Quantity Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
