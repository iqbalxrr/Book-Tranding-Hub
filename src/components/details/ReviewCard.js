import React from "react";

const ReviewCard = ({ review }) => {
  const { userName, userEmail, userPhoto, rating, reviewText, createdAt } = review;

  const formattedDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : new Date(createdAt).toLocaleString();

  return (
    <div className="bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex gap-4">
      {/* 🧑 User Photo */}
      <img
        src={userPhoto || "https://i.ibb.co/2YkD0vL/default-avatar.png"}
        alt={userName}
        className="w-14 h-14 rounded-full object-cover border-2 border-[#FF7B6B]"
      />

      {/* 🗣️ Review Content */}
      <div className="flex-1">
        {/* Name + Stars */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-semibold text-lg text-gray-800">{userName}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < rating ? "text-[#FF7B6B]" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Email */}
        <p className="text-sm text-gray-500">{userEmail}</p>

        {/* Review Text */}
        <p className="mt-3 text-gray-700 leading-relaxed text-[15px]">
          {reviewText}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
          📅 {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
