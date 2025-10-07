
"use client";

import { useState } from "react";
import Sidebars from "@/components/allsidebar/allSidebar";


export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <aside
        className={`fixed top-18 left-0 z-30 h-full w-72 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out rounded-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="">         
          <Sidebars />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-gray-200 p-4 lg:hidden fixed w-full z-40">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
            className="p-2 rounded-md bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 pt-16 lg:pt-0 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
