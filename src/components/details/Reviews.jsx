"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // তোমার firebase config path অনুযায়ী
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Reviews({ bookId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("bookId", "==", bookId));
      const querySnapshot = await getDocs(q);
      const reviewList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewList);
    };
    fetchReviews();
  }, [bookId]);

  if (!reviews.length)
    return <p className="text-center text-gray-500">No reviews yet.</p>;

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-start gap-4 border-b pb-4">
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{review.userName}</h3>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleString()}
            </p>
            <p className="mt-2">{review.comment}</p>
            <div className="mt-2 text-orange-500">
              {"⭐".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
