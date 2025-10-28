"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import NotificationSlider from "./notifications/NotificationSlider";
import NotificationBell from "./notifications/NotificationBell";


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderType, setSliderType] = useState(""); // "bookmark" or "notification"
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({}); // track open submenus
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)


  const { user, logout } = useAuth();
  const pathName = usePathname();
  const isDashboard = pathName.includes("/dashboard");

  // SweetAlert welcome
  useEffect(() => {
    if (user && !sessionStorage.getItem("welcome_shown")) {
      Swal.fire({
        title: `Welcome ${user?.displayName || user?.name || "User"}!`,
        text: "You have successfully logged in.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, [user]);

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/bookmarks?email=${user?.email}`);
      const data = await res.json();
      if (data.success) setBookmarks(data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
    const interval = setInterval(() => fetchBookmarks(), 10000);
    return () => clearInterval(interval);
  }, [user?.email]);


  useEffect(() => {
    const handleBookmarkChange = () => fetchBookmarks();
    window.addEventListener("bookmark-updated", handleBookmarkChange);
    return () =>
      window.removeEventListener("bookmark-updated", handleBookmarkChange);
  }, [user?.email]);

useEffect(() => {
    const handleClickOutside = (e) => {
        // 1. Check if the click is inside the main icon/dropdown area
        const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
        // 2. Check if the click is inside the Notification Slider
        const clickedInsideNotification = notificationRef.current && notificationRef.current.contains(e.target);
        // ONLY close the slider if the click is NOT inside EITHER element
        if (!clickedInsideDropdown && !clickedInsideNotification) {
            setSliderOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
// Add sliderOpen and sliderType to dependencies for proper re-check when state changes
}, [sliderOpen, sliderType]);

  if (isDashboard) return null;

  const handleSlider = (type) => {
    if (sliderType === type) {
      setSliderOpen(!sliderOpen);
    } else {
      setSliderType(type);
      setSliderOpen(true);
    }
  };

  const menuItems = [
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
  ];

  if (user) {
    menuItems.push({
      name: "Profile",
      links: [
        { href: "/addNewBook", label: "Add New Book" },
        {
          href:
            user.email === "admin@gmail.com"
              ? "/dashboard/adminPages/overview"
              : "/dashboard/userPages/home",
          label: "Dashboard",
        },
      ],
    });
  }

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Navbar */}
      <div className="bg-teal-500 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
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
          <div className="space-x-4 flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  Welcome, {user?.displayName || user?.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    sessionStorage.removeItem("welcome_shown");
                  }}
                  className="underline text-sm"
                >
                  Logout
                </button>
              </div>
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
            <Link href="/" className="text-2xl font-bold text-teal-500">
              📚 BookMate
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 relative">
              <div className="flex space-x-6 items-center">
                <Link href="/" className="hover:text-teal-500">
                  Home
                </Link>
                {menuItems.map((menu) => (
                  <div key={menu.name} className="relative group">
                    <button className="flex items-center hover:text-teal-500">
                      {menu.name}{" "}
                      <ChevronDown
                        className="ml-1 transform transition-transform duration-300 group-hover:rotate-180"
                        size={16}
                      />
                    </button>
                    <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-300 z-50">
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

              {/* Icons */}
              <div className="ml-2 flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => handleSlider("bookmark")}
                    className="hover:text-teal-500 relative"
                  >
                    <Heart size={20} />
                    {bookmarks.length > 0 && (
                      <span className="absolute -top-3 -right-3 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full text-center">
                        {bookmarks.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Notification Bell */}
                <NotificationBell handleSlider={handleSlider} />
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

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((menu) => (
                <div key={menu.name}>
                  <button
                    className="w-full flex justify-between items-center text-gray-700 font-medium"
                    onClick={() =>
                      setMobileSubMenuOpen((prev) => ({
                        ...prev,
                        [menu.name]: !prev[menu.name],
                      }))
                    }
                  >
                    {menu.name}
                    <ChevronDown
                      className={`ml-1 transform transition-transform duration-300 ${
                        mobileSubMenuOpen[menu.name] ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </button>
                  {mobileSubMenuOpen[menu.name] && (
                    <div className="pl-4 flex flex-col space-y-1 mt-1">
                      {menu.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-gray-600 hover:text-teal-500"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Bookmarks & Notifications */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleSlider("bookmark")}
                  className="flex items-center w-full text-gray-700 font-medium mb-2"
                >
                  <Heart size={20} className="mr-2" />
                  Bookmarks
                  {bookmarks.length > 0 && (
                    <span className="ml-auto inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center">
                      {bookmarks.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleSlider("notification")}
                  className="flex items-center w-full text-gray-700 font-medium"
                >
                  <Bell size={20} className="mr-2" />
                  Notifications
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Slider Panels */}
      {sliderType === "notification" && (
        <NotificationSlider
          sliderOpen={sliderOpen}
          closeSlider={() => setSliderOpen(false)}
          sidebarRef={notificationRef}
        />
      )}

    </header>
  );
}
