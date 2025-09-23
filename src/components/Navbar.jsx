"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  ShoppingCart,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNav(false);
      else setShowNav(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Navbar */}
      <div className="bg-teal-500 text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          {/* Social Icons */}
          <div className="flex space-x-3">
            <Link href="#" className="hover:text-gray-200"><Facebook size={16} /></Link>
            <Link href="#" className="hover:text-gray-200"><Twitter size={16} /></Link>
            <Link href="#" className="hover:text-gray-200"><Instagram size={16} /></Link>
            <Link href="#" className="hover:text-gray-200"><Linkedin size={16} /></Link>
          </div>

          {/* Auth Links */}
          <div className="space-x-4 flex items-center">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : session ? (
              <>
                <span>Welcome, {session.user?.name}</span>
                <button onClick={() => signOut()} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="hover:underline">Register</Link>
                <Link href="/login" className="hover:underline">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-teal-500">📚 Book Hub</Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/books/all">All Books</Link>
              <Link href="/books/latest">Latest</Link>
              <Link href="/trending/today">Today</Link>
              <Link href="/trending/week">This Week</Link>
              <Link href="/about/team">Our Team</Link>
              <Link href="/about/mission">Mission</Link>
              <Link href="/contact/email">Email</Link>
              <Link href="/contact/location">Location</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white shadow-md">
              <div className="flex flex-col px-4 py-2 space-y-2">
                <Link href="/books/all">All Books</Link>
                <Link href="/books/latest">Latest</Link>
                <Link href="/trending/today">Today</Link>
                <Link href="/trending/week">This Week</Link>
                <Link href="/about/team">Our Team</Link>
                <Link href="/about/mission">Mission</Link>
                <Link href="/contact/email">Email</Link>
                <Link href="/contact/location">Location</Link>

                {/* Mobile Auth */}
                <div className="mt-3 space-y-2">
                  {status === "loading" ? (
                    <span>Loading...</span>
                  ) : session ? (
                    <>
                      <span>Welcome, {session.user?.name}</span>
                      <button onClick={() => signOut()} className="hover:underline">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/register" className="hover:underline">Register</Link>
                      <Link href="/login" className="hover:underline">Login</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
