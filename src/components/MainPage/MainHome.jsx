import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "animate.css";
import About from "./MainAbout";
import Logout from "./Logout";

const MainHome = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center text-left text-black relative">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-[url('assets/img/homepage.jpg')] bg-cover bg-center"
          style={{ opacity: 0.8 }} // Adjust the opacity level here
        ></div>

        {/* Content on Top of the Background */}
        <div className="relative z-10 px-10 flex items-start">
          <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <h1 className="text-3xl font-bold text-white">
              Welcome to Your Diabeat.
            </h1>
            <p className="animate__animated animate__fadeIn animate__delay-1s mt-4 text-lg text-orange-400">
              Explore healthy meal options tailored just for you.
            </p>

            {/* Link to Glycemic Load Calculator */}
            <div className="mt-8">
              <h2 className="text-xl text-white font-semibold">
                Unlock Personalized Meal Insights for Better Health!
              </h2>
              <p className="mt-2 animate__animated animate__fadeIn animate__delay-1s text-orange-400">
                Receive tailored dietary recommendations according to the
                selected meal and portion size to maintain balanced blood sugar
                levels.
              </p>
              <Link
                to="/meal_insights" // Link to the GL Calculator component route
                className="inline-block mt-4 px-6 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
              >
                Discover Your Meal Insights
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom-Right Positioned Div */}
        
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>
      <div id="about">
        <Logout />
      </div>
    </>
  );
};

export default MainHome;
