import React, { useState, useEffect } from 'react';

const SevenDayMealPlan = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');  // Assuming the token is stored in state or localStorage

  useEffect(() => {
    // Check if access token is available (can also fetch from localStorage or context)
    const token = localStorage.getItem('access_token') || ''; // Adjust depending on how you're storing it

    // If no token, handle error or redirect
    if (!token) {
      setError('Access token is missing. Please log in again.');
      return;
    }

    // Set the token in the state
    setAccessToken(token);
  }, []);

  const fetchMealPlan = async () => {
    if (!accessToken) {
      setError('Access token is missing. Please log in again.');
      return;
    }

    setLoading(true); // Set loading state to true when API call is made
    try {
      const response = await fetch('http://localhost:8000/api/seven_days_meal_plan/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch meal plan.');
      }

      const data = await response.json();
      setMealPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading state to false after API call
    }
  };

  // Handle click on a meal to show more details
  const handleMealClick = (meal) => {
    alert(`You clicked on ${meal}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Your 7-Day Meal Plan</h2>

      {/* Introduction to diabetes */}
      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Diabetes is a condition that affects how your body processes blood sugar (glucose). It’s important for people with diabetes to manage their diet and nutrition to help control blood sugar levels.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          A well-balanced diet can help prevent spikes in blood sugar and improve overall health. The following meal plan is designed to offer a variety of foods that can help manage your diabetes and maintain a healthy lifestyle.
        </p>
      </div>

      {/* Button to fetch meal plan */}
      <div className="text-center">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600"
          onClick={fetchMealPlan}
          disabled={loading}
        >
          {loading ? 'Fetching Meal Plan...' : 'Fetch Your 7-Day Meal Plan'}
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Meal Plan Display */}
      {mealPlan.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No meal plan available. Please click the button above to fetch the plan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {mealPlan.map((day) => (
            <div key={day.day} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-500 mb-3">{day.day}</h3>
              <div className="mb-2">
                <h4 className="font-medium text-gray-700">Breakfast:</h4>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleMealClick(day.breakfast)}
                >
                  {day.breakfast}
                </button>
              </div>
              <div className="mb-2">
                <h4 className="font-medium text-gray-700">Lunch:</h4>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleMealClick(day.lunch)}
                >
                  {day.lunch}
                </button>
              </div>
              <div className="mb-2">
                <h4 className="font-medium text-gray-700">Dinner:</h4>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleMealClick(day.dinner)}
                >
                  {day.dinner}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SevenDayMealPlan;
