import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'animate.css';

const GlycemicLoadRecommendations = () => {
  const [meals, setMeals] = useState([]);
  const [portionSize, setPortionSize] = useState(100); // Default portion size is 100g
  const [selectedMeal, setSelectedMeal] = useState(null); // Store the selected meal
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch meals from the 'api/get_meals/' endpoint
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_meals/');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError('Failed to fetch meals');
      }
      setLoading(false);
    };

    fetchMeals();
  }, []);

  // Function to handle portion size change
  const handlePortionChange = (e) => {
    setPortionSize(e.target.value);
  };

  // Function to handle meal selection and GL calculation
  const handleMealSelect = async (meal) => {
    setSelectedMeal(meal);
    try {
      const response = await fetch(`http://localhost:8000/api/meal_gl/?portion_size=${portionSize}&meal_name=${meal.name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch GL data');
      }
      const data = await response.json();
      setRecommendation(data.recommendation); // Set the recommendation received from backend
    } catch (err) {
      setError('Error calculating GL');
    }
  };

  // Slick carousel settings
  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Infinite scrolling
    speed: 100,
    autoplay: true, // Autoplay Setting
    autoplaySpeed: 4000,
    slidesToShow: 2, // Show 5 meals at a time
    slidesToScroll: 2, // Scroll 5 meals at a time
    responsive: [
      {
        breakpoint: 1024, // Tablet and small screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white"> {/* Flexbox to center content */}
      <div className="max-w-lg w-full p-6 border-4 border-black bg-white text-black rounded-lg shadow-xl animate__animated animate__fadeInUp"> {/* Add fadeInUp animation */}
        <h1 className="text-2xl font-bold text-center mb-6 animate__animated animate__fadeIn animate__delay-1s">Discover Your Meal Insights</h1>

        {/* Portion size input */}
        <div className="mb-4 animate__animated animate__fadeIn animate__delay-1s">
          <label className="block text-lg font-semibold mb-2" htmlFor="portionSize">
            Portion Size (g):
          </label>
          <input
            id="portionSize"
            type="number"
            value={portionSize}
            onChange={handlePortionChange}
            min="1"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {loading && <p className="text-center text-gray-500 animate__animated animate__bounceIn animate__delay-1s">Loading meals...</p>}
        {error && <p className="text-center text-red-500 animate__animated animate__shakeX animate__delay-1s">{error}</p>}

        {/* Carousel to display meals */}
        <div className="my-4 mt-6 animate__animated animate__fadeIn animate__delay-2s">
          <Slider {...settings}>
            {meals.map((meal) => (
              <div 
                key={meal.id} 
                onClick={() => handleMealSelect(meal)} 
                className="p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md shadow-md animate__animated animate__zoomIn mb-4 animate__delay-2s" 
              >
                <h3 className="text-xl font-semibold">{meal.name}</h3>
                <p className="text-gray-600">Glycemic Index: {meal.gi_level}</p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Display Recommendation */}
        {selectedMeal && (
          <div className="mt-10 p-4 bg-blue-50 rounded-md border border-blue-200 ">
            <h3 className="text-2xl text-center font-semibold mb-2">Recommendation for <span className='text-green-700'>{selectedMeal.name}</span></h3>
            <p className="text-blue-500  font-bold text-2xl text-center">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlycemicLoadRecommendations;
