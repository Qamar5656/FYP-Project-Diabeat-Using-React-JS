import React, { useState, useEffect } from 'react';
import 'animate.css';

const SevenDayMealPlan = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token') || '';
    if (!token) {
      setError('Access token is missing. Please log in again.');
      return;
    }
    setAccessToken(token);
  }, []);

  const fetchMealPlan = async () => {
    if (!accessToken) {
      setError('Access token is missing. Please log in again.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/seven_days_meal_plan/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setMealPlan(data);
      setIsFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveMealPlan = async () => {
    setMessage('');
    setSaving(true);
    try {
      const response = await fetch('http://localhost:8000/api/seven_days_meal_plan/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meal_plan: mealPlan }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Meal plan saved successfully!');
      } else {
        setMessage(data.error || 'Failed to save meal plan.');
      }
    } catch (error) {
      setMessage('An error occurred while saving the meal plan.');
    } finally {
      setSaving(false);
    }
  };

  const handleMealClick = (meal) => {
    alert(`You clicked on ${meal}`);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimationClass('animate__fadeInLeft');
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleNext = () => {
    if (currentIndex < Math.ceil(mealPlan.length / 3) - 1) {
      setAnimationClass('animate__fadeInRight');
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, Math.ceil(mealPlan.length / 3) - 1)
      );
    }
  };

  const currentMeals = mealPlan.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-5 lg:px-32 text-center bg-[url('assets/img/foodimg.jpeg')] bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-20 text-white">
        <div className="mb-6">
          <p className="text-lg mt-10 animate__animated animate__bounceInDown">
            Diabetes is a condition that affects how your body processes blood sugar (glucose)
          </p>
          <p className="text-lg mt-2 animate__animated animate__flash animate__delay-1s">
            A well-balanced diet can help prevent spikes in blood sugar and improve overall health. The following meal plan is designed to offer a variety of foods that can help manage your diabetes and maintain a healthy lifestyle.
          </p>
        </div>

        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-lg font-medium hover:bg-blue-600 mr-2 lg:mr-4"
            onClick={fetchMealPlan}
            disabled={loading}
          >
            {loading ? 'Fetching Meal Plan...' : isFetched ? 'Want Another Meal Plan?' : 'Get Your 7-Day Meal Plan'}
          </button>
          <button
            className={`px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-lg font-medium ${
              mealPlan.length === 0
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            onClick={saveMealPlan}
            disabled={saving || mealPlan.length === 0}
          >
            {saving ? 'Saving...' : 'Save Meal Plan'}
          </button>
        </div>

        {message && <div className="mt-4 text-sm lg:text-lg font-medium text-green-500">{message}</div>}
        {error && <div className="text-red-500 mt-4 text-sm lg:text-base">{error}</div>}

        {mealPlan.length === 0 ? (
          <p className="text-white mt-6 animate-pulse text-sm lg:text-base">Please click the button above to fetch the plan.</p>
        ) : (
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <button
                className="bg-gray-800 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-md disabled:opacity-50 mb-4 lg:mb-0"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &lt; Prev
              </button>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 overflow-hidden animate__animated ${animationClass}`}
              >
                {currentMeals.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white text-gray-800 p-4 rounded-lg shadow-md w-full sm:w-auto flex-shrink-0 bg-[url('assets/img/corner.jpg')]"
                  >
                    <h3 className="text-lg lg:text-xl font-semibold text-blue-500 mb-2 lg:mb-3">{day.day}</h3>
                    <div className="mb-2">
                      <h4 className="font-medium text-sm lg:text-base">Breakfast:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm lg:text-base"
                        onClick={() => handleMealClick(day.breakfast)}
                      >
                        {day.breakfast}
                      </button>
                    </div>
                    <div className="mb-2">
                      <h4 className="font-medium text-sm lg:text-base">Lunch:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm lg:text-base"
                        onClick={() => handleMealClick(day.lunch)}
                      >
                        {day.lunch}
                      </button>
                    </div>
                    <div className="mb-2">
                      <h4 className="font-medium text-sm lg:text-base">Dinner:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm lg:text-base"
                        onClick={() => handleMealClick(day.dinner)}
                      >
                        {day.dinner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="bg-gray-800 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-md disabled:opacity-50"
                onClick={handleNext}
                disabled={currentIndex >= Math.ceil(mealPlan.length / 3) - 1}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SevenDayMealPlan;
