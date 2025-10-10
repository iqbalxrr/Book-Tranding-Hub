export const getReviews = async (bookId) => {
  const res = await fetch(`/api/reviews?bookId=${bookId}`);
  return res.json();
};

export const addReview = async (bookId, user, reviewText, rating) => {
  const res = await fetch(`/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId, user, reviewText, rating }),
  });
  return res.json();
};
