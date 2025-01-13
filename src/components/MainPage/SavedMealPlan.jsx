import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedMealPlan = () => {
  const [savedMealPlan, setSavedMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch saved meal plan data
  useEffect(() => {
    const fetchSavedMealPlan = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError(' Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/view_saved_meal_plan/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch saved meal plan');
        }

        const data = await response.json();
        setSavedMealPlan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedMealPlan();
  }, []);

  // Delete the weekly meal plan and redirect
  const deleteMealPlan = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/view_saved_meal_plan/', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete meal plan');
      }

      // Redirect to services page after successful deletion
      navigate('/weekplan');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br flex flex-col justify-center items-center p-6">
      <div className="text-center text-white">
        <h1 className="text-4xl font-extrabold mb-6 animate__animated animate__fadeInUp">
          Saved Meal Plan
        </h1>
        {loading && (
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <p className="text-xl text-black">Loading...</p>
          </div>
        )}
        {savedMealPlan.length === 0 ? (
          <p className="text-lg text-black mt-4 animate__animated animate__fadeInUp">
            No saved meal plans found. Please go to Generate Meal Plan then Generate and Save that meal plan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {savedMealPlan.map((meal, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-indigo-600">{meal.day}</h3>
                <p className="text-lg mt-2 text-gray-800">Breakfast: {meal.breakfast}</p>
                <p className="text-lg mt-2 text-gray-800">Lunch: {meal.lunch}</p>
                <p className="text-lg mt-2 text-gray-800">Dinner: {meal.dinner}</p>
              </div>
            ))}
          </div>
        )}


        {/* Delete Button */}
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-xl mt-8 hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-out shadow-lg"
          onClick={deleteMealPlan}
        >
          Delete This Week's Meal Plan & Generate New
        </button>
      </div>
    </div>
  );
};

export default SavedMealPlan;
