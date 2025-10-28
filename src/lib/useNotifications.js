"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DB } from "./firebase";
import { useAuth } from "@/context/AuthContext";

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const notifRef = collection(DB, "notifications");
    const q = query(notifRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allNotifs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Client-side filter by user email
      const userNotifs = allNotifs
        .filter((n) => n.recipientEmail === user?.email)
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

      setNotifications(userNotifs);
    });

    return () => unsub();
  }, [user?.email]);

  return notifications;
}
