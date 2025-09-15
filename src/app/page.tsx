'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { ShoppingCart, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const orderSchema = z.object({
  customerName: z.string()
    .min(3, 'Customer name must be at least 3 characters')
    .max(30, 'Customer name must not exceed 30 characters'),
  email: z.string()
    .email('Please provide a valid email address'),
  contactNumber: z.string()
    .regex(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
  shippingAddress: z.string()
    .max(100, 'Shipping address must not exceed 100 characters'),
  productName: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(50, 'Product name must not exceed 50 characters'),
  quantity: z.number()
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity must not exceed 100'),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      if (selectedFile) {
        formData.append('productImage', selectedFile);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/orders`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSubmitSuccess(true);
        reset();
        setSelectedFile(null);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error: any) {
      console.error('Order submission error:', error);
      alert(error.response?.data?.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Place your product orders quickly and securely. Our streamlined process ensures 
            your orders are processed efficiently.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h3 className="text-green-800 font-semibold">Order Placed Successfully!</h3>
                <p className="text-green-700">Your order has been submitted and will be processed soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    {...register('customerName')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  {...register('contactNumber')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234567890"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="shippingAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  id="shippingAddress"
                  {...register('shippingAddress')}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.shippingAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your complete shipping address"
                />
                {errors.shippingAddress && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.shippingAddress.message}
                  </p>
                )}
              </div>

              {/* Product Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      {...register('productName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.productName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.productName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.productName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      {...register('quantity', { valueAsNumber: true })}
                      min="1"
                      max="100"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* File Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image (Optional)
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                      dragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    {selectedFile ? (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-green-600">Selected: {selectedFile.name}</p>
                        <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p>JPG, JPEG, PNG (max 2MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-primary hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Placing Order<span className="loading-dots"></span>
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
              <p className="text-gray-600 text-sm">Your orders are processed securely with industry-standard encryption.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Upload</h3>
              <p className="text-gray-600 text-sm">Upload product images with our simple drag-and-drop interface.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600 text-sm">Orders are processed quickly and you'll receive confirmation instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}