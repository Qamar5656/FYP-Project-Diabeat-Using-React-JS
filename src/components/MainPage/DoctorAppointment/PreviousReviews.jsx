import React from "react";

const PreviousReviews = ({ ratings }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl text-gray-700 mb-4">Previous Reviews</h2>
      {ratings.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        ratings.map((rating) => (
          <div key={rating.id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold">{rating.patient_name}</p>
              <p className="text-yellow-500">{rating.rating} ★</p>
            </div>
            <p>{rating.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousReviews;
