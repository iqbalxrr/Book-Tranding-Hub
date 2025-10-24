"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome, AiFillBook, AiFillSetting, AiOutlineLogout, AiOutlineUser, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    title: "Overview",
    url: "/dashboard/adminPages/overview",
    icon: <AiOutlineUser />,
  },
  {
    title: "Books",
    url: "/dashboard/adminPages/allBooks",
    icon: <AiFillBook />,
  },
  {
    title: "Users",
    url: "/dashboard/adminPages/allUsers",
    icon: <AiOutlineUser />,
  },
  {
    title: "Settings",
    url: "/dashboard/adminPages/settings",
    icon: <AiFillSetting />,
  },
];
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = async () => {
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
    <div className="flex flex-col min-h-[95vh] w-72 bg-white border-r border-gray-200 shadow-lg">
      {/* ===== Sidebar Header ===== */}
      <div className="lg:hidden p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 tracking-wide">Admin Panel</h2>
      </div>

      {/* ===== Sidebar Menu ===== */}
      <div className="flex-1 px-5 py-14 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = item.url && pathname === item.url;
            const isParentActive = hasChildren && item.children.some(child => child.url === pathname);

            return (
              <li key={item.title}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 font-medium
                        ${isParentActive ? "bg-blue-100 text-blue-600 shadow-inner" : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        {item.title}
                      </span>
                      {openMenus[item.title] ? <AiOutlineUp /> : <AiOutlineDown />}
                    </button>
                    {openMenus[item.title] && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              href={child.url}
                              className={`flex items-center px-3 py-2 rounded-lg text-gray-700 transition-all duration-200
                                ${pathname === child.url ? "bg-blue-100 text-blue-600 font-semibold shadow-inner" : "hover:bg-gray-100 hover:text-blue-500"}`}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive ? "bg-blue-100 text-blue-600 font-semibold shadow-inner" : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Sidebar Footer ===== */}
      <div className="px-5 pb-10 flex flex-col gap-3 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-700"
        >
          <AiFillHome className="w-5 h-5" /> Home
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-medium shadow"
        >
          <AiOutlineLogout className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
