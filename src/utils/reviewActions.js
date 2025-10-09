import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// 🔹 Add a new review
export const addReview = async (bookId, user, reviewText, rating) => {
  try {
    await addDoc(collection(db, "books", bookId, "reviews"), {
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      review: reviewText,
      rating: rating,
      createdAt: new Date(),
    });
    console.log("✅ Review added!");
  } catch (error) {
    console.error("❌ Error adding review:", error);
  }
};

// 🔹 Get all reviews for a book
export const getReviews = async (bookId) => {
  try {
    const q = query(
      collection(db, "books", bookId, "reviews"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return [];
  }
};
