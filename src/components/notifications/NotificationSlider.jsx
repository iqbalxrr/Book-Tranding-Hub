"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { DB } from "@/lib/firebase";

export default function NotificationSlider({ sliderOpen, closeSlider }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const q = query(
      collection(DB, "notifications"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setNotifications(arr);
    });
    return () => unsubscribe();
  }, [user]);

  async function markAsRead(notifId) {
    if (!user?.email) return;
    const ref = doc(DB, "notifications", notifId);
    await updateDoc(ref, { read: true });
  }

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${sliderOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-50">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={closeSlider}>X</button>
      </div>
      <div className="overflow-y-auto h-full p-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No notifications.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-3 border-b last:border-b-0 text-sm cursor-pointer ${n.read ? "bg-white" : "bg-teal-50"
                }`}
            >
              <p>{n.text}</p>
              {n.url && (
                <Link href={n.url} className="text-teal-500 text-xs underline">
                  View details
                </Link>
              )}
              <p className="text-xs text-gray-400">
                {n.createdAt?.toDate
                  ? new Date(n.createdAt.toDate()).toLocaleString()
                  : ""}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


// {notifications.length === 0 ? (
//   <p className="text-gray-500 text-sm text-center">No notifications.</p>
// ) : (
//   notifications.map((n) => (
//     <div
//       key={n.id}
//       onClick={() => markAsRead(n.id)}
//       className={`p-3 border-b last:border-b-0 text-sm cursor-pointer ${
//         n.read ? "bg-white" : "bg-teal-50"
//       }`}
//     >
//       <p>{n.text}</p>
//       {n.url && (
//         <Link href={n.url} className="text-teal-500 text-xs underline">
//           View details
//         </Link>
//       )}
//       <p className="text-xs text-gray-400">
//         {n.createdAt?.toDate
//           ? new Date(n.createdAt.toDate()).toLocaleString()
//           : ""}
//       </p>
//     </div>
//   ))
// )}

