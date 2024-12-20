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
        setError(data.error || 'Please Login Again.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

return (
<div className="h-screen flex flex-col justify-center text-center text-black relative">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-[url('assets/img/services.jpg')] bg-cover bg-center" 
    style={{ opacity: 0.6 }}
  ></div>
  
  {/* Overlay for better contrast */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  
  {/* Content */}
  <div className="relative mt-6">
    {/* Personalized Greeting */}
    <div className="mb-6">
      <p className="text-xl font-medium text-white animate__animated animate__fadeIn mt-20">
        Hello, {userName}!
      </p>
      <p className="text-base text-white mt-2 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
        Not sure what to eat? Click the button below to receive meal recommendations based on your previous sugar levels.
      </p>
    </div>

    {/* Action Button */}
    <button
      onClick={fetchRecommendedMeals}
      className="w-72 bg-blue-500 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors animate__animated animate__bounceIn animate__delay-1s"
    >
      Get Recommendations
    </button>

    {/* Error Message */}
    {error && (
      <div className="mt-4 text-red-600 text-sm animate__animated animate__shakeX">
        <strong>{error}</strong>
      </div>
    )}

    {/* Last Recorded Sugar Level */}
    {lastSugarLevel && measurementTime && (
      <div className="mt-6 animate__animated animate__fadeIn animate__delay-2s">
        <p className="text-gray-200">
          <strong>Last Recorded Sugar Level:</strong> {lastSugarLevel}
        </p>
        <p className="text-gray-200 mt-1">
          <strong>Measurement Time:</strong> {measurementTime}
        </p>
      </div>
    )}

    {/* Recommended Meals */}
    {recommendedMeals.length > 0 && (
      <div className="mt-8 animate__animated animate__fadeIn animate__delay-2s">
        <ul className="flex space-x-4 text-white">
          {recommendedMeals.map((meal, index) => (
            <li key={index} className="text-base">
              {meal}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

  );
};

export default RecommendedMeals;
