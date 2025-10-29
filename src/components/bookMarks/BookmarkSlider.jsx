"use client";

import { X, Trash2, BookOpen, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function BookmarkSlider({ bookmarks, setBookmarks, closeSlider, sidebarRef, user }) {
  const router = useRouter();

  // ✅ Mark all bookmarks as seen (with SweetAlert)
  const markBookmarksAsSeen = async () => {
    const hasUnseen = bookmarks.some(b => b.seen === false);
    if (!hasUnseen) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "info",
        title: "All bookmarks are already seen!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks/mark-as-seen`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email }),
      });

      if (res?.ok) {
        setBookmarks(prev => prev.map(b => ({ ...b, seen: true })));

        Swal.fire({
          title: "Success!",
          text: "All bookmarks have been marked as seen.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Failed to mark bookmarks as seen.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: `API error while marking as seen: ${err.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // ✅ Delete single bookmark (with confirmation)
  const deleteBookmark = async (bookmarkId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
          method: "DELETE",
        });

        if (res?.ok) {
          setBookmarks(prev => prev.filter(b => b._id !== bookmarkId));
          toast.success("Bookmark removed!");
        } else {
          toast.error("Failed to delete bookmark.");
        }
      } catch (error) {
        toast.error("An error occurred during deletion.");
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-50">
      <div
        ref={sidebarRef}
        className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-400 sticky top-0 bg-white z-50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={20} /> My Bookmarks ({bookmarks ? bookmarks?.length : 0})
          </h2>
          <div className="flex items-center gap-2">
            {/* ✅ Mark as Seen Button */}
            <button
              onClick={markBookmarksAsSeen}
              className="p-2 text-teal-600 hover:text-teal-800 transition"
              aria-label="Mark all as seen"
            >
              <Eye size={18} />
            </button>

            {/* Close Button */}
            <button
              onClick={closeSlider}
              className="p-2 text-gray-500 hover:text-gray-900 transition"
              aria-label="Close Bookmarks"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto h-[calc(100vh-60px)] p-4">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((b) => (
              <div
                key={b?._id}
                className={`p-3 border text-sm rounded-xl mb-2 ${b.seen ? "border-gray-200" : "border-teal-400"}`}
              >
                {/* Top Section */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0">
                    <img
                      src={b?.book.bookImage || "/placeholder-book.jpg"}
                      alt={`Cover of ${b?.book.bookName}`}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold truncate hover:text-teal-600 transition">
                      {b?.book.bookName}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      <span className="font-medium">{b?.book.authorName || "N/A"}</span> /{" "}
                      <span className="italic">{b?.book.category || "Uncategorized"}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  {b?.book._id ? (
                    <Link
                      href={`/books/${b.book._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/books/${b.book._id}`);
                        setTimeout(() => {
                          closeSlider();
                        }, 1500);
                      }}
                      className="text-teal-600 text-xs font-semibold hover:underline flex items-center gap-1"
                    >
                      View Book
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-xs">Book details unavailable</span>
                  )}

                  <button
                    onClick={() => deleteBookmark(b._id)}
                    className="text-red-500 text-xs hover:text-red-700 transition duration-150 flex items-center gap-1"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-10">
              No bookmarks yet. Start saving books!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
