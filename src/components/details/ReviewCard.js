import React from "react";

const ReviewCard = ({ review }) => {
  const { userName, userEmail, userPhoto, rating, reviewText, createdAt } = review;
 
  const formattedDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : new Date(createdAt).toLocaleString();

  // ⭐ Color-coded rating
  const getRatingColor = (r) => {
    if (r >= 4) return "text-green-500";
    if (r >= 2) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="bg-white hover:bg-[#FFF7F6] border border-[#FFD3CC] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex gap-4">
      {/* User Avatar */}
      <img
        src={userPhoto || "https://i.ibb.co/2YkD0vL/default-avatar.png"}
        alt={userName}
        className="w-14 h-14 rounded-full object-cover border-2 border-[#FF7B6B]"
      />

      {/* Review Info */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-bold text-lg text-gray-800">{userName}</h3>
          <span className={`font-semibold text-sm mt-1 sm:mt-0 ${getRatingColor(rating)}`}>
            ⭐ {rating}/5
          </span>
        </div>

        <p className="text-sm text-gray-500">{userEmail}</p>

        <p className="mt-3 text-gray-700 leading-relaxed text-[15px]">
          {reviewText}
        </p>

        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
          📅 {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
