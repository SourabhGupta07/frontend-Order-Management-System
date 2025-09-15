'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout}  from '../store/slices/authSlice';
import {
  LogOut,
  LayoutDashboard,
  Package,
  Users,
  BarChart2,
  Settings,
  Bell,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export default function DashboardLayout({ children, pageTitle = 'Dashboard' }: DashboardLayoutProps) {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-xl flex flex-col">
        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" />
          Admin Panel
        </h1>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition font-medium"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition font-medium"
              >
                <Package className="w-5 h-5" /> Orders
              </Link>
            </li>
            <li>
              <Link
                href="/customers"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition font-medium"
              >
                <Users className="w-5 h-5" /> Customers
              </Link>
            </li>
            <li>
              <Link
                href="/analytics"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition font-medium"
              >
                <BarChart2 className="w-5 h-5" /> Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition font-medium"
              >
                <Settings className="w-5 h-5" /> Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={() => dispatch(logout())}
          className="mt-auto flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col gap-6">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{pageTitle}</h2>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-gray-200 transition"
              >
                <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
                <Bell className="w-6 h-6 text-gray-700" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 font-semibold text-gray-700 border-b">Notifications</div>
                  <ul>
                    <li className="p-3 hover:bg-gray-100 cursor-pointer">New order received</li>
                    <li className="p-3 hover:bg-gray-100 cursor-pointer">Order #123 delivered</li>
                    <li className="p-3 hover:bg-gray-100 cursor-pointer">Stock running low</li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src="/user-avatar.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-indigo-500"
                />
                <span className="font-medium text-gray-700">Prachi</span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50 animate-slide-up">
                  <ul>
                    <li className="p-3 hover:bg-gray-100 cursor-pointer">Profile</li>
                    <li className="p-3 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}
