"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    pathname === href
      ? "flex items-center gap-2 p-2 rounded-lg bg-blue-100 text-blue-600 font-semibold"
      : "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100";

  return (
    <div className="flex flex-col space-y-2 mt-4">
      <Link
        href="/dashboard/adminPages/settings"
        className={linkClass("/dashboard/adminPages/settings")}
      >
        Settings
      </Link>

      <Link
        href="/dashboard/adminPages/profile"
        className={linkClass("/dashboard/adminPages/profile")}
      >
        Profile
      </Link>
    </div>
  );
}
