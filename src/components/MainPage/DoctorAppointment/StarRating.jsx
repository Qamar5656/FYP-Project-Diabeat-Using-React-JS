import React, { useState } from "react";

const StarRating = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, review);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            className={`text-3xl ${
              rating >= star ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review (optional)"
        className="mt-4 w-3/4 p-6 border border-gray-300 rounded-md"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-4 px-14 py-3 text-xl bg-green-500 text-white rounded-full hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  );
};

export default StarRating;
