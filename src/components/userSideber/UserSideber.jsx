"use client";

import { useAuth } from "@/context/AuthContext";
import {
  FaHome,
  FaExchangeAlt,
  FaBookOpen,
  FaCommentDots,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";


const items = [

  { title: "Profile", url: "/dashboard/userPages/profile", icon: <FaUserCircle /> },

  { title: "Home", url: "/dashboard/userPages/home", icon: <FaHome /> },
d2fbcab2729bfebe7a0a644e5bf5b3f19b6961f5
  { title: "My Books", url: "/dashboard/userPages/myBooks", icon: <FaBookOpen /> },
  { title: "Exchange Request", url: "/dashboard/userPages/exchangeRequest", icon: <FaExchangeAlt /> },
  { title: "Chat List", url: "/dashboard/userPages/chat", icon: <FaCommentDots /> },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const HandleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        title: "Logged Out",
        text: "You have successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
      }).then(() => router.push("/"));
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Logout failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] bg-white w-72 border-r border-gray-200 shadow-sm">
      {/* ===== Sidebar Header (Small screens) ===== */}
      <div className="lg:hidden p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 tracking-wide">Book Mate</h2>
      </div>

      {/* ===== Sidebar Menu ===== */}
      <div className="flex-1 px-5 py-14">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold shadow-inner"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[15px]">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Sidebar Footer ===== */}
      <div className="px-5 pb-10 flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-700"
        >
          <FaHome className="w-5 h-5" /> Home
        </Link>

        <button
          onClick={HandleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-medium shadow"
        >
          <FaSignOutAlt className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
