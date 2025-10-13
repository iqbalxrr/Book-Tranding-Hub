"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // ✅ SweetAlert import
import { addReview, getReviews } from "@/utils/reviewActions";
import { useAuth } from "@/context/AuthContext";
import ReviewCard from "./ReviewCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ReviewForm = ({ bookId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(bookId);
      setReviews(data);
    };
    fetchReviews();
  }, [bookId]);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check login
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to submit a review!",
        confirmButtonColor: "#FF7B6B",
        confirmButtonText: "Go to Login",
      }).then(() => {
        router.push("/login"); // redirect to login page
      });
      return;
    }

    if (!rating) {
      Swal.fire({
        icon: "info",
        title: "Select Rating",
        text: "Please select a rating before submitting!",
        confirmButtonColor: "#FF7B6B",
      });
      return;
    }

    const userData = {
      displayName: user?.displayName || user?.name || "Anonymous",
      email: user?.email || "No email",
      photoURL: user?.photoURL || "",
    };

    await addReview(bookId, userData, reviewText, rating);
    setReviewText("");
    setRating(0);

    const updated = await getReviews(bookId);
    setReviews(updated);
  };

  // Calculate rating data
  const ratingData = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((r) => ({
      name: `${r}★`,
      value: reviews.filter((rev) => rev.rating === r).length,
    }));
    return counts;
  }, [reviews]);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="mt-10 bg-base-100 rounded-2xl shadow-xl border border-[#FF7B6B]/40 p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7B6B]">Ratings & Reviews</h2>
        <p className="text-gray-500 mt-1">Read what others think and share your experience.</p>
      </div>

      {/* Rating Overview */}
      {reviews.length > 0 && (
        <div className="bg-base-200 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:w-1/4">
            <h3 className="text-6xl font-bold text-[#FF7B6B]">
              {avgRating}
              <span className="text-3xl text-gray-400">/5</span>
            </h3>
            <p className="text-gray-600 mt-1">{reviews.length} total reviews</p>
          </div>
          <div className="flex-1 w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: "#555" }} width={40} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF7B6B" radius={[0, 8, 8, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Review Form */}
      <div className="bg-base-200 p-6 rounded-2xl border border-[#FF7B6B]/50">
        <h3 className="text-xl font-semibold text-[#FF7B6B] mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
                className="text-3xl transition-transform transform hover:scale-110"
              >
                <span className={`${star <= (hover || rating) ? "text-[#FF7B6B]" : "text-gray-400"}`}>★</span>
              </button>
            ))}
          </div>

          <textarea
            className="textarea textarea-bordered w-full h-32 text-base border-2 border-[#FF7B6B]/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#FF7B6B] focus:border-transparent"
            placeholder="Share your honest thoughts about this book..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <button
            type="submit"
            className="self-center rounded-full font-bold py-3 px-10 bg-[#FF7B6B] text-white border-2 border-[#FF7B6B] hover:bg-[#ff9586] transition-all duration-300 shadow-md"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-4 text-[#FF7B6B]">Customer Reviews</h4>
        {reviews.length > 0 ? (
          <div className="space-y-4 border-t border-[#FF7B6B]/20 pt-4">
            {reviews.map((r) => (
              <ReviewCard key={r._id} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
