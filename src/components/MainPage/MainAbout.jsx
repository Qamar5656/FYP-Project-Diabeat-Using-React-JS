import React, { useState } from 'react';

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
      <h2 className="text-2xl font-bold mb-4">Enter Sugar Level and Meal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sugar Level</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Time</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Meal</label>
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
      
      {recommendation && (
        <div className="mt-4 text-green-600">
          Recommendation: <strong>{recommendation}</strong>
        </div>
      )}
      
      {error && (
        <div className="mt-4 text-red-600">
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default SugarInputForm;
