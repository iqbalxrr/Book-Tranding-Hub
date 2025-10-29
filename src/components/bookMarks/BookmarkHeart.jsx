// src/components/BookmarkBell.jsx
import { Heart } from 'lucide-react';

export default function BookmarkHeart({ bookmarks, handleSlider }) {
    
    const unseenCount = bookmarks 
        ? bookmarks.filter(b => b.seen === false).length 
        : 0;
        
    const hasUnseenBookmarks = unseenCount > 0;

    return (
        <div className="relative">
            <button
                onClick={() => handleSlider("bookmark")}
                className="hover:text-teal-600 relative p-1 transition duration-150"
                aria-label="View Bookmarks"
            >
                <Heart size={20} />
                
                {/* Red Dot Indicator */}
                {hasUnseenBookmarks && (
                    <span 
                        className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"
                        aria-hidden="true"
                    ></span>
                )}
            </button>
        </div>
    );
}