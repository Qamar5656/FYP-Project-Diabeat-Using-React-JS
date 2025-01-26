import React from "react";

 // Function to render star ratings for a doctor
 const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Full stars based on rating
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if rating is >= 0.5
  const emptyStars = 5 - fullStars - halfStar; // Empty stars to complete 5 stars
  const stars = [];

  for (let i = 0; i < fullStars; i++) stars.push("★"); // Add full stars to array
  if (halfStar) stars.push("☆"); // Add half star to array if necessary
  for (let i = 0; i < emptyStars; i++) stars.push("☆"); // Add empty stars to array

  return stars.join(" "); // Join stars array into a string and return
};

const Modal = ({ reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 mt-8 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-4/5 overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">Previous Reviews</h2>
          {/* Close Button in Header */}
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto h-5/6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="border-b py-3 px-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <p className="text-lg font-semibold text-gray-800">{review.patient_name}</p>
                <p className="text-gray-600 mt-1">{review.review}</p>
                <div className="mt-2 text-yellow-500">
                      <span>{renderStars(review.rating)}</span> {/* Render doctor's rating stars */}
                    </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No reviews available.</p>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="p-4 border-t flex justify-center">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
