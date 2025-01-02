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
        setError(data.error || 'Please Login Again');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <>
    <div className={`w-full min-h-screen overflow-hidden sm:h-lvh flex lg:flex-row flex-col justify-center px-5 text-center 
              bg-[url('assets/img/diabetes.jpg')] bg-no-repeat sm:bg-cover lg:bg-cover opacity-90 transition-all duration-300`}>
      {/* Semi-Transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Left Side Welcome Text */}
      <div className="lg:w-2.5/3 w-full text-white md:ml-4 flex flex-col justify-center items-start px-5 md:mt-40 sm:mt-52  mt lg:mt-0 font-roboto">
      <p className="animate__animated font-semibold animate__fadeIn animate__delay-1s mt-0 text-2xl">
        Simply enter your sugar level, choose the time of day (e.g., fasting, post-meal), and select your meal 
      </p>
      <p className="font-semibold animate__animated animate__heartBeat text-white mt-3 text-xl">
        Based on this information, we’ll recommend meals that suit your condition and help you maintain healthy sugar levels.
      </p>
      </div>

      {/* Content */}
      <div className="relative z-10 lg:w-2/3 w-full text-white">
        {/* Animated Welcome Text */}
        <h2 className="text-2xl font-bold mb-4 animate__animated animate__bounceInLeft lg:mt-28 md:mt-8 sm:mt-3">
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
              <option value="fasting">Fasting</option>
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
            className="lg:w-96 md:w-96 w-full sm:w-96 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
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
          className="lg:w-96 md:w-96 w-full sm:w-96 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mt-4"
          >
          View Meal List
        </button>

        {/* Modal for meal carousel */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative p-10 rounded-lg max-w-lg w-full animate__animated animate__bounceInDown bg-[url('assets/img/bgimg.jpg')] bg-no-repeat bg-auto">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="absolute top-2 right-2 text-6xl hover:text-gray-500 text-black"
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold mb-8 text-black animate__animated animate__fadeIn">Available Meals</h3>

                      {/* Meal Carousel */}
                      {meals.length > 0 && (
                        <Slider {...settings} className="slick-slider text-green-700">
                          {meals.map((meal, index) => (                                               
                            <div
                              key={index}
                              className="text-black p-4 bg-white rounded-lg shadow-md cursor-pointer animate__animated animate__backInDown"
                              onClick={() => handleMealClick(meal.name)} // Meal click handler
                            >
                              <h4 className="font-extrabold animate-pulse">{meal.name}</h4>
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
        <div
          className={`mt-4 animate__animated animate__fadeIn ${
            recommendation.toLowerCase() === 'not recommended' ? 'text-red-500' : 'text-green-500'
          }`}
        >
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
  </>
  );
};

export default SugarInputForm;
