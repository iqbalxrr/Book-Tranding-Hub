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
import BookmarkHeart from "./bookMarks/BookmarkHeart";
import BookmarkSlider from "./bookMarks/BookmarkSlider";


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  // const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderType, setSliderType] = useState(null); // "bookmark" or "notification"
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({}); // track open submenus

  const dropdownRef = useRef(null)
  // const notificationRef = useRef(null)

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
      if (!sliderType) return;
      const clickedInsideSlider = dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!clickedInsideSlider) {
        setSliderType(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sliderType]);

  if (isDashboard) return null;


  // 💡 New function to update the 'seen' status in the database
  const markBookmarksAsSeen = async () => {
    const hasUnseen = bookmarks.some(b => b.seen === false);
    if (!hasUnseen) return;

    try {
      const res = await fetch(`/api/bookmarks/mark-as-seen`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.email }), // Identify the user
      });

      if (res?.ok) {
        setBookmarks(prev =>
          prev.map(b => ({ ...b, seen: true }))
        );
      } else {
        toast.error("Failed to mark bookmarks as seen.");
      }
    } catch (err) {
      toast.error("API error for mark-as-seen:", err);
    }
  };

  // Replace your old handleSlider function with this:
  const handleSlider = (type) => {
    if (sliderType === type) {
      setSliderType(null)
    } else {
      setSliderType(type)
      if (type === 'bookmark') {
        markBookmarksAsSeen();
      }
    }
  }

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

  // isplay the navbar only when not in dashboard

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-500 ${showNav ? "translate-y-0" : "-translate-y-full"
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

                <BookmarkHeart bookmarks={bookmarks} handleSlider={handleSlider} />

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
                      className={`ml-1 transform transition-transform duration-300 ${mobileSubMenuOpen[menu.name] ? "rotate-180" : ""
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
          // We only need to check if sliderType is NOT null, so we use a boolean derived from it
          sliderOpen={sliderType === "notification"}
          closeSlider={() => setSliderType(null)} // Set state back to null to close
          sidebarRef={dropdownRef} // Renamed for clarity in the ref
        />
      )}

      {sliderType === 'bookmark' && (
        <BookmarkSlider
          bookmarks={bookmarks}
          sliderOpen={sliderType === "bookmark"} // Derived boolean
          closeSlider={() => setSliderType(null)} // Set state back to null to close
          sidebarRef={dropdownRef}
          setBookmarks={setBookmarks}
        />
      )}

    </header>
  );
}
