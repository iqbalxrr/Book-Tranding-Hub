import { DB } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function addNotification(recipientEmail, data) {

  if (!recipientEmail) return console.error("No recipient email provided");

  try {
    const notifRef = collection(DB, "notifications")
    await addDoc(notifRef, {
      recipientEmail,
      text: data?.text || "New notification",
      url: data.url || null,
      type: data?.type || "general",
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding notification:", error);
  }
}
