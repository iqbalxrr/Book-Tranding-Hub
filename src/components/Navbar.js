"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">📚 Book Hub</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link href="/" className="hover:text-yellow-300">Home</Link>
            <Link href="/about" className="hover:text-yellow-300">About</Link>
            <Link href="/contact" className="hover:text-yellow-300">Contact</Link>
            <Link href="/books" className="hover:text-yellow-300">Books</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-yellow-300">Home</Link>
          <Link href="/about" className="block hover:text-yellow-300">About</Link>
          <Link href="/contact" className="block hover:text-yellow-300">Contact</Link>
          <Link href="/books" className="block hover:text-yellow-300">Books</Link>
        </div>
      )}
    </nav>
  );
}
