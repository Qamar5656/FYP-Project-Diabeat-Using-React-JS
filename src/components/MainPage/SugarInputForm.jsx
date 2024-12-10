import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css';

const SugarInputForm = () => {
  const [sugarLevel, setSugarLevel] = useState('');
  const [measurementTime, setMeasurementTime] = useState('fasting');
  const [meal, setMeal] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(false); // To track loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  // Function to fetch meal data
  const handleFetchMeals = async () => {
    setLoadingMeals(true); // Set loading state to true
    try {
      const response = await fetch('http://localhost:8000/api/get_meals/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      setMeals(data);
    } catch (err) {
      setError('Failed to fetch meals. Please try again.');
    } finally {
      setLoadingMeals(false); // Set loading state to false once data is fetched
    }
  };

  // Function to handle meal click
  const handleMealClick = (mealName) => {
    setMeal(mealName); // Set the clicked meal as the input value
    setIsModalOpen(false); // Close modal after selecting the meal
  };

  // Carousel settings for react-slick
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true, // Enable default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendation(null);
    setError(null);

    try {
      const accessToken = localStorage.getItem('access_token');
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
    <div
      className={`w-full h-screen flex lg:flex-row flex-col justify-center px-5 text-center bg-[url('assets/img/diabetes.jpg')] bg-no-repeat bg-cover opacity-90 relative transition-all duration-300 ${loadingMeals ? 'blur-sm' : ''}`}
    >
      {/* Semi-Transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Left Side Welcome Text */}
      <div className="lg:w-1/3 w-full text-white flex flex-col justify-center items-start px-5">
        <p className="animate__animated animate__fadeIn animate__delay-1s mt-20">
          Simply enter your sugar level, choose the time of day (e.g., fasting, post-meal), and select your meal 
        </p>
        <p className='font-semibold'>
          Based on this information, we’ll recommend meals that suit your condition and help you maintain healthy sugar levels.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 lg:w-2/3 w-full text-white">
        {/* Animated Welcome Text */}
        <h2 className="text-2xl font-bold mb-4 animate__animated animate__bounceInLeft mt-28">
          Enter Sugar Level and Meal
        </h2>

        {/* Animated Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block font-bold text-2xl mb-2 animate__animated animate__fadeIn animate__delay-2s">
              Sugar Level
            </label>
            <input
              type="number"
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              required
              className="w-full sm:w-96 bg-gray-800 text-white border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your sugar level"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-2xl mb-2 animate__animated animate__fadeIn animate__delay-3s">
              Measurement Time
            </label>
            <select
              value={measurementTime}
              onChange={(e) => setMeasurementTime(e.target.value)}
              className="w-full sm:w-96 bg-gray-800 text-white border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="Fasting">Fasting</option>
              <option value="post-meal">Post-meal</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold text-2xl mb-2 animate__animated animate__fadeIn animate__delay-4s">
              Meal
            </label>
            <input
              type="text"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              required
              className="w-full sm:w-96 bg-gray-800 text-white border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the meal name"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-80 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* Button to fetch meals */}
        <button
          onClick={() => {
            handleFetchMeals();
            setIsModalOpen(true); // Open the modal
          }}
          className="w-full sm:w-80 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mt-4"
        >
          View Meal List
        </button>

        {/* Modal for meal carousel */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative p-6 rounded-lg max-w-lg w-full bg-[url('assets/img/plates.jpg')]">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="absolute top-2 right-2 text-xl text-black"
              >
                &times;
              </button>

              <h3 className="text-lg font-bold mb-4 text-black">Available Meals</h3>

              {/* Meal Carousel */}
              {meals.length > 0 && (
                <Slider {...settings}>
                  {meals.map((meal, index) => (
                    <div
                      key={index}
                      className="text-black p-4 rounded-lg shadow-md cursor-pointer"
                      onClick={() => handleMealClick(meal.name)} // Meal click handler
                    >
                      <h4 className="font-extrabold">{meal.name}</h4>
                      <p>{meal.gi_level} GI</p>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        )}

        {/* Animated Recommendation Text */}
        {recommendation && (
          <div className="mt-4 text-green-500 animate__animated animate__fadeIn">
            Recommendation: <strong>{recommendation}</strong>
          </div>
        )}

        {/* Animated Error Text */}
        {error && (
          <div className="mt-4 text-red-400 animate__animated animate__shakeX">
            <strong>{error}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default SugarInputForm;
