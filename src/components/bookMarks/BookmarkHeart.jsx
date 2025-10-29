// src/components/BookmarkHeart.jsx
import { Heart } from "lucide-react";

export default function BookmarkHeart({ bookmarks, handleSlider }) {
  const count = bookmarks ? bookmarks.length : 0;
  const hasBookmarks = count > 0;

  return (
    <div className="relative">
      <button
        onClick={() => handleSlider("bookmark")}
        className="hover:text-teal-600 relative p-1 transition duration-150"
        aria-label="View Bookmarks"
      >
        <Heart size={20} />

        {/* Red Count Badge */}
        {hasBookmarks && (
          <span
            className="absolute -top-2 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-red-500 rounded-full"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
