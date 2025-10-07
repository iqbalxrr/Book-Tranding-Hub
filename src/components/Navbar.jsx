"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // 🔹 AuthContext import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const pathName = usePathname();
  const isDashboard = pathName.includes("/dashboard");

  // ✅ Bookmark fetch
  const fetchBookmarks = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/bookmarks?email=${user.email}`);
      const data = await res.json();
      if (data.success) {
        setBookmarks(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookmarks");
    }
  };
  // ✅ auto refresh on interval
  useEffect(() => {
    fetchBookmarks(); // initial load
    const interval = setInterval(() => {
      fetchBookmarks(); // refresh every 1s
    }, 1000);
    return () => clearInterval(interval);
  }, [user?.email]);

  // ✅ event-based refresh after add/remove bookmark
  useEffect(() => {
    const handleBookmarkChange = () => fetchBookmarks();
    window.addEventListener("bookmark-updated", handleBookmarkChange);
    return () =>
      window.removeEventListener("bookmark-updated", handleBookmarkChange);
  }, [user?.email]);

  // ✅ Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isDashboard) return null;

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Navbar */}
      <div className="bg-teal-500 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Social Links */}
          <div className="flex space-x-3">
            <Link href="#" className="hover:text-gray-200">
              <Facebook size={16} />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Twitter size={16} />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Instagram size={16} />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Linkedin size={16} />
            </Link>
          </div>

          {/* Auth Links */}
          <div className="space-x-4 flex items-center">
            {user ? (
              <>
                <span className="">
                  Welcome, {user?.displayName || user.email}
                </span>

                <button onClick={logout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-teal-500">
              📚 BookMate
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 relative">
              <div className="flex space-x-6 items-center">
                <Link href="/" className="hover:text-teal-500">
                  Home
                </Link>

                {/* Dropdown Menus */}

                {[
                  {
                    name: "Books",
                    links: [
                      { href: "/books/latest", label: "Latest" },
                      { href: "/books", label: "Books" },
                    ],
                  },
                  {
                    name: "Trending",
                    links: [
                      { href: "/trending/today", label: "Today" },
                      { href: "/trending/week", label: "This Week" },
                    ],
                  },
                  {
                    name: "About",
                    links: [
                      { href: "/about", label: "About" },
                      { href: "/about/mission", label: "Mission" },
                    ],
                  },
                  {
                    name: "Contact",
                    links: [
                      { href: "/contact/email", label: "Email" },
                      { href: "/contact/location", label: "Location" },
                    ],
                  },
                  ...(user
                    ? [
                        {
                          name: "Profile",
                          links: [
                            { href: "/addNewBook", label: "Add New Book" },
                            {
                              href:
                                user.email === "admin@gmail.com"
                                  ? "/dashboard/adminPages/profile"
                                  : "/dashboard/userPages/myBooks",
                              label: "Dashboard",
                            },
                          ],
                        },
                      ]
                    : []),
                ].map((menu) => (
                  <div key={menu.name} className="relative group">
                    <button className="flex items-center hover:text-teal-500">
                      {menu.name}
                      <ChevronDown
                        className="ml-1 transform transition-transform duration-300 group-hover:rotate-180"
                        size={16}
                      />
                    </button>
                    <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-300">
                      {menu.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 hover:bg-teal-100"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Icons */}
              <div className="ml-2 flex items-center space-x-4">
                {/* ✅ Bookmark dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="hover:text-teal-500 relative"
                  >
                    <Heart size={20} />
                    {bookmarks.length > 0 && (
                      <span className="absolute -top-3 -right-3 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full text-center">
                        {bookmarks.length}
                      </span>
                    )}
                  </button>

                  {showDropdown && (
                    <div
                      className="absolute right-0 mt-3 w-64 bg-white border shadow-lg rounded-md overflow-hidden 
               transform origin-top transition-all duration-300 ease-out z-50
               animate-in fade-in zoom-in-95 slide-in-from-top-2"
                    >
                      {bookmarks.length === 0 ? (
                        <p className="p-4 text-sm text-gray-500 text-center">
                          No bookmarks yet.
                        </p>
                      ) : (
                        bookmarks.map((b) => (
                          <Link
                            key={b._id}
                            href={`/books/${b?.book?._id}`}
                            className="flex items-center p-3 hover:bg-teal-50 transition-colors duration-200"
                          >
                            <img
                              src={b?.book.bookImage}
                              alt={b.book.bookName}
                              className="w-10 h-10 rounded object-cover mr-3 shadow-sm"
                            />
                            <div className="text-sm">
                              <p className="font-medium">{b?.book.bookName}</p>
                              <p className="text-gray-500 text-xs">
                                {b?.book.authorName}
                              </p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <button className="relative p-2 text-gray-700 hover:text-teal-500">
                  <Bell size={22} />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col px-4 py-2 space-y-2">
              <Link href="/" className="hover:text-teal-500">
                Home
              </Link>

              {/* Mobile dropdown menus */}
              {[
                {
                  name: "Books",
                  links: [
                    ...(user
                      ? [
                          { href: "/addNewBook", label: "Add New Book" },
                          {
                            href: "/dashboard/userPages/myBooks",
                            label: "Dashboard",
                          },
                        ]
                      : []),
                    { href: "/books/latest", label: "Latest" },
                    { href: "/books", label: "Books" },
                  ],
                },
                {
                  name: "Trending",
                  links: [
                    { href: "/trending/today", label: "Today" },
                    { href: "/trending/week", label: "This Week" },
                  ],
                },
                {
                  name: "About",
                  links: [
                    { href: "/about", label: "About" },
                    { href: "/about/mission", label: "Mission" },
                  ],
                },
                {
                  name: "Contact",
                  links: [
                    { href: "/contact/email", label: "Email" },
                    { href: "/contact/location", label: "Location" },
                  ],
                },
              ].map((menu) => (
                <details key={menu.name} className="group">
                  <summary className="flex justify-between items-center cursor-pointer hover:text-teal-500">
                    {menu.name}
                  </summary>
                  <div className="ml-4 mt-2 space-y-1 overflow-hidden max-h-0 group-open:max-h-40 transition-all duration-300">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block hover:text-teal-500"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}

              {/* Mobile Icons */}
              <div className="flex space-x-4 mt-3">
                <button
                  className="hover:text-teal-500 relative"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Heart size={20} />
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-0 -right-2 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full">
                      {bookmarks.length}
                    </span>
                  )}
                </button>
                <button className="relative p-2 text-gray-700 hover:text-teal-500">
                  <Bell size={22} />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
