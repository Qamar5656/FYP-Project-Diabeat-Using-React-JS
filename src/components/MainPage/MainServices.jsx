import React, { useState } from 'react';

const RecommendedMeals = () => {
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [lastSugarLevel, setLastSugarLevel] = useState(null);
  const [measurementTime, setMeasurementTime] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecommendedMeals = async () => {
    setError(null);
    try {
      // Get the access token from local storage
      const accessToken = localStorage.getItem('access_token');

      // Make the POST request to fetch recommended meals
      const response = await fetch('http://localhost:8000/api/recommend_meals/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLastSugarLevel(data.last_sugar_level);
        setMeasurementTime(data.measurement_time);
        setRecommendedMeals(data.recommended_meals);
      } else {
        setError(data.error || 'Failed to fetch recommendations.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Recommended Meals</h2>
      <button
        onClick={fetchRecommendedMeals}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Get Recommendations
      </button>

      {error && (
        <div className="mt-4 text-red-600">
          <strong>{error}</strong>
        </div>
      )}

      {lastSugarLevel && measurementTime && (
        <div className="mt-4">
          <p>
            <strong>Last Recorded Sugar Level:</strong> {lastSugarLevel}
          </p>
          <p>
            <strong>Measurement Time:</strong> {measurementTime}
          </p>
        </div>
      )}

      {recommendedMeals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Top 10 Meals:</h3>
          <ul className="list-disc pl-5">
            {recommendedMeals.map((meal, index) => (
              <li key={index} className="mb-1">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendedMeals;
