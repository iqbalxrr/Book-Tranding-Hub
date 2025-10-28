
"use client";

import { useAuth } from "@/context/AuthContext";
import { DB } from "@/lib/firebase";
import { useNotifications } from "@/lib/useNotifications";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { Trash2 } from 'lucide-react';
// 💡 REQUIRED IMPORTS: useRef and useEffect
import { useRef, useEffect } from "react";

export default function NotificationSlider({ sliderOpen, closeSlider, sidebarRef }) {
  const { user } = useAuth();
  const notifications = useNotifications()

  // Mark single notification as read
  const markAsRead = async (id) => {
    const ref = doc(DB, "notifications", id);
    await updateDoc(ref, { read: true });
  };

  
// 💡 NEW LOGIC: Mark all as read when the sidebar is opened
    useEffect(() => {
        // Only run if the slider is open (component is rendered) and we have unread notifications
        if (sliderOpen && notifications.some(n => !n.read)) {
            // Define the marking logic inside useEffect for immediate execution
            const markAllOnOpen = async () => {
                for (const n of notifications) {
                    if (!n.read) {
                        const ref = doc(DB, "notifications", n.id);
                        // Using set with merge: true is often better here, but updateDoc works
                        await updateDoc(ref, { read: true }); 
                    }
                }
            };
            markAllOnOpen();
        }
    }, [sliderOpen, notifications, user]); // Re-run when sidebar opens or notifications change


  // Delete a notification
  const deleteNotification = async (id) => {
    const ref = doc(DB, "notifications", id);
    await deleteDoc(ref);
  };

  // Time ago helper
  const timeAgo = (date) => {
    if (!date?.seconds) return "";
    const seconds = Math.floor(Date.now() / 1000 - date.seconds);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (!sliderOpen) return null; // don't render if closed

  return (
    // Full-screen overlay. It no longer needs the closeSlider function directly.
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-50"
    >
      {/* Sidebar */}
      <div
        // 💡 3. ATTACH THE REF HERE. Remove all manual onMouseDown/stopPropagation.
        ref={sidebarRef}
        className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 sticky top-0 bg-white z-50">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={closeSlider}>X</button>
        </div>

        {/* Notification list */}
        <div className="overflow-y-auto flex-1 p-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No notifications.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                // 👇 Simple divider for the list item
                className="p-3 border border-gray-200 text-sm mt-3 rounded-xl"
              >
                {/* TOP ROW: Notification Text and Time Ago */}
                <div className="flex justify-between items-start mb-1">
                  {/* Notification Text (Clickable to mark read) */}
                  <div
                    onClick={() => markAsRead(n.id)}
                    className="flex-1 min-w-0 pr-4"
                  >
                    <p className={`
                    text-gray-800 leading-snug 
                    ${n.read ? 'font-normal' : 'font-medium'}
                `}>
                      {n.text}
                    </p>
                  </div>

                  {/* Time Ago (Right-aligned, gray text) */}
                  <p className="text-xs text-gray-500 flex-shrink-0 pt-0.5">
                    {timeAgo(n.createdAt)}
                  </p>
                </div>

                {/* BOTTOM ROW: View Details and Delete Button (Justified) */}
                <div className="flex justify-between items-center mt-1">

                  {/* View Details Link */}
                  {n.url ? (
                    <Link
                      href={n.url}
                      className="text-teal-600 text-xs font-semibold hover:underline"
                      onClick={(e) => {
                        // Crucial: Stop click from propagating up to the container
                        e.stopPropagation();
                        // Mark as read when they click the link
                        markAsRead(n.id);
                      }}
                    >
                      View details
                    </Link>
                  ) : (
                    // Placeholder to help justify content if no URL is present
                    <div className="h-4"></div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="text-red-500 text-xs hover:underline transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}



