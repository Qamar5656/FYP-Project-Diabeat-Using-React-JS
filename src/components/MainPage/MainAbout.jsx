import React, { useState } from 'react';
import 'animate.css';

const SugarInputForm = () => {
  const [sugarLevel, setSugarLevel] = useState('');
  const [measurementTime, setMeasurementTime] = useState('fasting'); // Default choice
  const [meal, setMeal] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendation(null);
    setError(null);
  
    try {
      // Get the access token from local storage
      const accessToken = localStorage.getItem('access_token');
  
      // Make the POST request with the token in the Authorization header
      const response = await fetch('http://localhost:8000/api/sugar_input/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sugar_level: sugarLevel,
          measurement_time: measurementTime,
          meal: meal,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setRecommendation(data.recommendation);
      } else {
        setError(data.error || 'An error occurred while processing your request.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-200 shadow-md rounded-lg">
      {/* Animated Welcome Text */}
      <div className="text-center mb-6">
        <p className="text-xl font-medium text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
          Enter your sugar level and meal details to receive personalized meal recommendations!
        </p>
      </div>

      {/* Animated Header Text */}
      <h2 className="text-2xl font-bold mb-4 animate__animated animate__bounceInLeft">
        Enter Sugar Level and Meal
      </h2>

      {/* Animated Form Fields */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 animate__animated animate__fadeIn animate__delay-2s">
            Sugar Level
          </label>
          <input
            type="number"
            value={sugarLevel}
            onChange={(e) => setSugarLevel(e.target.value)}
            required
            className="w-full border rounded-md p-2"
            placeholder="Enter your sugar level"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 animate__animated animate__fadeIn animate__delay-3s">
            Measurement Time
          </label>
          <select
            value={measurementTime}
            onChange={(e) => setMeasurementTime(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="Fasting">Fasting</option>
            <option value="post-meal">Post-meal</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 animate__animated animate__fadeIn animate__delay-4s">
            Meal
          </label>
          <input
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            required
            className="w-full border rounded-md p-2"
            placeholder="Enter the meal name"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
      
      {/* Animated Recommendation Text */}
      {recommendation && (
        <div className="mt-4 text-green-600 animate__animated animate__fadeIn animate__delay-5s">
          Recommendation: <strong>{recommendation}</strong>
        </div>
      )}
      
      {/* Animated Error Text */}
      {error && (
        <div className="mt-4 text-red-600 animate__animated animate__shakeX animate__delay-5s">
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default SugarInputForm;
