"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  AiFillHome ,        // Home icon
  AiFillBook,        // Book icon
  AiOutlineLogout ,// Logout icon
  AiFillSetting , // Settings icon
  AiOutlineUser      // User/Profile icon
} from "react-icons/ai";
const items = [
  {
    title: "Profile",
    url: "/dashboard/adminPages/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "All Books",
    url: "/dashboard/adminPages/allBooks",
    icon: <AiFillBook />,
  },
  {
    title: "Settings",
    url: "/dashboard/adminPages/settings",
    icon: <AiFillSetting />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-screen w-64 border-r border-gray-200">
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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
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
      <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
        >
          <AiFillHome className="w-5 h-5" /> Home
        </Link>

        <button
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
        >
          <AiOutlineLogout className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
