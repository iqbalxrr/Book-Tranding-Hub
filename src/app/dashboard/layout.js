"use client";

import { useState } from "react";
import Sidebars from "@/components/allsidebar/allSidebar"; // Assuming this component exists
import { FiBell, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider"; // Assuming this provider exists
import { useAuth } from "@/context/AuthContext"; // Assuming this context exists
import { Search, Menu, UserCircle, LogOut } from 'lucide-react'; // Using lucide-react for better consistency

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Assuming user object is available

  const placeholderImageUrl = "https://placehold.co/40x40/5c5c5c/ffffff?text=U";
  const userImage = user?.photoURL || placeholderImageUrl;
  const userName = user?.displayName || "Admin";
  const userEmail = user?.email || "No Email";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-inter">
      {/* ======= TOP NAVBAR ======= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-100">
        <div className="flex items-center justify-between py-5 px-4  lg:px-8">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle (Left position on mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <span className="font-extrabold text-gray-900 text-2xl tracking-tight">
              Book <span className="text-indigo-600">Mate</span>
            </span>
          </div>

          {/* Search Bar (Center) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, users, or requests..."
                className="w-full px-4 py-2 pl-10 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Right Icons & User Profile */}
          <div className="flex items-center gap-4">
            
            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
              <FiBell className="w-5 h-5" />
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium border-2 border-white">
                3
              </span>
            </button>
            
            {/* Theme Toggle (Example) */}
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
              <FiSun className="w-5 h-5" />
            </button>

            {/* User Profile Dropdown Area */}
            <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition duration-150">
              
              {/* Avatar */}
              <img 
                src={userImage} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300" 
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl; }}
              />

              {/* User Info (Desktop only) */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-gray-800 text-sm font-semibold truncate max-w-[100px]">{userName}</span>
                <span className="text-gray-500 text-xs">{userEmail}</span>
              </div>
              
              <LogOut className="hidden lg:block w-5 h-5 text-gray-400 hover:text-red-500 ml-2" />
            </div>
          </div>
        </div>
      </header>

      {/* ======= MAIN CONTENT & SIDEBAR CONTAINER ======= */}
      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        
        {/* ======= DESKTOP SIDEBAR (FIXED) ======= */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-gray-200 bg-white shadow-xl/50 overflow-y-auto">
          {/* The sidebar content should handle its own height and padding if necessary */}
          <Sidebars />
        </aside>

        {/* ======= MOBILE SIDEBAR (ANIMATED) ======= */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* The Sidebar panel */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed lg:hidden top-0 left-0 z-50 w-72 h-screen bg-white shadow-2xl overflow-y-auto"
              >
                <Sidebars onClose={() => setIsOpen(false)} /> {/* Add a close function prop if needed */}
              </motion.aside>

              {/* Overlay for mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              ></motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ======= CONTENT AREA ======= */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 ">
          <TanStackQueryProvider>
            {/* The main content area where your pages will be rendered */}
            {children}
          </TanStackQueryProvider>
        </main>
      </div>
    </div>
  );
}
