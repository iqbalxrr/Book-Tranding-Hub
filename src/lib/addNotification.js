import { DB } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// /**
//  * Add a new notification for a user (by email)
//  * @param {string} recipientEmail - email of the user to receive the notification
//  * @param {object} data - notification content
//  * Example: { text: "You got a new trade request", url: "/trade/abc" }
//  */
export async function addNotification(recipientEmail, data) {

  if (!recipientEmail) return console.error("No recipient email provided");

  try {
    const notifRef = collection(DB, "notifications")
    await addDoc(notifRef, {
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
