"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Buttons() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home /" },
    { href: "/books", label: "All Books /" },
    { href: "/books/", label: "Detailes" },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {links.map((link) => {
        let isActive = false;

        if (link.href === "/allBooks") {
          isActive = pathname === "/books";
        } else if (link.href === "/books/") {
          isActive = pathname.startsWith("/books/") && pathname !== "/books";
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`${
              isActive ? "text-[#FF7B6B] underline" : "text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
