"use client";

import { useAuth } from "@/context/AuthContext";
import { FaHome, FaExchangeAlt, FaBookOpen, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const items = [
  { title: "My Books", url: "/dashboard/userPages/myBooks", icon: <FaBookOpen /> },
  { title: "Exchange Request", url: "/dashboard/userPages/exchangeRequest", icon: <FaExchangeAlt /> },
  { title: "Chat", url: "/dashboard/userPages/chat", icon: <FaCommentDots /> },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const HandleLogout = async () => {
    try {
   
      await logout();

      // Success alert
      Swal.fire({
        title: "Success!",
        text: "You have been logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/"); // alert dismiss হলে redirect
      });

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
    <div className="flex flex-col min-h-[95vh] bg-white rounded-2xl w-72 border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600">Book Mate</h2>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="px-4 py-10 border-t border-gray-200 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
        >
          <FaHome className="w-5 h-5" /> Home
        </Link>

        <button
          onClick={HandleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
        >
          <FaSignOutAlt className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
