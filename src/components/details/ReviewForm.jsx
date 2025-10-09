"use client";
import React, { useState, useEffect } from "react";
import { addReview, getReviews } from "@/utils/reviewActions";
import ReviewCard from "./ReviewCard";
import { useAuth } from "@/context/AuthContext";

const ReviewForm = ({ bookId }) => {
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(bookId);
      setReviews(data);
    };
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview(bookId, user, reviewText, rating);
    setReviewText("");
    const updatedReviews = await getReviews(bookId);
    setReviews(updatedReviews);
  };

  return (
    <div className="mt-10 bg-white shadow-lg rounded-2xl p-6 border border-[#FFD5CD]">
      <h3 className="text-2xl font-bold text-center mb-5 text-[#FF7B6B]">
        ✍️ Write a Review
      </h3>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[#FFF6F5] p-4 rounded-xl border border-[#FFE3DE]"
      >
        {/* Review Textarea */}
        <textarea
          className="textarea textarea-bordered w-full h-28 text-base bg-white border border-[#FFB7A8] focus:outline-none focus:ring-2 focus:ring-[#FF7B6B] shadow-sm rounded-lg p-3"
          placeholder="Write your honest thoughts about this book..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />

        {/* Rating and Submit Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Rating:</label>
            <select
              className="select select-bordered select-sm md:select-md border border-[#FFB7A8] focus:ring-1 focus:ring-[#FF7B6B]"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  ⭐ {r}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-full font-semibold py-3 px-8 text-white bg-[#FF7B6B] hover:bg-[#FF9F90] hover:shadow-md transition duration-500"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Review List */}
      <div className="mt-10">
        <h4 className="text-lg font-semibold mb-4 text-[#FF7B6B]">
          💬 Customer Reviews:
        </h4>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">
            No reviews yet — be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
