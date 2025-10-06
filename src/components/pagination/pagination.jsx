import React from "react";
import Link from "next/link";

export default function Paginationn() {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {/* Previous Button */}
      <Link
        href="#"
        className="px-3 py-1 rounded-md border text-sm text-gray-600 hover:bg-gray-100"
      >
        Previous
      </Link>

      {/* Page Numbers */}
      <Link
        href="#"
        className="px-3 py-1 rounded-md border text-sm font-semibold bg-blue-100 text-blue-600"
      >
        1
      </Link>
      <Link
        href="#"
        className="px-3 py-1 rounded-md border text-sm text-gray-600 hover:bg-gray-100"
      >
        2
      </Link>
      <Link
        href="#"
        className="px-3 py-1 rounded-md border text-sm text-gray-600 hover:bg-gray-100"
      >
        3
      </Link>

      {/* Ellipsis */}
      <span className="px-3 py-1 text-gray-500">...</span>

      {/* Next Button */}
      <Link
        href="#"
        className="px-3 py-1 rounded-md border text-sm text-gray-600 hover:bg-gray-100"
      >
        Next
      </Link>
    </div>
  );
}
