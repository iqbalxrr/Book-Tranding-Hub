"use client";

import { useState } from "react";
import Sidebars from "@/components/allsidebar/allSidebar";
import { FiBell, FiSun } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      {/* ======= TOP NAVBAR ======= */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 py-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
           
            <span className="font-bold text-gray-800 text-2xl ">
              Book Mate
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search books, users, or requests..."
              className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer">
              <FiBell className="text-gray-700 w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-xl transition">
              <FaUserCircle className="w-8 h-8 text-gray-600" />
              <span className="text-gray-700 text-sm font-medium">Profile</span>
            </div>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-gray-700"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ======= MAIN BODY ======= */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* ======= SIDEBAR ======= */}
        {/* Desktop Sidebar (always visible) */}
        <aside className="hidden lg:block  w-72 h-full shadow-md rounded-r-2xl">
          <div className="">
            <Sidebars />
          </div>
        </aside>

        {/* Mobile Sidebar (animated) */}
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:hidden top-0 left-0 z-50  w-72 h-screen shadow-md bg-white "
            >
              <div className="">
                <Sidebars />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* ======= CONTENT AREA ======= */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-6 rounded-tl-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}
