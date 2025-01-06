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
    //Main Page Top content
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-20 text-center bg-[url('assets/img/foodimg.jpeg')] bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-0 text-white w-full max-w-5xl">
        <div className="mb-6 mt-20 sm:mt-18">
          <p className="font-bold lg:text-2xl sm:text-lg md:mt-5 lg:mt-8 animate__animated animate__bounceInDown">
            Diabetes is a condition that affects how your body processes blood sugar (glucose)
          </p>
          <p className=" md:text-lg sm:text-base mt-2 animate__animated animate__flash animate__delay-1s">
            A well-balanced diet can help prevent spikes in blood sugar and improve overall health. The following meal plan is designed to offer a variety of foods that can help manage your diabetes and maintain a healthy lifestyle.
          </p>
        </div>
        {/*Buttons for getting meal plan */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-600"
            onClick={fetchMealPlan}
            disabled={loading}
            >
            {loading ? 'Fetching Meal Plan...' : isFetched ? 'Want Another Meal Plan?' : 'Get Your 7-Day Meal Plan'}
          </button>
          {/*Buttons for saving meal plan */}
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium ${
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
  
        {message && <div className="mt-4 text-sm sm:text-base font-medium text-green-500">{message}</div>}
        {error && <div className="text-red-500 mt-4 text-sm sm:text-base">{error}</div>}
            
        {/*Button to fetch meal plan */}
        {mealPlan.length === 0 ? (
          <p className="text-white mt-6 animate-pulse md:text-lg lg:text-xl sm:text-base">Please click the button above to fetch the plan.</p> 
        ) : (
          <div className="mt-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/*Previous Button */}
              <button
                className="bg-gray-800  hover:bg-slate-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md disabled:opacity-50"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                >
                &lt; Prev
              </button>
              {/*Meal Plan div */}
              <div className="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 gap-5 animate__animated ${animationClass}">
                {currentMeals.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white text-gray-800 p-4 w-48 rounded-lg shadow-md flex flex-col items-center justify-center"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-500 mb-2 text-center">
                        {day.day}
                      </h3>
                    </div>

                    <div className="mb-4 w-full text-center">
                      <h4 className="font-medium text-sm sm:text-base">Breakfast:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                        onClick={() => handleMealClick(day.breakfast)}
                      >
                        {day.breakfast}
                      </button>
                    </div>

                    <div className="mb-4 w-full text-center">
                      <h4 className="font-medium text-sm sm:text-base">Lunch:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                        onClick={() => handleMealClick(day.lunch)}
                      >
                        {day.lunch}
                      </button>
                    </div>

                    <div className="mb-4 w-full text-center">
                      <h4 className="font-medium text-sm sm:text-base">Dinner:</h4>
                      <button
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                        onClick={() => handleMealClick(day.dinner)}
                      >
                        {day.dinner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/*Next Button */}
              <button
                className="bg-gray-800 hover:bg-slate-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md disabled:opacity-50"
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
)}  

export default SevenDayMealPlan;
