import React from "react";

const ReviewCard = ({ review }) => {
  const { userName, userEmail, userPhoto, rating, review: text, createdAt } = review;
  const formattedDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : new Date(createdAt).toLocaleString();

  return (
    <div className="bg-base-200 rounded-2xl shadow-md p-4 flex items-start gap-3 mb-4">
      <img
        src={userPhoto || "https://i.ibb.co/2YkD0vL/default-avatar.png"}
        alt={userName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{userName}</h3>
          <span className="text-yellow-500">⭐ {rating}/5</span>
        </div>
        <p className="text-sm text-gray-500">{userEmail}</p>
        <p className="mt-2">{text}</p>
        <p className="text-xs text-gray-400 mt-1">📅 {formattedDate}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
