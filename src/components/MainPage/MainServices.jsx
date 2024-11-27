import React, { useState, useEffect } from 'react';
import 'animate.css';

const RecommendedMeals = () => {
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [lastSugarLevel, setLastSugarLevel] = useState(null);
  const [measurementTime, setMeasurementTime] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the user's name from local storage or an API
    const name = localStorage.getItem('first_name') || 'User';
    setUserName(name);
  }, []);

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
      <h2 className="text-2xl font-bold mb-4 animate__animated animate__fadeIn">
        Recommended Meals
      </h2>

      {/* Personalized greeting */}
      <div className="mb-4">
        <p className="text-xl animate__animated animate__fadeIn animate__delay-0s">
          Hello, {userName}!
        </p>
        <p className="text-lg text-gray-700 mt-2 animate__animated animate__fadeIn animate__delay-1s">
          Not sure what to eat? Click the button below to receive meal recommendations based on your previous sugar levels.
        </p>
      </div>

      <button
        onClick={fetchRecommendedMeals}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 animate__animated animate__bounceIn animate__delay-1s"
      >
        Get Recommendations
      </button>

      {error && (
        <div className="mt-4 text-red-600 animate__animated animate__shakeX">
          <strong>{error}</strong>
        </div>
      )}

      {lastSugarLevel && measurementTime && (
        <div className="mt-4 animate__animated animate__fadeIn animate__delay-2s">
          <p>
            <strong>Last Recorded Sugar Level:</strong> {lastSugarLevel}
          </p>
          <p>
            <strong>Measurement Time:</strong> {measurementTime}
          </p>
        </div>
      )}

      {recommendedMeals.length > 0 && (
        <div className="mt-6 animate__animated animate__fadeIn animate__delay-2s">
          <h3 className="text-lg font-bold mb-2">Top 10 Meals:</h3>
          <ul className="list-disc pl-5">
            {recommendedMeals.map((meal, index) => (
              <li key={index} className="mb-1">{meal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendedMeals;
