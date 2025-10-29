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
  const [sliderType, setSliderType] = useState(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const pathName = usePathname();

  // ✅ Navbar hide on scroll
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ SweetAlert Welcome popup (once per session)
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

  // ✅ Fetch Bookmarks (auto refresh every 5s)
  const fetchBookmarks = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/bookmarks?email=${user.email}`);
      const data = await res.json();
      if (data.success) setBookmarks(data.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      toast.error("Failed to fetch bookmarks");
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    fetchBookmarks(); // first load
    const interval = setInterval(fetchBookmarks, 5000); // every 5 sec

    return () => clearInterval(interval); // cleanup
  }, [user?.email]);

  // ✅ Mark all bookmarks as seen
  const markBookmarksAsSeen = async () => {
    const hasUnseen = bookmarks.some((b) => b.seen === false);
    if (!hasUnseen) return;
    try {
      const res = await fetch(`/api/bookmarks/mark-as-seen`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
      if (res.ok) {
        setBookmarks((prev) => prev.map((b) => ({ ...b, seen: true })));
        Swal.fire({
          title: "Marked as Seen!",
          text: "All your bookmarks have been marked as seen.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: `API error while marking as seen: ${err.message}`,
        icon: "error",
      });
    }
  };

  // ✅ Handle Bookmark or Notification Slider
  const handleSlider = (type) => {
    if (sliderType === type) setSliderType(null);
    else {
      setSliderType(type);
      if (type === "bookmark") markBookmarksAsSeen();
    }
  };

  // ✅ Active route style
  const isActive = (href) =>
    pathName === href
      ? "text-teal-500 font-semibold border-b-2 border-teal-500 pb-1"
      : "hover:text-teal-500";

  // ✅ Menu items
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // ✅ Hide navbar on dashboard routes
  const isDashboard = pathName?.includes("/dashboard");
  if (isDashboard) return null;

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ✅ Top Navbar */}
      <div className="bg-teal-500 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex space-x-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <Link key={idx} href="#" className="hover:text-gray-200">
                <Icon size={16} />
              </Link>
            ))}
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
                  className="hover:underline text-sm"
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

      {/* ✅ Main Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-teal-500">
            BookMate
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {menuItems.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                className={`${isActive(menu.href)} transition-colors`}
              >
                {menu.name}
              </Link>
            ))}

            {/* ✅ Profile Dropdown */}
            {user && (
              <div className="relative group">
                <button className="flex items-center hover:text-teal-500">
                  Profile
                  <ChevronDown
                    className="ml-1 transform transition-transform duration-300 group-hover:rotate-180"
                    size={16}
                  />
                </button>
                <div className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
                  <Link
                    href="/addNewBook"
                    className="block px-4 py-2 hover:bg-teal-100"
                  >
                    Add New Book
                  </Link>
                  <Link
                    href={
                      user.email === "admin@gmail.com"
                        ? "/dashboard/adminPages/overview"
                        : "/dashboard/userPages/home"
                    }
                    className="block px-4 py-2 hover:bg-teal-100"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}

            {/* ✅ Icons */}
            <div className="ml-2 flex items-center space-x-4" ref={dropdownRef}>
              <BookmarkHeart
                bookmarks={bookmarks}
                handleSlider={handleSlider}
              />
              <NotificationBell handleSlider={handleSlider} />
            </div>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
            {menuItems.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                className={`${isActive(menu.href)} block`}
                onClick={() => setIsOpen(false)}
              >
                {menu.name}
              </Link>
            ))}

            {/* ✅ Profile Section (Mobile) */}
            {user && (
              <div>
                <button
                  className="w-full flex justify-between items-center text-gray-700 font-medium"
                  onClick={() =>
                    setMobileSubMenuOpen((prev) => ({
                      ...prev,
                      Profile: !prev.Profile,
                    }))
                  }
                >
                  Profile
                  <ChevronDown
                    className={`ml-1 transform transition-transform duration-300 ${
                      mobileSubMenuOpen.Profile ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>
                {mobileSubMenuOpen.Profile && (
                  <div className="pl-4 flex flex-col space-y-1 mt-1">
                    <Link
                      href="/addNewBook"
                      className="text-gray-600 hover:text-teal-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Add New Book
                    </Link>
                    <Link
                      href={
                        user.email === "admin@gmail.com"
                          ? "/dashboard/adminPages/overview"
                          : "/dashboard/userPages/home"
                      }
                      className="text-gray-600 hover:text-teal-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ✅ Bookmark & Notification */}
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => handleSlider("bookmark")}
                className="flex items-center w-full text-gray-700 font-medium mb-2"
              >
                <Heart size={20} className="mr-2" /> Bookmarks
                {bookmarks.length > 0 && (
                  <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center">
                    {bookmarks.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleSlider("notification")}
                className="flex items-center w-full text-gray-700 font-medium"
              >
                <Bell size={20} className="mr-2" /> Notifications
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Slider Panels */}
      {sliderType === "notification" && (
        <NotificationSlider
          sliderOpen={true}
          closeSlider={() => setSliderType(null)}
          sidebarRef={dropdownRef}
        />
      )}
      {sliderType === "bookmark" && (
        <BookmarkSlider
          bookmarks={bookmarks}
          sliderOpen={true}
          closeSlider={() => setSliderType(null)}
          sidebarRef={dropdownRef}
          setBookmarks={setBookmarks}
        />
      )}
    </header>
  );
}
