import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendedMeals = () => {
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [lastSugarLevel, setLastSugarLevel] = useState(null);
  const [measurementTime, setMeasurementTime] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("first_name") || "User";
    setUserName(name);
  }, []);

  const fetchRecommendedMeals = async () => {
    setError(null);
    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:8000/api/recommend_meals/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLastSugarLevel(data.last_sugar_level);
        setMeasurementTime(data.measurement_time);
        setRecommendedMeals(data.recommended_meals);
      } else {
        setError(data.error || "Please Login Again.");
      }
    } catch (err) {
      setError("An error occurred while connecting to the server.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2, // Fixed: Scroll two slides at a time
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="h-screen flex flex-col justify-center text-center text-black relative">
      <div
        className="absolute inset-0 bg-[url('assets/img/services.jpg')] bg-cover bg-center"
        style={{ opacity: 0.6 }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative mt-6">
        <div className="mb-6">
          <p className="text-xl font-medium text-white animate__animated animate__fadeIn mt-20">
            Hello, {userName}!
          </p>
          <p className="text-base text-white mt-2 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
            Not sure what to eat? Click the button below to receive meal recommendations based on your previous sugar levels.
          </p>
        </div>
        <button
          onClick={fetchRecommendedMeals}
          className="w-72 bg-blue-500 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors animate__animated animate__bounceIn animate__delay-1s"
        >
          Get Recommendations
        </button>
        {error && (
          <div className="mt-4 text-red-600 text-sm animate__animated animate__shakeX">
            <strong>{error}</strong>
          </div>
        )}
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
        {recommendedMeals.length > 0 && (
          <div className="mt-8 animate__animated animate__fadeIn animate__delay-2s">
            <Slider {...sliderSettings}>
              {recommendedMeals.map((meal, index) => (
                <div key={index} className="p-4 bg-gray-800 bg-opacity-75 rounded-md">
                  <p className="text-white text-lg font-semibold">{meal}</p>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedMeals;
