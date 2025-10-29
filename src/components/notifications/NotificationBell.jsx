// "use client";

// import { useEffect, useState } from "react";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { useAuth } from "@/context/AuthContext";
// import { Bell } from "lucide-react";
// import { DB } from "@/lib/firebase";

// export default function NotificationButton({ handleSlider }) {

//   const { user } = useAuth();
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (!user?.email) return;
//     const q = query(
//       collection(DB, "users", user?.email, "notifications"),
//       orderBy("createdAt", "desc")
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const arr = [];
//       snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
//       setNotifications(arr);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <button
//       onClick={() => handleSlider("notification")}
//       className="relative hover:text-teal-500"
//     >
//       <Bell size={22} />
//       {unreadCount > 0 && (
//         <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
//       )}
//     </button>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import { Bell } from "lucide-react";
// import { DB } from "@/lib/firebase";
// import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import { useAuth } from "@/context/AuthContext";

// export default function NotificationBell({ handleSlider }) {
//   const { user } = useAuth();
//   const [notifications, setNotifications] = useState([]);
//   console.log(notifications);

//   useEffect(() => {
//     if (!user?.email) return;
//     const notifRef = collection(DB, "notifications");
//     const q = query(notifRef, orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, (snap) => {
//       const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//       setNotifications(data);
//     });
//     return () => unsub();
//   }, [user?.email]);

//   const markAsRead = async (id) => {
//     const docRef = doc(DB, "notifications", id);
//     await updateDoc(docRef, { read: true });
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => handleSlider("notification")}
//         className="relative hover:text-teal-500"
//       >
//         <Bell size={22} />
//         {notifications?.some((n) => !n.read) && (
//           <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
//         )}
//       </button>
//     </div>
//   );
// }

"use client";
import { useNotifications } from "@/lib/useNotifications";
import { Bell } from "lucide-react";

export default function NotificationBell({ handleSlider }) {
  const notifications = useNotifications();

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="relative">
      <button
        onClick={() => handleSlider("notification")}
        className="relative hover:text-teal-500"
      >
        <Bell size={22} />
        {hasUnread && (
            // This span is the red dot. It hides when hasUnread becomes false.
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
    </div>
  );
}



